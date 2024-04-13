// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../../../../rxjs
//   ../../../../zod
//   ../../../../debug

declare module '@flyde/core' {
    export * from "@flyde/core/common";
    import { Pos, OMap } from "@flyde/core/common";
    import { CustomNode, VisualNode, InputPinsConfig, Node, NodeDefinition, NodeOrMacroDefinition } from "@flyde/core/node";
    export * from "@flyde/core/connect";
    export * from "@flyde/core/execute";
    export * from "@flyde/core/simplified-execute";
    export * from "@flyde/core/node";
    export * from "@flyde/core/node/get-node-with-dependencies";
    export * from "@flyde/core/flow-schema";
    export interface InstanceViewData {
        id: string;
        nodeIdOrGroup: string | VisualNode;
        pos: Pos;
        visibleOptionalInputs?: string[];
        inputConfig: InputPinsConfig;
    }
    export type NodesCollection = OMap<Node>;
    export type NodesDefCollection = OMap<NodeDefinition>;
    export type CustomNodesCollection = OMap<CustomNode>;
    export interface NodeLibraryGroup {
        title: string;
        nodes: NodeOrMacroDefinition[];
    }
    export interface NodeLibraryData {
        groups: NodeLibraryGroup[];
    }
}

declare module '@flyde/core/common' {
    export * from "@flyde/core/common/test-data-creator";
    export * from "@flyde/core/common/utils";
    export * from "@flyde/core/common/debug-logger";
    export * from "@flyde/core/common/capped-array-debounce";
    export * from "@flyde/core/common/utils";
    export * from "@flyde/core/common/hasher";
    export * from "@flyde/core/common/value-builders";
    export * from "@flyde/core/common/data-shaper";
    export * from '@flyde/core/common/full-ins-id-path';
    export const DepGraph: any;
}

declare module '@flyde/core/node' {
    export * from "@flyde/core/node/node-instance";
    export * from "@flyde/core/node/node-pins";
    export * from "@flyde/core/node/pin-config";
    export * from "@flyde/core/node/nodeFromSimpleFunction";
    export * from "@flyde/core/node/node-instance-error";
    export * from "@flyde/core/node/node";
}

declare module '@flyde/core/connect' {
    import { CodeNode, VisualNode, NodeState } from "@flyde/core/node";
    import { Debugger } from "@flyde/core/execute";
    import { OMap } from "@flyde/core/common";
    import { THIS_INS_ID } from "@flyde/core/connect/helpers";
    import { NodesCollection } from "@flyde/core/";
    export * from "@flyde/core/connect/helpers";
    export type ConnectionData = {
        from: ConnectionNode;
        to: ConnectionNode;
        delayed?: boolean;
        hidden?: boolean;
    };
    export type ExternalConnectionNode = {
        insId: typeof THIS_INS_ID;
        pinId: string;
    };
    export type InternalConnectionNode = {
        insId: string;
        pinId: string;
    };
    export type ConnectionNode = ExternalConnectionNode | InternalConnectionNode;
    export type PinList = Array<{
        insId: string;
        pinId: string;
    }>;
    type PositionlessVisualNode = Omit<Omit<VisualNode, "inputsPosition">, "outputsPosition">;
    export const connect: (node: PositionlessVisualNode, resolvedDeps: NodesCollection, _debugger?: Debugger, ancestorsInsIds?: string, mainState?: OMap<NodeState>, onBubbleError?: (err: any) => void, extraContext?: Record<string, any>) => CodeNode;
}

