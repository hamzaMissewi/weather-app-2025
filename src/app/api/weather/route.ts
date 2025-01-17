import {NextRequest, NextResponse} from "next/server";

export async function POST(req:NextRequest) {
    const { city } = await req.json();

    if (!city) {
        return NextResponse.json({ error: 'City is required' },{status:400});
    }

    try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            return NextResponse.json({ error: data.message },{status:400});
        }

        return NextResponse.json({data},{status:200});
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return NextResponse.json({ error: 'Internal Server Error' },{status:500});
    }
}