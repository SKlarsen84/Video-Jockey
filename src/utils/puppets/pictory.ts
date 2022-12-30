import puppeteer from 'puppeteer'



export const pictoryPuppet = async (req: {
  submissionId: string
  script: string
  title: string
  thumbnail: string
}) => {
  //open pictory.ai in puppeteer and log in
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--ignore-certificate-errors',
      '--no-first-run',
      '--no-service-autorun',
      '--password-store=basic',
      '--system-developer-mode',
      '--mute-audio',
      '--disable-default-apps',
      '--no-zygote',
      '--disable-accelerated-2d-canvas',
      '--disable-web-security'
    ]
  })
  //open a new page at 1920x1080
  const page = await browser.newPage()
  //maximize the window
  await page.setViewport({ width: 1300, height: 750 })

  //set timeouts to 0 to prevent puppeteer from timing out - the video generating process can take a while
  page.setDefaultNavigationTimeout(0)
  page.setDefaultTimeout(0)

  await page.goto('https://app.pictory.ai/login') //go to pictory.ai login page
  //wait for google login button to appear and click it
  //we find the button by its image src which is 'images/google_signup.png
  await page.waitForSelector('img[src="images/google_signup.png"]')
  await page.click('img[src="images/google_signup.png"]')
  //wait for google login page to appear and click the e    mail field
  await page.waitForSelector('input[type="email"]')
  console.log('waiting for email field to appear')
  await page.click('input[type="email"]')
  console.log('typing in email')
  //type in email and click next
  await page.keyboard.type(process.env.PICTORY_EMAIL as string)
  await page.click('div[id="identifierNext"]')
  console.log('clicked next')
  //wait for password field to appear and click it
  console.log('waiting for password field to appear')
  await page.waitForSelector('input[type="password"]', { visible: true })
  // await page.click('input[type="password"]')
  console.log('found password field')
  //type in password and click next
  console.log('typing in password')
  await page.type('input[type="password"]', process.env.PICTORY_PASSWORD as string)
  console.log('typed in password')
  //press enter
  await page.waitForSelector('div[id="passwordNext"]')
  await page.keyboard.press('Enter')
  console.log('pressed enter')
  // await page.click('div[id="passwordNext"]')
  //wait for the url to change to the pictory.ai dashboard
  await page.waitForNavigation()
  console.log('logged in')

  //wait for url to become https://app.pictory.ai/textinput
  await page.waitForNavigation()
  console.log('url changed to https://app.pictory.ai/textinput')

  //evaluate the following script to inject jquery on the site

  // await page.evaluate(() => {
  //   //create script element
  //   var script = document.createElement('script')
  //   //set script src to jquery
  //   script.src = 'https://code.jquery.com/jquery-3.2.1.min.js'
  //   //append script to the head
  //   document.head.appendChild(script)
  //   return true
  // })

  //click the first "submit" type button on the page to select script to vid
  //find first button that has a class starting with MuiButtonBase-root
  await page.waitForSelector('button[class^="MuiButtonBase-root"]', { visible: true })
  const button = await page.$$('button[class^="MuiButtonBase-root"]')
  console.log('found submit button')
  console.log(button)

  //use jquery to invoke click on the button
  await page.evaluate(button => {
    button?.click()
  }, button[0])

  //simulate click on the first button
  // await button[0].click({ button: 'left' })

  console.log('clicked submit button')

  //Wait for input field with placeholder "Enter your video name" to appear
  await page.waitForSelector('input[placeholder="Enter your video name"]', { visible: true })
  console.log('found input field')
  //type in submission name
  await page.type('input[placeholder="Enter your video name"]', req.title)

  // jump to script input by pressing tab
  await page.keyboard.press('Tab')
  console.log('pressed tab')
  //use puppeter to waitfor 5 secsc
  // await page.waitFor(5000)
  //type in script
  await page.keyboard.type(req.script)
  console.log('typed in script')

  await page.evaluate(() => {
    const butts = document.querySelectorAll('button[class^="MuiButtonBase-root"]') as NodeListOf<HTMLButtonElement>
    console.log('butts: ', butts)
    butts[3]?.click()
  })

  console.log('clicked next button')
  //wait for the jquery to return true for "choose template" text on site

  await page.waitForFunction('document.querySelector("body").innerText.includes("Choose template")')
  console.log('found choose template text')

  await page.evaluate(() => {
    const butts = document.querySelectorAll('button[class^="MuiButtonBase-root"]') as NodeListOf<HTMLButtonElement>
    console.log('butts: ', butts)
    butts[5]?.click()
  })
  console.log('clicked "my templates')

  const templateSelector = '#templatesGrid > div:nth-child(2) > div > div:nth-child(1) > div'

  //hover over the first template

  //wait for template selector to appear
  await page.waitForSelector(templateSelector, { visible: true })
  

  console.log('hovered over first template')
  
  await page.hover(templateSelector)
  //click the mouse on the selector
  await page.click(templateSelector)
  //press tab to select the template button
  await page.keyboard.press('Tab')
  console.log('pressed tab')
  //press enter to select the template
  await page.keyboard.press('Enter')

  console.log('pressed enter')
  //press enter again to select the ratio
  await page.keyboard.press('Enter')
  console.log('pressed enter again')

  //wait for the jquery to return true for "Estimated video duration" text on site
  await page.waitForFunction('document.querySelector("body").innerText.includes("Estimated video duration")')

  //******* CLICK GOT IT BUTTON */

  const gotItButtons = await page.$$('button[class^="MuiButtonBase-root"]')
  //use jquery to invoke click on the button
  await page.evaluate(button => {
    button?.click()
  }, gotItButtons[10])

  //*** HANDLE STORY BOARD SELECTORS */

  const storyBoardSelectors = (await page.$$(
    'div[class^="sep-sent-container full-width"]'
  )) as unknown as NodeListOf<HTMLDivElement>
  const introSelector = storyBoardSelectors[0]
  const outroSelector = storyBoardSelectors[storyBoardSelectors.length - 1]
  const sceneDurationContainer = '#scene-duration-container'

  //click intro card
  await page.evaluate(selector => {
    selector?.click()
  }, storyBoardSelectors[1])

  //click scene duration container
  await page.click(sceneDurationContainer)

  //Tab once to select the duration
  await page.keyboard.press('Tab')
  //type in duration of clip (5 seconds)
  await page.keyboard.type('5')
  //press space again to selec the "all scenes" toggle
  await page.keyboard.press('Space')

  //mouse over all storyboard selectors from 2 to length -2 and click the
  for (let i = 2; i < storyBoardSelectors.length - 2; i++) {
    //hover over the selector
    //get the selector from the html element as string
    const selector = await page.evaluate(selector => {
      return selector?.outerHTML
    }, storyBoardSelectors[i])
    console.log('selector: ', selector)
    await page.hover(selector as string)
    //click the mouse on the selector
    const dataToolTipSelector = '[data-tooltip="Link scene"]'
    await page.click(dataToolTipSelector)
  }

  // const visualsSelector = '#visuals'
  // const visualsUploadSelector = '#visual-uploads'

  // //wait for visuals to appear
  // await page.waitForSelector(visualsSelector, { visible: true })
  // console.log('found visuals')
  // //click visuals
  // await page.click(visualsSelector)

  // //wait for visuals upload to appear
  // await page.waitForSelector(visualsUploadSelector, { visible: true })
  // console.log('found visuals upload')
  // //click visuals upload
  // await page.click(visualsUploadSelector)
}
