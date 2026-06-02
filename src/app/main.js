/**
 * @file main.js
 * @description نقطه ورود الیکیشن. رندر داشبورد زیبا و انیمیشن پس‌زمینه
 */

import { store } from '../shared/store/store.js';
import { DateUtils } from '../shared/utils/dateUtils.js';

// ==========================================
// 1. CANVAS ANIMATION ENGINE
// ==========================================
function initCosmos() {
  const canvas = document.getElementById('cosmos-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.01
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  function animate() {
    const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, '#0b0b1a');
    grd.addColorStop(0.5, '#05050a');
    grd.addColorStop(1, '#150520');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.a += s.da;
      if (s.a > 1 || s.a < 0.2) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.a})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================
// 2. DASHBOARD RENDERER
// ==========================================
class App {
    constructor() {
        console.log("🚀 DailyFlow Initializing...");
        this.appContainer = document.getElementById('app');
        this.store = store; // دسترسی به دیتای مرکزی
        
        this.init();
    }

    init() {
        initCosmos(); // استارت انیمیشن
        this.render(); // رندر صفحه
        // اضافه کردن event listener ها بعد از رندر
        setTimeout(() => this.attachEventListeners(), 100);
        console.log("✨ Dashboard Ready.");
    }

    render() {
        const todayData = this.store.getDayData(this.store.getState().currentDate);
        
        this.appContainer.innerHTML = `
            <div class="app-layout">
                <!-- Sidebar -->
                <aside class="sidebar">
                    <div class="sidebar-logo">✦ DailyFlow</div>
                    <nav>
                        <div class="nav-item active"><span>📊</span> Dashboard</div>
                        <div class="nav-item"><span>📅</span> Calendar</div>
                        <div class="nav-item"><span>📈</span> Analytics</div>
                        <div class="nav-item"><span>⚙️</span> Settings</div>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="main-content">
                    <div class="header">
                        <div>
                            <h1>Hello, Space Traveler 👋</h1>
                            <p>${DateUtils.formatDate(todayData.date)} | Ready to conquer the day?</p>
                        </div>
                        <div style="display:flex; gap:10px;">
                           <button class="nav-item" style="padding:8px 12px;">Notifications</button>
                           <button class="nav-item" style="padding:8px 12px;">Profile</button>
                        </div>
                    </div>

                    <!-- Grid Cards -->
                    <div class="dashboard-grid">
                        
                        <!-- Mood Card -->
                        <div class="card mood-card">
                            <div class="card-header"><span>🌟 Current Mood</span><span>${todayData.moodRating}/10</span></div>
                            <div class="mood-grid" id="mood-selector">
                                ${['😢','😕','😐','🙂','😊','😄','🤩'].map((emoji, i) => `
                                    <div class="mood-btn ${i+3 === todayData.moodRating ? 'selected' : ''}" data-rating="${i+3}">
                                        ${emoji}
                                    </div>
                                `).join('')}
                            </div>
                            <div style="margin-top:15px; font-size:12px; color:var(--text-muted); text-align:center;">
                                Sleep: ${todayData.sleep}h | Energy: ${todayData.productive}h
                            </div>
                        </div>

                        <!-- DayFlow Card -->
                        <div class="card dayflow-card">
                            <div class="card-header"><span>⏱️ Day Flow</span><span>24 Hours</span></div>
                            <div class="dayflow-bar">
                                <div class="df-segment" style="width:37.5%; background:#1e1b4b;">Sleep</div>
                                <div class="df-segment" style="width:4.2%; background:#f59e0b;">Break</div>
                                <div class="df-segment" style="width:25%; background:#8b5cf6;">Work</div>
                                <div class="df-segment" style="width:4.2%; background:#14b8a6;">Rest</div>
                                <div class="df-segment" style="width:16.6%; background:#8b5cf6;">Work</div>
                                <div class="df-segment" style="width:8.3%; background:#3b82f6;">Movie</div>
                                <div class="df-segment" style="width:4.2%; background:#8b5cf6;">Work</div>
                            </div>
                            <div class="df-legend">
                                <div><span class="legend-dot" style="background:#8b5cf6"></span>Work</div>
                                <div><span class="legend-dot" style="background:#1e1b4b"></span>Sleep</div>
                                <div><span class="legend-dot" style="background:#3b82f6"></span>Leisure</div>
                                <div><span class="legend-dot" style="background:#14b8a6"></span>Rest</div>
                            </div>
                        </div>

                        <!-- Tasks Card -->
                        <div class="card tasks-card">
                            <div class="card-header"><span>📋 Daily Tasks</span><span>${todayData.tasks.filter(t=>t.done).length}/${todayData.tasks.length} Done</span></div>
                            <div class="task-list" id="task-list">
                                ${todayData.tasks.map(t => `
                                    <div class="task-item ${t.done ? 'done' : ''}" data-task-id="${t.id}" style="opacity:${t.done ? 0.5 : 1}">
                                        <div class="task-check ${t.done ? 'checked' : ''}">
                                            ${t.done ? '✓' : ''}
                                        </div>
                                        <span class="task-name" style="${t.done ? 'text-decoration:line-through' : ''}">${t.name}</span>
                                        <span class="task-type ${t.type}">${t.type}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Timeline Card -->
                        <div class="card timeline-card">
                            <div class="card-header"><span>🕒 Timeline</span><span>Log</span></div>
                            <div class="tl-list">
                                <div class="tl-item">
                                    <span class="tl-time">09:00</span>
                                    <span class="tl-text">Morning Routine</span>
                                    <span class="tl-cat" style="color:#ec4899">Chores</span>
                                </div>
                                <div class="tl-item">
                                    <span class="tl-time">10:00</span>
                                    <span class="tl-text">Deep Work Block</span>
                                    <span class="tl-cat" style="color:#8b5cf6">Work</span>
                                </div>
                                <div class="tl-item">
                                    <span class="tl-time">12:30</span>
                                    <span class="tl-text">Lunch & Rest</span>
                                    <span class="tl-cat" style="color:#14b8a6">Rest</span>
                                </div>
                                <div class="tl-item">
                                    <span class="tl-time">14:00</span>
                                    <span class="tl-text">Coding Project</span>
                                    <span class="tl-cat" style="color:#8b5cf6">Work</span>
                                </div>
                                <div class="tl-item">
                                    <span class="tl-time">17:00</span>
                                    <span class="tl-text">Gym / Exercise</span>
                                    <span class="tl-cat" style="color:#10b981">Health</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        `;
    }

    attachEventListeners() {
        // اضافه کردن event listener به انتخاب‌کننده حالات
        const moodButtons = document.querySelectorAll('#mood-selector .mood-btn');
        moodButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                moodButtons.forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                const rating = parseInt(e.target.getAttribute('data-rating'));
                
                // به روز رسانی امتیاز حالت در store
                const currentState = this.store.getState();
                const updatedDayData = {
                    ...this.store.getDayData(currentState.currentDate),
                    moodRating: rating
                };
                
                this.store.updateDayData(currentState.currentDate, updatedDayData);
                
                // به روز رسانی نمایش امتیاز
                const moodHeader = e.target.closest('.mood-card').querySelector('.card-header span:last-child');
                moodHeader.textContent = `${rating}/10`;
            });
        });

        // اضافه کردن event listener به چک باکس‌های تسک
        const taskItems = document.querySelectorAll('#task-list .task-item');
        taskItems.forEach(item => {
            const checkbox = item.querySelector('.task-check');
            checkbox.addEventListener('click', (e) => {
                const taskId = item.getAttribute('data-task-id');
                const currentState = this.store.getState();
                const currentDayData = this.store.getDayData(currentState.currentDate);
                
                // پیدا کردن تسک و تغییر وضعیت آن
                const taskIndex = currentDayData.tasks.findIndex(t => t.id === taskId);
                if (taskIndex !== -1) {
                    const updatedTasks = [...currentDayData.tasks];
                    updatedTasks[taskIndex] = {
                        ...updatedTasks[taskIndex],
                        done: !updatedTasks[taskIndex].done
                    };
                    
                    const updatedDayData = {
                        ...currentDayData,
                        tasks: updatedTasks
                    };
                    
                    this.store.updateDayData(currentState.currentDate, updatedDayData);
                    
                    // به روز رسانی DOM
                    item.classList.toggle('done');
                    const taskName = item.querySelector('.task-name');
                    if (item.classList.contains('done')) {
                        taskName.style.textDecoration = 'line-through';
                        item.style.opacity = '0.5';
                        checkbox.classList.add('checked');
                        checkbox.textContent = '✓';
                    } else {
                        taskName.style.textDecoration = 'none';
                        item.style.opacity = '1';
                        checkbox.classList.remove('checked');
                        checkbox.textContent = '';
                    }
                    
                    // به روز رسانی تعداد تسک‌های انجام شده در هدر
                    const doneCount = updatedTasks.filter(t => t.done).length;
                    const headerSpan = item.closest('.tasks-card').querySelector('.card-header span:last-child');
                    headerSpan.textContent = `${doneCount}/${updatedTasks.length} Done`;
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});