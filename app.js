const fs = require('fs');

const tlddata =
  "aaa:aarp:abarth:abb:abbott:abbvie:abc:able:abogado:abudhabi:ac:academy:accenture" +
  ":accountant:accountants:aco:active:actor:ad:adac:ads:adult:ae:aeg:aero:aetna:af:" +
  "afamilycompany:afl:africa:ag:agakhan:agency:ai:aig:aigo:airbus:airforce:airtel:a" +
  "kdn:al:alfaromeo:alibaba:alipay:allfinanz:allstate:ally:alsace:alstom:am:america" +
  "nexpress:americanfamily:amex:amfam:amica:amsterdam:an:analytics:android:anquan:a" +
  "nz:ao:aol:apartments:app:apple:aq:aquarelle:ar:arab:aramco:archi:army:arpa:art:a" +
  "rte:as:asda:asia:associates:at:athleta:attorney:au:auction:audi:audible:audio:au" +
  "spost:author:auto:autos:avianca:aw:aws:ax:axa:az:azure:ba:baby:baidu:banamex:ban" +
  "anarepublic:band:bank:bar:barcelona:barclaycard:barclays:barefoot:bargains:baseb" +
  "all:basketball:bauhaus:bayern:bb:bbc:bbt:bbva:bcg:bcn:bd:be:beats:beauty:beer:be" +
  "ntley:berlin:best:bestbuy:bet:bf:bg:bh:bharti:bi:bible:bid:bike:bing:bingo:bio:b" +
  "iz:bj:bl:black:blackfriday:blanco:blockbuster:blog:bloomberg:blue:bm:bms:bmw:bn:" +
  "bnl:bnpparibas:bo:boats:boehringer:bofa:bom:bond:boo:book:booking:boots:bosch:bo" +
  "stik:boston:bot:boutique:box:bq:br:bradesco:bridgestone:broadway:broker:brother:" +
  "brussels:bs:bt:budapest:bugatti:build:builders:business:buy:buzz:bv:bw:by:bz:bzh" +
  ":ca:cab:cafe:cal:call:calvinklein:cam:camera:camp:cancerresearch:canon:capetown:" +
  "capital:capitalone:car:caravan:cards:care:career:careers:cars:cartier:casa:case:" +
  "caseih:cash:casino:cat:catering:catholic:cba:cbn:cbre:cbs:cc:cd:ceb:center:ceo:c" +
  "ern:cf:cfa:cfd:cg:ch:chanel:channel:chase:chat:cheap:chintai:chloe:christmas:chr" +
  "ome:chrysler:church:ci:cipriani:circle:cisco:citadel:citi:citic:city:cityeats:ck" +
  ":cl:claims:cleaning:click:clinic:clinique:clothing:cloud:club:clubmed:cm:cn:co:c" +
  "oach:codes:coffee:college:cologne:com:comcast:commbank:community:company:compare" +
  ":computer:comsec:condos:construction:consulting:contact:contractors:cooking:cook" +
  "ingchannel:cool:coop:corsica:country:coupon:coupons:courses:cr:credit:creditcard" +
  ":creditunion:cricket:crown:crs:cruise:cruises:csc:cu:cuisinella:cv:cw:cx:cy:cymr" +
  "u:cyou:cz:dabur:dad:dance:data:date:dating:datsun:day:dclk:dds:de:deal:dealer:de" +
  "als:degree:delivery:dell:deloitte:delta:democrat:dental:dentist:desi:design:dev:" +
  "dhl:diamonds:diet:digital:direct:directory:discount:discover:dish:diy:dj:dk:dm:d" +
  "np:do:docs:doctor:dodge:dog:doha:domains:doosan:dot:download:drive:dtv:dubai:duc" +
  "k:dunlop:duns:dupont:durban:dvag:dvr:dz:earth:eat:ec:eco:edeka:edu:education:ee:" +
  "eg:eh:email:emerck:energy:engineer:engineering:enterprises:epost:epson:equipment" +
  ":er:ericsson:erni:es:esq:estate:esurance:et:etisalat:eu:eurovision:eus:events:ev" +
  "erbank:exchange:expert:exposed:express:extraspace:fage:fail:fairwinds:faith:fami" +
  "ly:fan:fans:farm:farmers:fashion:fast:fedex:feedback:ferrari:ferrero:fi:fiat:fid" +
  "elity:fido:film:final:finance:financial:fire:firestone:firmdale:fish:fishing:fit" +
  ":fitness:fj:fk:flickr:flights:flir:florist:flowers:flsmidth:fly:fm:fo:foo:food:f" +
  "oodnetwork:football:ford:forex:forsale:forum:foundation:fox:fr:free:fresenius:fr" +
  "l:frogans:frontdoor:frontier:ftr:fujitsu:fujixerox:fun:fund:furniture:futbol:fyi" +
  ":ga:gal:gallery:gallo:gallup:game:games:gap:garden:gb:gbiz:gd:gdn:ge:gea:gent:ge" +
  "nting:george:gf:gg:ggee:gh:gi:gift:gifts:gives:giving:gl:glade:glass:gle:global:" +
  "globo:gm:gmail:gmbh:gmo:gmx:gn:godaddy:gold:goldpoint:golf:goo:goodhands:goodyea" +
  "r:goog:google";

const tld = new Set(tlddata.split(":"));

function urlInfo(url) {
  const split = url.split(".");
  const split1 = split[0].split("@");
  let p = split.length - 1;
  if (split1.length === 2) split[0] = split1[1];
  while (tld.has(split[p])) p--;
  return {
    domain: split[p],
    subdomain: split.slice(0, p).join("."),
    tld: split.slice(p + 1).join(".")
  };
}

// Read email addresses from file
fs.readFile('email_list.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Split the file content by line
  const emailAddresses = data.split('\n');

  // Process each email address
  emailAddresses.forEach((email) => {
    const info = urlInfo(email);
    console.log(`${email}  D=${info.domain}  S=${info.subdomain ? info.subdomain : "None"}  TLD:${info.tld}`);
  });

  const outputData = emailAddresses.map((email) => {
    const info = urlInfo(email);
    return `E=${email}  D=${info.domain}  S=${info.subdomain ? info.subdomain : "None"}  TLD:${info.tld}`;
  }).join('\n\n');
  
  // Save the output to a file
  fs.writeFile('output.txt', outputData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Output saved to output.txt');
  });

});


