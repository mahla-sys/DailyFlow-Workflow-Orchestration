/**
 * @file store.js
 * @description مدیریت وضعیت مرکزی برنامه (Single Source of Truth)
 */

import { eventBus } from '../events/eventBus.js';
import { Storage } from '../storage/storage.js';

class Store {
    constructor() {
        // وضعیت اولیه
        this.state = {
            currentDate: new Date().toISOString().split('T')[0],
            activeTheme: 'cosmic',
            days: {} // داده‌های روزها اینجا لود میشن
        };

        // لود کردن وضعیت ذخیره شده
        this.loadState();
    }

    // گرفتن وضعیت فعلی
    getState() {
        return this.state;
    }

    // دریافت داده یک روز خاص
    getDayData(date) {
        if (!this.state.days[date]) {
            // اگر داده وجود نداشت، ساختار پیش‌فرض رو برگردون
            this.state.days[date] = this._createDefaultDay(date);
        }
        return this.state.days[date];
    }

    // به روز رسانی داده یک روز خاص
    updateDayData(date, updates) {
        if (!this.state.days[date]) {
            this.state.days[date] = this._createDefaultDay(date);
        }
        this.state.days[date] = { ...this.state.days[date], ...updates };
        this._saveState();
        eventBus.emit('state:changed', this.state);
    }

    // بروزرسانی وضعیت و ذخیره خودکار
    setState(updates) {
        this.state = { ...this.state, ...updates };
        this._saveState();
        eventBus.emit('state:changed', this.state);
    }

    // ذخیره در LocalStorage
    _saveState() {
        Storage.set('app_state', this.state);
    }

    // لود از LocalStorage
    loadState() {
        const saved = Storage.get('app_state');
        if (saved) {
            this.state = { ...this.state, ...saved };
        }
    }

    // ساختار پیش‌فرض برای یک روز جدید
    _createDefaultDay(date) {
        return {
            date,
            journal: '',
            moodRating: 5,
            moods: [],
            sleep: 0,
            productive: 0,
            tasks: [
                { id: 't1', name: 'Exercise', type: 'D', done: false },
                { id: 't2', name: 'Help at Home', type: 'D', done: false },
                { id: 't3', name: 'Study', type: 'D', done: false },
                { id: 't4', name: 'Meditation', type: 'D', done: false }
            ],
            timeline: []
        };
    }
}

export const store = new Store();