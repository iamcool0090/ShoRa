import { Listing, Reservation, User } from "@prisma/client";

export type safeListings = Omit<
Listing,
"createdAt"
> & {
    createdAt : string ;
}

export type safeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt : string;
    startDate : string;
    endDate   : string;
    listing   : safeListings;
}

export type SafeUser = Omit <
    User,
    "createAt"  | "updateAt"  | "emailVerified"
> & {
    createdAt     : string;
    updatedAt     : string;
    emailVerified : string | null;
};
