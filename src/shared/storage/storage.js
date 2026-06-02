/**
 * @file storage.js
 * @description مدیریت ذخیره و بازیابی داده‌ها از LocalStorage
 */

export const Storage = {
    // ذخیره داده
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(`df_${key}`, serialized);
            return true;
        } catch (e) {
            console.error("Storage Save Error:", e);
            return false;
        }
    },

    // بازیابی داده
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`df_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error("Storage Load Error:", e);
            return defaultValue;
        }
    },

    // حذف داده
    remove(key) {
        localStorage.removeItem(`df_${key}`);
    },

    // پاکسازی کل (برای دیباگ)
    clear() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('df_'));
        keys.forEach(k => localStorage.removeItem(k));
    }
};