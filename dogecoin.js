
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf("784787025:AAEONtnGrJPqHdjCcBmgtERfEP2kOk_iv-o");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter,leave } = Stage
var rest = require('restler');
var SoChain = require('sochain');
const dogecoinRegex = require('dogecoin-regex');
var chain = new SoChain('DOGE');
var cron = require('node-cron');
var _ = require('lodash');
var mysql = require('mysql');
var WAValidator = require('wallet-address-validator');
var mysecret = '69363761ca7D39f5C045771B788A1ac8b11a39535e8911dF28369CB7e390428b'
var mykey = 'b6ac2811357781eb9977032d0f611fb697ccb5b7be35669cd06e2651c4c10be5'
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
        ctx.reply('invite friends and get 25 Mh/s HASHPOWER for each friend and 25% of their deposits\n your refferal link is:http://t.me/PowerDogeMining_bot?start=' + id + '\n\n invited refferals:' + result[0].friends+' 👥'+'\n\nearned from refferals: '+result[0].friends*25+'Mh/s ')

    })
})

////Balance


bot.hears('👤ACCOUNT',ctx => {
    var chatid = ctx.from.id
    var bonus = 0.025;
    con.query("SELECT balance,firstname,power,depoaddress,id FROM account WHERE id=" + chatid, function (err, result, fields) {

        ctx.reply('👤your account ' + ctx.from.first_name + '\n\n✨Power: ' + result[0].power + ' Mh/s' + '\n💰Balance: ' + result[0].balance.toFixed(8) + ' Ð' + '\n\nYour estimated daily reward based on your haspower is 💵 ' + result[0].power * bonus.toFixed(8) + ' Ð' + '\n\nYou can improve your daily reward by depositing or by getting more refferals✅')
        if (result[0].depoaddress !== null) {
            //check deposits

            rest.get('https://chain.so/api/v2/address/DOGE/' + result[0].depoaddress).on('complete', function (result) {
                if (result.data.txs.length == 0) {
                    console.log('no transactions')
                } else if (result.data.txs.length > 0) {
                    var chatid = ctx.from.id;
                    con.query("SELECT balance,firstname,power,depoaddress,id,txid,ref FROM account WHERE id=" + chatid, function (err, response, fields) {
                        if (result.data.txs[0].txid == response[0].txid) {
                            console.log('already this transaction is confirmed')
                        } else if (result.data.txs[0].txid !== response[0].txid) {
                            var depo = result.data.balance * 0.75
                            var txid = result.data.txs[0].txid
                            var adress = result.data.address
                            var transactions = result.data.balance
                            var refid = response[0].ref
                            var ref = 1;
                            var refba=result.data.balance*0.25
                            var sql = "update `account` SET `txid` = '" + txid + "', power = `power`+" + depo + ", transactions = `transactions`+" + transactions + " where `depoaddress` = '" + adress + "'";
                            con.query(sql, function (err, res) {
                                console.log(err)
                                ctx.telegram.sendMessage(response[0].id, 'your deposit of ' + result.data.balance + 'has been received\nyou get ' + depo + ' hashpower')
                                ctx.telegram.sendMessage(response[0].ref, 'your refferal just deposited you get ' + transactions * 0.25+'doge')
                                ctx.telegram.sendMessage('@powerdoge_payments', 'new transaction of' + transactions + ' to ' + response[0].firstname +'@PowerDogeMining'+ '\n\nhttps://dogechain.info/tx/' + result.data.txs[0].txid)
                                //give ref his bonus
                                var sqli = "update `account` set `balance` =`balance`+" + refba + ", `idle`=`idle`+ '" + ref + "' where `id` = '" + refid + "'";
                                con.query(sqli)

                            })
                        }

                    })
                }
            })
        }
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
                ctx.replyWithHTML('🔥✨BUY LIFETIME MINING POWER 🔥✨\n\nCurrent Mh/s price is:0.75 Ð and estimated daily reward is:💸 0.025 Ð per Mh/s.\n\n🏦  ' + ctx.from.first_name + ' you can purchase any amount of Mh/s by sending dogecoin to your personal deposit address: \n\n<code>' + adress+ '</code>'+'\n\nMinimum deposit amount: 30 Ð')


            })
        } else {
            var chatid = ctx.from.id
            con.query("SELECT depoaddress FROM account WHERE id=" + chatid, function (err, result, fields) {
                ctx.replyWithHTML('🔥✨BUY LIFETIME MINING POWER 🔥✨\n\nCurrent Mh/s price is:0.75 Ð and estimated daily reward is:💸 0.025 Ð per Mh/s.\n\n🏦  ' + ctx.from.first_name + ' you can purchase any amount of Mh/s by sending dogecoin to your personal deposit address:\n\n <code>' + result[0].depoaddress + '</code>'+'\n\nMinimum deposit amount: 30 Ð')


            })
        }
    })
})

