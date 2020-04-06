import {pipe} from "fp-ts/lib/pipeable";
import {State, map as mapS, state} from "fp-ts/lib/State";
import {sequenceS} from "fp-ts/lib/Apply";

const random = (seed: number) => (1839567234 * seed + 972348567) % 8239451023;
const randomS: State<number, number> = (seed: number) => [random(seed), random(seed)];
const randomInRangeS = (min: number, max: number) =>
  pipe(
    randomS,
    mapS(x => min + Math.floor((x / 8239451023) * (max - min)))
  );
const randomInArrayS = <T>(arr: Array<T>) =>
  pipe(
    randomInRangeS(0, arr.length - 1),
    mapS(idx => arr[idx])
  );
const names = ['Name1', 'Name2', 'Name3', 'Name4', 'Name5'];
const surnames = ['SurName1', 'SurName2', 'SurName3', 'SurName4', 'SurName5'];

const struct = {
  name: randomInArrayS(names),
  surname: randomInArrayS(surnames),
};

const randomName = sequenceS(state)(struct);
const seed1 = 1;

const [result1, seed2] = randomName(seed1);
console.log('Seed:',seed2);
console.log(result1);

const [result2, seed3] = randomName(seed2);
console.log('Seed:',seed3);
console.log(result2);

const [result3, seed4] = randomName(seed3);
console.log('Seed:',seed4);
console.log(result3);

const [result4, seed5] = randomName(seed4);
console.log('Seed:',seed5);
console.log(result4);