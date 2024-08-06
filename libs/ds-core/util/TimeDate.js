'use strict';
process.env.TZ = 'Europe/Moscow';


exports.TimeDate = class TimeDate {
    constructor(unix) {
        this.unix = unix;
        this.date = new Date(this.unix);
        this.year = this.date.getYear();
        this.month = this.date.getMonth()
        this.day = this.date.getDay();
        this.hours = this.date.getHours();
        this.minutes = this.date.getMinutes();
        this.seconds = this.date.getSeconds();
    }

    toString(num) {
        return num.toString();
    }

    // Get
    getUnix() {
        return this.unix;
    }
    getDate() {
        return this.date;
    }
    getHours() {
        return (this.toString(this.hours).length == '2') ? (this.hours): ('0' + this.hours);
    }
    getMinutes() {
        return (this.toString(this.minutes).length == '2') ? (this.minutes): ('0' + this.minutes);
    }
    getSeconds() {
        return (this.toString(this.seconds).length == '2') ? (this.seconds): ('0' + this.seconds);
    }
    
    // Diff
    diffMinutes(a) {
        return Math.floor((a - Date.now()) / 60000);
    }
    diffSecconds(a) {
        return Math.floor(((a - Date.now()) % 60000) / 1000);
    }
}