declare module '@flyde/core/execute' {
    import { Subject } from "rxjs";
    export * from "@flyde/core/execute/debugger";
    import { Node, CodeNode, NodeInputs, NodeOutputs, NodeInstanceError, NodeState, NodesCollection } from "@flyde/core/node";
    import { OMap, OMapF } from "@flyde/core/common";
    import { Debugger } from "@flyde/core/execute/debugger";
    export type SubjectMap = OMapF<Subject<any>>;
    export type ExecutionState = Map<string, any>;
    export type CancelFn = () => void;
    export type InnerExecuteFn = (node: Node, args: NodeInputs, outputs: NodeOutputs, insId: string) => CancelFn;
    export type CodeExecutionData = {
            node: CodeNode;
            inputs: NodeInputs;
            outputs: NodeOutputs;
            resolvedDeps: NodesCollection;
            _debugger?: Debugger;
            /**
                * If the node is an instance of another node, this is the id of the instance.
                * If the node is the root node, this is "__root".
                * Used for debugger events and state namespacing
                */
            insId: string;
            /**
                * A full path of ancestor insIds, separated by dots.
                * Used for debugger events and state namespacing
                */
            ancestorsInsIds?: string;
            extraContext?: Record<string, any>;
            mainState: OMap<NodeState>;
            onError: (err: any) => void;
            onBubbleError: (err: any) => void;
            onCompleted?: (data: any) => void;
            onStarted?: () => void;
    };
    export const INNER_STATE_SUFFIX = "_inner";
    export const INPUTS_STATE_SUFFIX = "_inputs";
    export type ExecuteFn = (params: ExecuteParams) => CancelFn;
    export type ExecuteParams = {
            node: Node;
            resolvedDeps: NodesCollection;
            inputs: NodeInputs;
            outputs: NodeOutputs;
            _debugger?: Debugger;
            insId?: string;
            ancestorsInsIds?: string;
            mainState?: OMap<NodeState>;
            onBubbleError?: (err: NodeInstanceError) => void;
            extraContext?: Record<string, any>;
            onCompleted?: (data: any) => void;
            onStarted?: () => void;
    };
    export const ROOT_INS_ID = "__root";
    export const GLOBAL_STATE_NS = "____global";
    export const execute: ExecuteFn;
}

declare module '@flyde/core/simplified-execute' {
    import { Node, NodesCollection } from "@flyde/core/";
    import { ExecuteParams } from "@flyde/core/execute";
    export const simplifiedExecute: (nodeToRun: Node, resolvedDependencies: NodesCollection, inputs?: Record<string, any>, onOutput?: (key: string, data: any) => void, otherParams?: Partial<ExecuteParams>) => import("./execute").CancelFn;
}

declare module '@flyde/core/node/get-node-with-dependencies' {
    import { CustomNode } from "@flyde/core/node";
    import { CustomNodeCollection } from "@flyde/core/";
    export const getNodeWithDependencies: (node: CustomNode, resolvedDeps: CustomNodeCollection, existingIds?: string[]) => CustomNode[];
}

declare module '@flyde/core/flow-schema' {
    import { z } from "zod";
    import { VisualNode, NodeDefinition, Node, ResolvedVisualNode } from "@flyde/core/node";
    export type FlydeFlow = {
        imports?: Record<string, String[]>;
        node: VisualNode;
    };
    export interface ImportSource {
        path: string;
        export?: string;
    }
    export type ImportedNodeDefinition = NodeDefinition & {
        source: ImportSource;
    };
    export type ImportedNode = Node & {
        source: ImportSource;
    };
    export type ImportedNodeDef = NodeDefinition & {
        source: ImportSource;
    };
    export type ResolvedDependenciesDefinitions = Record<string, ImportedNodeDefinition>;
    export type ResolvedFlydeFlowDefinition = {
        main: ResolvedVisualNode;
        dependencies: ResolvedDependenciesDefinitions;
    };
    export type ResolvedDependencies = Record<string, ImportedNode>;
    export type ResolvedFlydeRuntimeFlow = {
        main: ResolvedVisualNode;
        dependencies: ResolvedDependencies;
    };
    export type ResolvedFlydeFlow = ResolvedFlydeFlowDefinition | ResolvedFlydeRuntimeFlow;
    export const flydeFlowSchema: z.ZodObject<{
        imports: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>>;
        node: any;
    }, "strict", z.ZodTypeAny, {
        imports?: Record<string, string | string[]>;
        node?: any;
    }, {
        imports?: Record<string, string | string[]>;
        node?: any;
    }>;
}

declare module '@flyde/core/common/test-data-creator' {
    export type TestDataCreator<T> = (partial?: Partial<T>) => T;
    export type ObjOrObjCreator<T> = T | (() => T);
    export const testDataCreator: <T extends object>(defaults: ObjOrObjCreator<T>) => TestDataCreator<T>;
}

