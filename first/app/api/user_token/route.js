
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
const axios = require('axios');


export async function GET(request, response) {

    try{
        const response = await axios.get('https://user-profile-lyart.vercel.app/api/refresh');
        const cookies = response.data.cookies;
        console.log('cookies', cookies)
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.goto('https://user-profile-lyart.vercel.app/refresh');
        // const cookies = await page.cookies();
        // console.log('cookies', cookies)
        
        // // Wait for the "#token" element to appear
        // await page.waitForSelector('#token');
        // console.log(await page.content());
        // const scrapedData = await page.evaluate(() => {
        //     const tokenElement = document.querySelector('#token');
        //     const userElement = document.querySelector('#user');
        //     console.log('tokenElement', tokenElement)
        //     console.log('userElement', userElement)
      
        //     return {
        //       token: tokenElement ? tokenElement.textContent : null,
        //       user: userElement ? userElement.textContent : null,
        //     };
        //   });

        // // Close the browser
        // await browser.close();


        // Return the token
        return NextResponse.json({ cookies }, { status: 200 });
    }catch (error) {
        console.log('error', error)
        return NextResponse.json({ message: 'Server Error'+error.message }, { status: 500 }); // Unauthorized origin
    }
}