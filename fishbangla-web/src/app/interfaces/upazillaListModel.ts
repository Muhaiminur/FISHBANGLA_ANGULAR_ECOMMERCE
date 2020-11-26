export interface DivDistUpaList {
    division: Division[];
    district: District[];
    upazilla: Upazilla[];
}

export interface District {
    districtId:   number;
    districtName: string;
    divisionId:   number;
}

export interface Division {
    divisionName: string;
    divisionId:   number;
}

export interface Upazilla {
    districtId:   number;
    upazillaName: string;
    upazillaId:   number;
}
