//bakcell.com software
import express from 'express';
import puppeteer from 'puppeteer';
import { generateAudio } from './openai.js';

const app = express();

async function startBrowser() {
    return await puppeteer.launch({ headless: false });
}


let browser;
let currentPage;
startBrowser().then(b => {
    browser = b;
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch(err => {
    console.error('Failed to launch browser:', err);
});

app.get('/openPage', async (req, res) => {
    if (!browser) {
        browser = await puppeteer.launch();
    }

    currentPage = await browser.newPage();
    await currentPage.goto('https://www.bakcell.com');
    await currentPage.setViewport({ width: 1980, height: 1024 });
    // await page.close();
    await generateAudio('I have opened bakcell.com for you!');
    res.send('I have opened bakcell.com for you!');
});
app.get('/changeLanguage', async (req, res) => {
    const englishOptionSelector = '.styles_languageList__k0tK6 > a'; // EN or AZ option in dropdown

    await currentPage.waitForSelector(englishOptionSelector);

    await currentPage.evaluate(englishOptionSelector => {
        document.querySelector(englishOptionSelector).click();
    },englishOptionSelector);

    res.send('Language changed to English');
})

// app.get('/openLoginPage', async (req,res) => {
//     const logInSelector = '.styles_singIn__iTU3j';

//     await currentPage.evaluate(logInSelector => {
//         document.querySelector(logInSelector).click();
//     },logInSelector)
    
//     res.send('Went to /login page');
// })

// app.get('/fillNumberInputForLogin' , async (req,res) => {
//     const inputSelector = '.LoginForm_input__STwg3';
// })
app.get('/switchTheme', async (req, res) => {
    const themeClassname = '.styles_container__aZ5wt > button';
    const { theme } = req.query;

    await currentPage.waitForSelector(themeClassname);

    const result = await currentPage.evaluate((themeClassname, theme) => {
        const btns = Array.from(document.querySelectorAll(themeClassname));
        if (theme === 'light') {
            btns[0].click();
            return 'I switched to the light mode!';
        } else {
            btns[1].click();
            return 'I switched to the dark mode!';
        }
    }, themeClassname, theme);

    res.send(result);
});
