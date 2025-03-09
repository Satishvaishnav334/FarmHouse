type themeType = "light" | "dark";

type profileOptions = "profile" | "settings" | "feedback";

type FarmerDetails = {
  location: {
    state: string;
    district: string;
  };
  isFarmer: true;
  DOB: string;
  pinCode: string;
  address: string;
  phone: string;
  theme: themeType;
  landOwnership: string;
  farmingExperience: string;
  email: string;
  name: string;
  governmentSchemes: string[];
};

type ConsumerDetails = {
  isFarmer: false;
  email: string;
  name: string;
  theme: themeType;
};

interface BaseUser {
  _id: string;
  email: string;
  name: string;
  theme: themeType;
  createdAt: string;
  updatedAt: string;
  _v: number;
}

interface FarmerUser extends BaseUser {
  isFarmer: true;
  location: {
    state: string;
    district: string;
  };
  DOB: Date;
  pinCode: number;
  address: string;
  phone: string;
  landOwnership: number;
  farmingExperience: number;
  governmentSchemes: string[];
}

interface ConsumerUser extends BaseUser {
  isFarmer: false;
  phone?: string;
  address?: string;
  pinCode?: number
}

type User = FarmerUser | ConsumerUser;

export type { themeType, profileOptions, User, FarmerDetails, ConsumerDetails, FarmerUser, ConsumerUser };
