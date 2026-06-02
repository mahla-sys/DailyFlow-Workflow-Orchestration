/**
 * @file dateUtils.js
 * @description توابع کمکی برای مدیریت تاریخ و زمان
 */

export const DateUtils = {
    // تبدیل تاریخ امروز به فرمت YYYY-MM-DD
    getToday() {
        const d = new Date();
        return d.toISOString().split('T')[0];
    },

    // فرمت تاریخ برای نمایش (مثلاً: Mon, May 31)
    formatDate(dateStr) {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', options);
    },

    // تغییر تاریخ به اندازه n روز
    shiftDate(dateStr, days) {
        const d = new Date(dateStr + 'T00:00:00');
        d.setDate(d.getDate() + days);
        return d.toISOString().split('T')[0];
    }
};