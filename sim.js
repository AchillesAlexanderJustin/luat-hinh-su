/* Luật Hình sự — engine mô phỏng dùng chung (auto cho mọi widget) */
(function(){
  ['.lhs-back','.lhs-simall','#lhsModal','.lhs-sim','.lhs-sim2'].forEach(function(sel){
    document.querySelectorAll(sel).forEach(function(e){ e.remove(); });
  });
  document.querySelectorAll('[data-lhs-sim]').forEach(function(e){ e.removeAttribute('data-lhs-sim'); });

  var css = ''
  + '.lhs-back{position:fixed;top:14px;left:14px;z-index:9999;text-decoration:none;font-family:"Segoe UI",system-ui,sans-serif;font-size:13px;font-weight:700;color:#fff;background:rgba(18,22,38,.88);border:1px solid rgba(255,255,255,.22);padding:8px 14px;border-radius:30px;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);box-shadow:0 6px 18px rgba(0,0,0,.45);transition:.2s}'
  + '.lhs-back:hover{background:#5aa9ff;color:#06121f;transform:translateX(-2px)}'
  + '.lhs-simall{position:fixed;right:16px;bottom:16px;z-index:9999;cursor:pointer;font-family:"Segoe UI",system-ui,sans-serif;font-size:13px;font-weight:700;color:#1a1400;background:linear-gradient(90deg,#ffd54a,#ffae5c);border:none;padding:11px 16px;border-radius:30px;box-shadow:0 8px 22px rgba(0,0,0,.45);transition:.2s}'
  + '.lhs-simall:hover{transform:translateY(-2px) scale(1.03)}'
  + '.lhs-sim2{display:inline-flex;align-items:center;gap:4px;margin:0 8px 0 0;cursor:pointer;vertical-align:middle;font-size:10.5px;font-weight:700;color:#ffd54a;background:rgba(255,213,74,.12);border:1px solid rgba(255,213,74,.5);border-radius:20px;padding:2px 9px;transition:.2s;font-family:"Segoe UI",system-ui,sans-serif;line-height:1.5;white-space:nowrap}'
  + '.lhs-sim2:hover{background:#ffd54a;color:#1a1400}'
  + '.lhs-modal{position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;background:rgba(6,8,16,.72);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);padding:18px;font-family:"Segoe UI",system-ui,sans-serif}'
  + '.lhs-modal.show{display:flex;animation:lhsFadeIn .25s}'
  + '@keyframes lhsFadeIn{from{opacity:0}to{opacity:1}}'
  + '.lhs-card{position:relative;width:min(560px,96vw);background:linear-gradient(180deg,#161b2e,#10131f);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:22px 22px 18px;box-shadow:0 30px 80px rgba(0,0,0,.6);animation:lhsCardIn .3s cubic-bezier(.2,.8,.2,1)}'
  + '@keyframes lhsCardIn{from{transform:translateY(20px) scale(.96);opacity:0}to{transform:none;opacity:1}}'
  + '.lhs-x{position:absolute;top:12px;right:14px;cursor:pointer;border:none;background:transparent;color:#9aa1bd;font-size:20px;line-height:1}'
  + '.lhs-x:hover{color:#ff6b6b}'
  + '.lhs-mtitle{font-size:16px;font-weight:800;color:#ffe49b;margin:0 28px 12px 0}'
  + '.lhs-stage{background:radial-gradient(420px 200px at 50% 0%,rgba(124,140,255,.14),transparent 65%),#0c1020;border:1px solid rgba(255,255,255,.10);border-radius:14px;padding:6px;margin-bottom:12px}'
  + '.lhs-stage svg{width:100%;height:auto;display:block;border-radius:10px}'
  + '.lhs-chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}'
  + '.lhs-chips .lbl0{font-size:11px;color:#9aa1bd;align-self:center;margin-right:2px}'
  + '.lhs-chips b{font-size:11px;font-weight:700;color:#1a1400;background:linear-gradient(90deg,#ffd54a,#ffe49b);border-radius:20px;padding:3px 10px}'
  + '.lhs-cap{font-size:13px;line-height:1.6;color:#cfd5ea;margin-bottom:14px}'
  + '.lhs-cap b{color:#ffe49b}'
  + '.lhs-mctrl{display:flex;gap:8px;justify-content:flex-end}'
  + '.lhs-mctrl button{cursor:pointer;font-family:inherit;font-size:12.5px;font-weight:700;border-radius:20px;padding:8px 14px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#eef0f7;transition:.2s}'
  + '.lhs-mctrl .lhs-replay:hover{border-color:#5aa9ff;color:#5aa9ff}'
  + '.lhs-mctrl .lhs-next{background:linear-gradient(90deg,#ffd54a,#ffae5c);color:#1a1400;border:none}'
  + '.sv text,.sv g,.sv circle,.sv rect,.sv path{transform-box:fill-box;transform-origin:center}'
  + '.sv .lbl{font:700 12.5px "Segoe UI",sans-serif;fill:#dfe4f5}'
  + '.sv .sub{font:600 11px "Segoe UI",sans-serif;fill:#9aa1bd}'
  + '.sv .tag{font:800 11px "Segoe UI",sans-serif}'
  + '@keyframes svIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}'
  + '@keyframes svPunch{0%{transform:translateX(-70px);opacity:0}40%{opacity:1}60%{transform:translateX(0)}73%{transform:translateX(-9px)}100%{transform:translateX(0)}}'
  + '@keyframes svShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}60%{transform:translateX(6px)}}'
  + '@keyframes svFlash{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1.15)}}'
  + '@keyframes svPop{0%{opacity:0;transform:scale(0)}70%{transform:scale(1.25)}100%{opacity:1;transform:scale(1)}}'
  + '@keyframes svPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}'
  + '@keyframes svFall{0%{transform:translateY(-95px) rotate(0);opacity:0}30%{opacity:1}85%{transform:translateY(0) rotate(24deg)}100%{transform:translateY(0) rotate(24deg)}}'
  + '@keyframes svDrive{0%{transform:translateX(-30px)}100%{transform:translateX(150px)}}'
  + '@keyframes svMiss{0%{transform:translate(0,0);opacity:1}55%{transform:translate(95px,0)}100%{transform:translate(118px,55px);opacity:0}}'
  + '@keyframes svHit{0%{transform:translateX(0);opacity:1}90%{opacity:1}100%{transform:translateX(180px);opacity:1}}'
  + '@keyframes svLower{0%{transform:rotate(0)}100%{transform:rotate(72deg)}}'
  + '@keyframes svWalk{0%{transform:translateX(0);opacity:1}100%{transform:translateX(80px);opacity:.25}}'
  + '@keyframes svTick{0%{opacity:0;transform:scale(0)}60%{transform:scale(1.35)}100%{opacity:1;transform:scale(1)}}'
  + '@keyframes svGrowX{from{transform:scaleX(0)}to{transform:scaleX(1)}}'
  + '@keyframes svPull{0%{transform:translateX(40px);opacity:.4}100%{transform:translateX(0);opacity:1}}'
  + '@keyframes svRise{0%{transform:translateY(20px);opacity:0}100%{transform:translateY(0);opacity:1}}'
  + '@keyframes svDrop{0%{transform:translateY(-20px);opacity:0}100%{transform:translateY(0);opacity:1}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var back=document.createElement('a'); back.className='lhs-back'; back.href='index.html'; back.textContent='← Quay lại roadmap';
  document.body.appendChild(back);
  var simall=document.createElement('button'); simall.className='lhs-simall'; simall.type='button'; simall.textContent='✨ Mô phỏng tất cả các ý';
  document.body.appendChild(simall);
  var modal=document.createElement('div'); modal.className='lhs-modal'; modal.id='lhsModal';
  modal.innerHTML='<div class="lhs-card"><button class="lhs-x" type="button">✕</button><div class="lhs-mtitle"></div><div class="lhs-stage"></div><div class="lhs-chips" hidden></div><div class="lhs-cap"></div><div class="lhs-mctrl"><button class="lhs-replay" type="button">▶ Phát lại</button><button class="lhs-next" type="button" hidden>Tiếp ▶</button></div></div>';
  document.body.appendChild(modal);

  var SVGH='<svg viewBox="0 0 340 190" class="sv" xmlns="http://www.w3.org/2000/svg">';
  function E(x,y,s,sz,stl){return '<text x="'+x+'" y="'+y+'" font-size="'+(sz||44)+'" style="'+(stl||'')+'">'+s+'</text>';}
  function L(t){return '<text class="lbl" x="170" y="172" text-anchor="middle">'+t+'</text>';}
  var S={
    harm:function(){return SVGH+E(55,108,'✊',46,'animation:svPunch 1s')+E(208,108,'👥',46,'animation:svShake .5s .8s 2')+'<g style="opacity:0;animation:svFlash .7s .85s 2 forwards">'+E(150,78,'💥',34)+'</g>'+L('Gây / đe doạ thiệt hại cho xã hội')+'</svg>';},
    lawban:function(){return SVGH+E(60,110,'📖',46,'animation:svIn .6s')+E(150,108,'✋',40,'animation:svIn .6s .4s both')+'<g style="opacity:0;animation:svPop .6s .9s both">'+E(150,112,'🚫',54)+'</g>'+L('Bị BLHS cấm — không luật, không tội')+'</svg>';},
    subject:function(){return SVGH+'<g style="animation:svPop .6s both">'+E(55,105,'🧑‍⚖️',44)+'</g><text class="sub" x="78" y="135" text-anchor="middle">đủ NLTNHS</text><g style="animation:svPop .6s .5s both">'+E(205,105,'🏢',44)+'</g><text class="sub" x="227" y="135" text-anchor="middle">pháp nhân TM</text>'+L('Chủ thể có năng lực TNHS / tuổi')+'</svg>';},
    fault:function(){return SVGH+E(140,70,'🧠',40,'animation:svPop .6s both')+'<g style="opacity:0;animation:svIn .6s .6s both">'+E(45,135,'😈',34)+'<text class="sub" x="62" y="158" text-anchor="middle">cố ý</text></g><g style="opacity:0;animation:svIn .6s .9s both">'+E(245,135,'😬',34)+'<text class="sub" x="262" y="158" text-anchor="middle">vô ý</text></g><text class="lbl" x="170" y="182" text-anchor="middle">Cố ý hoặc vô ý</text></svg>';},
    penalty:function(){return SVGH+'<g style="transform-origin:120px 70px;animation:svLower .7s .3s both">'+E(95,95,'⚖️',46)+'</g>'+E(160,112,'➜',30,'opacity:0;animation:svIn .5s .9s both')+'<g style="opacity:0;animation:svPop .6s 1.1s both">'+E(215,108,'🔒',46)+'</g>'+L('Bị xử lý bằng hình phạt')+'</svg>';},
    choice:function(){return SVGH+E(145,108,'🧍',42,'animation:svIn .6s both')+'<path d="M150 95 L70 55" stroke="#49e0a0" stroke-width="2" fill="none" style="opacity:0;animation:svIn .5s .5s both"/><path d="M190 95 L270 55" stroke="#ff6b6b" stroke-width="2" fill="none" style="opacity:0;animation:svIn .5s .5s both"/><g style="opacity:0;animation:svIn .5s .7s both">'+E(35,50,'✅',24)+'<text class="sub" x="55" y="40" text-anchor="middle">không phạm</text></g><g style="opacity:0;animation:svPop .6s 1s both">'+E(265,50,'❌',24)+'<text class="sub" x="285" y="40" text-anchor="middle">chọn phạm</text></g>'+L('Có thể chọn khác nhưng đã chọn làm')+'</svg>';},
    forced:function(){return SVGH+E(110,110,'🗡️',40,'animation:svIn .5s both')+E(150,112,'🧍',42,'animation:svShake .5s .4s 3')+E(205,112,'✍️',34,'opacity:0;animation:svIn .6s .8s both')+L('Bị cưỡng bức ⇒ không tự lựa chọn')+'</svg>';},
    unforeseeable:function(){return SVGH+'<line x1="0" y1="150" x2="340" y2="150" stroke="#39406a" stroke-width="3"/>'+E(60,60,'👷',34,'animation:svIn .4s both')+'<line x1="78" y1="20" x2="78" y2="150" stroke="#5a6088" stroke-width="3"/><g style="animation:svFall 1.3s .5s both">'+E(60,60,'🧍',32)+'</g><g style="animation:svDrive 1.6s .4s both">'+E(150,142,'🚗',34)+'</g><g style="opacity:0;animation:svFlash .8s 1.7s 2 both">'+E(150,120,'💥',30)+'</g><text class="lbl" x="170" y="178" text-anchor="middle">Không thể &amp; không buộc thấy trước</text></svg>';},
    prepare:function(){return SVGH+E(60,108,'🧍',42,'animation:svIn .5s both')+'<g style="opacity:0;animation:svPop .6s .6s both">'+E(150,108,'🔫',40)+'</g>'+E(225,100,'🕒',30,'opacity:0;animation:svIn .5s 1s both')+'<text class="sub" x="170" y="138" text-anchor="middle">sắm công cụ — chưa ra tay</text>'+L('Chuẩn bị phạm tội (Đ.14)')+'</svg>';},
    attempt:function(){return SVGH+E(35,108,'🔫',38,'animation:svIn .4s both')+'<circle cx="80" cy="98" r="5" fill="#ffd54a" style="animation:svMiss 1.2s .5s both"/>'+E(250,108,'🎯',38,'animation:svShake .4s 1.3s 2')+'<text class="tag" x="170" y="55" fill="#ffae5c" text-anchor="middle" style="opacity:0;animation:svPop .5s 1.4s both">đạn lép / trượt!</text>'+L('Đã ra tay nhưng dở dang ngoài ý muốn')+'</svg>';},
    completed:function(){return SVGH+E(35,108,'🔫',38,'animation:svIn .4s both')+'<circle cx="80" cy="98" r="5" fill="#ff6b6b" style="animation:svHit 1.1s .5s both"/>'+E(250,108,'🎯',38)+'<g style="opacity:0;animation:svPop .6s 1.5s both">'+E(255,108,'💀',40)+'</g>'+L('Đủ dấu hiệu cấu thành ⇒ hoàn thành')+'</svg>';},
    voluntary:function(){return SVGH+'<g style="transform-origin:80px 110px;animation:svLower 1s .4s both">'+E(60,112,'🔫',40)+'</g><g style="animation:svWalk 1.4s 1.1s both">'+E(150,112,'🚶',40)+'</g>'+L('Tự dừng dù không ai cản ⇒ miễn TNHS')+'</svg>';},
    nature:function(){return SVGH+E(150,112,'🔒',54,'animation:svIn .5s both')+'<g style="opacity:0;animation:svPop .6s .6s both">'+E(150,116,'🚫',64)+'</g>'+L('KHÔNG phải hình phạt')+'</svg>';},
    community:function(){return SVGH+'<g style="animation:svIn .5s both">'+E(60,108,'🔒',44)+E(95,80,'🚫',40)+'</g>'+E(150,108,'➜',28,'opacity:0;animation:svIn .5s .6s both')+'<g style="opacity:0;animation:svPop .6s .8s both">'+E(205,108,'🏠',44)+'</g>'+E(255,100,'👁️',26,'opacity:0;animation:svPulse 1.2s 1.2s 2;')+'<text class="lbl" x="170" y="170" text-anchor="middle">Cải tạo tại cộng đồng, có giám sát</text></svg>';},
    condition:function(){return SVGH+E(45,108,'⏳',38,'animation:svIn .5s both')+'<g style="opacity:0;animation:svPop .6s .6s both">'+E(120,108,'⚠️',34)+'</g>'+E(190,108,'➜',26,'opacity:0;animation:svIn .5s 1s both')+'<g style="opacity:0;animation:svPop .6s 1.2s both">'+E(235,108,'🔒',40)+'</g><text class="lbl" x="170" y="172" text-anchor="middle">Phạm tội mới ⇒ chấp hành cả án tù</text></svg>';},
    checklist:function(){var o=SVGH,A=['điều kiện 1','điều kiện 2','điều kiện 3','điều kiện 4','điều kiện 5'];for(var i=0;i<5;i++){var y=40+i*28;o+='<g style="opacity:0;animation:svTick .5s '+(0.3+i*0.45)+'s both">'+E(40,y,'✅',22)+'</g><text class="sub" x="68" y="'+(y-2)+'">'+A[i]+'</text>';}return o+'<text class="lbl" x="40" y="184">Phải đủ CẢ các điều kiện</text></svg>';},
    barrier:function(){return SVGH+E(45,112,'🧍',40,'animation:svIn .5s both')+'<g style="opacity:0;animation:svPop .6s .5s both">'+E(150,114,'🚧',46)+'</g><g style="opacity:0;animation:svPop .5s .9s both">'+E(155,112,'🚫',50)+'</g><text class="lbl" x="170" y="172" text-anchor="middle">Rơi vào 1 trường hợp ⇒ bị chặn</text></svg>';},
    probation:function(){return SVGH+'<text class="tag" x="170" y="38" fill="#ffe49b" text-anchor="middle" style="opacity:0;animation:svIn .5s .2s both">án tù × 2</text><rect x="45" y="92" width="250" height="10" rx="5" fill="#26304f" style="transform-origin:45px 97px;animation:svGrowX .6s .4s both"/><text class="sub" x="45" y="124" text-anchor="middle">1 năm</text><text class="sub" x="295" y="124" text-anchor="middle">5 năm</text>'+L('Thời gian thử thách trong khoảng 1–5 năm')+'</svg>';},
    weapon:function(){return SVGH+E(120,108,'⚠️',40,'animation:svFlash 1s 2 both')+E(190,110,'🔪',42,'animation:svShake .5s .3s 3')+L('Công cụ / hung khí phạm tội')+'</svg>';},
    money:function(){return SVGH+'<g style="animation:svPull 1s .3s both">'+E(120,110,'🤲',40)+'</g><g style="animation:svIn .5s both">'+E(185,108,'💰',40)+'</g>'+L('Chiếm đoạt / tài sản, tiền')+'</svg>';},
    clock:function(){return SVGH+E(135,108,'⏳',46,'animation:svPulse 1.4s 2 both')+E(205,100,'📅',34,'opacity:0;animation:svIn .6s .5s both')+L('Yếu tố thời gian / thời hiệu')+'</svg>';},
    up:function(){return SVGH+'<g style="animation:svRise .8s both">'+E(135,115,'🔺',44)+'</g>'+E(195,100,'⬆️',34,'opacity:0;animation:svRise .7s .4s both')+'<text class="lbl" x="170" y="170" text-anchor="middle" fill="#ff8a8a">Tình tiết tăng nặng</text></svg>';},
    down:function(){return SVGH+'<g style="animation:svDrop .8s both">'+E(135,112,'💚',42)+'</g>'+E(195,118,'⬇️',34,'opacity:0;animation:svDrop .7s .4s both')+'<text class="lbl" x="170" y="172" text-anchor="middle" fill="#7fe6b6">Tình tiết giảm nhẹ</text></svg>';},
    group:function(){return SVGH+E(90,110,'🧑‍🤝‍🧑',42,'animation:svPop .6s both')+E(190,110,'👥',42,'animation:svPop .6s .4s both')+L('Nhiều người cùng thực hiện')+'</svg>';},
    erase:function(){return SVGH+E(120,110,'📄',42,'animation:svIn .5s both')+'<g style="opacity:0;animation:svPop .7s .6s both">'+E(150,98,'✨',34)+'</g><g style="opacity:0;animation:svPop .6s 1.1s both">'+E(195,108,'✅',38)+'</g>'+L('Xoá án tích — coi như chưa bị kết án')+'</svg>';},
    free:function(){return SVGH+E(120,110,'🔓',42,'animation:svPop .6s both')+'<g style="animation:svRise 1s .5s both">'+E(195,105,'🕊️',40)+'</g>'+L('Được miễn / tha')+'</svg>';},
    court:function(){return SVGH+E(120,110,'👨‍⚖️',42,'animation:svIn .5s both')+'<g style="transform-origin:205px 80px;animation:svLower .8s .5s both">'+E(185,100,'⚖️',40)+'</g>'+L('Toà án xét xử & quyết định')+'</svg>';},
    concept:function(){return SVGH+E(135,110,'⚖️',46,'animation:svPulse 1.6s 2 both')+E(205,105,'📖',36,'opacity:0;animation:svIn .6s .5s both')+L('Khái niệm pháp lý')+'</svg>';},
    duration:function(it){var v=(it&&it.value)||'?',u=(it&&it.unit)||'';return SVGH
      + E(92,112,'⏳',48,'animation:svPulse 1.5s 2 both')
      + '<rect x="150" y="72" width="150" height="56" rx="12" fill="rgba(243,201,105,.10)" stroke="rgba(243,201,105,.5)" style="opacity:0;animation:svIn .5s .3s both"/>'
      + '<text x="225" y="108" font-size="34" font-weight="800" fill="#ffe49b" text-anchor="middle" style="opacity:0;animation:svPop .6s .5s both">'+v+'</text>'
      + '<text class="sub" x="225" y="120" text-anchor="middle" style="opacity:0;animation:svIn .5s .8s both">'+u+'</text>'
      + L('Mốc / thời hạn cần nhớ')+'</svg>';},
    number:function(it){var v=(it&&it.value)||'?',u=(it&&it.unit)||'';var ic=(u==='lần')?'🔁':(u==='%')?'📊':(u==='tuổi')?'🎂':(u==='đồng'||u==='triệu'||u==='tỷ')?'💰':'🔢';return SVGH
      + E(98,114,ic,46,'animation:svPop .6s both')
      + '<text x="214" y="116" font-size="46" font-weight="800" fill="#ffe49b" text-anchor="middle" style="opacity:0;animation:svPop .6s .4s both">'+v+'</text>'
      + '<text class="sub" x="214" y="142" text-anchor="middle" style="opacity:0;animation:svIn .5s .8s both">'+u+'</text>'
      + L('Con số cần nhớ')+'</svg>';}
  };
  function pick(s){ s=(s||'').toLowerCase();
    var R=[['tử hình','penalty'],['phạt tù','penalty'],['hình phạt','penalty'],['đi tù','penalty'],['vào tù','penalty'],
     ['giết','completed'],['chết','completed'],['tử vong','completed'],
     ['hung khí','weapon'],['vũ khí','weapon'],['súng','weapon'],['dao','weapon'],['công cụ','weapon'],
     ['chiếm đoạt','money'],['tài sản','money'],['tiền','money'],['trộm','money'],['cướp','money'],['tham ô','money'],['lừa đảo','money'],
     ['cưỡng bức','forced'],['ép buộc','forced'],['đe dọa','forced'],['đe doạ','forced'],['bị ép','forced'],
     ['tự lựa chọn','choice'],['lựa chọn','choice'],['tự ý','choice'],
     ['cố ý','fault'],['vô ý','fault'],['có lỗi','fault'],['lỗi','fault'],
     ['pháp nhân','subject'],['năng lực trách nhiệm','subject'],['năng lực','subject'],['chủ thể','subject'],['độ tuổi','subject'],['tuổi','subject'],
     ['thời hiệu','clock'],['thử thách','clock'],['thời gian','clock'],['thời hạn','clock'],
     ['giảm nhẹ','down'],['khoan hồng','down'],
     ['tăng nặng','up'],['đặc biệt nghiêm trọng','up'],
     ['đồng phạm','group'],['nhiều người','group'],['giúp sức','group'],['xúi giục','group'],['tổ chức','group'],
     ['án treo','community'],['cộng đồng','community'],['cải tạo','community'],['giám sát','community'],
     ['xóa án','erase'],['xoá án','erase'],['án tích','erase'],
     ['miễn trách nhiệm','free'],['miễn hình phạt','free'],['miễn','free'],['tha','free'],
     ['cấm','lawban'],['trái pháp luật','lawban'],['quy định trong bộ luật','lawban'],['không luật','lawban'],
     ['xét xử','court'],['toà án','court'],['tòa án','court'],['bản án','court'],['quyết định hình phạt','court'],['tổng hợp hình phạt','court'],
     ['nguy hiểm','harm'],['thiệt hại','harm'],['xâm phạm','harm'],['quan hệ xã hội','harm']];
    for(var i=0;i<R.length;i++){ if(s.indexOf(R[i][0])>=0) return R[i][1]; }
    return 'concept';
  }
  var EMO=/[←-⇿⌀-➿⬀-⯿☀-⛿]|[\uD83C-\uDBFF][\uDC00-\uDFFF]/;
  var stage=modal.querySelector('.lhs-stage'),mtitle=modal.querySelector('.lhs-mtitle'),
      mcap=modal.querySelector('.lhs-cap'),chipBox=modal.querySelector('.lhs-chips'),
      nextBtn=modal.querySelector('.lhs-next'),replayBtn=modal.querySelector('.lhs-replay');
  var cur=null,seq=null,si=0,timer=null,LIST=[];
  function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;');}
  function render(it){
    mtitle.textContent=it.title; mcap.innerHTML=it.cap;
    stage.innerHTML=(S[it.scene]||S.concept)(it);
    if(it.chips&&it.chips.length){
      chipBox.hidden=false;
      chipBox.innerHTML='<span class="lbl0">Từ khoá:</span>'+it.chips.map(function(x){return '<b>'+esc(x)+'</b>';}).join('');
    } else { chipBox.hidden=true; chipBox.innerHTML=''; }
    cur=it;
  }
  function open(it){ clearTimeout(timer); seq=null; nextBtn.hidden=true; render(it); modal.classList.add('show'); }
  function close(){ clearTimeout(timer); modal.classList.remove('show'); }
  function showSeq(){ clearTimeout(timer); render(seq[si]); nextBtn.hidden=(si>=seq.length-1); timer=setTimeout(function(){ if(si<seq.length-1){si++;showSeq();} },5400); }
  function startSeq(){ if(!LIST.length)return; seq=LIST.slice(); si=0; modal.classList.add('show'); showSeq(); }
  replayBtn.addEventListener('click',function(){ if(cur) render(cur); });
  nextBtn.addEventListener('click',function(){ if(seq&&si<seq.length-1){si++;showSeq();} });
  modal.querySelector('.lhs-x').addEventListener('click',close);
  modal.addEventListener('click',function(e){ if(e.target===modal) close(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(); });
  simall.addEventListener('click',startSeq);
  function addBtn(icon,it){ var b=document.createElement('span'); b.className='lhs-sim2'; b.textContent='▶ Mô phỏng';
    b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();open(it);}); icon.insertAdjacentElement('afterend',b); LIST.push(it); }

  var leaves=[],all=document.querySelectorAll('span,div,i,b,em,p,h1,h2,h3,h4,h5,td');
  Array.prototype.forEach.call(all,function(el){
    if(el.children.length!==0)return; var t=(el.textContent||'').trim();
    if(t.length===0||t.length>4||!EMO.test(t))return;
    if(el.closest('a,button,.tab,.tabs,.title,.lhs-modal,.lhs-back,.lhs-simall'))return;
    leaves.push(el);
  });
  var seenTitles={};
  leaves.forEach(function(icon){
    if(icon.closest('.legal-ref,.quote,.note,.hint,.badge,.ref,.qbody,.core'))return;
    var row=icon.parentElement,guard=0;
    while(row&&row!==document.body){
      var tt=(row.textContent||'').replace(/\s+/g,' ').trim();
      var nb=row.querySelectorAll('b,strong').length;
      if(tt.length>=45 || (tt.length>=18 && nb>=2)) break;
      row=row.parentElement; if(++guard>4)break;
    }
    if(!row||row.dataset.lhsSim)return;
    var t=(row.textContent||'').replace(/\s+/g,' ').trim();
    if(t.length<12||t.length>600)return;
    var h=row.querySelector('h1,h2,h3,h4,h5,b,strong'); var title=h?h.textContent.replace(/\s+/g,' ').trim():'';
    if(!title){ title=t.split(/[.:!?\n]/)[0].split(' ').slice(0,9).join(' '); }
    var cap=t; if(title && cap.indexOf(title)===0) cap=cap.slice(title.length).trim();
    cap=cap.replace(/^[\-–—:•.\s]+/,'');
    if(!cap||cap===title){
      var d=row.querySelector('p,.cd,.it,.desc'); if(d){var ds=(d.textContent||'').replace(/\s+/g,' ').trim(); if(ds&&ds!==title)cap=ds;}
      if(!cap||cap===title){var sib=row.nextElementSibling; if(sib){var ss=(sib.textContent||'').replace(/\s+/g,' ').trim(); if(ss.length>12)cap=ss;}}
    }
    if(cap.length>270) cap=cap.slice(0,267)+'…';
    if(/Điều\s/i.test(title) && (!cap||cap===title) && t.length<40)return;
    if(!cap) cap=title;
    var key=title.toLowerCase(); if(seenTitles[key])return; seenTitles[key]=1;
    var hi=[]; row.querySelectorAll('b,strong,mark').forEach(function(x){
      var s=(x.textContent||'').replace(/\s+/g,' ').trim();
      if(s && s.length<=44 && s!==title && hi.indexOf(s)<0) hi.push(s);
    });
    var hiText=hi.join(' ');
    var scene, value=null, unit=null;
    var mm=hiText.match(/(\d[\d.,]*)\s*(năm|tháng|ngày|giờ|tuổi|lần|%|đồng|triệu|tỷ)/i);
    if(mm){ value=mm[1]; unit=mm[2].toLowerCase(); scene=/(năm|tháng|ngày|giờ)/.test(unit)?'duration':'number'; }
    else { scene=pick(hiText||t); }
    row.dataset.lhsSim='1';
    addBtn(icon,{title:title||'Ý chính',cap:cap,scene:scene,value:value,unit:unit,chips:hi.slice(0,4)});
  });
  if(!LIST.length) simall.style.display='none';
})();
