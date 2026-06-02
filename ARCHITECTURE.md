# 📘 DailyFlow — مستندات کامل پروژه
## نسخه: 1.0 | تاریخ: 2026-05-31
## وضعیت: فاز طراحی معماری

---

## 📋 فهرست مطالب

1. [داستان پروژه](#داستان-پروژه)
2. [این مستندات برای چه کسانی است؟](#این-مستندات-برای-چه-کسانی-است)
3. [معماری کلی پروژه](#معماری-کلی-پروژه)
4. [درخت فایل‌ها](#درخت-فایل‌ها)
5. [توضیح هر فایل به زبان ساده](#توضیح-هر-فایل-به-زبان-ساده)
6. [نقشه راه ساخت](#نقشه-راه-ساخت)
7. [راهنمای ساخت قدم‌به‌قدم](#راهنمای-ساخت-قدمبهقدم)
8. [برنامه بک‌اند و آنلاین‌سازی](#برنامه-بکاند-و-آنلاینسازی)
9. [فازهای آینده](#فازهای-آینده)
10. [قوانین کدنویسی](#قوانین-کدنویسی)
11. [رفع مشکل](#رفع-مشکل)
12. [لغت‌نامه](#لغتنامه)

---

## 📖 داستان پروژه

**DailyFlow** یک اپلیکیشن برنامه‌ریزی روزانه است که:

### مشکل فعلی کاربر:
کاربر هر روز صبح توی یک دفتر سررسید می‌نویسه:
- چند جمله انگیزشی یا هدف روزانه
- سمت چپ صفحه: کارهایی که باید انجام بده (روتین‌ها، کارهای ضروری، کارهای آینده)
- سمت راست صفحه: کارهایی که انجام داده همراه با ساعتش

### راه‌حل DailyFlow:
همین سیستم رو ببره روی لپ‌تاپ/گوشی با:
- ثبت روزانه ساده و سریع
- نمودارهای تحلیلی (روزانه، هفتگی، ماهانه)
- ورودی صوتی (حرف بزن، خودش پر می‌کنه)
- تحلیل هوشمند (تأثیر خواب روی بهره‌وری، پریود و...)
- تم‌های بصری زیبا (کیهانی، جنگلی، اقیانوسی)

---

## 👥 این مستندات برای چه کسانی است؟

| مخاطب | چه چیزی باید بدونه؟ |
|-------|---------------------|
| **غیرکدنویس** | فقط این فایل رو بخونه، قدم‌ها رو دنبال کنه |
| **هوش مصنوعی** | از روی این مستندات و درخت فایل‌ها کد بزنه |
| **برنامه‌نویس جدید** | بدونه هر فایل چیکار می‌کنه و چطور به بقیه وصله |
| **کارفرما** | بدونه پروژه چیه، چه فازهایی داره، چقدر زمان می‌بره |

---

## 🏗️ معماری کلی پروژه

### اصل اول: Feature-Sliced Design (FSD)
کد رو بر اساس **ویژگی‌های بیزینسی** دسته‌بندی می‌کنیم، نه بر اساس نوع فایل.

### اصل دوم: وابستگی یک‌طرفه
لایه بالاتر فقط از لایه پایین‌تر استفاده می‌کنه. **هرگز برعکس.**

```
app/           ← لایه ورودی (فقط orchestration)
  ↓
pages/         ← لایه صفحات (هر URL یک صفحه)
  ↓
widgets/       ← لایه ویجت‌ها (کامپوننت‌های ترکیبی بزرگ)
  ↓
features/      ← لایه فیچرها (قابلیت‌های کاربردی)
  ↓
entities/      ← لایه موجودیت‌ها (مدل‌های داده بیزینسی)
  ↓
shared/        ← لایه مشترک (ابزارها، UI-kit، استایل‌ها)
```

### اصل سوم: هر ماژول مسئول یک چیز
- ماژول mood فقط با مود کار داره
- ماژول tasks فقط با تسک‌ها کار داره
- ماژول charts فقط با نمودارها کار داره

---

## 🌳 درخت فایل‌ها

```
📁 dailyflow/
│
├── 📂 src/
│   │
│   ├── 📂 app/                          # 🏛️ نقطه ورود اپ
│   │   ├── 📄 main.js                   # راه‌اندازی کل اپ
│   │   ├── 📄 router.js                 # مدیریت جابجایی بین صفحات
│   │   ├── 📂 providers/                # سرویس‌های سراسری
│   │   │   ├── 📄 themeProvider.js      # مدیریت تم‌ها
│   │   │   ├── 📄 storeProvider.js      # مدیریت state
│   │   │   └── 📄 voiceProvider.js      # مدیریت ورودی صوتی
│   │   └── 📂 global/                   # تنظیمات سراسری
│   │       ├── 📄 config.js             # ثابت‌ها و تنظیمات
│   │       └── 📄 styles.css            # استایل‌های پایه
│   │
│   ├── 📂 pages/                        # 📄 صفحات اصلی
│   │   ├── 📂 dashboard/                # صفحه داشبورد (اصلی)
│   │   │   ├── 📄 dashboard.js          # لاجیک صفحه
│   │   │   └── 📄 dashboard.css         # استایل صفحه
│   │   ├── 📂 calendar/                 # صفحه تقویم (فاز ۲)
│   │   │   ├── 📄 calendar.js
│   │   │   └── 📄 calendar.css
│   │   ├── 📂 analytics/                # صفحه تحلیل‌ها (فاز ۳)
│   │   │   ├── 📄 analytics.js
│   │   │   └── 📄 analytics.css
│   │   └── 📂 settings/                 # صفحه تنظیمات (فاز ۲)
│   │       ├── 📄 settings.js
│   │       └── 📄 settings.css
│   │
│   ├── 📂 widgets/                      # 🧩 ویجت‌های ترکیبی
│   │   ├── 📂 headerWidget/             # هدر اپ
│   │   │   ├── 📄 headerWidget.js
│   │   │   └── 📄 headerWidget.css
│   │   ├── 📂 sidebarWidget/            # منوی کناری
│   │   │   ├── 📄 sidebarWidget.js
│   │   │   └── 📄 sidebarWidget.css
│   │   ├── 📂 moodWidget/               # ویجت مود و انرژی
│   │   │   ├── 📄 moodWidget.js
│   │   │   └── 📄 moodWidget.css
│   │   ├── 📂 journalWidget/            # ویجت ژورنال
│   │   │   ├── 📄 journalWidget.js
│   │   │   └── 📄 journalWidget.css
│   │   ├── 📂 dayflowWidget/            # نوار ۲۴ ساعته
│   │   │   ├── 📄 dayflowWidget.js
│   │   │   └── 📄 dayflowWidget.css
│   │   ├── 📂 taskPanelWidget/          # پنل تسک‌ها
│   │   │   ├── 📄 taskPanelWidget.js
│   │   │   └── 📄 taskPanelWidget.css
│   │   ├── 📂 timelinePanelWidget/      # پنل تایم‌لاین
│   │   │   ├── 📄 timelinePanelWidget.js
│   │   │   └── 📄 timelinePanelWidget.css
│   │   ├── 📂 chartPanelWidget/         # پنل نمودارها
│   │   │   ├── 📄 chartPanelWidget.js
│   │   │   └── 📄 chartPanelWidget.css
│   │   └── 📂 insightsWidget/           # پنل بینش‌ها
│   │       ├── 📄 insightsWidget.js
│   │       └── 📄 insightsWidget.css
│   │
│   ├── 📂 features/                     # ⚡ فیچرها (قابلیت‌ها)
│   │   ├── 📂 moodTracker/              # ردیابی مود
│   │   │   ├── 📄 moodFeature.js        # لاجیک اصلی فیچر
│   │   │   ├── 📄 moodUI.js             # رندر UI
│   │   │   └── 📄 moodModel.js          # مدل داده
│   │   ├── 📂 taskManager/              # مدیریت تسک‌ها
│   │   │   ├── 📄 taskFeature.js
│   │   │   ├── 📄 taskUI.js
│   │   │   └── 📄 taskModel.js
│   │   ├── 📂 timelineLogger/           # لاگ تایم‌لاین
│   │   │   ├── 📄 timelineFeature.js
│   │   │   ├── 📄 timelineUI.js
│   │   │   └── 📄 timelineModel.js
│   │   ├── 📂 voiceInput/               # ورودی صوتی
│   │   │   ├── 📄 voiceFeature.js
│   │   │   ├── 📄 voiceParser.js        # تبدیل صدا به داده
│   │   │   └── 📄 voiceUI.js
│   │   ├── 📂 dayFlow/                  # نوار ۲۴ ساعته
│   │   │   ├── 📄 dayflowFeature.js
│   │   │   └── 📄 dayflowModel.js
│   │   ├── 📂 pomodoro/                 # تایمر پومودورو (فاز ۳)
│   │   │   ├── 📄 pomodoroFeature.js
│   │   │   └── 📄 pomodoroUI.js
│   │   ├── 📂 templates/                # قالب‌های آماده روز
│   │   │   ├── 📄 templateFeature.js
│   │   │   ├── 📄 templates.js          # تعریف قالب‌ها
│   │   │   └── 📄 templateUI.js
│   │   └── 📂 exportImport/             # بک‌آپ و بازیابی
│   │       ├── 📄 exportFeature.js
│   │       └── 📄 importFeature.js
│   │
│   ├── 📂 entities/                     # 🧬 موجودیت‌ها (مدل‌های داده)
│   │   ├── 📂 day/                      # موجودیت "روز"
│   │   │   ├── 📄 dayModel.js           # ساختار داده روز
│   │   │   ├── 📄 daySchema.js          # اعتبارسنجی
│   │   │   └── 📄 dayAdapter.js         # تبدیل به/از storage
│   │   ├── 📂 task/                     # موجودیت "تسک"
│   │   │   ├── 📄 taskModel.js
│   │   │   └── 📄 taskSchema.js
│   │   ├── 📂 timelineEntry/            # موجودیت "ورود تایم‌لاین"
│   │   │   ├── 📄 entryModel.js
│   │   │   └── 📄 entrySchema.js
│   │   ├── 📂 mood/                     # موجودیت "مود"
│   │   │   ├── 📄 moodModel.js
│   │   │   └── 📄 moodSchema.js
│   │   └── 📂 user/                     # موجودیت "کاربر" (فاز ۴)
│   │       ├── 📄 userModel.js
│   │       └── 📄 userPrefs.js
│   │
│   └── 📂 shared/                       # 🛠️ ابزارهای مشترک
│       ├── 📂 ui/                       # کامپوننت‌های UI
│       │   ├── 📂 button/
│       │   │   ├── 📄 button.js
│       │   │   └── 📄 button.css
│       │   ├── 📂 input/
│       │   │   ├── 📄 input.js
│       │   │   └── 📄 input.css
│       │   ├── 📂 card/
│       │   │   ├── 📄 card.js
│       │   │   └── 📄 card.css
│       │   ├── 📂 slider/
│       │   │   ├── 📄 slider.js
│       │   │   └── 📄 slider.css
│       │   └── 📂 modal/
│       │       ├── 📄 modal.js
│       │       └── 📄 modal.css
│       ├── 📂 store/                    # مدیریت وضعیت مرکزی
│       │   ├── 📄 store.js              # Store class
│       │   ├── 📄 actions.js            # تعریف اکشن‌ها
│       │   ├── 📄 reducer.js            # لاجیک تغییر state
│       │   └── 📄 middleware.js         # لاگ، ذخیره خودکار
│       ├── 📂 events/                   # سیستم Pub/Sub
│       │   └── 📄 eventBus.js           # Event bus مرکزی
│       ├── 📂 storage/                  # لایه ذخیره‌سازی
│       │   ├── 📄 localStorage.js       # wrapper لوکال
│       │   ├── 📄 indexedDB.js          # wrapper دیتابیس
│       │   └── 📄 sync.js               # همگام‌سازی (فاز ۴)
│       ├── 📂 utils/                    # توابع کمکی
│       │   ├── 📄 date.js               # مدیریت تاریخ
│       │   ├── 📄 parser.js             # پارسر متن/صوت
│       │   ├── 📄 formatters.js         # فرمت اعداد/زمان
│       │   ├── 📄 validators.js         # اعتبارسنجی داده
│       │   └── 📄 helpers.js            # توابع عمومی
│       ├── 📂 animations/               # سیستم انیمیشن
│       │   ├── 📂 cosmos/
│       │   │   ├── 📄 starField.js      # ستاره‌ها
│       │   │   ├── 📄 shootingStars.js  # دنباله‌دارها
│       │   │   ├── 📄 aurora.js         # شفق قطبی
│       │   │   └── 📄 nebula.js         # مه‌کهشانی
│       │   ├── 📂 ui/
│       │   │   ├── 📄 microAnimations.js
│       │   │   ├── 📄 transitions.js
│       │   │   └── 📄 loading.js
│       │   └── 📂 dataViz/
│       │       ├── 📄 chartAnimations.js
│       │       └── 📄 heatmapAnimations.js
│       ├── 📂 charts/                   # نمودارها
│       │   ├── 📄 donutChart.js
│       │   ├── 📄 barChart.js
│       │   ├── 📄 lineChart.js
│       │   └── 📄 heatmapChart.js       # فاز ۳
│       └── 📂 themes/                   # سیستم تم‌ها
│           ├── 📂 cosmic/
│           │   ├── 📄 variables.css
│           │   ├── 📄 glass.css
│           │   └── 📄 layout.css
│           ├── 📂 forest/               # فاز ۳
│           │   ├── 📄 variables.css
│           │   └── 📄 layout.css
│           └── 📂 ocean/                # فاز ۳
│               ├── 📄 variables.css
│               └── 📄 layout.css
│
├── 📂 public/                           # فایل‌های استاتیک
│   ├── 📂 assets/
│   │   ├── 📂 icons/
│   │   ├── 📂 fonts/
│   │   └── 📂 sounds/
│   ├── 📂 templates/
│   │   ├── 📄 workDay.json
│   │   ├── 📄 restDay.json
│   │   ├── 📄 sickDay.json
│   │   �📄 travelDay.json
│   └── 📄 index.html                    # نقطه ورود — فقط HTML خالی
│
├── 📂 tests/                            # تست‌ها
│   ├── 📂 unit/
│   ├── 📂 integration/
│   └── 📂 e2e/
│
├── 📂 docs/                             # مستندات
│   ├── 📄 ARCHITECTURE.md               # همین فایل
│   ├── 📄 API-REFERENCE.md
│   └── 📄 CONTRIBUTING.md
│
├── 📄 package.json                      # کانفیگ پروژه (فاز ۲)
└── 📄 README.md                         # معرفی پروژه
```

---

## 📖 توضیح هر فایل به زبان ساده

### 🏛️ لایه app/
| فایل | چیکار می‌کنه؟ | مثال |
|------|--------------|------|
| `main.js` | اپ رو راه‌اندازی می‌کنه. مثل روشن کردن ماشین. | وقتی صفحه لود میشه، این فایل اجرا میشه |
| `router.js` | مدیریت می‌کنه کاربر کدوم صفحه رو ببینه | وقتی روی "تنظیمات" کلیک می‌کنه، router صفحه settings رو نشون میده |
| `themeProvider.js` | تم فعلی رو مدیریت می‌کنه (کیهانی/جنگلی/اقیانوسی) | وقتی کاربر تم رو عوض می‌کنه، این فایل رنگ‌ها رو تغییر میده |
| `storeProvider.js` | state مرکزی رو به همه ماژول‌ها می‌رسونه | وقتی مود تغییر می‌کنه، store به همه میگه |
| `config.js` | ثابت‌ها و تنظیمات سراسری | نام اپ، نسخه، تنظیمات پیش‌فرض |

### 📄 لایه pages/
| فایل | چیکار می‌کنه؟ |
|------|--------------|
| `dashboard.js` | صفحه اصلی رو می‌سازه. همه ویجت‌ها رو اینجا می‌چینه |
| `calendar.js` | صفحه تقویم ماهانه (فاز ۲) |
| `analytics.js` | صفحه تحلیل‌های پیشرفته (فاز ۳) |
| `settings.js` | صفحه تنظیمات کاربر (فاز ۲) |

### 🧩 لایه widgets/
هر ویجت یک "بلوک بزرگ" از صفحه است:
| ویجت | چیکار می‌کنه؟ |
|------|--------------|
| `headerWidget` | نوار بالای صفحه (لوگو، تاریخ، دکمه‌ها) |
| `sidebarWidget` | منوی کناری |
| `moodWidget` | بخش انتخاب مود + اسلایدر + ساعت خواب |
| `journalWidget` | بخش یادداشت صبحگاهی |
| `dayflowWidget` | نوار ۲۴ ساعته |
| `taskPanelWidget` | لیست تسک‌ها (روتین، ضروری، آینده) |
| `timelinePanelWidget` | لیست فعالیت‌ها با ساعت |
| `chartPanelWidget` | نمودارها (دونات، میله‌ای، خطی) |
| `insightsWidget` | بینش‌های هوشمند |

### ⚡ لایه features/
هر فیچر یک "قابلیت کاربردی" است:
| فیچر | چیکار می‌کنه؟ |
|------|--------------|
| `moodTracker` | انتخاب مود، اسلایدر ۱-۱۰، ذخیره |
| `taskManager` | اضافه/حذف/تیک تسک‌ها |
| `timelineLogger` | ثبت فعالیت‌ها با ساعت شروع و پایان |
| `voiceInput` | دکمه میکروفون، تبدیل صدا به متن، پارسر خودکار |
| `dayFlow` | مدیریت نوار ۲۴ ساعته، محاسبه بازه‌ها |
| `pomodoro` | تایمر ۲۵ دقیقه‌ای، لاگ سشن‌ها |
| `templates` | قالب‌های آماده (روز کاری/استراحت/مریضی) |
| `exportImport` | خروجی JSON، ورودی JSON |

### 🧬 لایه entities/
هر موجودیت یک "مدل داده" است:
| موجودیت | چیکار می‌کنه؟ |
|---------|--------------|
| `day` | ساختار یک روز: ژورنال، مود، تسک‌ها، تایم‌لاین |
| `task` | ساختار یک تسک: نام، نوع، انجام‌شده/نه |
| `timelineEntry` | ساختار یک ورود تایم‌لاین: ساعت شروع، پایان، فعالیت، دسته |
| `mood` | ساختار مود: برچسب‌ها، رتبه ۱-۱۰ |
| `user` | اطلاعات کاربر: نام، ترجیحات، روتین‌های پیش‌فرض |

### 🛠️ لایه shared/
ابزارهایی که همه جا استفاده می‌شن:
| بخش | چیکار می‌کنه؟ |
|-----|--------------|
| `ui/` | دکمه، اینپوت، کارت، اسلایدر، مودال (قابل استفاده مجدد) |
| `store/` | مدیریت state مرکزی (مثل Redux ولی ساده) |
| `events/` | سیستم Pub/Sub (فیچرها به هم خبر می‌دن) |
| `storage/` | ذخیره در LocalStorage/IndexedDB |
| `utils/` | توابع کمکی: تاریخ، فرمت، اعتبارسنجی |
| `animations/` | انیمیشن‌ها: ستاره‌ها، شفق، میکرو‌انیمیشن‌ها |
| `charts/` | نمودارها: دونات، میله‌ای، خطی، هیتمپ |
| `themes/` | تم‌ها: کیهانی، جنگلی، اقیانوسی |

---

## 🗺️ نقشه راه ساخت

| فاز | مدت تخمینی | خروجی | حجم تقریبی | وضعیت |
|-----|-----------|-------|-----------|-------|
| **فاز ۰** | ۱-۲ روز | اسکلت معماری + Store + Event Bus + Storage | ~۵۰۰ خط | ⬜ شروع نشده |
| **فاز ۱** | ۳-۴ روز | صفحه داشبورد + ویجت‌ها + فیچرهای اصلی | ~۲,۰۰۰ خط | ⬜ شروع نشده |
| **فاز ۲** | ۲-۳ روز | تم کیهانی + انیمیشن‌ها + نمودارها | ~۱,۵۰۰ خط | ⬜ شروع نشده |
| **فاز ۳** | ۲-۳ روز | ورودی صوتی + پومودورو + قالب‌ها | ~۱,۵۰۰ خط | ⬜ شروع نشده |
| **فاز ۴** | ۳-۴ روز | بک‌اند ساده + آنلاین‌سازی + موبایل | ~۲,۰۰۰ خط | ⬜ شروع نشده |
| **فاز ۵** | ۴-۵ روز | تم‌های اضافه + polish + تست | ~۱,۵۰۰ خط | ⬜ شروع نشده |
| **فاز ۶** | ۵-۷ روز | تلگرام بات + AI تحلیل‌گر | ~۲,۰۰۰ خط | ⬜ شروع نشده |
| **مجموع** | **۲۰-۲۸ روز** | **اپلیکیشن کامل** | **~۱۱,۰۰۰ خط** | |

---

## 🛠️ راهنمای ساخت قدم‌به‌قدم

### قدم ۰: آماده‌سازی محیط

1. یک پوشه بساز به اسم `dailyflow/`
2. داخلش فایل `public/index.html` رو بساز (فقط HTML خالی)
3. پوشه `src/` رو بساز و زیرپوشه‌ها رو طبق درخت بالا ایجاد کن
4. فایل `docs/ARCHITECTURE.md` رو همین‌جا کپی کن

### قدم ۱: ساخت هسته مرکزی (فاز ۰)

**ترتیب ساخت:**
1. `shared/store/store.js` — اول Store رو بساز
2. `shared/events/eventBus.js` — بعد Event Bus
3. `shared/storage/localStorage.js` — بعد Storage
4. `shared/utils/date.js` — بعد Utils
5. `app/main.js` — در نهایت اپ رو راه‌اندازی کن

**چرا این ترتیب؟**
چون `main.js` به همه اینا وابسته‌ست. اول باید پایه‌ها رو بسازی.

### قدم ۲: ساخت موجودیت‌ها (فاز ۰)

**ترتیب ساخت:**
1. `entities/day/dayModel.js` — مدل روز
2. `entities/day/daySchema.js` — اعتبارسنجی
3. `entities/day/dayAdapter.js` — تبدیل به storage
4. `entities/task/taskModel.js` — مدل تسک
5. `entities/task/taskSchema.js` — اعتبارسنجی تسک
6. `entities/timelineEntry/entryModel.js` — مدل ورود تایم‌لاین
7. `entities/timelineEntry/entrySchema.js` — اعتبارسنجی
8. `entities/mood/moodModel.js` — مدل مود
9. `entities/mood/moodSchema.js` — اعتبارسنجی مود

### قدم ۳: ساخت فیچرها (فاز ۱)

**ترتیب ساخت:**
1. `features/moodTracker/` — اول فیچر مود (ساده‌ترین)
2. `features/taskManager/` — بعد فیچر تسک
3. `features/timelineLogger/` — بعد فیچر تایم‌لاین
4. `features/voiceInput/` — ورودی صوتی
5. `features/dayFlow/` — نوار ۲۴ ساعته
6. `features/templates/` — قالب‌ها
7. `features/exportImport/` — بک‌آپ
8. `features/pomodoro/` — پومودورو

### قدم ۴: ساخت ویجت‌ها (فاز ۱)

**ترتیب ساخت:**
1. `widgets/headerWidget/`
2. `widgets/sidebarWidget/`
3. `widgets/moodWidget/`
4. `widgets/journalWidget/`
5. `widgets/dayflowWidget/`
6. `widgets/taskPanelWidget/`
7. `widgets/timelinePanelWidget/`
8. `widgets/chartPanelWidget/`
9. `widgets/insightsWidget/`

### قدم ۵: ساخت صفحات (فاز ۱)

1. `pages/dashboard/dashboard.js` — صفحه اصلی
2. `pages/dashboard/dashboard.css` — استایل صفحه
3. `pages/settings/` — صفحه تنظیمات (فاز ۲)
4. `pages/analytics/` — صفحه تحلیل‌ها (فاز ۳)
5. `pages/calendar/` — صفحه تقویم (فاز ۳)

### قدم ۶: ساخت تم و انیمیشن (فاز ۲)

1. `shared/themes/cosmic/` — تم کیهانی
2. `shared/animations/cosmos/` — انیمیشن‌ها
3. `shared/animations/ui/` — میکرو‌انیمیشن‌ها
4. `shared/charts/` — نمودارها
5. `shared/ui/` — کامپوننت‌های UI

### قدم ۷: تست و polish (فاز ۳)

1. تست دستی همه فیچرها
2. رفع باگ‌ها
3. بهینه‌سازی عملکرد
4. اضافه کردن تم‌های جدید
5. مستندات نهایی

---

## 🌐 برنامه بک‌اند و آنلاین‌سازی

### 📊 نمای کلی مراحل آنلاین‌سازی:

```
فاز ۱: لوکال (فعلاً)
  ↓
فاز ۲: آنلاین رایگان (GitHub Pages / Cloudflare Pages)
  ↓
فاز ۳: بک‌اند ساده (Supabase / Firebase — رایگان)
  ↓
فاز ۴: تلگرام بات + AI (رایگان + API پولی اختیاری)
```

### 🔹 فاز ۱: لوکال (وضعیت فعلی)
- **ذخیره‌سازی:** LocalStorage / IndexedDB روی مرورگر کاربر
- **هزینه:** کاملاً رایگان
- **محدودیت:** فقط روی یک دستگاه قابل دسترسی
- **مزیت:** سریع، آفلاین، بدون نیاز به سرور

### 🔹 فاز ۲: آنلاین رایگان
- **هاست:** GitHub Pages یا Cloudflare Pages
- **ذخیره‌سازی:** همچنان LocalStorage
- **هزینه:** کاملاً رایگان
- **مزیت:** از هر دستگاهی قابل دسترسی (با اکسپورت/ایمپورت JSON)
- **محدودیت:** داده‌ها بین دستگاه‌ها sync نمی‌شن

**چطور انجام بدیم؟**
1. پوشه `dailyflow/` رو بزار روی GitHub
2. از Settings > Pages فعالش کن
3. آدرس `https://yourusername.github.io/dailyflow/` رو باز کن
4. تمام! اپ آنلاینه

### 🔹 فاز ۳: بک‌اند ساده (Sync بین دستگاه‌ها)
- **بک‌اند:** Supabase یا Firebase (هر دو رایگان تا ۱GB)
- **احراز هویت:** Google Sign-in یا ایمیل/رمز
- **ذخیره‌سازی:** دیتابیس ابری
- **هزینه:** رایگان (تا ۵۰,۰۰۰ کاربر/ماه)
- **مزیت:** داده‌ها بین دستگاه‌ها sync می‌شن

**چطور انجام بدیم؟**
1. اکانت Supabase بساز (رایگان)
2. یک پروژه جدید ایجاد کن
3. جدول `users` و `daily_entries` بساز
4. `shared/storage/sync.js` رو بنویس که داده‌ها رو به Supabase بفرسته
5. احراز هویت اضافه کن
6. اپ رو دیپلوی کن

**ساختار دیتابیس:**
```sql
-- جدول کاربران
users (
  id: UUID (primary key),
  email: VARCHAR(255),
  name: VARCHAR(100),
  created_at: TIMESTAMP,
  preferences: JSONB  -- تم، روتین‌های پیش‌فرض، etc
)

-- جدول ورودی‌های روزانه
daily_entries (
  id: UUID (primary key),
  user_id: UUID (foreign key → users.id),
  date: DATE,
  journal: TEXT,
  moods: JSONB,  -- ['😊 Good', '⚡ Energetic']
  mood_rating: INTEGER,  -- 1-10
  sleep_hours: DECIMAL,  -- 0-24
  productive_hours: DECIMAL,  -- 0-24
  tasks: JSONB,  -- [{id, name, type, done}]
  timeline: JSONB,  -- [{start, end, activity, category}]
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)

-- جدول قالب‌های شخصی
user_templates (
  id: UUID (primary key),
  user_id: UUID (foreign key → users.id),
  name: VARCHAR(100),
  template: JSONB,  -- [{start, end, activity, category}]
  created_at: TIMESTAMP
)
```

### 🔹 فاز ۴: تلگرام بات + AI
- **تلگرام بات:** BotFather رایگانه
- **AI تحلیل‌گر:** OpenAI API (پولی، ~$۵/ماه) یا مدل لوکال (رایگان ولی ضعیف‌تر)
- **هزینه:** $۰-۱۰/ماه

**چطور تلگرام بات کار می‌کنه؟**
1. کاربر به بات پیام می‌ده: "ورزش از ۷ تا ۷:۴۵"
2. بات متن رو پارس می‌کنه
3. داده رو به API بک‌اند می‌فرسته
4. بک‌اند داده رو به `daily_entries` اضافه می‌کنه
5. وب‌اپ آپدیت میشه

**چطور AI تحلیل‌گر کار می‌کنه؟**
1. هر شب AI داده‌های روز رو تحلیل می‌کنه
2. بینش‌ها رو تولید می‌کنه: "امروز ۲ ساعت مفید بیشتر از دیروز داشتی"
3. پیشنهادات میده: "فردا ورزش رو اول صبح بذار، خوابت بهتر می‌شه"
4. کاربر می‌تونه از بات بپرسه: "این هفته چطور بودم؟"

---

## 🚀 فازهای آینده

### فاز ۱: ورودی صوتی هوشمند
- کاربر دکمه میکروفون رو می‌زنه
- می‌گه: "ورزش از ۷ تا ۷:۴۵، بعدش صبحانه تا ۸:۳۰"
- خودش تایم‌لاین رو پر می‌کنه

### فاز ۲: پومودورو داخلی
- تایمر ۲۵ دقیقه‌ای
- لاگ خودکار سشن‌ها
- نمودار تمرکز روزانه

### فاز ۳: هیتمپ عادت‌ها
- جدول مربعی مثل GitHub
- هر روز یک مربع
- رنگ بر اساس تعداد روتین‌های انجام‌شده

### فاز ۴: پیش‌بینی انرژی
- AI ساده پیش‌بینی می‌کنه فردا چقدر انرژی داری
- بر اساس تاریخچه خواب، مود، پریود

### فاز ۵: تم‌های جدید
- 🌿 جنگلی
- 🌊 اقیانوسی
- 🌸 شفق قطبی

### فاز ۶: تلگرام بات
- ورود داده از تلگرام
- دریافت بینش‌ها در تلگرام

### فاز ۷: AI تحلیل‌گر
- تحلیل الگوها
- پیشنهاد روتین بهینه
- پاسخ به سوالات کاربر

---

## 📝 قوانین کدنویسی

### ۱. قانون وابستگی یک‌طرفه
```
✅ مجاز:  widgets → features → entities → shared
❌ ممنوع: features → widgets
❌ ممنوع: entities → features
```

### ۲. قانون Public API
هر ماژول باید یک `index.js` داشته باشه که فقط چیزای لازم رو expose کنه:
```javascript
// features/moodTracker/index.js
export { MoodTracker } from './moodFeature.js';
export { MoodModel } from './moodModel.js';
export { renderMoodUI } from './moodUI.js';
// بقیه فایل‌ها private هستن
```

### ۳. قانون Single Responsibility
هر فایل فقط یک مسئولیت داشته باشه:
```
✅ moodModel.js      — فقط مدل داده مود
✅ moodUI.js         — فقط رندر UI مود
✅ moodFeature.js    — فقط لاجیک فیچر مود
❌ moodEverything.js — همه چیز با هم (ممنوع!)
```

### ۴. قانون Naming
| نوع | فرمت | مثال |
|-----|------|------|
| پوشه‌ها | kebab-case | `mood-tracker/` |
| فایل‌ها | camelCase | `moodFeature.js` |
| کلاس‌ها | PascalCase | `class MoodTracker` |
| توابع | camelCase | `function calculateMood()` |
| ثابت‌ها | UPPER_SNAKE | `const MAX_MOOD_RATING = 10` |
| CSS | kebab-case | `.mood-tag { }` |

### ۵. قانون کامنت‌گذاری
هر فایل باید اولش این کامنت رو داشته باشه:
```javascript
/**
 * @file moodFeature.js
 * @description لاجیک اصلی فیچر ردیابی مود
 * @depends entities/mood/moodModel.js
 * @depends shared/store/store.js
 * @exports MoodTracker
 */
```

### ۶. قانون حجم فایل
- هر فایل JavaScript حداکثر ۲۰۰ خط
- هر فایل CSS حداکثر ۱۵۰ خط
- اگر بیشتر شد، باید به فایل‌های کوچک‌تر تقسیم بشه

---

## 🔧 رفع مشکل

### مشکل ۱: صفحه سفید باز می‌شه
**علت:** فایل `index.html` درسته ولی `main.js` لود نشده.
**حل:**
1. کنسول مرورگر رو باز کن (F12)
2. ببین ارور چیه
3. احتمالاً مسیر فایل‌ها اشتباهه

### مشکل ۲: داده‌ها ذخیره نمی‌شن
**علت:** `localStorage` پر شده یا مرورگر بلاک کرده.
**حل:**
1. تنظیمات مرورگر رو چک کن
2. از `shared/storage/indexedDB.js` استفاده کن
3. داده‌ها رو اکسپورت کن به JSON

### مشکل ۳: نمودارها کار نمی‌کنن
**علت:** Chart.js لود نشده.
**حل:**
1. چک کن CDN درست باشه
2. یا Chart.js رو دانلود کن و لوکال استفاده کن

### مشکل ۴: ورودی صوتی کار نمی‌کنه
**علت:** مرورگر پشتیبانی نمی‌کنه یا اجازه نداده.
**حل:**
1. فقط Chrome/Edge پشتیبانی می‌کنن
2. اجازه میکروفون رو بده
3. HTTPS باشه (لوکال هم کار می‌کنه)

### مشکل ۵: تم عوض نمی‌شه
**علت:** CSS variables آپدیت نمی‌شن.
**حل:**
1. چک کن `themeProvider.js` درست کار کنه
2. CSS variables رو در `:root` تعریف کن
3. با `document.documentElement.style.setProperty` آپدیت کن

---

## 📚 لغت‌نامه

| کلمه | معنی |
|------|------|
| **FSD** | Feature-Sliced Design — روش سازماندهی کد بر اساس ویژگی‌ها |
| **Widget** | یک بلوک بزرگ UI که چند فیچر رو ترکیب می‌کنه |
| **Feature** | یک قابلیت کاربردی (مثل ردیابی مود، مدیریت تسک) |
| **Entity** | یک مدل داده (مثل روز، تسک، مود) |
| **Shared** | ابزارها و کامپوننت‌های قابل استفاده مجدد |
| **Store** | مدیریت وضعیت مرکزی اپ (مثل Redux) |
| **Pub/Sub** | الگوی Publish/Subscribe — ماژول‌ها به هم خبر می‌دن |
| **Adapter** | تبدیل داده از یک فرمت به فرمت دیگه |
| **Provider** | سرویسی که یک قابلیت رو به کل اپ می‌رسونه |
| **Router** | مدیریت جابجایی بین صفحات |
| **Template** | قالب آماده (روز کاری، استراحت، مریضی) |
| **Pomodoro** | تکنیک مدیریت زمان: ۲۵ دقیقه کار، ۵ دقیقه استراحت |
| **Heatmap** | نقشه حرارتی — نمایش بصری داده‌ها با رنگ |
| **Correlation** | رابطه بین دو متغیر (مثلاً خواب و بهره‌وری) |
| **Sync** | همگام‌سازی داده‌ها بین دستگاه‌ها |
| **Deploy** | قرار دادن اپ روی سرور برای دسترسی عمومی |
| **API** | رابط برنامه‌نویسی — راه ارتباط بین بخش‌های مختلف |

---

## 🎯 چک‌لیست شروع پروژه

- [ ] پوشه `dailyflow/` ساخته شد
- [ ] درخت فایل‌ها طبق مستندات ایجاد شد
- [ ] `public/index.html` ساخته شد
- [ ] `app/main.js` ساخته شد
- [ ] `shared/store/store.js` ساخته شد
- [ ] `shared/events/eventBus.js` ساخته شد
- [ ] `shared/storage/localStorage.js` ساخته شد
- [ ] `shared/utils/date.js` ساخته شد
- [ ] `entities/day/dayModel.js` ساخته شد
- [ ] `features/moodTracker/` ساخته شد
- [ ] `widgets/headerWidget/` ساخته شد
- [ ] `pages/dashboard/` ساخته شد
- [ ] تم کیهانی اضافه شد
- [ ] انیمیشن‌ها اضافه شد
- [ ] نمودارها اضافه شد
- [ ] تست دستی انجام شد
- [ ] دیپلوی روی GitHub Pages

---

## 📞 ارتباط و پشتیبانی

اگر سوالی داشتی یا مشکلی پیش اومد:
1. اول این مستندات رو چک کن
2. بعد بخش "رفع مشکل" رو بخون
3. اگر حل نشد، از هوش مصنوعی کمک بگیر (این مستندات رو بهش بده)
4. اگر هنوز حل نشد، کد رو بفرست تا بررسی کنم

---

**نسخه مستندات:** 1.0  
**تاریخ آخرین بروزرسانی:** 2026-05-31  
**نویسنده:** DailyFlow Team  
**لایسنس:** Open Source (MIT)
