export class Product {
    _id?: string;
    name: string;
    description: string;
    category: string;
    img: string;
    rating?: number;
    people_who_rate?: number;
    reviews?: Review[];

    constructor(
        name: string = "",
        description: string = "",
        category: string = "",
        img: string = "",
        rating?: number,
        people_who_rate?: number,
        reviews?: Review[],
    ) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.img = img;
        this.rating = rating;
        this.people_who_rate = people_who_rate;
        this.reviews = reviews;
    }
}


export class Review {
    id_user: string;
    name_user: string;
    img_user: string;
    comment: string;
    stars: number;
    createdAt?: String;

    constructor(
        id_user: string = "",
        name_user: string = "",
        img_user: string = "",
        comment: string = "",
        stars: number = 0
    ) {
        this.id_user = id_user;
        this.name_user = name_user;
        this.img_user = img_user;
        this.comment = comment;
        this.stars = stars
    }
}

