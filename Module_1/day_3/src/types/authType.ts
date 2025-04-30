export interface user{
    id: number,
    name: string,
    email :string,
    password : string
}

export interface course{
    id: number,
    nameCourse: string,
    description: string,
    teacher: string,
    startDate: Date,
    endDate: Date,
    reviews?: review[]
}

export interface review{
    id: number,
    student: string,
    rating: number,
    comment: string,
    createdAt: Date,
}