declare module '@flyde/core/common/utils' {
    export type Pos = {
        x: number;
        y: number;
    };
    export interface OMap<T> {
        [k: string]: T | undefined;
    }
    export interface OMapF<T> {
        [k: string]: T;
    }
    export type Rect = Pos & {
        w: number;
        h: number;
    };
    export const intersectRect: (r1: Rect, r2: Rect) => boolean;
    export const calcCenter: ({ w, h, x, y }: Rect) => Pos;
    export const middlePos: (p1: Pos, p2: Pos) => Pos;
    export const mapOMap: <T>(map: OMap<T>, cb: (key: string, item: T) => T) => OMap<T>;
    export const filterOMap: <T>(map: OMap<T>, cb: (key: string, item: T) => boolean) => OMap<T>;
    export const keys: <V>(map: OMap<V>) => string[];
    export const values: <V>(map: OMap<V>) => V[];
    export const okeys: <V>(map: OMap<V>) => string[];
    export const entries: <V>(map: OMap<V>) => [string, V][];
    export const fromEntries: <V>(entries: [string, V][]) => OMap<V>;
    export const pickFirst: <K>(v: [K, any]) => K;
    export const pickSecond: <K>(v: [any, K]) => K;
    export type RandomFunction = {
        (max: number): number;
        (max: number, min: number): number;
    };
    export const randomInt: RandomFunction;
    export const randomPos: (to?: number, from?: number) => Pos;
    export const pickRandom: <K>(v: K[]) => K;
    export const repeat: <T>(count: number, run: (idx: number) => T) => T[];
    export const randomInts: (count: number, to?: number, from?: number) => number[];
    export const shuffle: (arr: any[]) => any[];
    export const containsAll: <T>(arr: T[], items: T[]) => boolean;
    export const isDefined: <T>(o: T) => o is NonNullable<T>;
    export const isPromise: <T>(o: any) => o is Promise<T>;
    export const callFnOrFnPromise: (maybeFnOrFnPromise: void | Function | Promise<void | Function>, errorMsg: string) => void;
    export const isOptionalType: (type: string) => boolean;
    export const ensure: <T>(v: T, msg?: string) => NonNullable<T>;
    export const removeDupes: (list: string[]) => string[];
    export const noop: () => void;
    export const delay: (ms: number) => Promise<unknown>;
    export const eventually: (callback: () => void, timeout?: number, retryDelay?: number, errorSet?: Set<string>) => Promise<void>;
    export function simplePluralize(count: number, noun: string): string;
}

declare module '@flyde/core/common/debug-logger' {
    import type { Debugger as _Debugger } from "debug";
    export type DebugLogger = _Debugger;
    export const debugLogger: (subNs: string) => DebugLogger;
}

declare module '@flyde/core/common/capped-array-debounce' {
    export const cappedArrayDebounce: <T>(cb: (items: T[]) => void, timeout: number, maxItems: number, maxTimeWaiting?: number) => {
        addItem: (item: T) => void;
        flush: () => void;
        pendingItems: () => number;
    };
}

declare module '@flyde/core/common/hasher' {
    import { FlydeFlow } from "@flyde/core/flow-schema";
    import { Node } from "@flyde/core/node";
    export const hashNode: (node: Node, ignorePos?: boolean) => string;
    export const hashFlow: (flow: FlydeFlow) => string;
}

declare module '@flyde/core/common/value-builders' {
    import { OMap } from "@flyde/core/common";
    export const compileStringTemplate: (template: string, inputs: OMap<any>) => string;
    export const compileObjectTemplate: (template: string, inputs: OMap<any>) => any;
}

declare module '@flyde/core/common/data-shaper' {
    export enum DataShapeType {
        STRING = 0,
        NUMBER = 1,
        BOOLEAN = 2,
        ARRAY = 3,
        OBJECT = 4,
        NULL = 5,
        UNSUPPORTED = 6
    }
    export type DataShaperOptions = {
        maxDepth: number;
        maxArrayCheckIdx: number;
    };
    export type DataShape = DataShapeType | DataShape[] | {
        [key: string]: DataShape;
    };
    export const dataShaper: (data: any, maxDepth?: number, maxArrayCheckIdx?: number) => DataShape;
}

declare module '@flyde/core/common/full-ins-id-path' {
    export function fullInsIdPath(insId: string, ancestorsInsIds?: string): string;
}

