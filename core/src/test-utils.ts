import { spy } from "sinon";
import Sinon = require("sinon");
import {
  BasePart,
  InputPinMap,
  GroupedPart,
  CodePart,
  NativePart,
  PartInstance,
} from "./.";

import {
  DynamicOutput,
  dynamicOutput,
  InputMode,
  OutputPinMap,
  partInput,
  partOutput,
} from "./part";

import { connectionNode, externalConnectionNode } from "./connect";

import { DebuggerEventType, DebuggerEvent, Debugger } from "./execute/debugger";

export interface ConciseBasePart
  extends Omit<Omit<BasePart, "inputs">, "outputs"> {
  inputs: string[];
  outputs: string[];
}

export interface ConciseGroupedPart extends ConciseBasePart {
  connections: Array<[string, string]>;
  instances: PartInstance[];
}

export interface ConciseCodePart extends ConciseBasePart {
  fnCode: string;
}

export interface ConciseNativePart extends ConciseBasePart {
  fn: NativePart["fn"];
}

export const conciseBasePart = (concise: ConciseBasePart): BasePart => {
  return {
    ...concise,
    inputs: concise.inputs.reduce<InputPinMap>((prev, curr) => {
      const [clean, mode] = curr.split("|");
      if (
        mode &&
        !["required", "required-if-connected", "optional"].includes(mode)
      ) {
        throw new Error(`Bad mode ${mode} in concise part`);
      }
      return { ...prev, [clean]: partInput("any", mode as InputMode) };
    }, {}),
    outputs: concise.outputs.reduce<OutputPinMap>((prev, curr) => {
      const clean = curr.replace("?", "");
      return { ...prev, [clean]: partOutput("any", false, clean !== curr) };
    }, {}),
  };
};

export const concisePart = (concise: ConciseGroupedPart): GroupedPart => {
  const base = conciseBasePart(concise);

  return {
    ...base,
    connections: concise.connections.map(([from, to]) => {
      const [f1, f2] = from.split(".");
      const [t1, t2] = to.split(".");

      return {
        from: f2 ? connectionNode(f1, f2) : externalConnectionNode(f1),
        to: t2 ? connectionNode(t1, t2) : externalConnectionNode(t1),
      };
    }),
    instances: concise.instances,
    inputsPosition: {},
    outputsPosition: {},
  };
};

export const conciseCodePart = (concise: ConciseCodePart): CodePart => {
  const base = conciseBasePart(concise);
  return {
    ...base,
    fnCode: concise.fnCode,
  };
};

export const conciseNativePart = (concise: ConciseNativePart): NativePart => {
  const base = conciseBasePart(concise);
  return {
    ...base,
    fn: concise.fn,
  };
};

export const valuePart = (name: string, value: any) =>
  conciseNativePart({
    id: name,
    inputs: [],
    outputs: ["r"],
    fn: (_, outputs) => outputs.r.next(value),
  });

export const spiedOutput = (): [Sinon.SinonSpy, DynamicOutput] => {
  const s = spy();
  const d = dynamicOutput();
  d.subscribe(s);
  return [s, d];
};

export const callsFirstArgs = (s: Sinon.SinonSpy) => {
  return s.getCalls().map((c) => c.args[0]);
};

export const wrappedOnEvent = (
  type: DebuggerEventType,
  fn: Function
): Debugger["onEvent"] => {
  return (event: DebuggerEvent) => {
    if (event.type === type) {
      fn(event);
    }
  };
};
