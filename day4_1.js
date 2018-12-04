const input = require('fs').readFileSync('day4_input.txt', 'ascii');
const _ = require('lodash');

const BEGIN_SHIFT_REGEX = /Guard #(\d+) begins shift/;
const MINUTE_REGEX = /\d{4}-\d{2}-\d{2} \d{2}:(\d{2})/;

const STATES = {
  ASLEEP: 1,
  AWAKE: 2,
};

let currentGuard = null;
let currentGuardState = null;
const statistics = {};

const processed = input.trim()
    .split('\r')
    .map((log) => {
      const [date, info] = log.trim().substring(1).split('] ');

      return {
        date,
        info: info.trim(),
      };
    })
    .sort((logA, logB) => logA.date.localeCompare(logB.date))
    .map(({date, info}) => {
      const guardBeginnginShift = info.match(BEGIN_SHIFT_REGEX);

      if (guardBeginnginShift) {
        currentGuard = Number(guardBeginnginShift[1]);

        currentGuardState = STATES.AWAKE;
      } else if (info === 'falls asleep') {
        currentGuardState = STATES.ASLEEP;
      } else if (info === 'wakes up') {
        currentGuardState = STATES.AWAKE;
      }

      return {
        date,
        guard: currentGuard,
        state: currentGuardState,
      };
    })
    .map(({date, guard, state}, idx, arr) => {
      if (state === STATES.ASLEEP) {
        const minute = date.match(MINUTE_REGEX)[1];
        const next = arr[idx + 1];
        const nextMinute = next && next.date.match(MINUTE_REGEX)[1];
        let guardStat = statistics[guard];

        if (!guardStat) {
          guardStat = statistics[guard] = {};
        }

        for (let sleepRunner = minute; sleepRunner < nextMinute; ++sleepRunner) {
          guardStat[sleepRunner] = (guardStat[sleepRunner] || 0) + 1;

          guardStat.sleeping = (guardStat.sleeping || 0) + 1;
        }
      }
    });

const mostSleepingGuardInfo = _.chain(statistics)
    .mapValues((value, guard) => _.merge({}, value, {guard}))
    .values()
    .maxBy('sleeping')
    .value();
const mostSleepingGuardId = Number(mostSleepingGuardInfo.guard);

delete mostSleepingGuardInfo.sleeping;
delete mostSleepingGuardInfo.guard;

const mostSleepingHourInfo = _.chain(mostSleepingGuardInfo)
    .mapValues((value, minute) => ({value, minute}))
    .values()
    .maxBy('value')
    .value();

console.log(mostSleepingGuardId * Number(mostSleepingHourInfo.minute));
