export interface GetParams {
    pc_start?: number;
    pc_end?: number;
    gte_cap?: number;
    lte_cap?: number;
    search?: string;
};

export interface ResponseData {
    batteries: {
      _id: string;
      name: string;
      capacity: number;
      postalCode: number;
      __v: number;
      createdAt: string;
      updatedAt: string;
    }[];
    totalWattCapacity: number;
    averageWattCapacity: number;
};
