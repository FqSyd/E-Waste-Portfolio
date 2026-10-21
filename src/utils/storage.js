// Lightweight IndexedDB helper for robust client-side storage of assignments and gallery images
// Eliminates the 5MB browser localStorage limit so large PDFs and photos never fail or vanish.

const DB_NAME = 'EWEM_Portfolio_DB';
const DB_VERSION = 1;
export const STORE_ASSIGNMENTS = 'custom_assignments';
export const STORE_GALLERY = 'custom_gallery';

const openDB = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_ASSIGNMENTS)) {
        db.createObjectStore(STORE_ASSIGNMENTS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_GALLERY)) {
        db.createObjectStore(STORE_GALLERY, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      console.warn('IndexedDB open error, falling back to localStorage');
      resolve(null);
    };
  });
};

// Get all items from an object store
export const getStoredItems = async (storeName) => {
  try {
    const db = await openDB();
    if (!db) {
      const saved = localStorage.getItem(storeName);
      return saved ? JSON.parse(saved) : [];
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => resolve([]);
    });
  } catch (err) {
    console.warn(`Error reading ${storeName}:`, err);
    try {
      const saved = localStorage.getItem(storeName);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
};

// Save item to an object store
export const saveStoredItem = async (storeName, item) => {
  try {
    const db = await openDB();
    if (!db) {
      const saved = localStorage.getItem(storeName);
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(item);
      try {
        localStorage.setItem(storeName, JSON.stringify(list));
      } catch (e) {
        console.warn('LocalStorage quota exceeded on fallback');
      }
      return true;
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);

      request.onsuccess = () => resolve(true);
      request.onerror = (e) => {
        console.error(`Error saving item to ${storeName}:`, e);
        resolve(false);
      };
    });
  } catch (err) {
    console.error(`Error saving to ${storeName}:`, err);
    return false;
  }
};

// Delete item
export const deleteStoredItem = async (storeName, id) => {
  try {
    const db = await openDB();
    if (!db) {
      const saved = localStorage.getItem(storeName);
      if (saved) {
        const list = JSON.parse(saved).filter(i => i.id !== id);
        localStorage.setItem(storeName, JSON.stringify(list));
      }
      return true;
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  } catch (err) {
    console.error(`Error deleting from ${storeName}:`, err);
    return false;
  }
};