declare module '@flyde/core/node/node-instance' {
    import { CodeNode, InputPinsConfig, Node, NodeDefinition, NodeStyle, Pos, ResolvedVisualNode, VisualNode } from "@flyde/core/";
    export interface NodeInstanceConfig {
        inputConfig: InputPinsConfig;
        visibleInputs?: string[];
        visibleOutputs?: string[];
        displayName?: string;
        style?: NodeStyle;
        id: string;
        pos: Pos;
    }
    export interface RefNodeInstance extends NodeInstanceConfig {
        nodeId: string;
    }
    export interface InlineNodeInstance extends NodeInstanceConfig {
        node: VisualNode | CodeNode;
    }
    export interface ResolvedInlineNodeInstance extends NodeInstanceConfig {
        node: ResolvedVisualNode | CodeNode;
    }
    export interface MacroNodeInstance extends NodeInstanceConfig {
        macroId: string;
        macroData: any;
    }
    export interface ResolvedMacroNodeInstance extends NodeInstanceConfig {
        nodeId: string;
        macroId: string;
        macroData: any;
    }
    export type NodeInstance = RefNodeInstance | InlineNodeInstance | MacroNodeInstance;
    export type ResolvedNodeInstance = RefNodeInstance | ResolvedInlineNodeInstance | ResolvedMacroNodeInstance;
    export const nodeInstance: (id: string, nodeOrId: string, config?: InputPinsConfig, pos?: Pos) => NodeInstance;
    export const inlineNodeInstance: (insId: string, node: Node, config?: InputPinsConfig, pos?: Pos) => NodeInstance;
    export const macroNodeInstance: (id: string, macroId: string, macroData: any, config?: InputPinsConfig, pos?: Pos) => ResolvedMacroNodeInstance;
    export const isInlineNodeInstance: (ins: NodeInstance) => ins is InlineNodeInstance;
    export const isRefNodeInstance: (ins: NodeInstance) => ins is RefNodeInstance;
    export const isMacroNodeInstance: (ins: NodeInstance) => ins is MacroNodeInstance;
    export const isResolvedMacroNodeInstance: (ins: ResolvedNodeInstance | NodeInstance) => ins is ResolvedMacroNodeInstance;
    export const NodeInstance: (id: string, node: NodeDefinition, config?: InputPinsConfig, pos?: Pos) => NodeInstance;
    export const createInsId: (node: NodeDefinition) => string;
}

declare module '@flyde/core/node/node-pins' {
    import { Subject } from "rxjs";
    import { OMapF } from "@flyde/core/";
    import { QueueInputPinConfig, StickyInputPinConfig } from "@flyde/core/node/pin-config";
    export type PinType = "input" | "output";
    export type InputMode = "optional" | "required" | "required-if-connected";
    export interface BasePinData {
        description?: string;
    }
    export interface InputPin extends BasePinData {
        mode?: InputMode;
    }
    export type InputPinMap = Record<string, InputPin>;
    export type OutputPinMap = Record<string, OutputPin>;
    export interface OutputPin extends BasePinData {
        delayed?: boolean;
    }
    export const nodeInput: (mode?: InputMode) => InputPin;
    export const isInputPinOptional: (input: InputPin) => boolean;
    export const nodeInputs: (count: number, modes?: InputMode[]) => InputPin[];
    export const nodeOutput: (delayed?: boolean) => OutputPin;
    export const nodeOutputs: (count: number) => OutputPin[];
    export type DynamicNodeInput = {
        subject: Subject<any>;
        config: StickyInputPinConfig | QueueInputPinConfig;
    };
    export type NodeInput = DynamicNodeInput;
    export type NodeOutput = Subject<any>;
    export type NodeOutputs = OMapF<NodeOutput>;
    export type NodeInputs = OMapF<NodeInput>;
    export interface DynamicOutput extends Subject<any> {
    }
    export const dynamicOutput: () => DynamicOutput;
    export const dynamicNodeInput: import("..").TestDataCreator<DynamicNodeInput>;
    export const dynamicNodeInputs: (count?: number) => DynamicNodeInput[];
}

declare module '@flyde/core/node/pin-config' {
    import { OMap } from "@flyde/core/";
    export const INPUT_MODES: InputPinMode[];
    export type InputPinMode = "queue" | "sticky" | "static";
    export type QueueInputPinConfig = {
        mode: "queue";
    };
    export type StickyInputPinConfig = {
        mode: "sticky";
    };
    export type InputPinConfig = QueueInputPinConfig | StickyInputPinConfig;
    export type InputPinsConfig = OMap<InputPinConfig>;
    export const queueInputPinConfig: () => QueueInputPinConfig;
    export const stickyInputPinConfig: () => StickyInputPinConfig;
    export const isQueueInputPinConfig: (config: InputPinConfig | undefined) => config is QueueInputPinConfig;
    export const isStickyInputPinConfig: (config: InputPinConfig | undefined) => config is StickyInputPinConfig;
}

