import { NextResponse, NextRequest } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
  request: NextRequest,
  context: { params: { listingId: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const listingId = context.params.listingId;
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid listingId');
  }

  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds: { push: listingId } }
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: NextRequest,
  context: { params: { listingId: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const listingId = context.params.listingId;
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid listingId');
  }

  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: { 
      favoriteIds: { 
        set: currentUser.favoriteIds?.filter(id => id !== listingId) 
      }
    }
  });

  return NextResponse.json(updatedUser);
}

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";

// interface Params {
//     listingId: string;
// }

// export async function POST(
//     request: NextRequest,
//     context: { params: Params }
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { listingId } = context.params;

//     if (!listingId || typeof listingId !== 'string') {
//         throw new Error('Invalid listingId');
//     }

//     const favoriteIds = [...(currentUser.favoriteIds || [])];
//     favoriteIds.push(listingId);

//     const user = await prisma.user.update({
//         where: {
//             id: currentUser.id
//         },
//         data: {
//             favoriteIds
//         }
//     });
    
//     return NextResponse.json(user);
// }

// export async function DELETE(
//     request: NextRequest,
//     context: { params: Params }
// ) {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//         return NextResponse.error();
//     }

//     const { listingId } = context.params;

//     if (!listingId || typeof listingId !== 'string') {
//         throw new Error('Invalid listingId');
//     }

//     let favoriteIds = [...(currentUser.favoriteIds || [])];
//     favoriteIds = favoriteIds.filter((id) => id !== listingId);

//     const user = await prisma.user.update({
//         where: {
//             id: currentUser.id
//         },
//         data: {
//             favoriteIds
//         }
//     });

//     return NextResponse.json(user);
// }