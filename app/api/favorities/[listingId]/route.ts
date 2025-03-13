import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"

type Props = {
    params: {
        listingId?: string;
    };
};

export async function POST(
    request: NextRequest,
    props: Props
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { listingId } = props.params;

    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid listingId');
    }

    const favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    })
    
    return NextResponse.json(user);
}


export async function DELETE(
    request: NextRequest,
    props: Props
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { listingId } = props.params;

    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid listingId');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    });

    return NextResponse.json(user);
}