declare module '@flyde/core/node/nodeFromSimpleFunction' {
    import { BaseNode, CodeNode, NodeStyleSize, RunNodeFunction } from "@flyde/core/node";
    import { InputMode } from "@flyde/core/node/node-pins";
    export type SimpleFnData = Omit<BaseNode, "inputs" | "outputs" | "run"> & {
        id: string;
        description: string;
        namespace: string;
        inputs?: {
            name: string;
            description: string;
            mode?: InputMode;
            defaultValue?: any;
        }[];
        output?: {
            name: string;
            description: string;
        };
        run?: (...args: any[]) => any;
        symbol?: string;
        icon?: string;
        size?: NodeStyleSize;
        fullRunFn?: RunNodeFunction;
    };
    export function nodeFromSimpleFunction(data: SimpleFnData): CodeNode;
}

declare module '@flyde/core/node/node-instance-error' {
    export class NodeInstanceError extends Error {
        fullInsIdsPath: string;
        nodeId: string;
        constructor(error: unknown, fullInsIdsPath: string, nodeId: string);
    }
}

declare module '@flyde/core/node/node' {
    import { OMap, OMapF, Pos } from "@flyde/core/common";
    import { Subject } from "rxjs";
    import { CancelFn, InnerExecuteFn } from "@flyde/core/execute";
    import { ConnectionData } from "@flyde/core/connect";
    import { NodeInstance, ResolvedNodeInstance } from "@flyde/core/node/node-instance";
    import { InputPin, OutputPin } from "@flyde/core/node/node-pins";
    import { ImportedNode } from "@flyde/core/flow-schema";
    import { MacroNodeDefinition } from "@flyde/core/node/macro-node";
    export type NodesCollection = OMap<Node>;
    export type NodesDefCollection = OMap<NodeDefinition>;
    export type CustomNodeCollection = OMap<CustomNode>;
    export type NodeState = Map<string, any>;
    export type NodeAdvancedContext = {
            execute: InnerExecuteFn;
            insId: string;
            ancestorsInsIds?: string;
            state: NodeState;
            globalState: NodeState;
            onCleanup: (cb: Function) => void;
            onError: (e: any) => void;
            context: Record<string, any>;
    };
    export type RunNodeFunction = (args: OMapF<any>, o: OMapF<Subject<any>>, adv: NodeAdvancedContext) => void | CancelFn | Promise<void | CancelFn>;
    export type CustomNodeViewFn = (instance: NodeInstance, inputs: OMap<NodeInstance[]>, outputs: OMap<NodeInstance[]>, resolvedDeps: NodesDefCollection) => {
            label: string;
            hiddenInputs?: string[];
            hiddenOutputs?: string[];
    } | false;
    export type NodeStyleSize = "small" | "regular" | "large";
    export type NodeTypeIcon = string | [string, string];
    export interface NodeStyle {
            icon?: NodeTypeIcon;
            size?: NodeStyleSize;
            color?: string | [string, string];
            cssOverride?: Record<string, string>;
    }
    export interface NodeMetadata {
            /**
                * Node's unique id. {@link VisualNode.instances }  refer use this to refer to the correct node
                */
            id: string;
            /**
                * A human readable name for the node. Used in the visual editor.
                */
            displayName?: string;
            /**
                * Is displayed in the visual editor and used to search for nodes.
                */
            description?: string;
            /**
                * A list of keywords that can be used to search for the node. Useful for node that users might search using different words.
                */
            searchKeywords?: string[];
            /**
                * TBD
                */
            namespace?: string;
            /**
                * All instances of this node will inherit the default style if it is supplied.
                * See {@link NodeStyle} for the full options supported
                */
            defaultStyle?: NodeStyle;
    }
    /**
        * Extended by {@link VisualNode}, {@link CodeNode} and {@link InlineValueNode}
        */
    export interface BaseNode extends NodeMetadata {
            /**
                * A pin on a node that receives data. Each node can have zero or more input pins.
                *
                * Example for the inputs of a mathematical multiplier node:
                * ```ts
                * {
                *  multiplicand: { description: "The number to be multiplied" },
                *  multiplier: { description: "The number with which we multiply" },
                * }
                * ```
                */
            inputs: Record<string, InputPin>;
            /**
                * A pin on a node that sends data. Each node can have zero or more output pins.
                * For example, a "Split array" node might have one input pin for an array and two output pins for the first and second halves of the array:
                *
                * @example
                * ```ts
                * {
                *  'first half': { description: "The first half of the array" },
                *  'second half': { description: "The second half of the array" },
                * }
                * ```
                */
            outputs: Record<string, OutputPin>;
            /**
                * Instructs Flyde that the node is in "explicit completion" mode and describes which outputs trigger the node's completion. Receives a list of outputs that should trigger an explicit completion of the node when they emit a value. Any of the listed outputs will trigger a completion (i.e. completionOutput[0] `OR` completionOutput[1])
                * Leave empty for implicit completion. This should work best for 99% of the case.
                *
                * To declare that 2 different outputs must emit a value in order to trigger a completion, different outputs can be joined together with a `+` sign as following:
                * ``` ts
                * {
                * ...
                *  completionOutputs: ["data+headers", "error"] // this means either data AND headers, OR "error" will trigger an explicit completion.
                * ```
                *
                * See the [Nodes lifecycle](/docs/lifecycle) for more info
                */
            completionOutputs?: string[];
            /**
                * @deprecated - TBD
                */
            reactiveInputs?: string[];
    }
    export interface CodeNode extends BaseNode {
            /**
                * This function will run as soon as the node's inputs are satisfied.
                * It has access to the nodes inputs values, and output pins. See {@link RunNodeFunction} for more information.
                *
                */
            run: RunNodeFunction;
            /**
                * @deprecated use {@link CodeNode['run']} instead
                */
            fn?: RunNodeFunction;
    }
    export * from "@flyde/core/node/macro-node";
    /**
        * A visual node is what makes Flyde special. It represents a node created visually in the editor.
        * It consists of node instances and connections. Each node instance will either refer to an imported node (by id), or include the node "inline".
        * Each connection will represent a "wire" between 2 instances, or between an instance and a main input/output pin.
        * Connecting to a main input or output is the way that a visual nodes' internal implementation can communicate with its external API.
        */
    export interface VisualNode extends BaseNode {
            /** a map holding the position for each main input. Used in the editor only. */
            inputsPosition: OMap<Pos>;
            /** a map holding the position for each main output. Used in the editor only. */
            outputsPosition: OMap<Pos>;
            /** the visual nodes internal node instances, either referring to other nodes by id or by value (inline) */
            instances: NodeInstance[];
            /** each connection represents a "wire" between 2 different instances, or between an instance and a main input/output*/
            connections: ConnectionData[];
            /** TODO - either deprecate this or {@link BaseNode.customViewCode} */
            customView?: CustomNodeViewFn;
    }
    export interface ResolvedVisualNode extends VisualNode {
            instances: ResolvedNodeInstance[];
    }
    export type Node = CodeNode | CustomNode;
    export type ImportableSource = {
            module: string;
            node: ImportedNode;
            implicit?: boolean;
    };
    export type CustomNode = VisualNode;
    export type CodeNodeDefinition = Omit<CodeNode, "run">;
    export type NodeDefinition = CustomNode | CodeNodeDefinition;
    export type NodeOrMacroDefinition = NodeDefinition | MacroNodeDefinition<any>;
    export type NodeModuleMetaData = {
            imported?: boolean;
    };
    export type NodeDefinitionWithModuleMetaData = NodeDefinition & NodeModuleMetaData;
    export const isBaseNode: (p: any) => p is BaseNode;
    export const isCodeNode: (p: Node | NodeDefinition | any) => p is CodeNode;
    export const extractMetadata: <N extends NodeMetadata>(node: N) => NodeMetadata;
    export const isVisualNode: (p: Node | NodeDefinition) => p is VisualNode;
    export const visualNode: import("../common").TestDataCreator<VisualNode>;
    export const codeNode: import("../common").TestDataCreator<CodeNode>;
    export type SimplifiedNodeParams = {
            id: string;
            inputTypes: OMap<string>;
            outputTypes: OMap<string>;
            run: RunNodeFunction;
    };
    export const fromSimplified: ({ run, inputTypes, outputTypes, id, }: SimplifiedNodeParams) => CodeNode;
    export const getNode: (idOrIns: string | NodeInstance, resolvedNodes: NodesCollection) => Node;
    export const getNodeDef: (idOrIns: string | NodeInstance, resolvedNodes: NodesDefCollection) => NodeDefinition;
    export type codeFromFunctionParams = {
            id: string;
            fn: Function;
            inputNames: string[];
            outputName: string;
            defaultStyle?: NodeStyle;
    };
    export const codeFromFunction: ({ id, fn, inputNames, outputName, defaultStyle, }: codeFromFunctionParams) => CodeNode;
}

