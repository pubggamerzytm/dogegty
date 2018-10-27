
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf("766455948:AAGVXOOS5bkL2pDlxZ6sbh03cyVuAClMyyA");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter,leave } = Stage

var cron = require('node-cron');
var mysql = require('mysql');
var WAValidator = require('wallet-address-validator');
var mysecret = 'C94C02f742e0F91fD5A8e2676F1d499c6d648df18Ba42fC78E31ac94a1909E0e'
var mykey = '46c505f7f82a5b9d80adfbdde80e09a3883635cfc82b7dda56ceb29935db460c'
var Coinpayments = require('coinpayments');
const client = new Coinpayments({
    key: mykey,
    secret: mysecret
});
var con = mysql.createConnection({
    host: "bgdiheuar-mysql.services.clever-cloud.com",
    user: "uko7zijkihlgnqne",
    password: "hEwKE4U99SH9TuKhJ9y",
    database:"bgdiheuar"
});
//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());





//start

bot.command('start',ctx => {
    var message = ctx.message;
    var id = ctx.from.id;
    var start = '/start';
    if (message.text == start) {
        var chatid = ctx.from.id;
        var firstname = ctx.from.first_name;
        var bal = 0;
        var tim = new Date();
        var address = 'none';
        var power = 25;
        var refa=411002680;
        var user = {id: chatid, balance: bal, firstname: firstname, time: tim, withdrawadd: address, power: power,ref:refa};
        con.query("insert into `account` SET ?", user, function (error, results) {
            ctx.reply('welcome' + ctx.from.first_name + '\n\n✨🔥 Easiest and most reliable dogecoin Mine Bot for Telegram!\n\n⚡️ Automatic payments!', Markup
                .keyboard([
                    ['👤ACCOUNT'], // Row1 with 2 buttons
                    ['✨POWER', '💵PAYMENTS', '👨‍👧‍👦REFFERALS'], // Row2 with 2 buttons
                    ['🌎LANGUAGE', '❓ABOUT US'] // Row3 with 3 buttons Row3 with 3 buttons
                ])

                .resize()
                .extra())
        })
    } else if (message.text.split(start)[1] == id) {
        ctx.reply('🚫You cannot refer yourself', Markup
            .keyboard([
                ['👤ACCOUNT'], // Row1 with 2 buttons
                ['✨POWER', '💵PAYMENTS', '👨‍👧‍👦REFFERALS'], // Row2 with 2 buttons
                ['🌎LANGUAGE', '❓ABOUT US'] // Row3 with 3 buttons Row3 with 3 buttons
            ])

            .resize()
            .extra())
    } else if (message.text.split(start)[1] !== id) {

        var chatd = ctx.from.id
        con.query("SELECT id FROM account WHERE id=" + chatd, function (err, result, fields) {
            console.log(result.length)
            if (result.length==0) {

                var chatidi = ctx.from.id;
                var firstnamee = ctx.from.first_name;
                var bala = 0;
                var time = new Date();
                var addresse = 'none';
                var powere =25;
                var refidi = message.text.split(start)[1]
                var useri = {
                    id: chatidi,
                    balance: bala,
                    firstname: firstnamee,
                    time: time,
                    withdrawadd: addresse,
                    power: powere,
                    ref: refidi
                };
                con.query("insert into `account` SET ?", useri)

                var chatd = ctx.from.id
                con.query("SELECT ref FROM account WHERE id=" + chatd, function (err, result, fields) {

                    if (result[0].ref !== refidi) {
                        var refbonus = 25;
                        var ref = 1;
                        var refid = message.text.split(start)[1];

                        var sql = "update `account` set `power` =`power`+" + refbonus + ", `friends`=`friends`+ '" + ref + "' where `id` = '" + refid + "'";

                        con.query(sql)

                        ctx.reply('welcome' + ctx.from.first_name + '\n\n✨🔥 Easiest and most reliable dogecoin Mine Bot for Telegram!\n\n⚡️ Automatic payments!', Markup
                            .keyboard([
                                ['👤ACCOUNT'], // Row1 with 2 buttons
                                ['✨POWER', '💵PAYMENTS', '👨‍👧‍👦REFFERALS'], // Row2 with 2 buttons
                                ['🌎LANGUAGE', '❓ABOUT US'] // Row3 with 3 buttons Row3 with 3 buttons
                            ])

                            .resize()
                            .extra())
                        con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                            ctx.telegram.sendMessage(result[0].id, 'you have a new refferal\nyou receive:+25 Mh/s HASHPOWER')


                        })
                    }
                })








                    }else if (result.length>0) {
                var rd=ctx.from.id
                con.query("SELECT ref FROM account WHERE id=" + rd, function (err, result, fields) {
                     if (result[0].ref == ctx.message.text.split(start)[1]) {
                        ctx.reply('🚫you have already used this link', Markup
                            .keyboard([
                                ['👤ACCOUNT'], // Row1 with 2 buttons
                                ['✨POWER', '💵PAYMENTS', '👨‍👧‍👦REFFERALS'], // Row2 with 2 buttons
                                ['🌎LANGUAGE', '❓ABOUT US'] // Row3 with 3 buttons Row3 with 3 buttons
                            ])

                            .resize()
                            .extra())
                    }
                })
            }
        })
    }
})







