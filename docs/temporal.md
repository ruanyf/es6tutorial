# Temporal API

Temporal 是一个表示时间日期的全新 API，对目前的 Date API 的诸多问题进行修正。

它包含了许多与时间日期相关的工具和方法，都放在 Temporal 对象下面，实际上是一个对象形式的命名空间。

Temporal API 将时间分成四种。

- 当前时间：表示此时此刻的时间，位于 Temporal.Now 对象。
- 时点时间（instant），表示历史上某个唯一时间，其中 Temporal.Instant 对象表示时间戳，Temporal.ZonedDateTime 表示带有时区的日期时间。
- 本地时间（wall-clock times），包含以下几个对象，不涉及时区。
    - Temporal.PlainDateTime：完整的日期和时间。
    - Temporal.PlainDate：仅限于日期。
    - Temporal.PlainYearMonth：仅限于年月。
    - Temporal.PlainMonthDay：仅限于月和日。
    - Temporal.PlainTime：不包含日期的时间。
- 持续时间（durations），表示两个时间点之间的差异，位于 Temporal.Duration 对象。

下面逐一介绍这些对象。

## Temporal.Now

`Temporal.Now`对象表示当前系统的准确时间，也就是现在的时间。

- Temporal.Now.instant()- 获取当前系统准确时间
- Temporal.Now.timeZoneId()- 获取当前系统时区
- Temporal.Now.zonedDateTimeISO()- 获取系统时区和 ISO-8601 日历中的当前日期和挂钟时间
- Temporal.Now.plainDateISO()- 获取系统时区和 ISO-8601 日历中的当前日期
- Temporal.Now.plainTimeISO()- 获取系统时区和 ISO-8601 日历中的当前挂钟时间
- Temporal.Now.plainDateTimeISO()- 与上面相同，但返回 ISO-8601 日历中的日期时间

```javascript
// 返回 UTC 的当前时间
Temporal.Now.instant().toString()

// 系统时区的当前时间
Temporal.Now.plainDateTimeISO() // 2025-01-22T11:46:36.144

// 当前时间对应 America/New_York 时区的时间
Temporal.Now.plainDateTimeISO("America/New_York") // 2025-01-22T05:47:02.555

// 返回某个时区的当前日期时间
Temporal.Now.zonedDateTimeISO('Asia/Shanghai').toString()

// 返回 ISO 格式当前日期时间
Temporal.Now.plainDateTimeISO().toString()

// 返回 ISO 格式的当前时间，不含日期
Temporal.Now.plainTimeISO().toString()
```

下面的例子是获取指定时区的当前时间。

```javascript
const now = Temporal.Now.zonedDateTimeISO('America/New_York');
console.log(now.toString());
```

下面的例子是获取当前时间对应的农历年。

```javascript
const currentYear = Temporal.Now.plainDateISO().withCalendar("chinese").year;
```

## Temporal.Instant

`Temporal.Instant`表示某个固定的时点。

Temporal.Instant.from() 方法用来新建时点实例。

```javascript
const instant = Temporal.Instant.from('1969-07-20T20:17Z');
instant.toString(); // => '1969-07-20T20:17:00Z'
instant.epochMilliseconds; // => -14182980000

// 某个 Unix 时间戳对应的时点
const launch = Temporal.Instant.fromEpochMilliseconds(1851222399924);
const now = Temporal.Now.instant();
const duration = now.until(launch, { smallestUnit: "hour" });
```

时点实例有以下方法：

- toZonedDateTimeISO()：返回指定时区的时间。

```javascript
const instant = Temporal.Instant.from("2026-02-25T15:15:00Z");

instant.toString() 
// "2026-02-25T15:15:00Z"

instant.toZonedDateTimeISO("Europe/London").toString()
// "2026-02-25T15:15:00+00:00[Europe/London]"

instant.toZonedDateTimeISO("America/New_York").toString()
// "2026-02-25T10:15:00-05:00[America/New_York]"
```

## Temporal.ZonedDateTime

`Temporal.ZonedDateTime`表示某个时区的时间。它会在 ISO8601 的标准格式后面，添加时区后缀和历法后缀。

```javascript
2020-08-05T20:06:13+09:00[Asia/Tokyo][u-ca=japanese]
```

