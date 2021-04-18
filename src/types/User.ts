export interface UserData {
  description: string;
  created: string;
  isBanned: boolean;
  id: number;
  name: string;
  displayName: string;
}

export interface SearchUserData {
  previousPageCursor: string | null;
  nextPageCursor: string | null;
  data: SearchUser[];
}

export interface SearchUser {
  previousUsernames: string[];
  id: number;
  name: string;
  displayName: string;
}

export interface UserInventory {
  previousPageCursor: string;
  nextPageCursor: string;
  data: UserInventoryItem[];
}

export interface UserInventoryItem {
  userAssetId: number;
  serialNumber: number | null;
  assetId: number;
  name: string;
  recentAveragePrice: number;
  originalPrice: number | null;
  assetStock: null;
  buildersClubMembershipTypes: number;
}