declare module '@flyde/core/connect/helpers' {
    import { ConnectionNode, ExternalConnectionNode, InternalConnectionNode, ConnectionData } from "@flyde/core/connect";
    import { NodeDefinition } from "@flyde/core/node";
    export const THIS_INS_ID = "__this";
    export const ERROR_PIN_ID = "__error";
    export const TRIGGER_PIN_ID = "__trigger";
    export const getNodeInputs: (node: NodeDefinition) => {
        __trigger: import("../node").InputPin;
    };
    export const getInputName: (pinId: string) => string;
    export const getOutputName: (pinId: string) => string;
    export const getNodeOutputs: (node: NodeDefinition) => {
        __error: import("../node").OutputPin;
    };
    export const isExternalConnectionNode: (node: ConnectionNode) => node is ExternalConnectionNode;
    export const isInternalConnectionNode: (node: ConnectionNode) => node is InternalConnectionNode;
    export const isExternalConnection: ({ from, to }: ConnectionData) => boolean;
    export const isInternalConnection: (conn: ConnectionData) => boolean;
    export const externalConnectionNode: (pinId: string) => ExternalConnectionNode;
    export const connectionNode: (insId: string, pinId: string) => ConnectionNode;
    export const connectionNodeEquals: (conn1: ConnectionNode, conn2: ConnectionNode) => boolean;
    export const connectionDataEquals: (cd1?: ConnectionData, cd2?: ConnectionData) => boolean;
    export function connectionData(from: string, to: string, delayed?: boolean): ConnectionData;
    export function connectionData(from: [string, string], to: [string, string], delayed?: boolean): ConnectionData;
    export function connectionData(from: [string, string], to: [string], delayed?: boolean): ConnectionData;
    export function connectionData(from: [string], to: [string, string], delayed?: boolean): ConnectionData;
    export const getConnectionId: (connectionData: ConnectionData) => string;
    export const connection: (from: ConnectionNode, to: ConnectionNode, delayed?: boolean) => ConnectionData;
}

