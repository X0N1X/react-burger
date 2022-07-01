declare type LocationState = {
    from: string;
    background: string;
}

declare module '*.css' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare type Action = {
    type: string;
    [name: string]: any;
}