上面示例中，`2020-08-05T20:06:13+09:00`是 ISO8601 标准格式，`[Asia/Tokyo]`是时区后缀，`[u-ca=japanese]`是历法后缀，表示采用日本历法。

默认的历法是 ISO8601 规定的公历，可以省略不写。

下面是使用`Temporal.ZonedDateTime.from()`新建 ZonedDateTime 实例对象的例子。

```javascript
const zonedDateTime = Temporal.ZonedDateTime.from({
  timeZone: 'America/Los_Angeles',
  year: 1995,
  month: 12,
  day: 7,
  hour: 3,
  minute: 24,
  second: 30,
  millisecond: 0,
  microsecond: 3,
  nanosecond: 500
}); // => 1995-12-07T03:24:30.0000035-08:00[America/Los_Angeles]
```

Temporal.ZonedDateTime.from() 也可以解析时间字符串。

```javascript
const zdt = Temporal.ZonedDateTime.from(
  "2026-03-29T00:30:00+00:00[Europe/London]",
);

console.log(zdt.toString());
// "2026-03-29T00:30:00+00:00[Europe/London]"
```

下面是使用`Temporal.ZonedDateTime.compare()`比较两个 ZonedDateTime 实例对象的例子。

```javascript
const one = Temporal.ZonedDateTime.from('2020-11-01T01:45-07:00[America/Los_Angeles]');
const two = Temporal.ZonedDateTime.from('2020-11-01T01:15-08:00[America/Los_Angeles]');

Temporal.ZonedDateTime.compare(one, two);
// -1
```

上面示例中，`Temporal.ZonedDateTime.compare()`返回`-1`，表示第一个时间小于（即早于）第二个时间。如果返回`1`，表示第一个时间大于第二个时间；返回`0`，表示两个时间相等。

ZonedDateTime 实例对象有以下属性。

- hoursInDay：指定时区的某一天一共有多少个小时，主要用来处理夏令时。

```javascript
Temporal.ZonedDateTime.from('2020-01-01T12:00-08:00[America/Los_Angeles]').hoursInDay;
// 24
Temporal.ZonedDateTime.from('2020-03-08T12:00-07:00[America/Los_Angeles]').hoursInDay;
// 23
Temporal.ZonedDateTime.from('2020-11-01T12:00-08:00[America/Los_Angeles]').hoursInDay;
// 25
```

- daysInYear
- inLeapYear

ZonedDateTime 实例对象有以下方法。

- .withTimeZone()：保持同一精确时刻，换一种时区视角来表示。

```javascript
zdt = Temporal.ZonedDateTime.from('1995-12-07T03:24:30+09:00[Asia/Tokyo]');
zdt.toString(); // => '1995-12-07T03:24:30+09:00[Asia/Tokyo]'
zdt.withTimeZone('Africa/Accra').toString(); // => '1995-12-06T18:24:30+00:00[Africa/Accra]'
```

- add()：增加时间。

```javascript
zdt = Temporal.ZonedDateTime.from('2020-03-08T00:00-08:00[America/Los_Angeles]');

// 增加一天
laterDay = zdt.add({ days: 1 });
// 2020-03-09T00:00:00-07:00[America/Los_Angeles]
// 注意：由于进入夏令时（DST），UTC 偏移从 -08:00 变为 -07:00。
// 本地时间仍然是 00:00，但对应的 UTC 时间提前了 1 小时。

laterDay.since(zdt, { largestUnit: 'hour' }).hours;
// 23
// 当天只有23小时

laterHours = zdt.add({ hours: 24 });
// 2020-03-09T01:00:00-07:00[America/Los_Angeles]
laterHours.since(zdt, { largestUnit: 'hour' }).hours; // 24
```

- .until()：计算两个时间之间的差异。

## Temporal.PlainDate

`Temporal.PlainDate`表示与时区无关的日期。

```javascript
const date = Temporal.PlainDate.from({ year: 2006, month: 8, day: 24 }); // => 2006-08-24
date.year; // => 2006
date.inLeapYear; // => false
date.toString(); // => '2006-08-24'
```

下面的例子是计算某个日期以后的时间。

```javascript
const date = Temporal.PlainDate.from('2024-01-01');
const newDate = date.add({ days: 10 });
console.log(newDate.toString()); // Outputs '2024-01-11'
```

## Temporal.PlainTime

`Temporal.PlainTime`表示与时区无关的某个时点。