declare module '@flyde/core/' {
    export * from "@flyde/core/common";
    import { Pos, OMap } from "@flyde/core/common";
    import { CustomNode, VisualNode, InputPinsConfig, Node, NodeDefinition, NodeOrMacroDefinition } from "@flyde/core/node";
    export * from "@flyde/core/connect";
    export * from "@flyde/core/execute";
    export * from "@flyde/core/simplified-execute";
    export * from "@flyde/core/node";
    export * from "@flyde/core/node/get-node-with-dependencies";
    export * from "@flyde/core/flow-schema";
    export interface InstanceViewData {
        id: string;
        nodeIdOrGroup: string | VisualNode;
        pos: Pos;
        visibleOptionalInputs?: string[];
        inputConfig: InputPinsConfig;
    }
    export type NodesCollection = OMap<Node>;
    export type NodesDefCollection = OMap<NodeDefinition>;
    export type CustomNodesCollection = OMap<CustomNode>;
    export interface NodeLibraryGroup {
        title: string;
        nodes: NodeOrMacroDefinition[];
    }
    export interface NodeLibraryData {
        groups: NodeLibraryGroup[];
    }
}

declare module '@flyde/core/execute/debugger' {
    import { DebuggerEvent } from "@flyde/core/execute/debugger/events";
    export * from "@flyde/core/execute/debugger/events";
    export * from "@flyde/core/execute/debugger/format-event";
    export type DebuggerInterceptCommand = {
        cmd: "intercept";
        valuePromise: Promise<any>;
    };
    export type DebuggerCommand = DebuggerInterceptCommand | void;
    export type Debugger = {
        onEvent?: <T extends DebuggerEvent>(event: Omit<T, "time" | "executionId">) => DebuggerCommand;
        debugDelay?: number;
        destroy?: () => void;
    };
}

