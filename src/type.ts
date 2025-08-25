export interface PortInfo {
    lat: number;
    lng: number;
}

export interface EmployeeType {
    city: string;
    lat: number;
    lng: number;
    employeeCount: number;
}

export interface OutsourceEmployeeType {
    year: string;
    data: EmployeeType[];
}

/** 地点信息 */
export interface LocationInfo {
    /** 国家 */
    country: string;
    /** 纬度 */
    latitude: number;
    /** 经度 */
    longitude: number;
    /** 地点(可表示城市、港口等) */
    location: string;
}

/** 地球数据项 */
export interface EarthDataItem {
    /** 出发地 */
    from: LocationInfo;
    /** 目的地 */
    to: LocationInfo;
    /** 日期 */
    date: string;
    /** 数量值（根据业务常见的不同可表示不同概念，比如出货量、员工人数等） */
    quantity: number;
    /** 自定义标签 */
    tags?: Record<string, unknown>;
}
