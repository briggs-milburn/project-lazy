
const AOT_FLAGS_CACHE = new WeakMap<object, aot_flag[]>();
type aot_flag =
    | {
        type: "Then";
        data: { then_fun_name: string; prop_name: string };
    }
    | {
        type: "Wait";
        data: {
            condition_promise_fun_name: string;
            skip_if_false: boolean;
            prop_name: string;
        };
    };
export class AOT_Placeholder {
    static GetAOTFlags(target: object) {
        const aot_flags: aot_flag[] = [];
        let proto = target;
        do {
            const _flags = AOT_FLAGS_CACHE.get(proto);
            if (_flags) {
                aot_flags.push(..._flags)
            }
            proto = Object.getPrototypeOf(proto);
            if (!proto) {
                break
            }
        } while (true)
        return aot_flags
    }
    static GetAndSetAOTFlags(target: object) {
        let aot_flags = AOT_FLAGS_CACHE.get(target);
        if (!aot_flags) {
            aot_flags = [];
            AOT_FLAGS_CACHE.set(target, aot_flags);
        }
        return aot_flags;
    }
    static Then(then_fun_name: string) {
        return (target: object, name: string, des: PropertyDescriptor) => {
            this.GetAndSetAOTFlags(target).push({
                type: "Then",
                data: { then_fun_name, prop_name: name },
            });
            return des;
        };
    }
    static Wait(condition_promise_fun_name: string, skip_if_false = false) {
        return (target: object, name: string, des: PropertyDescriptor) => {
            this.GetAndSetAOTFlags(target).push({
                type: "Wait",
                data: { condition_promise_fun_name, skip_if_false, prop_name: name },
            });
            return des;
        };
    }
}