declare module '@flyde/core/node/macro-node' {
    import { CodeNode, CodeNodeDefinition, NodeMetadata } from "@flyde/core/node/node";
    export type MacroEditorFieldDefinitionTypeString = {
            value: "string";
    };
    export type MacroEditorFieldDefinitionTypeNumber = {
            value: "number";
            min?: number;
            max?: number;
    };
    export type MacroEditorFieldDefinitionTypeBoolean = {
            value: "boolean";
    };
    export type MacroEditorFieldDefinitionTypeJson = {
            value: "json";
            label?: string;
    };
    export type MacroEditorFieldDefinitionTypeSelect = {
            value: "select";
            items: {
                    value: string | number;
                    label: string;
            }[];
    };
    export type MacroEditorFieldDefinitionType = MacroEditorFieldDefinitionTypeString | MacroEditorFieldDefinitionTypeNumber | MacroEditorFieldDefinitionTypeBoolean | MacroEditorFieldDefinitionTypeJson | MacroEditorFieldDefinitionTypeSelect;
    export interface MacroEditorFieldDefinition {
            label: string;
            description?: string;
            configKey: string;
            allowDynamic: boolean;
            type: MacroEditorFieldDefinitionType;
            defaultValue?: any;
    }
    export interface MacroEditorConfigCustomResolved {
            type: "custom";
            editorComponentBundlePath: string;
    }
    export interface MacroEditorConfigCustomDefinition {
            type: "custom";
            editorComponentBundleContent: string;
    }
    export interface MacroEditorConfigStructured {
            type: "structured";
            fields: MacroEditorFieldDefinition[];
    }
    export type MacroEditorConfigResolved = MacroEditorConfigCustomResolved | MacroEditorConfigStructured;
    export type MacroEditorConfigDefinition = MacroEditorConfigCustomDefinition | MacroEditorConfigStructured;
    export interface MacroNode<T> extends NodeMetadata {
            definitionBuilder: (data: T) => Omit<CodeNodeDefinition, "id">;
            runFnBuilder: (data: T) => CodeNode["run"];
            defaultData: T;
            /**
                * Assumes you are bundling the editor component using webpack library+window config.
                * The name of the window variable that holds the component should be __MacroNode__{id}
                * The path should be relative to the root of the project (package.json location)
                */
            editorConfig: MacroEditorConfigResolved;
    }
    export type MacroNodeDefinition<T> = Omit<MacroNode<T>, "definitionBuilder" | "runFnBuilder" | "editorComponentBundlePath" | "editorConfig"> & {
            /**
                * Resolver will use this to load the editor component bundle into the editor
                */
            editorConfig: MacroEditorConfigDefinition;
    };
    export interface MacroEditorCompProps<T> {
            value: T;
            onChange: (value: T) => void;
    }
    export interface MacroEditorComp<T> extends React.FC<MacroEditorCompProps<T>> {
    }
    export type ConfigurableInputStatic<T> = {
            mode: "static";
            value: T;
    };
    export type ConfigurableInputDynamic = {
            mode: "dynamic";
    };
    export type ConfigurableInput<T> = ConfigurableInputStatic<T> | ConfigurableInputDynamic;
    export const isMacroNode: (p: any) => p is MacroNode<any>;
    export const isMacroNodeDefinition: (p: any) => p is MacroNodeDefinition<any>;
}

declare module '@flyde/core/execute/debugger/events' {
    import { OMap } from "@flyde/core/";
    export enum DebuggerEventType {
        INPUT_CHANGE = "i",
        OUTPUT_CHANGE = "o",
        PROCESSING_CHANGE = "pc",
        ERROR = "err",
        INPUTS_STATE_CHANGE = "isc"
    }
    export const MAJOR_DEBUGGER_EVENT_TYPES: DebuggerEventType[];
    export const MINOR_DEBUGGER_EVENT_TYPES: DebuggerEventType[];
    export type BaseDebuggerEvent<T extends DebuggerEventType> = {
        type: T;
        insId: string;
        ancestorsInsIds?: string;
        nodeId: string;
        val: DebuggerEventTypeData[T];
        time: number;
        executionId: string;
    };
    export type PinDebuggerEvent<T extends DebuggerEventType> = {
        pinId: string;
    } & BaseDebuggerEvent<T>;
    export type DebuggerEventTypeData = {
        [DebuggerEventType.INPUTS_STATE_CHANGE]: OMap<number>;
        [DebuggerEventType.PROCESSING_CHANGE]: boolean;
        [DebuggerEventType.ERROR]: any;
        [DebuggerEventType.INPUT_CHANGE]: string;
        [DebuggerEventType.OUTPUT_CHANGE]: string;
    };
    export type MajorDebuggerEvent = PinDebuggerEvent<DebuggerEventType.OUTPUT_CHANGE> | PinDebuggerEvent<DebuggerEventType.INPUT_CHANGE> | BaseDebuggerEvent<DebuggerEventType.ERROR>;
    export type MinorDebuggerEvent = BaseDebuggerEvent<DebuggerEventType.INPUTS_STATE_CHANGE> | BaseDebuggerEvent<DebuggerEventType.PROCESSING_CHANGE>;
    export type DebuggerEvent = MajorDebuggerEvent | MinorDebuggerEvent;
}

declare module '@flyde/core/execute/debugger/format-event' {
    import { DebuggerEvent } from "@flyde/core/execute/debugger/events";
    export function formatEvent(event: DebuggerEvent): string;
}

