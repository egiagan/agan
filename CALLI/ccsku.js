#form-reset-pw,#login_form,.overlay-form{
	padding:1rem 1.25rem
}
.btn-login,.logo-nama{
	box-shadow:var(--box-shdw);
	font-family:var(--fontTitle)
}
#login_google,.btn-login,.label-input,.logo-nama,.title-login{
	font-family:var(--fontTitle)
}
#form-reset-pw,.igneliusAlert{
	animation:.5s ease-out fadeInDown
}
.f-kuning{
	fill:#ffc107
}
.f-merah{
	fill:#ff3d00
}
.f-hijau{
	fill:#4caf50
}
.f-biru{
	fill:#1976d2
}
#overlay-form,[data-theme=dark] .overlay-form{
	background-image:radial-gradient(circle,#2a4f2b,#144d38,#004943,#00444a,#123f4c,#193e4c,#1f3e4c,#243d4b,#23414d,#24464e,#264a4f,#2a4e4f)
}
#form-reset-pw,#login_form{
	background:rgba(255,255,255,.2);
	box-shadow:0 4px 30px rgba(0,0,0,.1);
	transform:translate(-50%,-50%);
	width:90%;
	height:auto
}
[data-theme="dark"] .ring{
	background-color: rgba(255, 255, 255, 1);
	/*box-shadow: 0px 35px 68px 0px rgba(24, 33, 43, 0.5), inset 0px -8px 16px 0px rgba(24, 33, 43, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
	*/
	background-image:radial-gradient(circle,#193e4c,#094950,#08534e,#205c47,#3b633c);
	border-color:#24464e
}
[data-theme="dark"] #form-reset-pw,[data-theme=dark] #login_form,[data-theme="dark"] .close-pw{
	background:rgba(13,12,12,.2)
}
[data-theme="dark"] #login_form, [data-theme="dark"] #form-reset-pw, [data-theme="dark"] .close-pw,[data-theme="dark"] #reset_email{
	border-color:rgba(12,12,12,.3)
}
.borderTeks{
	display:flex;
	align-items:center;
	text-align:center;
	color:var(--tx-100);
	font-weight:700;
	margin:2rem 0
}
.borderTeks::after,.borderTeks::before{
	content:'';
	flex:1;
	border-bottom:2px solid var(--border);
	margin:0 10px
}
#login_google{
	display:flex;
	align-items:center;
	justify-content:center;
	background:0 0;
	border:2px solid var(--border);
	color:var(--tx-100)!important
}
#login_google:hover{
	border-color:var(--primary);
	color:var(--primary)!important
}
#login_google svg{
	width:20px;
	height:20px;
	margin-right:10px
}
#konten-member{
	font-size:20px;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	width:90%;
	z-index: 999
}
.btn-login{
	font-weight:700;
	margin-top:1.5rem
}
.btn-login:active{
	transform:scale(.95)
}
.note-wr{
	color:red;
	font-size:12px;
	margin-bottom:1.5rem
}
.overlay-form{
	height:100%;
	background-image:radial-gradient(circle,#c5fccb,#b8fde8,#befbfc,#d2f7ff,#e6f3ff,#e6effc,#e7ebf8,#e7e7f3,#dcdff4,#d0d8f5,#c1d1f6,#b0cbf7);
	z-index:9
}
#login_form{
	top:50%;
	left:50%;
	max-width:980px;
	max-height:100%;
	overflow-y:auto;
	border-radius:15px;
	backdrop-filter:blur(4px);
	-webkit-backdrop-filter:blur(4px);
	border:2px solid rgba(255,255,255,.5);
	z-index:99
}
#form-reset-pw,#konten-member,#overlay-form,.note-wr{
	display:none
}
.close-pw,.logo-blog,.snk{
	display:flex
}
#overlay-form{
	background:rgba(20,20,20,.18);
	backdrop-filter:blur(8px);
	-webkit-backdrop-filter:blur(8px);
	z-index:999!important
}
#overlay-form,.overlay-form{
	top:0;
	right:0;
	bottom:0;
	left:0;
	min-width:100%;
	overflow-y:auto
}
#form-reset-pw,#konten-member,#login_form,#overlay-form,.overlay-form{
	position:fixed
}
#form-reset-pw{
	border-radius:var(--radiusB);
	backdrop-filter:blur(5px);
	-webkit-backdrop-filter:blur(5px);
	border:2px solid rgba(255,255,255,.5);
	top:50%;
	left:50%;
	max-width:760px;
	z-index:9999
}
.logo-blog{
	justify-content:space-between;
	align-items:center;
	margin-bottom:.8rem
}
.line-logo{
	position:relative;
	width:100%;
	overflow-y:hidden
}
.logo-nama,.logo-nama::before{
	position:absolute;
	top:50%;
	transform:translateY(-50%)
}
.line-logo svg,.line-mode svg{
	width:40px;
	height:40px
}
.line-logo svg{
	margin:3px 5px -3px 0
}
.logo-nama{
	left:-150px;
	background-color:var(--primary-sec);
	padding:5px 10px;
	border-radius:var(--radiusB);
	color:var(--primary);
	opacity:0;
	transition:.4s;
	pointer-events:none
}
.line-logo:hover .logo-nama{
	left:50px;
	top:50%;
	opacity:1
}
.logo-nama::before{
	content:"";
	left:-18px;
	border-width:10px;
	border-style:solid;
	border-color:transparent var(--primary-sec) transparent transparent
}
.label-input,.title-login{
	color:var(--tx-100);
	font-weight:700
}
.title-login{
	font-size:20px;
	margin-bottom:.5rem
}
.ket-login{
	margin-bottom:2rem
}
.snk{
	align-items:flex-start;
	margin:1rem 0 .5rem;
	font-size:12px
}
#snk-form{
	align-items:center;
	margin-right:10px
}
.not-regist{
	margin:1rem 0
}
.form-reset{
	position:relative
}
.close-pw{
	position:absolute;
	justify-content:center;
	align-items:center;
	padding:5px 8px;
	width:50px;
	height:50px;
	background:rgba(255,255,255,.2);
	box-shadow:0 4px 30px rgba(0,0,0,.1);
	backdrop-filter:blur(4.4px);
	-webkit-backdrop-filter:blur(4.4px);
	border-radius:50%;
	top:-90px;
	right:-12px
}
.close-pw, #reset_email{
	border:2px solid rgba(255,255,255,.3)!important;
}
.close-pw svg{
	width:30px;
	height:30px
}
.close-pw path{
	stroke:var(--tx-100)
}
#reset_email{
	padding:15px;
	margin:1.5rem 0
}
.form-group{
	position:relative;
	margin:.5rem 0 1.5rem
}
#reset_email,.form-group input{
	background:0 0;
	border-radius:var(--radiusB);
	border:1px solid var(--border);
	outline:0;
	color:var(--tx-75);
	font-family:var(--fontC);
	width:100%
}
.form-group input{
	padding:15px 15px 15px 60px
}
.form-group svg,.form-group svg.pw{
	position:absolute;
	left:20px;
	bottom:10px;
	width:24px;
	height:24px;
	margin:-3px 5px 3px 0
}
.form-group path{
	stroke:var(--tx-75)
}
.form-group svg.show-pw{
	position:absolute;
	left:90%;
	top:18px
}
@media screen and (min-width:480px){
	.form-group svg.show-pw{
		left:95%
}
}
.form-group .show-pw:active path{
	stroke:var(--primary)
}
.igneliusAlert{
	position:fixed;
	left:50%;
	transform:translate(-50%,-50%);
	text-align:center;
	align-items:center;
	justify-content:center;
	top:3.5rem;
	padding:1rem 1.25rem;
	width:100%;
	max-width:600px;
	border-radius:7px;
	box-shadow:0 4px 8px rgba(0,0,0,.1);
	display:none;
	z-index:9999
}
.bg-ring,.ring{
	position:absolute
}
@media only screen and (max-width:480px){
	.igneliusAlert{
		max-width:300px;
		width:100%;
		height:auto
}
}
@keyframes fadeInDown{
	from{
		opacity:0;
		transform:translate(-50%,-60%)
}
	to{
		opacity:1;
		transform:translate(-50%,-50%)
}
}
.igneliusAlert.success{
	background: rgba(212, 237, 218, 0.76);
	backdrop-filter: blur(4.8px);
	-webkit-backdrop-filter: blur(4.8px);
	border: 1px solid rgba(212, 237, 218, 0.3);
	color:#155724;
	border-color:#c3e6cb
}
.igneliusAlert.error{
	background: rgba(248, 215, 218, 0.66);
	backdrop-filter: blur(4.8px);
	-webkit-backdrop-filter: blur(4.8px);
	border: 1px solid rgba(248, 215, 218, 0.3);
	color:#721c24;
	border-color:#f5c6cb
}
.bg-ring{
	top:0;
	left:0;
	width:100%;
	height:100%;
	z-index:8
}
.ring{
	background-color: rgba(255, 255, 255, 1);
	/*box-shadow: 35px 35px 68px 0px rgba(145, 192, 255, 0.5), inset -8px -8px 16px 0px rgba(145, 192, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
	*/
	background-image:radial-gradient(circle,#b0cbf7,#bcd5f9,#c9e0fb,#d7e9fd,#e6f3ff);
	border:5px solid rgba(255,255,255,.5);
	border-radius:77% 23% 20% 80% / 47% 46% 54% 53%;
	animation:5s ease-in-out infinite float
}
.ring.right{
	width:250px;
	height:250px;
	top:-10px;
	right:-10px;
	animation-delay:-2.5s
}
.ring.left{
	width:350px;
	height:350px;
	bottom:-10px;
	left:-10px;
	animation-delay:-2.5s
}
@keyframes float{
	0%,100%{
		transform:translateY(20px)
}
	50%{
		transform:translateY(-20px)
}
}