```javascript
const time = Temporal.PlainTime.from({
  hour: 19,
  minute: 39,
  second: 9,
  millisecond: 68,
  microsecond: 346,
  nanosecond: 205
}); // => 19:39:09.068346205
time.second; // => 9
time.toString(); // => '19:39:09.068346205'
```

## Temporal.PlainDateTime

`Temporal.PlainDateTime`表示时区无关的日期时间。

```javascript
const dateTime = Temporal.PlainDateTime.from({
  year: 1995,
  month: 12,
  day: 7,
  hour: 15
}); // => 1995-12-07T15:00:00
const dateTime1 = dateTime.with({
  minute: 17,
  second: 19
}); // => 1995-12-07T15:17:19
```

## Temporal.PlainYearMonth

`Temporal.PlainYearMonth`表示不含日期的年月。

```javascript
const yearMonth = Temporal.PlainYearMonth.from({ year: 2020, month: 10 }); // => 2020-10
yearMonth.daysInMonth; // => 31
yearMonth.daysInYear; // => 366
```

## Temporal.PlainMonthDay

`Temporal.PlainMonthDay`表示没有年份的月和日。

下面是计算生日的例子。

```javascript
const birthday = Temporal.PlainMonthDay.from("12-15");
// 或者写成
// const birthday = Temporal.PlainMonthDay.from({ month: 12, day: 15 })

const birthdayIn2030 = birthday.toPlainDate({ year: 2030 });

birthdayIn2030.toString() // 2030-12-15
birthdayIn2030.dayOfWeek // 7
```

下面是农历一月一日（大年初一）的例子。

```javascript
const chineseNewYear = Temporal.PlainMonthDay.from({
  monthCode: "M01",
  day: 1,
  calendar: "chinese",
});

const currentYear = Temporal.Now.plainDateISO().withCalendar("chinese").year;

// 获取下一个春节
let nextCNY = chineseNewYear.toPlainDate({ year: currentYear });
// 如果 nextCNY 早于当前时间，则向后移动一年
if (Temporal.PlainDate.compare(nextCNY, Temporal.Now.plainDateISO()) <= 0) {
  nextCNY = nextCNY.add({ years: 1 });
}

nextCNY.withCalendar("iso8601").toLocaleString() // 1/29/2025
```

## Temporal.Duration

`Temporal.Duration`表示时长。

```javascript
const duration = Temporal.Duration.from({
  hours: 130,
  minutes: 20
});

duration.total({ unit: 'second' }); // => 469200
```

## Temporal.TimeZone

`Temporal.TimeZone`表示某个时区。

```javascript
const timeZone = Temporal.TimeZone.from('Africa/Cairo');
timeZone.getInstantFor('2000-01-01T00:00'); // => 1999-12-31T22:00:00Z
timeZone.getPlainDateTimeFor('2000-01-01T00:00Z'); // => 2000-01-01T02:00:00
timeZone.getPreviousTransition(Temporal.Now.instant()); // => 2014-09-25T21:00:00Z
timeZone.getNextTransition(Temporal.Now.instant()); // => null
```

## Temporal.Calendar

`Temporal.Calendar`表示某个日历系统。

```javascript
const cal = Temporal.Calendar.from('iso8601');
const date = cal.dateFromFields({ year: 1999, month: 12, day: 31 }, {});
date.monthsInYear; // => 12
date.daysInYear; // => 365
```

## Temporal.Duration

Temporal.Duration 表示一个持续的时间对象。

```javascript
const durations = [
  Temporal.Duration.from({ hours: 1 }),
  Temporal.Duration.from({ hours: 2 }),
  Temporal.Duration.from({ hours: 1, minutes: 30 }),
  Temporal.Duration.from({ hours: 1, minutes: 45 }),
];

durations.sort(Temporal.Duration.compare);
console.log(durations.map((d) => d.toString()));
// [ 'PT1H', 'PT1H30M', 'PT1H45M', 'PT2H' ]
````

## 参考链接

- [Temporal documentation](https://tc39.es/proposal-temporal/docs/)
- [JS Dates Are About to Be Fixed](https://docs.timetime.in/blog/js-dates-finally-fixed/)
- [JavaScript Temporal is coming](https://developer.mozilla.org/en-US/blog/javascript-temporal-is-coming/)

