declare module 'react-native-locationiq' {
    export default class LocationIQ {
        init(token: string): void;
        isInit(): boolean;
        search(...params: any[]): Promise<void>;
        reverse(...params: any[]): Promise<void>;
    }
}
