import {pipe} from "fp-ts/lib/pipeable";
import {chain as chainS, map as mapS, State} from "fp-ts/lib/State";

// Aim is to build chain of lazy computations on array without actually mentioning the array itself (implicit state)
type St = State<Array<number>, number>;

const pop: St = (array: number[]) => {
  const value: number = array.pop();
  return [value, [...array]];
};

const push = (x: number): St => (array: number[]) => {
  return [undefined, [...array, x]];
};

const computation = pipe(
  pop,
  chainS(x => {
    return x < 4
      ? pipe(
        push(4),
        chainS(_ => push(5)),
        chainS(_ => pop),
        mapS(y => x + y))
      : pipe(
        pop,
        mapS(y => x + y),
      )
  })
);

const stack1 = [1, 2, 3];
console.log(computation(stack1));

const stack2 = [1, 4, 5];
console.log(computation(stack2));