//payments
bot.hears('💵PAYMENTS',ctx => {
    var chatid = ctx.from.id
    con.query("SELECT withdrawadd FROM account WHERE id=" + chatid, function (err, result, fields) {
        ctx.replyWithHTML('💰 ' + ctx.from.first_name + ' your current payment wallet is:\n\n<b>' + result[0].withdrawadd + '</b>\n\nTo change your wallet simply send it to the bot(NO spaces or additional characters).Make sure to update your payment wallet because payouts are automated at a minimum withdrawal amount of 50 Ð')

        //payments automated
        cron.schedule('*/1 * * * * *', () => {
            var bala = 50;
            con.query("SELECT `balance`,`withdrawadd`,`currency` FROM account WHERE `balance`>=50" , function (error, result) {

                var arraywithdraw = JSON.parse(JSON.stringify(result).replace(/balance/g, "amount:50").replace(/withdrawadd/g, "address"))
                if (result.length > 0) {
                    client.createMassWithdrawal(arraywithdraw, function (err, response) {
                        console.log(response)
                        ctx.telegram.sendMessage('@powerdoge_payments','new withdrawals '+response)
                        var bala=0;
                        var b=50;
                        var sqli = "UPDATE account SET balance='" + bala + "'WHERE `balance` >='" + b + "'"
                        con.query(sqli)

                    })
                }
            })
        })







    })
            })






////about
bot.hears('❓ABOUT US',ctx => {
    con.query('SELECT `id` FROM `account`',function (error,result) {
        con.query('SELECT SUM(transactions)FROM account;', function (err, response) {
            const re = JSON.parse(JSON.stringify(response[0]).replace('SUM(transactions)', 'suma'))
            con.query('SELECT `started` FROM `account` WHERE `id`=411002680', function (err, respa) {
                ctx.reply('ABOUT US\n\n📈Days online: ' +respa[0].started +'\n👨🏻‍️Members: ' + result.length + '\n💰Total transacted: ' + re.suma +' doge'+ '\n\nLive payment channel: @powerdoge_payments')
            })
        })
    })





})


//language
bot.hears('🌎LANGUAGE',ctx => {
    ctx.reply('choose your language',Markup
        .keyboard([
            ['🇱🇷English']// Row1 with 2 buttons
           // Row3 with 3 buttons Row3 with 3 buttons
        ])

        .resize()
        .extra())
})




//
bot.hears('🇱🇷English',ctx => {
    ctx.reply('English chosen',Markup
        .keyboard([
            ['👤ACCOUNT'], // Row1 with 2 buttons
            ['✨POWER', '💵PAYMENTS', '👨‍👧‍👦REFFERALS'], // Row2 with 2 buttons
            ['🌎LANGUAGE', '❓ABOUT US'] // Row3 with 3 buttons Row3 with 3 buttons
        ])

        .resize()
        .extra())
})





//






//withdrawadd
bot.on('message',ctx=>{
    if (dogecoinRegex().test(ctx.message.text)==true){
        var chatid = ctx.from.id
        var adress=ctx.message.text
        var sql = "UPDATE account SET withdrawadd='" + adress + "'WHERE id='" + chatid + "'"
        con.query(sql)
ctx.reply('payment address updated')

    } else {
        ctx.reply('please provide me with a valid DOGE address')
    }



})













































//cron

cron.schedule('0 0 0 * * *', () => {
    con.query('update account set `started`=`started`+1 WHERE `id`=411002680')

})



//end of days online









cron.schedule('*/1 * * * * *', () => {


    var bonus=0.625/1000000 ;
    var bala =25;
    var sql = "update `account` set `balance` =`balance`+" + bonus + ", `trail`=`trail`+ '" + bonus + "' where `power` = '" + bala + "'";
    con.query(sql)
    })




cron.schedule('*/1 * * * * *', () => {


    var bonus=0.025/1000000 ;//25mhs
    var bala =25;
    var sql = "update `account` set `balance` =`balance`+`power`*" + bonus + ", `trail`=`trail`+ '" + bonus + "' where `power` > '" + bala + "'";
    con.query(sql)
    })


//end cron


























bot.startPolling()
