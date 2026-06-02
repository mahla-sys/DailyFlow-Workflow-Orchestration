/**
 * @file eventBus.js
 * @description سیستم رویداد مرکزی (Pub/Sub) برای ارتباط ماژول‌ها بدون وابستگی مستقیم
 */

class EventBus {
    constructor() {
        this.events = {};
    }

    // اشتراک در یک رویداد
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    // انتشار یک رویداد (ارسال داده به همه شنوندگان)
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    // لغو اشتراک
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

export const eventBus = new EventBus();
