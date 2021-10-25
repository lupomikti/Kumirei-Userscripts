// ==UserScript==
// @name         Countdown Update
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Kumirei
// @include      https://community.wanikani.com/t/the-countdown-thread/25405*
// @require      https://greasyfork.org/scripts/432418-wait-for-selector/code/Wait%20For%20Selector.js?version=974318
// @grant        none
// ==/UserScript==

;(function () {
    'use strict'
    /* eslint no-multi-spaces: "off" */

    var countdowns = [
        //{title: "", date: "", user: "", message0: "", message1: "", modifier: "", extra: ""},
        //{title: "", date: "", user: "", message0: "", message1: "", modifier: "", extra: ""},
        //{title: "", date: "", user: "", message0: "", message1: "", modifier: "", extra: ""},
        //{title: "", date: "", user: "", message0: "", message1: "", modifier: "", extra: ""},
        //{title: "", date: "", user: "", message0: "", message1: "", modifier: "", extra: ""},
        //{title: "", date: "", user: "", message0: "", message1: "", modifier: "", extra: ""},
        //{title: "", date: "", user: "", message0: "", message1: "", modifier: "", extra: ""},
        {
            title: '2022 Winter Olympics',
            date: '4 feb 2022',
            user: 'Sansarret',
            message0: '@sansarret Are you excited!!',
            message1: '@Sansarret here we go!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Närcon Summer 2022',
            date: '28 jul 2022',
            user: 'bjnlien',
            message0: '@bjnlien Get your cosplay ready!',
            message1: '@bjnlien Happy fun times!',
            modifier: '',
            extra: '',
        },
        {
            title: 'The start of another 3 years of uni for Redglare',
            date: '15 aug 2021',
            user: 'Redglare',
            message0: '@Redglare omg are  you ready?',
            message1: '@Redglare eeeep!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Kramabrab starts their new job!',
            date: '12 jul 2021',
            user: 'Kramabrab',
            message0: "@Kramabrab don't get too nervous!",
            message1: '@Kramabrab omg',
            modifier: '',
            extra: '',
        },
        {
            title: 'Bluedolphia’s first rona jab, very scary',
            date: '28 jun 2021',
            user: 'Bluedolphia',
            message0: "@RedOliveBlue There's a big needle with your name on it!",
            message1: '@RedOliveBlue Happy vaccination day!',
            modifier: '',
            extra: '',
        },
        {
            title: 'World Environment Day',
            date: 'jun 5 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 happy environment!',
            modifier: '',
            extra: '',
        },
        {
            title: 'WaniKani Cake Day',
            date: 'may 11 2022',
            user: 'Redglare',
            message0: '',
            message1: 'Happy holidays!',
            modifier: '',
            extra: '',
        },
        {
            title: "Final deadline in RedOliveBlue's 3rd year of fine arts",
            date: 'may 28 2021',
            user: 'RedOliveBlue',
            message0: '@RedOliveBlue Final chance!!!',
            message1: '@RedOliveBlue Oh shit',
            modifier: '',
            extra: '',
        },
        {
            title: 'International Day of Families',
            date: 'may 15 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Happy family day!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Can Kumi into USA?',
            date: 'may 13 2021',
            user: 'Kumirei',
            message0: 'Just hours left; danger birbs ahead!',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Earth Day',
            date: 'apr 22 2022',
            user: 'Redglare',
            message0: '',
            message1: '@Redglare Turn off the lights, save the planet!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Cubicle Day',
            date: 'apr 28 2021',
            user: 'Pep95',
            message0: '@Pep95 Get your stickers ready!',
            message1: '@Pep95 Happy cubicle day!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Plantron Level 60',
            date: 'jan 1 6000',
            user: 'Joeni',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Last Day Of Eastertide',
            date: 'may 23 2021',
            user: 'Maulrus',
            message0: '',
            message1: "@Maulrus I don't know what this is, but happy today!",
            modifier: '',
            extra: '',
        },
        {
            title: 'Catherine670 Moves to India?!',
            date: 'jun 1 2021',
            user: 'Catherine670',
            message0: '@Catherine670 Have you packed your bags? Are you excited?! I am excited!!',
            message1: "@Catherine670 Safe trip! I hope you'll enjoy your new life in India",
            modifier: '',
            extra: '',
        },
        {
            title: 'World Health Day',
            date: 'apr 7 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 No junk food today!',
            modifier: '',
            extra: '',
        },
        {
            title: "Women's Right Day",
            date: 'mar 8 2022',
            user: 'Keril',
            message0: '',
            message1: "@Keril Happy women's right day!",
            modifier: '',
            extra: '',
        },
        {
            title: 'Macaron Lottery Day',
            date: 'mar 8 2022',
            user: 'Keril',
            message0: "@Keril omg it's time",
            message1: '@Keril Happy ~~macaron~~ birthday!!!',
            modifier: '',
            extra: '',
        },
        {
            title: "Catherine670's sister's birthday",
            date: 'mar 13 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Wish her happy birthdays from strangrs',
            modifier: '',
            extra: '',
        },
        {
            title: "Catherine670's sister's birthday alarm",
            date: 'mar 11 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Never forget',
            modifier: '',
            extra: '',
        },
        {
            title: "Catherine670's and Google's birthday!",
            date: 'sep 27 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Happy Birfday!!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Meet at least 5 WK members in-person',
            date: 'dec 31 2022',
            user: 'KyokaJiro',
            message0: '',
            message1: '@KyokaJiro Which are these 5 members?',
            modifier: '',
            extra: '',
        },
        {
            title: 'Kyoka’s Japan Trip',
            date: 'jun 22 2022',
            user: 'KyokaJiro',
            message0: '@KyokaJiro Excite!!!',
            message1: '@KyokaJiro Safe trip! Have fun!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Rick Matsuri',
            date: 'feb 20 2022',
            user: 'KyokaJiro',
            message0: '',
            message1: '@KyokaJiro Soooo... How do we celebrate?',
            modifier: '',
            extra: '',
        },
        {
            title: 'The Munch Transformation',
            date: 'jan 4 2022',
            user: 'KyokaJiro',
            message0: '@KyokaJiro Get your names ready!',
            message1: '@KyokaJiro Poof! You are all munches now',
            modifier: '',
            extra: '',
        },
        {
            title: "RedOliveBlue's dissertation deadline!!!",
            date: 'apr 7 2021',
            user: 'RedOliveBlue',
            message0: '@RedOliveBlue only a few hours to go! Do your best!',
            message1:
                "@RedOliveBlue I believe in you! Once you're done you should reward yourself with some expensive ice cream!",
            modifier: '',
            extra: '',
        },
        {
            title: 'National Cheese Doodle day',
            date: 'mar 5 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Cheese doodle day?!',
            modifier: '',
            extra: '',
        },
        {
            title: 'National Egg McMuffin day',
            date: 'mar 2 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Happy egg muffin day?',
            modifier: '',
            extra: '',
        },
        {
            title: 'World civil Defence day',
            date: 'mar 1 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Happy defence day!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Mikki goes abroad for a year!',
            date: 'mar 30 2023',
            user: 'mikki_desu',
            message0: "@mikki_desu omg it's finally time",
            message1: '@mikki_desu Safe trip! I hope you have the time of your life!',
            modifier: '',
            extra: '',
        },
        {
            title: 'World sleep day',
            date: 'mar 19 2021',
            user: 'Catherine670',
            message0: '@Catherine670 Go to bed early today, you have a big day tomorrow',
            message1: '@Catherine670 Make sure to get lots of sleep!',
            modifier: '',
            extra: '',
        },
        {
            title: 'World kidney day',
            date: 'mar 11 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Giving your kidney away?',
            modifier: '',
            extra: '',
        },
        {
            title: 'Pep starts his PhD!',
            date: 'mar 1 2021',
            user: 'UdonMagoo',
            message0: '',
            message1: '@UdonMagoo omg excite!!!',
            modifier: '',
            extra: '',
        },
        {
            title: 'National Clam Chowder Day',
            date: 'Feb 25 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Is it just me or is it getting clammy in here?',
            modifier: '',
            extra: '',
        },
        {
            title: 'National Chocolate Covered Peanuts Day',
            date: 'Feb 25 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Do chocolate covered peanuts really need their own day?',
            modifier: '',
            extra: '',
        },
        {
            title: 'National Chili Day',
            date: 'Feb 25 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 HOT!!!',
            modifier: '',
            extra: '',
        },
        {
            title: "Kumi's K-1 visa interview!!",
            date: 'Mar 16 2021',
            user: 'Kumi',
            message0: 'WHERE ARE MY DOCUMENTS?!',
            message1: 'omg',
            modifier: '',
            extra: '',
        },
        {
            title: 'Singles Awareness Day',
            date: 'Feb 15 2021',
            user: 'Catherine670',
            message0: '',
            message1: '@Catherine670 Happy Singling!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Discount Chocolate Day',
            date: 'Feb 15 2021',
            user: 'Zakarius',
            message0: '',
            message1: '@NoodleMagoo Happy chocolates!',
            modifier: '',
            extra: '',
        },
        {
            title: 'National Drink Wine Day',
            date: 'Feb 18 2021',
            user: 'Catherine670',
            message0: '@Catherine670 No wine today',
            message1: '@Catherine670 Have your wine and eat it too!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Twosday',
            date: 'Feb 22 2022',
            user: 'Povner',
            message0: '@Povner onesday is upon us!',
            message1: '@Povner Happy twosday!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Perseverance lands on Mars!',
            date: 'Feb 18 2021',
            user: 'Kumi',
            message0: "I hope it doesn't crash!",
            message1: 'Amazing!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Fourth Anniversary of Counting',
            date: 'jan 11 2022',
            user: 'Kumi',
            message0: 'How did this happen',
            message1: 'Long live the countdown thread!',
            modifier: '',
            extra: '',
        },
        {
            title: "New Year's Eve",
            date: 'dec 31 2021',
            user: 'Kumi',
            message0: "Omg we're gonna make it",
            message1: 'Just one more day',
            modifier: '',
            extra: '',
        },
        {
            title: "New Year's Day",
            date: 'jan 1 2022',
            user: 'Kumi',
            message0: '',
            message1: 'Happy new year!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Christmas Day',
            date: 'dec 25 2021',
            user: 'Kumi',
            message0: '',
            message1: 'Merry Christmas, Americans!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Christmas Eve',
            date: 'dec 24 2021',
            user: 'Kumi',
            message0: 'Will Santa fit down your chimney?',
            message1: 'Happy Christmas Eve!',
            modifier: '',
            extra: '',
        },
        {
            title: 'International Tea Day',
            date: 'may 21 2021',
            user: 'Kumi',
            message0: 'Everyone get your tea ready!',
            message1: "Today's beverage is tea and only tea!",
            modifier: '',
            extra: '',
        },
        {
            title: 'Romantic Halloween',
            date: 'feb 14 2021',
            user: 'Redglare',
            message0: 'The spook is coming!',
            message1: 'Happy halloween!',
            modifier: '',
            extra: '',
        },
        {
            title: 'JLPT',
            date: 'july 4 2021',
            user: 'Redglare',
            message0: '@Redglare good luck tomorrow!',
            message1: '@Redglare I believe in you!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Thanksgiving',
            date: 'nov 25 2021',
            user: 'Kumi',
            message0: 'This will be my first thanksgiving ![|40x40](upload://lJcQ9GJpUbDPRdruUZRV5kW3Xgg.png)',
            message1: 'fank u everyone',
            modifier: '',
            extra: '',
        },
        {
            title: 'Japan Pocky Day',
            date: 'nov 11 2021',
            user: 'Kumi',
            message0: 'Get your sticks ready',
            message1: 'Weeee, pocky day!',
            modifier: '',
            extra: '',
        },
        {
            title: 'World Vegan Day',
            date: 'nov 1 2021',
            user: 'Kumi',
            message0: 'Is that a vegetable I see?',
            message1: 'No meat today!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Scary Valentine',
            date: 'oct 31 2021',
            user: 'Kumi',
            message0: 'There is love in the air',
            message1: "Happy Valentine's day, everyone!",
            modifier: '',
            extra: '',
        },
        {
            title: "Kumi's and Gojarappe's and Sansarret's birthday!",
            date: 'aug 9 2021',
            user: 'Kumi',
            message0: '',
            message1: 'Happy birfday @Gojarappe @Sansarret!',
            modifier: '',
            extra: '',
        },
        {
            title: 'International Sushi Day',
            date: 'jun 18 2021',
            user: 'Kumi',
            message0: 'Do I smell fish?',
            message1: 'Sushi time!!!',
            modifier: '',
            extra: '',
        },
        {
            title: 'International Pancake Day',
            date: 'mar 4 2021',
            user: 'Kumi',
            message0: 'Get your pancake mixes ready!',
            message1: "It's pancake time!!!",
            modifier: '',
            extra: '',
        },
        {
            title: 'Third Anniversary of THE COUNTDOWN THREAD',
            date: 'jan 11 2021',
            user: 'Kumi',
            message0: "I don't understand how I have done this for three years already",
            message1: 'Long live the countdown thread!',
            modifier: '',
            extra: '',
        },
        {
            title: 'United States Presidential Inauguration',
            date: 'jan 20 2021',
            user: 'Kumi',
            message0: 'Just one more day',
            message1: "It's finally over!",
            modifier: '',
            extra: '',
        },
        {
            title: 'HootOwl Day',
            date: 'jan 18 2021',
            user: 'YoungAdam',
            message0: '@YoungAdam Tomorrow!!!',
            message1: '@YoungAdam HootHoot!',
            modifier: '',
            extra: '',
        },
        {
            title: 'Paralympics closing ceremony',
            date: 'sep 5 2021',
            user: 'JapanStar',
            message0: '@UInt2048 Are you excited?!',
            message1: '@UInt2048 Weeeee',
            modifier: '',
            extra: '',
        },
        {
            title: 'Inspectatoro goes to level 42!',
            date: 'dec 31 2020',
            user: 'Inspectatoro',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'National coming out day',
            date: 'oct 9 2020',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Thanksgiving',
            date: 'nov 26 2020',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Deadline for Tokyo Skytree climbers to reach level 60',
            date: 'may 22 2022',
            user: 'Joeni',
            message0: '@Joeni just one more day!',
            message1: "@Joeni Time's up! I hope all of you did you best!",
            modifier: '',
            extra: '',
        },
        {
            title: 'Beginner Book Club starts Shimeji Simulation',
            date: 'sep 26 2020',
            user: 'Radish8',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Deadline for the Olympians to reach level 60 2.0',
            date: '31 dec 2020',
            user: 'Konsei',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Pep95 Turns 25!',
            date: '30 Aug 2020',
            user: 'Pep95',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Christmas in July',
            date: '25 jul 2020',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Christmas in July',
            date: '25 jul 2021',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Tokyo 2020 Opening Ceremonies',
            date: '23 jul 2021',
            user: 'UInt2048',
            message0: '@UInt2048 Tomorrow!',
            message1: '@UInt2048 What will you be watching?',
            modifier: '',
            extra: '',
        },
        {
            title: 'End of the countdown thread',
            date: '20 dec 2025',
            user: 'Ditto20',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'YoungAdam passes their Red Cross Lifeguarding Certification!',
            date: '6 jul 2020',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "TheMusicalNinja's release from their four-year sentence",
            date: '29 jun 2023',
            user: 'TheMusicalNinja',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'US Memorial Day',
            date: '25 may 2020',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Father's Day",
            date: '21 jun 2020',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Snowpiercer Series Premiere',
            date: '17 may 2020',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Release of 「泣きたい私は猫をかぶる」',
            date: '18 jun 2020',
            user: '2OC3aOdKgwSGlxfz',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Aanhlle reaches level 46',
            date: '1 may 2020',
            user: 'Aanhlle',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "RoseWagsBlue's Return to 京都",
            date: '01 feb 2022',
            user: 'RoseWagsBlue',
            message0: "@RoseWagsBlue omg it's going to be so much fun!",
            message1: '@RoseWagsBlue Safe trip!!! Come back to us alive, please',
            modifier: '',
            extra: '',
        },
        {
            title: 'Avalia starts their exchange year in Osaka',
            date: '15 sep 2020',
            user: 'Avalia',
            message0: '',
            message1: '',
            modifier: '<s>',
            extra: '</s> Cancelled due to Covid-19',
        },
        {
            title: 'Midori_no_Sora’s Release',
            date: '30 mar 3020',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Ditto’s countdown to the 4th of June',
            date: '6 jun 2020',
            user: 'Ditto20',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Carloswaldo will be able to log into Yahoo Games again!',
            date: '31 dec 2020',
            user: 'Carloswaldo',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        { title: 'JLPT!', date: '6 dec 2020', user: 'Redglare', message0: '', message1: '', modifier: '', extra: '' },
        {
            title: 'Aanhlle reaches level 44',
            date: '5 apr 2020',
            user: 'Aanhlle',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Aanhlle reaches level 45',
            date: '20 apr 2020',
            user: 'Aanhlle',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'RoseWagsBlue goes on the 四国 pilgrimage!',
            date: '1 jun 2038',
            user: 'RoseWagsBlue',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Aanhlle reaches level 41!',
            date: '7 mar 2020',
            user: 'Aanhlle',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Cinco de Mayo',
            date: '5 may 2020',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Aanhlle reaches level 43!',
            date: '24 mar 2020',
            user: 'Aanhlle',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'ThePopestar reaches level 60!!!!',
            date: '15 mar 2020',
            user: 'ThePopestar',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Who turns 18?',
            date: '5 sep 2020',
            user: 'TheMusicalNinja',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Aanhlle reaches level 42!',
            date: '14 mar 2020',
            user: 'Aanhlle',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'First Episode of Kirameiger airs!',
            date: '8 mar 2020',
            user: 'onegreyelephant',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'JLPT Results Available',
            date: '24 jan 2018',
            user: 'Gsai',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Wantitled Moves To Japan!',
            date: '12 mar 2020',
            user: 'Wantitled',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Meljoy's Monthsary",
            date: '29 feb 2018',
            user: 'MidoriNoSuika',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Singapore JLPT Registration',
            date: '12 mar 2018',
            user: 'Arjoykanji',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Elise545's 16th Birthday!",
            date: '15 mar 2018',
            user: 'Elise',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Saruko's Aerial Silks Show",
            date: '17 mar 2018',
            user: 'Saruko',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Mortias Reunion!',
            date: '24 mar 2018',
            user: 'Glias',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'MBL Opening',
            date: '29 mar 2018',
            user: 'MidnightOverlord',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Plantron changes his avatar again',
            date: '31 may 2018',
            user: 'Plantron',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Shadykit's 30th Birthday!",
            date: '7 jun 2018',
            user: 'Shadykit',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Viking Conquest of Pennsylvania!!',
            date: '10 jun 2018',
            user: 'Borx',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Gojarappe's Wedding!!!",
            date: '12 jun 2018',
            user: 'Gojarappe',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'BlueberryPear is freeeeeeee',
            date: '14 jun 2018',
            user: 'BlueberryPear',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'The day Borx stops being Borx',
            date: '16 jun 2018',
            user: 'Borx',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        { title: '漢検', date: '17 jun 2018', user: 'Nath', message0: '', message1: '', modifier: '', extra: '' },
        {
            title: 'Jprspereira finds his true love (and his b-day!)',
            date: '26 Jun 2018',
            user: 'Jprspereira',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        { title: 'Summer JLPT', date: '1 jul 2018', user: 'Kumi', message0: '', message1: '', modifier: '', extra: '' },
        {
            title: 'Mortias Reunion!',
            date: '18 jul 2018',
            user: 'Glias',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "RysingDragon's Birthday!",
            date: '20 jul 2018',
            user: 'RysingDragon',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: '漢検 Results',
            date: '27 jul 2018',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Mortias Anniversary!!!!',
            date: '8 aug 2018',
            user: 'Glias',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Smartie344's New Semester",
            date: '15 aug 2018',
            user: 'Smartie344',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "TheBakaNekoNinja's Birthday!",
            date: '16 aug 2018',
            user: 'NekoBaka',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'First Ever Wanikani Wednesday',
            date: '22 aug 2018',
            user: 'Plantron',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'JLPT Online Results',
            date: '22 aug 2018 01:00',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "BlueberryPear's Birthday!",
            date: '8 sep 2018',
            user: 'BlueberryPear',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "BlueberryPear's First Anniversary!!",
            date: '9 sep 2018',
            user: 'BlueberryPear',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        { title: 'Halloween', date: '31 oct 2018', user: 'Kumi', message0: '', message1: '', modifier: '', extra: '' },
        {
            title: 'Start of NaNoWriMo',
            date: '1 nov 2018',
            user: 'Minorichie',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        { title: 'JLPT', date: '2 dec 2018', user: 'Konekush', message0: '', message1: '', modifier: '', extra: '' },
        {
            title: "Squirrel's Northward Adventure",
            date: '14 dec 2018',
            user: 'Kumo',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Christmas Eve',
            date: '24 dec 2018',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Ninkastmin's birthday!",
            date: '28 dec 2018',
            user: 'Ninkastmin',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "New Year's Eve",
            date: '31 dec 2018',
            user: 'Arjoykanji',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'JLPT December online results',
            date: '23 jan 2019',
            user: 'Kumirei',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        { title: 'Kanken', date: '3 feb 2019', user: 'Plantron', message0: '', message1: '', modifier: '', extra: '' },
        {
            title: "Valentine's Day <3",
            date: '14 feb 2019',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Konekush's b-day!",
            date: '25 feb 2019',
            user: 'Konekush',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'International pancake day',
            date: '5 mar 2019',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Radish8 goes skiing with an old friend!',
            date: '9 mar 2019',
            user: 'Radish8',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Intermediate Club starts reading Kino’s Journey',
            date: '9 mar 2019',
            user: 'Radish8',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Absolute beginners book club starts reading しろまくカフェ',
            date: '13 mar 2019',
            user: 'AmTeSo',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Brexit deadline',
            date: '29 mar 2019',
            user: 'Plantron',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'B5 Timer reaches 0',
            date: '1 apr 2019',
            user: 'Ditto20',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'The name of the next era is revealed',
            date: '1 apr 2019',
            user: 'Plantron',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Google+ is shut down',
            date: '2 apr 2019',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'One Punch Man 2 starts airing',
            date: '9 apr 2019',
            user: 'Plantron',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "The beginning of an era; Japan's new emperor ascends",
            date: '1 may 2019',
            user: 'Plantron',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Beginners’ Club starts reading Zenitendou',
            date: '4 may 2019',
            user: 'Radish8',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'World cake day',
            date: '7 may 2019',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "SleepyOne's Wedding!!!",
            date: '18 may 2019',
            user: 'SleepyOne',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "FIFA Women's World Cup",
            date: '7 jun 2019',
            user: 'Plantron',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'MORTIAS WEDDING!!!!!!!!!!!!#ERROR!!!!!#ERR',
            date: '10 jun 2019',
            user: 'Glias',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Alolvovan survived school',
            date: '11 jun 2019',
            user: 'Alolvovan',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'International sushi day',
            date: '18 jun 2019',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Games done quick',
            date: '23 jun 2019',
            user: 'Basketball',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'TheMusicalNinja finally says goodbye to her horrible school!!!',
            date: '28 jun 2019',
            user: 'TheMusicalNinja',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Chezmax's Wedding!!!",
            date: '29 jun 2019',
            user: 'Chezmax',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'WorldPride@NYC Pride March',
            date: '30 jun 2019',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        { title: 'JLPT!', date: '7 jul 2019', user: 'Kumi', message0: '', message1: '', modifier: '', extra: '' },
        {
            title: 'World chocolate day',
            date: '7 jul 2019',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Japanese release of 天気の子',
            date: '19 jul 2019',
            user: 'Aircookie',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "RysingDragon's Birthday!\t",
            date: '20 jul 2019',
            user: 'RysingDragon',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Mortias Second dating anniversary!!!!',
            date: '8 aug 2019',
            user: 'Glias',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'International cat day',
            date: '8 aug 2019',
            user: '2OC3aOdKgwSGlxfz',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Kumi's and Gojarappe's birthday",
            date: '9 aug 2019',
            user: 'Abertssquirrel',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Start of the Premier League season!',
            date: '9 aug 2019',
            user: 'Plantron',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Beginner Book Club starts reading One Week Friends',
            date: '10 aug 2019',
            user: 'Radish8',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'International Lefthanders Day',
            date: '13 aug 2019',
            user: 'Plantron',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "TheMusicalNinja's Birthday!",
            date: '16 aug 2019',
            user: 'NekoBaka',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "BlueberryPears's birthday!",
            date: '8 sep 2019',
            user: 'BlueberryPear',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "BlueberryPear's Second Anniversary!!",
            date: '9 sep 2019',
            user: 'BlueberryPear',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Rugby World Cup Starts',
            date: '20 sep 2019',
            user: 'AmTeSo',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "UntitledName's All Burned Date",
            date: '8 oct 2019',
            user: 'UntitledName',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        { title: 'Halloween', date: '31 oct 2019', user: 'Kumi', message0: '', message1: '', modifier: '', extra: '' },
        {
            title: 'World vegan day',
            date: '1 nov 2019',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Japan pocky day',
            date: '11 nov 2019',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Pep’s Master Thesis Presentation in Circuit Design!!!',
            date: '15 nov 2019',
            user: 'Pep95',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        { title: 'JLPT!', date: '1 dec 2019', user: 'Kumi', message0: '', message1: '', modifier: '', extra: '' },
        {
            title: "BlueberryPear's Fifth Civil Anniversary!!",
            date: '13 dec 2019',
            user: 'BlueberryPear',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Beginner's Book Club reads 霧のむこうのふしぎな町",
            date: '14 dec 2019',
            user: 'Radish8',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'International tea day',
            date: '15 dec 2019',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'YoungAdam Trips to Japan!',
            date: '21 dec 2019',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Christmas eve',
            date: '24 dec 2019',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Christmas day',
            date: '25 dec 2019',
            user: 'Marcusp',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Boxing day',
            date: '26 dec 2019',
            user: 'Plantron',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Ninkastmin's Birthday",
            date: '28 dec 2019',
            user: 'Ninkastmin',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "New Year's Eve",
            date: '31 dec 2019',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Kumi chooses Pragmata's new avatar!",
            date: '31 dec 2019',
            user: 'Pragmata',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Aanhlle gets their reviews down to 0 or Crabigatorized',
            date: '31 dec 2019',
            user: 'Aanhlle',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Second anniversary of The Countdown Thread',
            date: '11 jan 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Made in Abyss sequel movie is released!',
            date: '17 jan 2020',
            user: 'Algorev',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'HootOwl Day',
            date: '18 jan 2020',
            user: 'YoungAdam',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Aanhlle reaches level 36!',
            date: '24 jan 2020',
            user: 'Aanhlle',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Rose (and her wife) finally go to 京都!',
            date: '3 feb 2020',
            user: 'RoseWagsBlue',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Pragmata changes avatar again!',
            date: '12 feb 2020',
            user: 'Pragmata',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Valentine's day <3",
            date: '14 feb 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Blu-Ray release of Hibike! Euphonium Movie 3: Chikai no Finale!',
            date: '26 feb 2020',
            user: '2OC3aOdKgwSGlxfz',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'International Pancake Day',
            date: '25 feb 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Keril's macaron birthday!!!",
            date: '8 mar 2020',
            user: 'Keril',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Animal Crossing is released',
            date: '20 mar 2020',
            user: 'Erie-Canary',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Redglare is ready for Japan',
            date: '30 mar 2020',
            user: 'Redglare',
            message0: '',
            message1: '',
            modifier: '<s>',
            extra: '</s> Cancelled due to Covid-19',
        },
        {
            title: 'Release of Final Fantasy 7 remake',
            date: '10 apr 2020',
            user: 'Keril',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "SleepyOne's First Anniversary!!!",
            date: '18 may 2020',
            user: 'SleepyOne',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'MORTIAS First Wedding Anniversary!!!',
            date: '10 jun 2020',
            user: 'Glias',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Panicatthemisha goes to Osaka!',
            date: '10 jun 2020',
            user: 'Panicatthemisha',
            message0: '',
            message1: '',
            modifier: '<s>',
            extra: '</s> Cancelled due to Covid-19',
        },
        {
            title: "Gojarappe's Second anniversary!!!",
            date: '12 jun 2020',
            user: 'Gojarappe',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'International Sushi Day',
            date: '18 jun 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "Chezmax's First Anniversary!!!",
            date: '29 jun 2020',
            user: 'Chezmax',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'JLPT?',
            date: '5 jul 2020',
            user: 'Krysta84',
            message0: '',
            message1: '',
            modifier: '<s>',
            extra: '</s> Cancelled due to Covid-19',
        },
        {
            title: 'Keril goes to Japan!',
            date: '15 jul 2020',
            user: 'Keril',
            message0: '',
            message1: '',
            modifier: '<s>',
            extra: '</s> Cancelled due to Covid-19',
        },
        {
            title: "RysingDragon's Birthday!",
            date: '20 jul 2020',
            user: 'RysingDragon',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Tokyo 2020 Opening Ceremonies',
            date: '24 jul 2020',
            user: 'Hakusaro',
            message0: '',
            message1: '',
            modifier: '<s>',
            extra: '</s> Cancelled due to Covid-19',
        },
        {
            title: 'Mortias third dating anniversary!!!!',
            date: '8 aug 2020',
            user: 'Glias',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Haiena turns 18 years old!',
            date: '5 sep 2020',
            user: 'Haiena',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Deadline for the Olympians to reach level 60',
            date: '6 sep 2020',
            user: 'Pensei',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Deadline for the Luminaries',
            date: '26 may 2021',
            user: 'Pep95',
            message0: 'Just one more day @Pep95 and gang!',
            message1: "@Pep95 Time's up! How did it go?",
            modifier: '',
            extra: '',
        },
        {
            title: "Kumi's and Gojarappe's and Sansarret's birthday!",
            date: '9 aug 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "TheMusicalNinja's birthday!",
            date: '16 aug 2020',
            user: 'NekoBaka',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "BlueberryPear's Birthday",
            date: '8 sep 2020',
            user: 'BlueberryPear',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "BlueberryPear's third anniversary!!",
            date: '9 sep 2020',
            user: 'BlueberryPear',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        { title: 'Halloween', date: '31 oct 2020', user: 'Kumi', message0: '', message1: '', modifier: '', extra: '' },
        {
            title: 'World Vegan Day',
            date: '1 nov 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Japan Pocky Day',
            date: '11 nov 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "BlueberryPear's sixth civil anniversary!!",
            date: '13 dec 2020',
            user: 'BlueberryPear',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'International Tea Day',
            date: '15 dec 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Christmas Eve',
            date: '24 dec 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Christmas Day',
            date: '25 dec 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "New Year's Eve",
            date: '31 dec 2020',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "MidoriNoSuika's Release",
            date: '11 dec 3017',
            user: 'Kumi',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Tobias Moves To Japan',
            date: '1 sep 2021',
            user: 'TobyOne',
            message0: '@TobyOne Is this still happening?',
            message1: "TobyOne's move has been postponed",
            modifier: '<s>',
            extra: '</s> Postponed',
        },
        {
            title: 'Tobias Moves To Japan',
            date: '1 sep 2022',
            user: 'TobyOne',
            message0: '@TobyOne Is this still happening?',
            message1: '@TobyOne I wish you the best of luck!',
            modifier: '',
            extra: '',
        },
        {
            title: 'CyrusS reaches level 60',
            date: '1 jan 2038',
            user: 'Naphthalene',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'RoseWagsBlue opens her Buddha shop!',
            date: '6 may 2040',
            user: 'RoseWagsBlue',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: "The end of I-am-nothing's existence",
            date: '21 dec 2090',
            user: 'I-am-nothing',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
        {
            title: 'Glitter Coffee Meetup',
            date: '2 apr 2393',
            user: 'Cassykins',
            message0: '',
            message1: '',
            modifier: '',
            extra: '',
        },
    ]
    countdowns = countdowns.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date)
    })

    var todaysDate = getDateString(new Date())
    window.countdown = createPost

    function doStuff() {
        if (new Date().getHours() >= 0) {
            $('.btn.create').click()
            var date = new Date()
            var text = createPost(date)
            console.log(text)
            var i = setInterval(() => {
                if (!$('.d-editor-input').length) return
                clearInterval(i)
                $('.d-editor-input').val(text)
                $('.d-editor-input')[0].dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
                $('.submit-panel .btn.create').click()
                setTimeout(UpdateMainPost, 5000)
            }, 100)
        }
    }

    window.wfs.wait('#topic-footer-buttons', (e) => {
        if (!$('#ctud').length) {
            var btn = $(
                '<button id="ctud" type="button" class="btn"><span class="d-button-label">Update</span></button>',
            )
            btn[0].onclick = () => {
                doStuff()
            }
            $(e).append(btn)
        }
    })

    function createPost(date) {
        var dateString = getDateString(date)
        const messages = getMessages(date)
        var text =
            '<div align="center">\n' +
            '\n' +
            '<h6 id="heading--' +
            dateString +
            '"></h6>\n' +
            '\n' +
            '## Update ' +
            dateString +
            '\n' +
            (messages.today ? messages.today + '\n' : '') +
            (messages.tomorrow ? messages.tomorrow + '\n' : '') +
            '<table>\n' +
            '<thead>\n' +
            '<th>Date\n' +
            '<th>Event\n' +
            '<th>Days Left\n' +
            '</thead>\n'
        for (var i = 0; i < countdowns.length; i++) text += createRow(countdowns[i], date)
        text += '<tr><td>TBD\n' + '<td>Crabigator 2: Judgement Day\n' + '<td>42+\n' + '</table>'
        console.log(text)
        return text
    }

    function getMessages(date) {
        const today = getDateString(date)
        const tomorrow = getDateString(new Date(date.getTime() + 24 * 60 * 60 * 1000))
        let msgToday = []
        let msgTomorrow = []
        for (let a of countdowns) {
            const thisDate = getDateString(new Date(a.date))
            if (today == thisDate) msgToday.push(a.message1)
            if (tomorrow == thisDate) msgTomorrow.push(a.message0)
        }
        return { today: msgToday.join('\n'), tomorrow: msgTomorrow.join('\n') }
    }

    function createRow(item, now) {
        const date = new Date(item.date)
        var day = getDateString(new Date(date.getTime()))
        var daysLeft = String(Math.ceil((date - now.getTime()) / (1000 * 60 * 60 * 24)))
        if (daysLeft < 0) return ''
        var big = daysLeft < 2 ? ['<big><b>', '<b>'] : ['', '']
        var dates = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        var todates = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
        if (daysLeft == 0) day = 'TODAY'
        else if (daysLeft == 1) day = 'TOMORROW'
        else if (daysLeft == 7) day = '1 WEEK'
        else if (
            dates[0] == todates[0] + (todates[1] == 12 ? 1 : 0) &&
            dates[1] == (todates[1] % 12) + 1 &&
            dates[2] == todates[2]
        )
            day = '1 MONTH'
        if (getDateString(new Date(date.getTime())) == '14-02-2021')
            console.log('omega test', day, dates, [
                todates[0] + (todates[1] == 12 ? 1 : 0),
                (todates[1] % 12) + 1,
                todates[2],
            ])
        if (daysLeft > 2 && day != getDateString(new Date(date.getTime()))) big = ['<b>', '<b>']
        var text =
            '<tr><td>' +
            item.modifier +
            big[1] +
            day +
            '\n' +
            '<td>' +
            item.modifier +
            big[0] +
            item.title +
            item.extra +
            '\n' +
            '<td>' +
            item.modifier +
            big[0] +
            commas(daysLeft) +
            '\n'
        return text
    }

    function getDateString(date) {
        var day = date.getDate()
        if (day < 10) day = '0' + day
        var month = String(Number(date.getMonth()) + 1)
        if (month < 10) month = '0' + month
        var dateString = date.getFullYear() + '-' + month + '-' + day
        return dateString
    }

    function commas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    function newCounterRow(temp, name, URL) {
        return `

<th><div align="center">${temp.Name}</div>
<th><div align="center">${name}</div>
<tr>
<td><div align="center"><img src=" ${temp.URL}" width="330"></div>
<td><div align="center"><img src=" ${URL}" width="330"></div>
<tr>`
    }

    var UpdateMainPost = function () {
        var postID = window.location.href.split('25405/')[1]
        $('a.start-date').click()
        setTimeout(function () {
            $($('.edit')[0]).click()
            setTimeout(function () {
                var text = mainPost(countdowns, postID)
                $('.d-editor-input').val(text)
                $('.d-editor-input').blur()
                $('.d-editor-input').blur()
                $('.d-editor-input').blur()
                $('.submit-panel .btn.create').click()
                setTimeout(function () {
                    $('a.now-date').click()
                }, 2500)
            }, 2500)
        }, 5000)
    }
    window.update_main = UpdateMainPost

    function mainPost(countdowns, id) {
        var completed = ''
        var completedCount = 0
        var post = `<div align="center">

# The countdown thread

Thought this could be a fun thing. You’re welcome to suggest any countdown you want and I’ll add it to the list and update whenever I remember to. The most recent update can be found at the bottom of this post.

### Ongoing countdowns

<table>
<thead>
<th>#<th>Event<th>Date<th>Added by</thead>`
        for (var i = 0; i < countdowns.length; i++) {
            var unixDate = Date.parse(countdowns[i].date)
            if (Date.now() > unixDate) completedCount++
            else break
        }

        var temp = {}
        for (i = 1; i < countdowns.length + 1; i++) {
            var name = countdowns[i - 1].title
            unixDate = Date.parse(countdowns[i - 1].date)
            var date = getDateString(new Date(unixDate))
            var addedBy = countdowns[i - 1].user
            let mod = countdowns[i - 1].modifier
            let msg = countdowns[i - 1].extra
            var row = `<td>${mod + name + msg}
<td>${mod + date}
<td>${mod + addedBy}`
            if (Date.now() < unixDate) {
                post +=
                    `
<tr><td>${mod + (i - completedCount)}.` + row
            } else {
                completed =
                    `
<tr><td>${mod + (completedCount - i + 1)}.` +
                    row +
                    completed
            }
        }
        post += `<tr><td>${i - completedCount}.
<td>Crabigator 2: Judgement Day
<td>TBD
<td>Koichi
</table>

### Completed countdowns

<table>
<thead>
<th>#<th>Event<th>Date<th>Added by</thead>`
        post += completed
        post += `</table>

---

`
        post += `<big><a href="https://community.wanikani.com/t/the-countdown-thread/25405/${id}/#heading--${getDateString(
            new Date(),
        )}">The most recent update</a></big>

[quote="Kumirei, post:${id}, topic:25405, full:true"]

${createPost(new Date())}

[/quote]`

        console.log(post)
        return post
    }
})()