bot.hears('👨‍👧‍👦REFFERALS',ctx => {
    const id = ctx.from.id
    con.query("SELECT friends FROM account WHERE id=" + id, function (err, result, fields) {
        ctx.reply('invite friends and get 25 Mh/s HASHPOWER for each friend and 25% of their deposits\n your refferal link is:http://t.me/doge_testerbot?start=' + id + '\n\n invited refferals:' + result[0].friends+' 👥'+'\n\nearned from refferals: '+result[0].friends*25+'Mh/s ')

    })
})

////Balance


bot.hears('👤ACCOUNT',ctx => {
    var chatid = ctx.from.id;
    var bonus=0.025 ;
    con.query("SELECT balance,firstname,power FROM account WHERE id=" + chatid, function (err, result, fields) {

        ctx.reply('👤your account ' + ctx.from.first_name + '\n\n✨Power: ' + result[0].power + ' Mh/s'+'\n💰Balance: ' + result[0].balance.toFixed(8) + ' Ð'+'\n\nYour estimated daily reward based on your haspower is 💵 '+result[0].power*bonus.toFixed(8)+' Ð'+'\n\nYou can improve your daily reward by depositing or by getting more refferals✅')


    })
})









//power and deposit

bot.hears('✨POWER',ctx => {
    var ide = ctx.from.id
    con.query("SELECT depoaddress FROM account WHERE id=" + ide, function (err, result, fields) {
        if (result[0].depoaddress === null) {
            client.getCallbackAddress("doge", function (err, response) {
                console.log(err)
                var chid = ctx.from.id
                var adress = response.address
                var sql = "UPDATE account SET depoaddress='" + adress + "'WHERE id='" + chid + "'"
                con.query(sql)
                ctx.replyWithHTML('🔥✨BUY LIFETIME MINING POWER 🔥✨\n\nCurrent Mh/s price is:0.75 Ð and estimated daily reward is:💸 0.025 Ð per Mh/s.\n\n🏦  ' + ctx.from.first_name + ' you can purchase any amount of Mh/s by sending dogecoin to your personal deposit address: <code>' + adress+ '</code>'+'\n\nMinimum deposit amount: 30 Ð')


            })
        } else {
            var chatid = ctx.from.id
            con.query("SELECT depoaddress FROM account WHERE id=" + chatid, function (err, result, fields) {
                ctx.replyWithHTML('🔥✨BUY LIFETIME MINING POWER 🔥✨\n\nCurrent Mh/s price is:0.75 Ð and estimated daily reward is:💸 0.025 Ð per Mh/s.\n\n🏦  ' + ctx.from.first_name + ' you can purchase any amount of Mh/s by sending dogecoin to your personal deposit address: <code>' + result[0].depoaddress + '</code>'+'\n\nMinimum deposit amount: 30 Ð')


            })
        }
    })
})





//cron















cron.schedule('*/1 * * * * *', () => {


    var bonus=0.625/1000000 ;
    var bala =25;
    var sql = "update `account` set `balance` =`balance`+" + bonus + ", `trail`=`trail`+ '" + bonus + "' where `power` = '" + bala + "'";
    con.query(sql,function (err,result) {
        console.log(err)
    })


});

cron.schedule('*/1 * * * * *', () => {


    var bonus=0.025/1000000 ;//25mhs
    var bala =25;
    var sql = "update `account` set `balance` =`balance`+`power`*" + bonus + ", `trail`=`trail`+ '" + bonus + "' where `power` > '" + bala + "'";
    con.query(sql,function (err,result) {
        console.log(err)
    })


});

//end cron


























bot.startPolling()