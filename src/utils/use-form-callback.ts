// import { useState, useCallback, FormEventHandler, FormEvent, ChangeEvent } from 'react';

// export function useFormCallback<T extends {wasSubmit?: boolean}>(initialState: T, submitCallback: (e: T) => void) {

//     const [state, setState] = useState(initialState);

//     const onSubmit = useCallback<FormEventHandler>((e:FormEvent) => {
//         e.preventDefault();
//         if (submitCallback) {
//             const stateP = { ...state };
//             delete stateP.wasSubmit;
//             submitCallback(stateP);
//             setState({ ...state, wasSubmit: true });
//         }
//     }, [state, submitCallback]);

//     const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setState({ ...state, [name]: value });
//     }, [state]);

//     return { state, setState, onSubmit, onChange };
//}

import { useState, useCallback, FormEventHandler, FormEvent, ChangeEvent } from 'react';

export function  useFormCallback<T extends {wasSubmit?: boolean}>(initialState: T, submitCallback: (e: T) => void) {
    const [state, setState] = useState(initialState);

    const onSubmit = useCallback<FormEventHandler>((e: FormEvent) => {
        e.preventDefault();
        if (submitCallback) {
            const statePure = { ...state };
            delete statePure.wasSubmit;
            submitCallback(statePure);
            setState({ ...state, wasSubmit: true });
        }
    }, [state, submitCallback]);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
    }, [state]);

    return { state, setState, onSubmit, onChange };
}