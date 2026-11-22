var KDMorph=(()=>{var Ot=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ne=Object.getOwnPropertyNames;var ee=Object.prototype.hasOwnProperty;var dt=(t,s,e)=>()=>{if(e)throw e[0];try{return t&&(s=t(t=0)),s}catch(o){throw e=[o],o}};var cn=(t,s)=>{for(var e in s)Ot(t,e,{get:s[e],enumerable:!0})},oe=(t,s,e,o)=>{if(s&&typeof s=="object"||typeof s=="function")for(let n of ne(s))!ee.call(t,n)&&n!==e&&Ot(t,n,{get:()=>s[n],enumerable:!(o=te(s,n))||o.enumerable});return t};var se=t=>oe(Ot({},"__esModule",{value:!0}),t);function fn(t){let s=[],e=t.length,o=0,n=0,c=0,r=0,i=0,l=null,a="",h=0,f=0,m="",u=!1,g=I=>{throw new Error(`morphicons: ${I} at d[${o}]`)},d=I=>I>=48&&I<=57,M=()=>{for(;o<e;){let I=t.charCodeAt(o);if(I===32||I===9||I===10||I===13||I===12||I===44)o++;else break}},y=()=>{M();let I=o;o<e&&(t[o]==="+"||t[o]==="-")&&o++;let A=!1;for(;o<e&&d(t.charCodeAt(o));)o++,A=!0;if(o<e&&t[o]===".")for(o++;o<e&&d(t.charCodeAt(o));)o++,A=!0;if(A||g("expected number"),o<e&&(t[o]==="e"||t[o]==="E")){let N=o;o++,o<e&&(t[o]==="+"||t[o]==="-")&&o++;let v=!1;for(;o<e&&d(t.charCodeAt(o));)o++,v=!0;v||(o=N)}return Number(t.slice(I,o))},x=()=>{M();let I=t[o];return I==="0"||I==="1"?(o++,I==="1"?1:0):g("expected arc flag (0|1)")},p=()=>(u||g("path must start with M/m"),l||(l={x0:n,y0:c,segs:[],closed:!1},s.push(l)),l),b=!1,k=()=>y()+(b?n:0),S=()=>y()+(b?c:0);for(;M(),!(o>=e);){let I=t[o];switch(re.includes(I)?(a=I,o++):a===""?g("path must start with M/m"):a==="M"?a="L":a==="m"?a="l":(a==="Z"||a==="z")&&g("stray data after Z"),b=a>="a",b?a.toUpperCase():a){case"M":{u=!0;let A=k(),N=S();n=A,c=N,r=A,i=N,l={x0:A,y0:N,segs:[],closed:!1},s.push(l),m="";break}case"L":{let A=k(),N=S();p().segs.push(["L",A,N]),n=A,c=N,m="";break}case"H":{let A=k();p().segs.push(["L",A,c]),n=A,m="";break}case"V":{let A=S();p().segs.push(["L",n,A]),c=A,m="";break}case"C":case"S":{let A,N;a==="C"||a==="c"?(A=k(),N=S()):(A=m==="C"?2*n-h:n,N=m==="C"?2*c-f:c);let v=k(),T=S(),R=k(),L=S();p().segs.push(["C",A,N,v,T,R,L]),h=v,f=T,n=R,c=L,m="C";break}case"Q":case"T":{let A,N;a==="Q"||a==="q"?(A=k(),N=S()):(A=m==="Q"?2*n-h:n,N=m==="Q"?2*c-f:c);let v=k(),T=S();p().segs.push(["Q",A,N,v,T]),h=A,f=N,n=v,c=T,m="Q";break}case"A":{let A=y(),N=y(),v=y(),T=x(),R=x(),L=k(),_=S();p().segs.push(["A",A,N,v,T,R,L,_]),n=L,c=_,m="";break}case"Z":l&&(l.closed=!0,l=null),n=r,c=i,m="";break;default:g(`unsupported command "${a}"`)}}return s.filter(I=>I.segs.length>0)}function Mt(t){return String(Math.round(t*100)/100)}function Ct(t,s){let e="";for(let o=0;o<t.length;o++){let n=t[o],c=n.length/2;e+=`M${Mt(n[0])} ${Mt(n[1])}`;for(let r=1;r<c;r++)e+=`L${Mt(n[2*r])} ${Mt(n[2*r+1])}`;s?.[o]&&(e+="Z")}return e}function V(t){return String(Math.round(t*1e4)/1e4)}function pn(t){let s="";for(let{pts:e,closed:o}of t){s+=`M${V(e[0])} ${V(e[1])}`;for(let n=2;n<e.length;n+=6)s+=`C${V(e[n])} ${V(e[n+1])} ${V(e[n+2])} ${V(e[n+3])} ${V(e[n+4])} ${V(e[n+5])}`;o&&(s+="Z")}return s}function it(t,s){let e=[t,s],o=t,n=s,c=(h,f,m,u,g,d)=>{e.push(h,f,m,u,g,d),o=g,n=d},r=(h,f)=>{Math.abs(h-o)<1e-12&&Math.abs(f-n)<1e-12||c(o+(h-o)/3,n+(f-n)/3,o+2*(h-o)/3,n+2*(f-n)/3,h,f)};return[c,r,(h,f,m,u)=>{c(o+2/3*(h-o),n+2/3*(f-n),m+2/3*(h-m),u+2/3*(f-u),m,u)},(h,f,m,u,g,d,M)=>{let y=o,x=n;if(Math.abs(d-y)<1e-12&&Math.abs(M-x)<1e-12)return;let p=Math.abs(h),b=Math.abs(f);if(p<1e-12||b<1e-12){r(d,M);return}let k=m*Math.PI/180,S=Math.cos(k),I=Math.sin(k),A=(y-d)/2,N=(x-M)/2,v=S*A+I*N,T=-I*A+S*N,R=v*v/(p*p)+T*T/(b*b);if(R>1){let O=Math.sqrt(R);p*=O,b*=O}let L=p*p,_=b*b,et=v*v,ot=T*T,X=(L*_-L*ot-_*et)/(L*ot+_*et);X<0&&(X=0);let st=(u===g?-1:1)*Math.sqrt(X),Z=st*p*T/b,W=-st*b*v/p,rt=S*Z-I*W+(y+d)/2,w=I*Z+S*W+(x+M)/2,P=Math.atan2((T-W)/b,(v-Z)/p),E=Math.atan2((-T-W)/b,(-v-Z)/p)-P;g===0&&E>0?E-=un:g===1&&E<0&&(E+=un);let F=Math.max(1,Math.ceil(Math.abs(E)/(Math.PI/2)-1e-9)),$=E/F,D=4/3*Math.tan($/4),pt=O=>rt+p*Math.cos(O)*S-b*Math.sin(O)*I,Jn=O=>w+p*Math.cos(O)*I+b*Math.sin(O)*S,en=O=>-p*Math.sin(O)*S-b*Math.cos(O)*I,on=O=>-p*Math.sin(O)*I+b*Math.cos(O)*S,Tt=P,sn=y,rn=x;for(let O=1;O<=F;O++){let ct=P+$*O,Pt=O===F?d:pt(ct),Et=O===F?M:Jn(ct);c(sn+D*en(Tt),rn+D*on(Tt),Pt-D*en(ct),Et-D*on(ct),Pt,Et),Tt=ct,sn=Pt,rn=Et}},h=>(h&&r(e[0],e[1]),e.length<8?null:{pts:Float64Array.from(e),closed:h})]}function hn(t){let[s,e,o,n,c]=it(t.x0,t.y0);for(let r of t.segs)switch(r[0]){case"L":e(r[1],r[2]);break;case"C":s(r[1],r[2],r[3],r[4],r[5],r[6]);break;case"Q":o(r[1],r[2],r[3],r[4]);break;case"A":n(r[1],r[2],r[3],r[4],r[5],r[6],r[7])}return c(t.closed)}function j(t,s,e=0){let o=t[s];if(o===void 0)return e;let n=typeof o=="number"?o:Number(o);return Number.isFinite(n)?n:e}function mn(t){let s=String(t??"").trim();if(!s)return[];let e=s.split(/[\s,]+/).map(Number);if(e.some(o=>!Number.isFinite(o)))throw new Error(`morphicons: invalid points: "${s}"`);return e}function Lt(t,s){if(t.length<4)return null;let[,e,,,o]=it(t[0],t[1]);for(let n=2;n+1<t.length;n+=2)e(t[n],t[n+1]);return o(s)}function gn(t,s,e,o){if(e<1e-12||o<1e-12)return null;let n=bt*e,c=bt*o,r=t+e,i=t-e,l=s+o,a=s-o,[h,,,,f]=it(r,s);return h(r,s+c,t+n,l,t,l),h(t-n,l,i,s+c,i,s),h(i,s-c,t-n,a,t,a),h(t+n,a,r,s-c,r,s),f(!0)}function ce(t){let s=j(t,"x"),e=j(t,"y"),o=j(t,"width"),n=j(t,"height");if(o<1e-12||n<1e-12)return null;let c=j(t,"rx",NaN),r=j(t,"ry",NaN);if(Number.isNaN(c)&&(c=Number.isNaN(r)?0:r),Number.isNaN(r)&&(r=c),c=Math.min(Math.max(c,0),o/2),r=Math.min(Math.max(r,0),n/2),c<1e-12||r<1e-12)return Lt([s,e,s+o,e,s+o,e+n,s,e+n],!0);let i=s+c,l=s+o-c,a=s+o,h=e+r,f=e+n-r,m=e+n,u=bt*c,g=bt*r,[d,M,,,y]=it(i,e);return M(l,e),d(l+u,e,a,h-g,a,h),M(a,f),d(a,f+g,l+u,m,l,m),M(i,m),d(i-u,m,s,f+g,s,f),M(s,h),d(s,h-g,i-u,e,i,e),y(!0)}function Y(t){let s=[],e=o=>{o&&s.push(o)};if(typeof t=="string"){for(let o of fn(t))e(hn(o));return s}for(let[o,n]of t)switch(o){case"path":for(let c of fn(String(n.d??"")))e(hn(c));break;case"line":{let[,c,,,r]=it(j(n,"x1"),j(n,"y1"));c(j(n,"x2"),j(n,"y2")),e(r(!1));break}case"circle":{let c=j(n,"r");e(gn(j(n,"cx"),j(n,"cy"),c,c));break}case"ellipse":e(gn(j(n,"cx"),j(n,"cy"),j(n,"rx"),j(n,"ry")));break;case"rect":e(ce(n));break;case"polyline":e(Lt(mn(n.points),!1));break;case"polygon":e(Lt(mn(n.points),!0));break;default:throw new Error(`morphicons: unsupported tag <${o}>`)}return s}var re,bt,un,yt=dt(()=>{re="MmLlHhVvCcSsQqTtAaZz";bt=4/3*Math.tan(Math.PI/8),un=2*Math.PI});function C(t){let s=t.length/2,e=0,o=0;for(let n=0;n<s;n++)e+=t[2*n],o+=t[2*n+1];return[e/s,o/s]}function dn(t){let s=t.length/2,e=0;for(let o=1;o<s;o++)e+=Math.hypot(t[2*o]-t[2*o-2],t[2*o+1]-t[2*o-1]);return e}function at(t){let s=t.length/2,e=new Float64Array(2*s);for(let o=0;o<s;o++)e[2*o]=t[2*(s-1-o)],e[2*o+1]=t[2*(s-1-o)+1];return e}function K(t,s){let e=t.length/2,o=new Float64Array(2*e);for(let n=0;n<e;n++){let c=(n+s)%e;o[2*n]=t[2*c],o[2*n+1]=t[2*c+1]}return o}function lt(t,s,e,o){let n=t.length/2,c=0,r=0,i=0,l=0,a=0,h=0;for(let M=0;M<n;M++){let y=t[2*M]-e[0],x=t[2*M+1]-e[1],p=s[2*M]-o[0],b=s[2*M+1]-o[1];c+=y*p,l+=x*b,r+=y*b,i+=x*p,a+=y*y+x*x,h+=p*p+b*b}let f=Math.atan2(r-i,c+l),m=Math.cos(f)*(c+l)+Math.sin(f)*(r-i),u=a>1e-12?m/a:1;u>1e-6||(u=1e-6);let g=Math.max(0,u*u*a-2*u*m+h),d=h>1e-12?Math.sqrt(g/h):0;return{theta:f,sigma:u,res:d}}function ue(t,s,e=!1,o=!1,n=!0,c=le){let r=C(t),i=C(s),l=e&&!o,a=l?t:s,h=e||o?a.length/2:1,f=Number.POSITIVE_INFINITY,m=a,u={theta:0,sigma:1,res:0};for(let g=0;g<(n?2:1);g++){let d=g?at(a):a;for(let M=0;M<h;M++){let y=M?K(d,M):d,x=l?lt(y,s,r,i):lt(t,y,r,i),p=x.res+c*Math.abs(x.theta)/Math.PI;p<f&&(f=p,m=y,u=x)}}return l?{ca:r,cb:i,a:m,b:s,...u}:{ca:r,cb:i,a:t,b:m,...u}}function H(t,s){let e=s.map(C),o=s.map(dn);return t.map(n=>{let c=C(n),r=dn(n);return e.map((i,l)=>Math.hypot(c[0]-i[0],c[1]-i[1])+ie*Math.abs(r-o[l]))})}function he(t){let s=t.length;if(s>fe){let r=[];for(let a=0;a<s;a++)for(let h=0;h<s;h++)r.push([t[a][h],a,h]);r.sort((a,h)=>a[0]-h[0]);let i=new Array(s).fill(-1),l=new Array(s).fill(!1);for(let[,a,h]of r)i[a]<0&&!l[h]&&(i[a]=h,l[h]=!0);return i}let e=Array.from({length:s},(r,i)=>i),o=e.slice(),n=Number.POSITIVE_INFINITY,c=(r,i,l)=>{if(!(l>=n)){if(i===s){n=l,o=r.slice();return}for(let a=i;a<s;a++)[r[i],r[a]]=[r[a],r[i]],c(r,i+1,l+t[i][r[i]]),[r[i],r[a]]=[r[a],r[i]]}};return c(e,0,0),o}function Mn(t){let s=t.length,e=t[0].length;if(e**s>1e5){let l=t.map(h=>{let f=0;for(let m=1;m<h.length;m++)h[m]<h[f]&&(f=m);return f}),a=new Array(e).fill(0);for(let h of l)a[h]++;for(let h=0;h<e;h++){if(a[h]>0)continue;let f=-1,m=Number.POSITIVE_INFINITY;for(let u=0;u<s;u++){if(a[l[u]]<2)continue;let g=t[u][h]-t[u][l[u]];g<m&&(m=g,f=u)}a[l[f]]--,l[f]=h,a[h]++}return l}let o=null,n=Number.POSITIVE_INFINITY,c=new Array(s),r=new Array(e).fill(0),i=(l,a,h)=>{if(!(a>=n||e-h>s-l)){if(l===s){n=a,o=c.slice();return}for(let f=0;f<e;f++)c[l]=f,r[f]++,i(l+1,a+t[l][f],h+(r[f]===1?1:0)),r[f]--}};if(i(0,0,0),!o)throw new Error("morphicons: no valid surjection (B < S)");return o}function _t(t,s){let e=t.length*s,o=new Float64Array(2*e),n=new Float64Array(2*e);t.forEach((f,m)=>{o.set(f.a,2*s*m),n.set(f.bO,2*s*m)});let c=C(o),r=lt(o,n,c,C(n));if(r.res>=ae)return;let i=Math.cos(-r.theta),l=Math.sin(-r.theta),a=Math.cos(r.theta),h=Math.sin(r.theta);for(let f of t){let m=0,u=0;for(let k=0;k<s;k++){let S=f.bO[2*k]-f.cb[0],I=f.bO[2*k+1]-f.cb[1];f.bT[2*k]=(S*i-I*l)/r.sigma,f.bT[2*k+1]=(S*l+I*i)/r.sigma;let A=r.sigma*(a*f.aC[2*k]-h*f.aC[2*k+1])-S,N=r.sigma*(h*f.aC[2*k]+a*f.aC[2*k+1])-I;m+=A*A+N*N,u+=S*S+I*I}f.theta=r.theta,f.lnSigma=Math.log(r.sigma),f.res=u>1e-12?Math.sqrt(m/u):0;let g=Math.exp(f.lnSigma),d=Math.cos(f.theta)*g,M=Math.sin(f.theta)*g,y=f.ca[0]-c[0],x=f.ca[1]-c[1],p=y*d-x*M-y,b=y*M+x*d-x;f.block={off:[y,x],drift:[f.cb[0]-f.ca[0]-p,f.cb[1]-f.ca[1]-b]}}}function $t(t,s){let e=t.length,o=s.length,n=[];if(e===o){let c=he(H(t,s));for(let r=0;r<e;r++)n.push([r,c[r]])}else if(e<o){let c=Mn(H(s,t));for(let r=0;r<o;r++)n.push([c[r],r])}else{let c=Mn(H(t,s));for(let r=0;r<e;r++)n.push([r,c[r]])}return n}function qt(t,s,e,o,n,c){let r=t.length/2,i=ue(t,s,e,o,n,c),l=i.a,a=new Float64Array(2*r),h=new Float64Array(2*r),f=new Float64Array(2*r),m=Math.cos(-i.theta),u=Math.sin(-i.theta);for(let g=0;g<r;g++){a[2*g]=l[2*g]-i.ca[0],a[2*g+1]=l[2*g+1]-i.ca[1];let d=i.b[2*g]-i.cb[0],M=i.b[2*g+1]-i.cb[1];h[2*g]=(d*m-M*u)/i.sigma,h[2*g+1]=(d*u+M*m)/i.sigma,f[2*g]=i.b[2*g],f[2*g+1]=i.b[2*g+1]}return{a:l,aC:a,bT:h,bO:f,ca:i.ca,cb:i.cb,theta:i.theta,lnSigma:Math.log(i.sigma),res:i.res,closed:e&&o,block:null}}function xt(t,s){let e=t.length,o=s.length;if(e===0||o===0)throw new Error("morphicons: icon has no subpaths");let n=t.map(i=>i.pts),c=s.map(i=>i.pts),r=$t(n,c).map(([i,l])=>qt(n[i],c[l],t[i].closed,s[l].closed,!0));return r.length>1&&_t(r,n[0].length/2),{items:r,n:n[0].length/2}}function Rt(t,s,e){let o=6*s,n=1-e,c=3*n*n,r=6*n*e,i=3*e*e,l=c*(t[o+2]-t[o])+r*(t[o+4]-t[o+2])+i*(t[o+6]-t[o+4]),a=c*(t[o+3]-t[o+1])+r*(t[o+5]-t[o+3])+i*(t[o+7]-t[o+5]);return Math.hypot(l,a)}function Dt(t,s,e=1){let o=e/2,n=0;for(let c=0;c<4;c++)n+=me[c]*(Rt(t,s,o+o*bn[c])+Rt(t,s,o-o*bn[c]));return n*o}function ge(t,s,e,o,n){let c=6*s,r=1-e,i=r*r*r,l=3*r*r*e,a=3*r*e*e,h=e*e*e;o[n]=i*t[c]+l*t[c+2]+a*t[c+4]+h*t[c+6],o[n+1]=i*t[c+1]+l*t[c+3]+a*t[c+5]+h*t[c+7]}function yn(t,s,e){let o=6*s,n=e?o+6:o,c=e?-1:1;for(let r of e?[4,2,0]:[2,4,6]){let i=c*(t[o+r]-t[n]),l=c*(t[o+r+1]-t[n+1]);if(i*i+l*l>1e-18)return[i,l]}return null}function pe(t,s=xn){let e=t.pts,o=(e.length/2-1)/3,n=[];for(let i=0;i<o;i++)Dt(e,i)>1e-9&&n.push(i);if(n.length===0)return[];let c=new Set,r=(i,l)=>{let a=yn(e,i,!0),h=yn(e,l,!1);!a||!h||Math.abs(Math.atan2(a[0]*h[1]-a[1]*h[0],a[0]*h[0]+a[1]*h[1]))>s&&c.add(l)};for(let i=0;i+1<n.length;i++)r(n[i],n[i+1]);return t.closed&&n.length>1&&r(n[n.length-1],n[0]),[...c].sort((i,l)=>i-l)}function de(t,s,e,o){if(e<=0)return 0;if(e>=o)return 1;let n=0,c=1,r=e/o;for(let i=0;i<12;i++){let l=Dt(t,s,r)-e;if(Math.abs(l)<1e-10*o+1e-14)break;l>0?c=r:n=r;let a=Rt(t,s,r),h=a>1e-12?r-l/a:(n+c)/2;h>n&&h<c||(h=(n+c)/2),r=h}return r}function ft(t,s=64,e=xn){let o=t.pts,n=(o.length/2-1)/3,c=new Float64Array(2*s),r=()=>{for(let p=0;p<s;p++)c[2*p]=o[0],c[2*p+1]=o[1];return c};if(n<1)return r();let i=new Array(n),l=0;for(let p=0;p<n;p++)i[p]=Dt(o,p),l+=i[p];if(l<1e-12)return r();let a=pe(t,e),h=t.closed?a.length>0?a:[0]:[...new Set([0,...a,n])].sort((p,b)=>p-b),f=[];if(t.closed)for(let p=0;p<h.length;p++){let b=h[p],k=p+1<h.length?h[p+1]:h[0]+n;f.push([b,k])}else for(let p=0;p+1<h.length;p++)f.push([h[p],h[p+1]]);let m=f.map(([p,b])=>{let k=0;for(let S=p;S<b;S++)k+=i[S%n];return k}),u=t.closed?s:s-1;if(f.length>u)throw new Error(`morphicons: N=${s} too small (${f.length} runs)`);let g=m.reduce((p,b)=>p+b,0)||1,d=m.map(p=>u*p/g),M=d.map(p=>Math.max(1,Math.floor(p))),y=u-M.reduce((p,b)=>p+b,0);if(y>0){let p=d.map((b,k)=>[Math.round((b-Math.floor(b))*1e9),k]).sort((b,k)=>k[0]-b[0]||b[1]-k[1]);for(let b=0;b<y;b++)M[p[b%M.length][1]]++}for(;y<0;){let p=0;for(let b=1;b<M.length;b++)M[b]>M[p]&&(p=b);if(M[p]<=1)break;M[p]--,y++}let x=0;for(let p=0;p<f.length;p++){let[b,k]=f[p],S=M[p],I=m[p],A=6*(b%n);c[2*x]=o[A],c[2*x+1]=o[A+1],x++;let N=b,v=0;for(let T=1;T<S;T++){let R=I*T/S;for(;N<k-1&&v+i[N%n]<R;)v+=i[N%n],N++;let L=N%n,_=i[L];ge(o,L,_>1e-12?de(o,L,R-v,_):0,c,2*x),x++}}if(!t.closed){let p=6*n;c[2*x]=o[p],c[2*x+1]=o[p+1]}return c}function wn(t,s=64){return Y(t).map(e=>({pts:ft(e,s),closed:e.closed}))}var ie,le,ae,fe,xn,bn,me,Gt=dt(()=>{yt();ie=.35,le=.05,ae=.005,fe=8;xn=Math.PI/8,bn=[.18343464249564978,.525532409916329,.7966664774136267,.9602898564975363],me=[.362683783378362,.31370664587788727,.22238103445337448,.10122853629037626]});function q(t){if(typeof t=="string")return"stroke";for(let[,s]of t)if(wt(s.fill))return"fill";return"stroke"}function Yt(t){return typeof t=="string"||q(t)==="stroke"?t:t.filter(([,s])=>!Wt(s))}function kt(t){return typeof t!="string"&&t.length===1&&"data-region"in t[0][1]}function U(t,s,e){let o=e.length/2,n=!1;for(let c=0,r=o-1;c<o;r=c++){let i=e[2*c+1],l=e[2*r+1];i>s!=l>s&&t<(e[2*r]-e[2*c])*(s-i)/(l-i)+e[2*c]&&(n=!n)}return n}function ut(t,s,e,o,n,c){let r=n-e,i=c-o,l=r*r+i*i,a=l>0?((t-e)*r+(s-o)*i)/l:0;a=a<0?0:a>1?1:a;let h=t-e-a*r,f=s-o-a*i;return Math.sqrt(h*h+f*f)}function z(t){let s=t.length/2,e=0;for(let o=0,n=s-1;o<s;n=o++)e+=t[2*n]*t[2*o+1]-t[2*o]*t[2*n+1];return e/2}var kn,wt,Wt,zt=dt(()=>{kn="data-region",wt=t=>t!==void 0&&String(t).trim().toLowerCase()!=="none";Wt=t=>Number.parseFloat(String(t.opacity))<.5||Number.parseFloat(String(t["fill-opacity"]))<.5});var Dn={};cn(Dn,{buildRegionPlan:()=>Xt,isRegion:()=>kt,paintOf:()=>q,regionContours:()=>Rn,regionOf:()=>tt,regionPlan:()=>$n,regionPlanFrom:()=>qn,resampleRegion:()=>Bt,toRegion:()=>_n});function ye(t,s){let e=s.length/2,o=0;for(let n=0;n<t.length;n+=6)for(let c=0;;c++){if(c===e)return!0;let r=(o+c)%e,i=(r+1)%e;if(ut(t[n],t[n+1],s[2*r],s[2*r+1],s[2*i],s[2*i+1])<=be){o=r;break}}return!1}function Bt(t,s){let e=Y(t),o=c=>e.map(r=>{let i;for(let a of Me)try{i=ft({pts:r.pts,closed:!0},c,a);break}catch{}let l=i;return{pts:l,closed:!0,hole:z(l)<0}}),n=o(s??64);return s||!e.some((c,r)=>ye(c.pts,n[r].pts))?n:o(128)}function ke(t,s){let e=t.length,o=new Float64Array(e);for(let n=0;n<e;n++)o[n]=(t[n]+s[n])/2;for(let n=0;n<e;n+=2){let c=o[n],r=o[n+1],i=o[(n+2)%e]-c,l=o[(n+3)%e]-r;for(let a=n+4;a<e-(n?0:2);a+=2){let h=o[a],f=o[a+1],m=o[(a+2)%e]-h,u=o[(a+3)%e]-f;if(!((i*(f-r)-l*(h-c))*(i*(f+u-r)-l*(h+m-c))>=0)&&(m*(r-f)-u*(c-h))*(m*(r+l-f)-u*(c+i-h))<0)return!0}}return!1}function Ie(t,s){let e=t.length/2,o=e>64?2:1,n=(f,m)=>o>1?f.filter((u,g)=>(g>>1)%2===m):f,c=n(t,0),r=C(c),i=[n(s,0),n(s,1)],l=i.map(C),a=[];for(let f=0;f<e;f++){let m=f%o,u=lt(c,K(i[m],(f-m)/o),r,l[m]);a.push([f,u.res+In*Math.abs(u.theta)/Math.PI])}a.sort((f,m)=>f[1]-m[1]);let h;for(let[f,m]of a.slice(0,we)){if(m>a[0][1]+xe)break;let u=qt(t,K(s,f),!1,!1,!1,In);if(u.closed=!0,h??=u,!ke(n(u.aC,0),n(u.bT,0)))return u}return h}function Ae(t,s){let e=t.length/2,o=-1,n=1/0;return s.forEach((c,r)=>{if(c.hole)return;let i=0;for(let a of[0,Math.floor(e/3),Math.floor(2*e/3)])U(t[2*a],t[2*a+1],c.pts)&&i++;if(i<2)return;let l=Math.abs(z(c.pts));l<n&&(n=l,o=r)}),o}function An(t,s,e,o){let n=t.length,c=e.length,r=new Array(n).fill(-1),i=new Array(c).fill(0);if((c+1)**n>1e5){let f=[];for(let m=0;m<n;m++)for(let u=0;u<c;u++)t[m][u]<1/0&&f.push([t[m][u],m,u]);f.sort((m,u)=>m[0]-u[0]);for(let[,m,u]of f)r[m]<0&&!i[u]&&(r[m]=u,i[u]=1);for(let m=0;m<n;m++)if(!(r[m]>=0))for(let u=0;u<c;u++)!e[u]&&(r[m]<0||t[m][u]<t[m][r[m]])&&(r[m]=u);return r}let l=r.slice(),a=1/0,h=(f,m,u)=>{if(!(m>=a||o&&c-u>n-f)){if(f===n){a=m,l=r.slice();return}for(let g=0;g<c;g++)e[g]&&i[g]||!(t[f][g]<1/0)||(r[f]=g,i[g]++,h(f+1,m+t[f][g],u+(i[g]===1?1:0)),i[g]--);r[f]=-1,h(f+1,m+s[f],u)}};return h(0,0,0),l}function Nt(t,s,e,o,n,c){let r=Math.cos(n)*c,i=Math.sin(n)*c,l=t-e[0],a=s-e[1];return[o[0]+l*r-a*i,o[1]+l*i+a*r]}function Qt(t,s){let e=new Float64Array(2*s);for(let o=0;o<2*s;o+=2)e[o]=t[0],e[o+1]=t[1];return e}function ht(t,s,e,o,n){let c=t.length/2,r=Math.exp(e.lnSigma),i=new Float64Array(2*c),l=new Float64Array(2*c),a=0;for(let m=0;m<2*c;m+=2)i[m]=t[m]-e.ca[0],i[m+1]=t[m+1]-e.ca[1],[l[m],l[m+1]]=Nt(s[m],s[m+1],e.cb,[0,0],-e.theta,1/r),a+=(s[m]-e.cb[0])**2+(s[m+1]-e.cb[1])**2;let h=0,f=1/0;for(let m=0;m<c&&f>0;m++){let u=0;for(let g=0;g<c&&u<f;g++){let d=(g+m)%c;u+=(i[2*g]-l[2*d])**2+(i[2*g+1]-l[2*d+1])**2}u<f&&(f=u,h=m)}return{a:t,aC:i,bT:K(l,h),bO:K(s,h),ca:e.ca,cb:e.cb,theta:e.theta,lnSigma:e.lnSigma,res:a>1e-12?Math.sqrt(r*r*f/a):0,closed:!0,hole:o,half:n,block:e.block}}function It(t,s,e){let o=Math.exp(s.lnSigma),[n,c]=C(t),{aC:r,bT:i}=s,l=e?s.bO:s.a,a=0,h=0,f=0;for(let u=0;u<r.length;u+=2){let g=1/((l[u]-n)**2+(l[u+1]-c)**2+1e-9);a+=g,h+=g*(i[u]-r[u]),f+=g*(i[u+1]-r[u+1])}a=(e?-.5:.5)/a,e&&([n,c]=Nt(n,c,s.cb,s.ca,-s.theta,1/o)),n+=a*h,c+=a*f;let m=Qt(e?[n,c]:Nt(n,c,s.ca,s.cb,s.theta,o),t.length/2);return e?ht(m,t,s,!0,1):ht(t,m,s,!0,0)}function Vt(t,s,e){let o=0;for(let n of[.25,.5,.75]){if(!(Nn(t,n)%1))continue;let[c,r,...i]=[t,s,...e.filter(l=>l!==t)].map(l=>l.aC.map((a,h)=>a+Nn(l,n)*(l.bT[h]-a)));for(let l=0;l<c.length;l+=2)(!U(c[l],c[l+1],r)||i.some(a=>U(c[l],c[l+1],a)))&&o++}return o}function vn(t,s,e){let o=C(t),n={ca:o,cb:o,theta:0,lnSigma:0,block:null},c=Qt(o,t.length/2);return[t,...s].map((r,i)=>e?ht(c,r,n,i>0):ht(r,c,n,i>0))}function Tn(t){let s=[t[0],t[1],t[0],t[1]];for(let e=2;e<t.length;e+=2)s[0]=Math.min(s[0],t[e]),s[1]=Math.min(s[1],t[e+1]),s[2]=Math.max(s[2],t[e]),s[3]=Math.max(s[3],t[e+1]);return s}function ve(t,s,e){let o=Math.exp(e.lnSigma),n=H(t,s),c=s.map(r=>{let i=new Float64Array(r.length);for(let l=0;l<r.length;l+=2)[i[l],i[l+1]]=Nt(r[l],r[l+1],e.cb,e.ca,-e.theta,1/o);return Tn(i)});return t.forEach((r,i)=>{let l=Tn(r);c.forEach((a,h)=>{let f=Math.min(l[2],a[2])-Math.max(l[0],a[0]),m=Math.min(l[3],a[3])-Math.max(l[1],a[1]),u=f>0&&m>0?f*m:0,g=(l[2]-l[0])*(l[3]-l[1])+(a[2]-a[0])*(a[3]-a[1])-u;u>=Ne*g||(n[i][h]=1/0)})}),n}function Pn(t){let s=[];t.forEach((o,n)=>{o.hole||s.push(n)});let e=s.map(()=>[]);return t.forEach(o=>{if(!o.hole)return;let n=s.indexOf(Ae(o.pts,t));if(n<0){let[c,r]=C(o.pts),i=1/0;s.forEach((l,a)=>{let[h,f]=C(t[l].pts),m=Math.hypot(h-c,f-r);m<i&&(i=m,n=a)})}e[n].push(o.pts)}),{outers:s.map(o=>t[o].pts),holes:e}}function Te(t){let s=t.length,e=new Float64Array(2*s);for(let o=0;o<s;o+=2){let n=(o+2)%s;e[2*o]=t[o],e[2*o+1]=t[o+1],e[2*o+2]=(t[o]+t[n])/2,e[2*o+3]=(t[o+1]+t[n+1])/2}return e}function Xt(t,s){let e=Math.max(t[0].pts.length,s[0].pts.length)/2,o=u=>u[0].pts.length/2<e?u.map(g=>({...g,pts:Te(g.pts)})):u,n=Pn(o(t)),c=Pn(o(s));if(n.outers.length===0||c.outers.length===0)throw new Error("morphicons: region has no outer contour");let r,i=n.outers.length,l=c.outers.length,[a,h]=i<l?[c,n]:[n,c];i===l||h.holes.every(u=>u.length===0)?r=$t(n.outers,c.outers):r=An(H(a.outers,h.outers),a.outers.map(u=>Sn+Se(u)),h.holes.map(u=>u.length>0),!0).map((u,g)=>i<l?[u,g]:[g,u]);let f=[],m=!1;for(let[u,g]of r){if(u<0||g<0){m=!0,f.push(...u<0?vn(c.outers[g],c.holes[g],!0):vn(n.outers[u],n.holes[u],!1));continue}let d=Ie(n.outers[u],c.outers[g]);d.hole=!1,f.push(d);let M=n.holes[u],y=c.holes[g],x=An(ve(M,y,d),M.map(()=>Sn),y.map(()=>!0),!1),p=M.map((b,k)=>x[k]<0?It(b,d,!1):ht(b,y[x[k]],d,!0));y.forEach((b,k)=>{x.includes(k)||p.push(It(b,d,!0))});for(let b=0;b<p.length;b++){let k=p[b];if(k.half!==void 0){m=!0;continue}let S=Vt(k,d,p);S&&(p.splice(b,1,It(k.a,d,!1),It(k.bO,d,!0)),Vt(p[b],d,p)+Vt(p[b+1],d,p)>=S&&p.splice(b,2,k))}f.push(...p)}return f.length>1&&!m&&_t(f,e),{items:f,n:e}}function On(t,s){let e=[],o=[];for(let{pts:n,closed:c}of Y(t)){let r=[n[0],n[1]];for(let i=0;i+7<n.length;i+=6){let l=n[i],a=n[i+1],h=n[i+2],f=n[i+3],m=n[i+4],u=n[i+5],g=n[i+6],d=n[i+7],M=Math.max(Math.hypot(l-2*h+m,a-2*f+u),Math.hypot(h-2*m+g,f-2*u+d)),y=Math.min(128,Math.max(1,Math.ceil(Math.sqrt(6*M/(8*s)))));for(let x=1;x<=y;x++){let p=x/y,b=1-p;r.push(b*b*b*l+3*b*b*p*h+3*b*p*p*m+p*p*p*g,b*b*b*a+3*b*b*p*f+3*b*p*p*u+p*p*p*d)}}e.push(Float64Array.from(r)),o.push(c)}return{lines:e,closed:o}}function Ee(t,s,e){if(typeof t=="string")return[{...On(t,e),half:s/2,fill:0}];let o=q(t)==="fill",n=[];for(let c of t){let r=c[1];if(Wt(r))continue;let i=o?St(r.stroke):r.stroke===void 0||St(r.stroke),l=o&&(St(r.fill)||r.fill===void 0&&!i);!i&&!l||n.push({...On([c],e),half:i?Pe(r["stroke-width"],s)/2:0,fill:l?String(r["fill-rule"]??"").trim()==="evenodd"?2:1:0})}return n}function Fn(t,s,e,o,n,c,r){let i=Math.max(0,Math.floor((Math.min(s,o)-c-t.x0)/t.h)),l=Math.min(t.nx-1,Math.ceil((Math.max(s,o)+c-t.x0)/t.h)),a=Math.max(0,Math.floor((Math.min(e,n)-c-t.y0)/t.h)),h=Math.min(t.ny-1,Math.ceil((Math.max(e,n)+c-t.y0)/t.h));for(let f=a;f<=h;f++){let m=t.y0+f*t.h;for(let u=i;u<=l;u++)r(f*t.nx+u,t.x0+u*t.h,m)}}function Ht(t,s,e){let o=t.length/2;o===1&&e(t[0],t[1],t[0],t[1]);for(let n=0;n+1<o;n++)e(t[2*n],t[2*n+1],t[2*n+2],t[2*n+3]);s&&o>2&&e(t[2*o-2],t[2*o-1],t[0],t[1])}function Oe(t,s){let e=new Float32Array(s.nx*s.ny).fill(En),o=2*s.h,n=null;for(let c of t){if(c.half>0){let r=c.half+o;c.lines.forEach((i,l)=>{Ht(i,c.closed[l],(a,h,f,m)=>Fn(s,a,h,f,m,r,(u,g,d)=>{let M=ut(g,d,a,h,f,m)-c.half;M<e[u]&&(e[u]=M)}))})}if(c.fill){n??=new Float32Array(s.nx*s.ny);let r=n;r.fill(En);for(let a of c.lines)Ht(a,!0,(h,f,m,u)=>Fn(s,h,f,m,u,o,(g,d,M)=>{let y=ut(d,M,h,f,m,u);y<r[g]&&(r[g]=y)}));let i=[],l=[];for(let a=0;a<s.ny;a++){let h=s.y0+a*s.h,f=[];for(let g of c.lines)Ht(g,!0,(d,M,y,x)=>{M<=h!=x<=h&&f.push([d+(h-M)*(y-d)/(x-M),x>M?1:-1])});f.sort((g,d)=>g[0]-d[0]),i.length=0,l.length=0;for(let[g,d]of f)i.push(g),l.push(d);let m=0,u=0;for(let g=0;g<s.nx;g++){let d=s.x0+g*s.h;for(;m<i.length&&i[m]<d;)u+=l[m++];let M=c.fill===1?u!==0:(u&1)===1,y=a*s.nx+g,x=M?-r[y]:r[y];x<e[y]&&(e[y]=x)}}}}return e}function Fe(t,s){let{nx:e,ny:o,h:n,x0:c,y0:r}=s,i=new Map,l=u=>{if(i.has(u))return u;let g=u>>1,d=g%e,M=(g-d)/e,y=u&1?g+e:g+1,x=t[g],p=Math.min(Math.max(x/(x-t[y]),1e-5),.99999);return i.set(u,u&1?[c+d*n,r+(M+p)*n]:[c+(d+p)*n,r+M*n]),u},a=new Map,h=(u,g)=>{let d=l(u),M=l(g),y=a.get(d);y?y.push(M):a.set(d,[M]);let x=a.get(M);x?x.push(d):a.set(M,[d])};for(let u=0;u+1<o;u++)for(let g=0;g+1<e;g++){let d=u*e+g,M=d+1,y=d+e+1,x=d+e,p=t[d]<0,b=t[M]<0,k=t[y]<0,S=t[x]<0,I=2*d,A=2*M+1,N=2*x,v=2*d+1,T=[];p!==b&&T.push(I),b!==k&&T.push(A),S!==k&&T.push(N),p!==S&&T.push(v),T.length===2?h(T[0],T[1]):T.length===4&&((t[d]+t[M]+t[y]+t[x])/4<0===p?(h(I,A),h(N,v)):(h(v,I),h(A,N)))}let f=[],m=new Set;for(let u of a.keys()){if(m.has(u))continue;let g=[],d=-1,M=u;for(;!m.has(M);){m.add(M);let y=i.get(M);g.push(y[0],y[1]);let x=a.get(M),p=x[0]!==d?x[0]:x[1];d=M,M=p}g.length>=6&&f.push(Float64Array.from(g))}return f}function vt(t,s,e,o,n){let c=t.length/2,r=t[2*(s%c)],i=t[2*(s%c)+1],l=t[2*(e%c)],a=t[2*(e%c)+1],h=-1,f=o;for(let m=s+1;m<e;m++){let u=ut(t[2*(m%c)],t[2*(m%c)+1],r,i,l,a);u>f&&(f=u,h=m)}h<0||(n[h%c]=1,vt(t,s,h,o,n),vt(t,h,e,o,n))}function je(t,s){let e=t.length/2;if(e<4)return t;let o=0,n=-1;for(let i=1;i<e;i++){let l=Math.hypot(t[2*i]-t[0],t[2*i+1]-t[1]);l>n&&(n=l,o=i)}let c=new Uint8Array(e);c[0]=1,c[o]=1,vt(t,0,o,s,c),vt(t,o,e,s,c);let r=[];for(let i=0;i<e;i++)c[i]&&r.push(t[2*i],t[2*i+1]);return Float64Array.from(r)}function Le(t,s){let e=t.length/2;if(e<4)return t;let o=l=>{let a=l%e,h=(l+1)%e;return Math.hypot(t[2*h]-t[2*a],t[2*h+1]-t[2*a+1])},n=[];for(let l=0;l<e;l++)o(l)>=2.5*s&&n.push(l);if(n.length<2)return t;let c=new Uint8Array(e),r=new Map;for(let l=0;l<n.length;l++){let a=n[l],h=n[(l+1)%n.length],f=(h-a-1+e)%e;if(f<1||f>3)continue;let m=0;for(let v=1;v<=f;v++)m+=o(a+v);if(m>3*s)continue;let u=a%e,g=(a+1)%e,d=h%e,M=(h+1)%e,y=t[2*g]-t[2*u],x=t[2*g+1]-t[2*u+1],p=t[2*M]-t[2*d],b=t[2*M+1]-t[2*d+1],k=y*b-x*p;if(Math.abs(Math.atan2(k,y*p+x*b))<Math.PI/12)continue;let S=((t[2*d]-t[2*u])*b-(t[2*d+1]-t[2*u+1])*p)/k,I=[t[2*u]+S*y,t[2*u+1]+S*x],A=(t[2*g]+t[2*d])/2,N=(t[2*g+1]+t[2*d+1])/2;if(!(Math.hypot(I[0]-A,I[1]-N)>2*s)){r.set(g,I);for(let v=2;v<=f+1;v++)c[(a+v)%e]=1}}if(r.size===0)return t;let i=[];for(let l=0;l<e;l++){if(c[l])continue;let a=r.get(l);a?i.push(a[0],a[1]):i.push(t[2*l],t[2*l+1])}return Float64Array.from(i)}function Rn(t,s){let e=s?.cell??.125,o=Ee(t,s?.strokeWidth??2,.004),n=Number.POSITIVE_INFINITY,c=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,i=Number.NEGATIVE_INFINITY,l=0;for(let f of o){l=Math.max(l,f.half);for(let m of f.lines)for(let u=0;u<m.length;u+=2)n=Math.min(n,m[u]),r=Math.max(r,m[u]),c=Math.min(c,m[u+1]),i=Math.max(i,m[u+1])}if(!(r>=n))return[];l+=3*e;let a={x0:n-l,y0:c-l,h:e,nx:Math.ceil((r-n+2*l)/e)+1,ny:Math.ceil((i-c+2*l)/e)+1},h=Fe(Oe(o,a),a).filter(f=>Math.abs(z(f))>.01);return h.map(f=>{let m=0;for(let g of h)g!==f&&U(f[0],f[1],g)&&m++;let u=m%2===1;return Le(je(z(f)>0==!u?f:at(f),e*.08),e)})}function _n(t,s){if(kt(t))return t;let e="";for(let o of Rn(t,s)){e+=`M${At(o[0])} ${At(o[1])}`;for(let n=2;n<o.length;n+=2)e+=`L${At(o[n])} ${At(o[n+1])}`;e+="Z"}if(!e)throw new Error("morphicons: icon has no visible surface");return[["path",{d:e,fill:"currentColor",stroke:"none","fill-rule":"nonzero",[kn]:"1"}]]}function tt(t,s){if(kt(t))return t;let e=q(t)==="fill"&&!t.some(([,r])=>St(r.stroke)&&r["stroke-width"]===void 0)?0:s,o=typeof t=="string"?void 0:jn.get(t),n=o?.get(e);if(n)return n;let c=`${e}|${typeof t=="string"?t:JSON.stringify(t)}`;return n=J.get(c),n?J.delete(c):n=_n(t,{strokeWidth:s}),J.set(c,n),J.size>64&&J.delete(J.keys().next().value),typeof t!="string"&&(o||(o=new Map,jn.set(t,o)),o.set(e,n)),n}function Ut(t){let s=Ln.get(t);return s||(s=Bt(t),Ln.set(t,s)),s}function $n(t,s,e){let o=tt(t,e),n=tt(s,e),c=Cn.get(o);c||(c=new WeakMap,Cn.set(o,c));let r=c.get(n);return r||(r=Xt(Ut(o),Ut(n)),c.set(n,r)),r}function qn(t,s,e){return Xt(typeof t=="string"?Bt(tt(t,e)):t,Ut(tt(s,e)))}var Me,be,In,xe,we,Sn,Nn,Se,Ne,En,St,Pe,At,jn,J,Ln,Cn,Gn=dt(()=>{yt();Gt();zt();Me=[Math.PI/4,Math.PI/3,Math.PI/2,Math.PI],be=.3;In=.3,xe=.1,we=16;Sn=1e6;Nn=(t,s)=>Math.min(1,Math.max(0,2*s-(t.half??s)));Se=t=>H([t],[Qt(C(t),t.length/2)])[0][0];Ne=.25;En=1e9,St=t=>t!==void 0&&String(t).trim().toLowerCase()!=="none",Pe=(t,s)=>{let e=typeof t=="number"?t:Number.parseFloat(String(t??""));return Number.isFinite(e)?e:s};At=t=>String(Math.round(t*1e3)/1e3);jn=new WeakMap,J=new Map,Ln=new WeakMap,Cn=new WeakMap;globalThis[Symbol.for("morphicons.region")]={regionOf:tt,regionPlan:$n,regionPlanFrom:qn}});var Ve={};cn(Ve,{_c:()=>nn,createMorph:()=>nn});function ln(t){return t.items.map(()=>new Float64Array(2*t.n))}function Ft(t,s,e){for(let o=0;o<t.items.length;o++){let n=t.items[o],c=e[o],r=t.n,i=Math.exp(n.lnSigma*s),l=n.theta*s,a=Math.cos(l)*i,h=Math.sin(l)*i,f,m;if(n.block){let[g,d]=n.block.off,[M,y]=n.block.drift;f=n.ca[0]+M*s+(g*a-d*h-g),m=n.ca[1]+y*s+(g*h+d*a-d)}else f=n.ca[0]+(n.cb[0]-n.ca[0])*s,m=n.ca[1]+(n.cb[1]-n.ca[1])*s;let u=n.half===void 0?s:Math.min(1,Math.max(0,2*s-n.half));for(let g=0;g<r;g++){let d=n.aC[2*g]+(n.bT[2*g]-n.aC[2*g])*u,M=n.aC[2*g+1]+(n.bT[2*g+1]-n.aC[2*g+1])*u;c[2*g]=f+d*a-M*h,c[2*g+1]=m+d*h+M*a}}}var an=class{x=1;v=0;k=250;c=24;config(t,s){this.k=t,this.c=s}start(){this.x=0,this.v>14&&(this.v=14),this.v<-14&&(this.v=-14)}step(t){let s=Math.max(1,Math.min(16,Math.ceil(t/.004166666666666667))),e=t/s;for(let o=0;o<s;o++){let n=this.k*(1-this.x)-this.c*this.v;this.v+=n*e,this.x+=this.v*e}return Math.abs(1-this.x)<.001&&Math.abs(this.v)<.02}},jt={smooth:{k:170,c:26},snappy:{k:420,c:30},bouncy:{k:300,c:14}};yt();Gt();zt();var gt=new Set,Q=0,nt=-1;function Xn(t){let s=nt<0?0:Math.min(Math.max((t-nt)/1e3,0),.1);nt=t;for(let e of[...gt])e(s);gt.size>0?Q=requestAnimationFrame(Xn):(Q=0,nt=-1)}function Ce(t){gt.add(t),Q===0&&(nt=-1,Q=requestAnimationFrame(Xn))}function Re(t){gt.delete(t),gt.size===0&&Q!==0&&(cancelAnimationFrame(Q),Q=0,nt=-1)}var Wn=new WeakMap,Yn=new WeakMap,zn=new WeakMap;function Zn(t){return typeof t=="string"||q(t)==="stroke"?Y(t):Yt(t).flatMap(s=>{let e=Y([s]),o=String(s[1]["fill-rule"]).trim()==="evenodd",n=0;for(let c of e)n+=z(c.pts);for(let c of e){let r=n<0;if(o){let i=!0;for(let l of e)l!==c&&U(c.pts[0],c.pts[1],l.pts)&&(i=!i);r=z(c.pts)>0!==i}r&&(c.pts=at(c.pts))}return e})}function B(t){if(typeof t=="string")return wn(t);let s=Wn.get(t);return s||(s=Zn(t).map(e=>({pts:ft(e,64),closed:e.closed})),Wn.set(t,s)),s}function _e(t){if(typeof t=="string")return t;let s=Yn.get(t);return s||(s=pn(Zn(t)),Yn.set(t,s)),s}function $e(t,s){if(typeof t=="string"||typeof s=="string")return xt(B(t),B(s));let e=zn.get(t);e||(e=new WeakMap,zn.set(t,e));let o=e.get(s);return o||(o=xt(B(t),B(s)),e.set(s,o)),o}var G=null,mt=null,Kt=0,tn=!1,Vn,Zt=0,Kn=()=>Promise.resolve().then(()=>(Gn(),Dn));var qe=t=>new Promise((s,e)=>{let o=document.createElement("script");o.type="module",o.onload=o.onerror=()=>{o.remove();let n=globalThis[Symbol.for("morphicons.region")];n?s(n):e(new Error(t))},o.src=`${t}#${Date.now()}`,document.head.append(o)}),De=()=>{let t=/import\(\s*["'`]([^"'`]+)/.exec(String(Kn))?.[1],s=/\w+:\/\/[^\s)]+?(?=:\d+:\d+)/.exec(String(new Error().stack))?.[0];try{return t&&new URL(t,s).href}catch{}};function Jt(){if(G)return Promise.resolve(G);if(!mt){Kt=Date.now();let t=Vn,s=Zt;mt=Kn().catch(e=>t?qe(t):Promise.reject(e)).then(e=>(s===Zt&&(G=e),e),e=>{throw s!==Zt||(mt=null,tn=!0,Vn??=/dynamically imported module:?\s*(\S+)/i.exec(String(e?.message))?.[1]??De()),e})}return mt}var Ge=()=>new Promise((t,s)=>{if(!(typeof navigator>"u")&&navigator.connection?.saveData)return;let e=()=>{tn?s():Jt().then(t,s)};typeof requestIdleCallback=="function"?requestIdleCallback(e,{timeout:2e3}):setTimeout(e,200)}),Hn=100,We=t=>t==="stroke"?{fill:"none",stroke:"inherit"}:{fill:"currentColor",stroke:t==="fill"?"none":"inherit","fill-rule":"nonzero"},Un=new WeakMap,Bn=new WeakSet;function Qn(t){if(typeof t=="string"||q(t)==="stroke")return"stroke";let s=Un.get(t);if(s)return s;let e=0,o=-1;s="fill";for(let n of Yt(t)){let c=wt(n[1].stroke),r=wt(n[1].fill)||n[1].fill===void 0&&!c;c&&(s="both");let i=0;for(let l of Y([n]))i+=Math.abs(z(l.pts));r?e+=i:c&&(o=Math.max(o,0)+i)}return o>1.5*e&&(s="stroke"),Un.set(t,s),s}function Ye(t,s){let o=({pts:n,closed:c},r)=>{n.length>128&&(n=n.filter((h,f)=>f%4<2));let i=C(n),l=n.map((h,f)=>h-i[f&1]),a=new Float64Array(128);return{aC:r?a:l,bT:r?l:a,ca:i,cb:i,theta:0,lnSigma:0,closed:c,half:r,block:null}};return{n:64,items:[...t.map(n=>o(n,0)),...s.map(n=>o(n,1))]}}function ze(t){if(typeof t=="string")return jt[t];let s=jt.snappy;return{k:t?.stiffness??s.k,c:t?.damping??s.c}}function nn(t,s,e){let o=new an,n=e?.reducedMotion??"never",c=e?.strokeWidth??2,r=s,i=!0,l=null,a=null,h=null,f=1,m=!1,u=!1,g=!1,d=!1,M=null,y="stroke",x=!Bn.has(t),p=0,b="stroke",k=null,S=w=>{if(!(w===y&&x)){for(let[P,E]of Object.entries(We(w)))t.setAttribute(P,E);y=w,x=!0,Bn.add(t)}},I=w=>{let P=G&&q(w)==="fill"?G.regionOf(w,c):w;t.setAttribute("d",_e(P)),S(Qn(P))},A=w=>{let P=r;w.then(()=>{!u&&i&&r===P&&M===null&&I(P)},()=>{})};I(s),q(s)==="fill"&&!G&&A(Ge());let N=w=>p?w<.5?[0,p]:[p,l?.items.length??0]:[0,l?.items.length??0],v=w=>{let P=l,E=a,F=h;if(!P||!E||!F)return;f=w,Ft(P,w,E),d=!0;let[$,D]=N(w);p&&S(w<.5?b:Qn(r)),t.setAttribute("d",Ct(E.slice($,D),F.slice($,D)))},T=()=>{m&&(m=!1,Re(R))},R=w=>{let P=o.step(w);v(o.x),P&&(T(),L())},L=()=>{i=!0,l=null,a=null,h=null,f=1,o.x=1,o.v=0,g=!1,p=0,I(r),q(r)==="fill"&&!G&&(mt||!tn)&&A(Jt())},_=()=>{let w=l,P=a;if(i||!w||!P)return B(r);let[E,F]=N(f);return P.slice(E,F).map(($,D)=>({pts:Float64Array.from($),closed:w.items[E+D].closed,hole:w.items[E+D].hole}))},et=w=>!i&&g||q(w)==="fill"||q(r)==="fill",ot=(w,P)=>{if(!i&&l&&a&&!d&&(f=0,Ft(l,0,a)),P||!i&&p){let E=_();k=i?r:null,b=y,l=Ye(E,B(w)),p=E.length,g=!1}else if(et(w)){let E=G;l=i||!a?E.regionPlan(r,w,c):E.regionPlanFrom(g?_():Ct(a,h??void 0),w,c),g=!0,p=0,S("fill")}else l=i?$e(r,w):xt(_(),B(w)),g=!1;a=ln(l),d=!1,h=l.items.map(E=>E.closed),r=w,i=!1},X=(w,P,E)=>{if(G||!i&&p||!et(w))return!1;let F={};M=F;let $=()=>{u||M!==F||(M=null,E())},D=Jt();if(Date.now()-Kt>Hn)return $(),!0;let pt=setTimeout($,Hn-(Date.now()-Kt));return D.then(()=>{clearTimeout(pt),!(u||M!==F)&&(M=null,P())},()=>{clearTimeout(pt),$()}),!0},st=w=>{T(),M=null,r=w,L()},Z=()=>n==="always"?!0:n!=="user"||typeof matchMedia>"u"?!1:matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,W=(w,P,E=!1)=>{if(u||!E&&X(w,()=>W(w,P),()=>W(w,P,!0)))return;M=null;let F=!i&&l!==null&&w===r;F&&p&&G&&k!==null&&(r=k,i=!0,F=!1),T(),o.v=0,F||ot(w,E),v(P)},rt=(w,P,E)=>{if(u)return;if(w===r&&(i||m)){M=null;return}if(Z()){st(w);return}if(!E&&X(w,()=>rt(w,P,!1),()=>rt(w,P,!0)))return;M=null;let{k:F,c:$}=ze(P);o.config(F,$),ot(w,E),o.start(),m||(m=!0,Ce(R))};return{morphTo:(w,P)=>rt(w,P,!1),set(w){u||st(w)},seek:W,get progress(){return i?1:f},set progress(w){u||W(r,w)},get reducedMotion(){return n},set reducedMotion(w){n=w},get strokeWidth(){return c},set strokeWidth(w){c=w},destroy(){T(),u=!0,M=null,l=null,a=null,h=null}}}return se(Ve);})();

(()=>{var A0=Object.create;var E0=Object.defineProperty;var o0=Object.getOwnPropertyDescriptor;var r0=Object.getOwnPropertyNames;var D0=Object.getPrototypeOf,t0=Object.prototype.hasOwnProperty;var a0=(N,u)=>()=>{try{return u||N((u={exports:{}}).exports,u),u.exports}catch(P){throw u=0,P}};var s0=(N,u,P,g)=>{if(u&&typeof u=="object"||typeof u=="function")for(let f of r0(u))!t0.call(N,f)&&f!==P&&E0(N,f,{get:()=>u[f],enumerable:!(g=o0(u,f))||g.enumerable});return N};var c0=(N,u,P)=>(P=N!=null?A0(D0(N)):{},s0(u||!N||!N.__esModule?E0(P,"default",{value:N,enumerable:!0}):P,N));var B0=a0((W,x0)=>{(function(u,P){typeof W=="object"&&typeof x0=="object"?x0.exports=P():typeof define=="function"&&define.amd?define([],P):typeof W=="object"?W.jsQR=P():u.jsQR=P()})(typeof self<"u"?self:W,function(){return(function(N){var u={};function P(g){if(u[g])return u[g].exports;var f=u[g]={i:g,l:!1,exports:{}};return N[g].call(f.exports,f,f.exports,P),f.l=!0,f.exports}return P.m=N,P.c=u,P.d=function(g,f,l){P.o(g,f)||Object.defineProperty(g,f,{configurable:!1,enumerable:!0,get:l})},P.n=function(g){var f=g&&g.__esModule?function(){return g.default}:function(){return g};return P.d(f,"a",f),f},P.o=function(g,f){return Object.prototype.hasOwnProperty.call(g,f)},P.p="",P(P.s=3)})([(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=(function(){function f(l,s){this.width=s,this.height=l.length/s,this.data=l}return f.createEmpty=function(l,s){return new f(new Uint8ClampedArray(l*s),l)},f.prototype.get=function(l,s){return l<0||l>=this.width||s<0||s>=this.height?!1:!!this.data[s*this.width+l]},f.prototype.set=function(l,s,c){this.data[s*this.width+l]=c?1:0},f.prototype.setRegion=function(l,s,c,o,E){for(var r=s;r<s+o;r++)for(var a=l;a<l+c;a++)this.set(a,r,!!E)},f})();u.BitMatrix=g}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=P(2);function f(s,c){return s^c}u.addOrSubtractGF=f;var l=(function(){function s(c,o,E){this.primitive=c,this.size=o,this.generatorBase=E,this.expTable=new Array(this.size),this.logTable=new Array(this.size);for(var r=1,a=0;a<this.size;a++)this.expTable[a]=r,r=r*2,r>=this.size&&(r=(r^this.primitive)&this.size-1);for(var a=0;a<this.size-1;a++)this.logTable[this.expTable[a]]=a;this.zero=new g.default(this,Uint8ClampedArray.from([0])),this.one=new g.default(this,Uint8ClampedArray.from([1]))}return s.prototype.multiply=function(c,o){return c===0||o===0?0:this.expTable[(this.logTable[c]+this.logTable[o])%(this.size-1)]},s.prototype.inverse=function(c){if(c===0)throw new Error("Can't invert 0");return this.expTable[this.size-this.logTable[c]-1]},s.prototype.buildMonomial=function(c,o){if(c<0)throw new Error("Invalid monomial degree less than 0");if(o===0)return this.zero;var E=new Uint8ClampedArray(c+1);return E[0]=o,new g.default(this,E)},s.prototype.log=function(c){if(c===0)throw new Error("Can't take log(0)");return this.logTable[c]},s.prototype.exp=function(c){return this.expTable[c]},s})();u.default=l}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=P(1),f=(function(){function l(s,c){if(c.length===0)throw new Error("No coefficients.");this.field=s;var o=c.length;if(o>1&&c[0]===0){for(var E=1;E<o&&c[E]===0;)E++;if(E===o)this.coefficients=s.zero.coefficients;else{this.coefficients=new Uint8ClampedArray(o-E);for(var r=0;r<this.coefficients.length;r++)this.coefficients[r]=c[E+r]}}else this.coefficients=c}return l.prototype.degree=function(){return this.coefficients.length-1},l.prototype.isZero=function(){return this.coefficients[0]===0},l.prototype.getCoefficient=function(s){return this.coefficients[this.coefficients.length-1-s]},l.prototype.addOrSubtract=function(s){var c;if(this.isZero())return s;if(s.isZero())return this;var o=this.coefficients,E=s.coefficients;o.length>E.length&&(c=[E,o],o=c[0],E=c[1]);for(var r=new Uint8ClampedArray(E.length),a=E.length-o.length,F=0;F<a;F++)r[F]=E[F];for(var F=a;F<E.length;F++)r[F]=g.addOrSubtractGF(o[F-a],E[F]);return new l(this.field,r)},l.prototype.multiply=function(s){if(s===0)return this.field.zero;if(s===1)return this;for(var c=this.coefficients.length,o=new Uint8ClampedArray(c),E=0;E<c;E++)o[E]=this.field.multiply(this.coefficients[E],s);return new l(this.field,o)},l.prototype.multiplyPoly=function(s){if(this.isZero()||s.isZero())return this.field.zero;for(var c=this.coefficients,o=c.length,E=s.coefficients,r=E.length,a=new Uint8ClampedArray(o+r-1),F=0;F<o;F++)for(var d=c[F],D=0;D<r;D++)a[F+D]=g.addOrSubtractGF(a[F+D],this.field.multiply(d,E[D]));return new l(this.field,a)},l.prototype.multiplyByMonomial=function(s,c){if(s<0)throw new Error("Invalid degree less than 0");if(c===0)return this.field.zero;for(var o=this.coefficients.length,E=new Uint8ClampedArray(o+s),r=0;r<o;r++)E[r]=this.field.multiply(this.coefficients[r],c);return new l(this.field,E)},l.prototype.evaluateAt=function(s){var c=0;if(s===0)return this.getCoefficient(0);var o=this.coefficients.length;if(s===1)return this.coefficients.forEach(function(r){c=g.addOrSubtractGF(c,r)}),c;c=this.coefficients[0];for(var E=1;E<o;E++)c=g.addOrSubtractGF(this.field.multiply(s,c),this.coefficients[E]);return c},l})();u.default=f}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=P(4),f=P(5),l=P(11),s=P(12);function c(r){var a=s.locate(r);if(!a)return null;for(var F=0,d=a;F<d.length;F++){var D=d[F],i=l.extract(r,D),w=f.decode(i.matrix);if(w)return{binaryData:w.bytes,data:w.text,chunks:w.chunks,version:w.version,location:{topRightCorner:i.mappingFunction(D.dimension,0),topLeftCorner:i.mappingFunction(0,0),bottomRightCorner:i.mappingFunction(D.dimension,D.dimension),bottomLeftCorner:i.mappingFunction(0,D.dimension),topRightFinderPattern:D.topRight,topLeftFinderPattern:D.topLeft,bottomLeftFinderPattern:D.bottomLeft,bottomRightAlignmentPattern:D.alignmentPattern}}}return null}var o={inversionAttempts:"attemptBoth"};function E(r,a,F,d){d===void 0&&(d={});var D=o;Object.keys(D||{}).forEach(function(C){D[C]=d[C]||D[C]});var i=D.inversionAttempts==="attemptBoth"||D.inversionAttempts==="invertFirst",w=D.inversionAttempts==="onlyInvert"||D.inversionAttempts==="invertFirst",A=g.binarize(r,a,F,i),x=A.binarized,B=A.inverted,e=c(w?B:x);return!e&&(D.inversionAttempts==="attemptBoth"||D.inversionAttempts==="invertFirst")&&(e=c(w?x:B)),e}E.default=E,u.default=E}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=P(0),f=8,l=24;function s(E,r,a){return E<r?r:E>a?a:E}var c=(function(){function E(r,a){this.width=r,this.data=new Uint8ClampedArray(r*a)}return E.prototype.get=function(r,a){return this.data[a*this.width+r]},E.prototype.set=function(r,a,F){this.data[a*this.width+r]=F},E})();function o(E,r,a,F){if(E.length!==r*a*4)throw new Error("Malformed data passed to binarizer.");for(var d=new c(r,a),D=0;D<r;D++)for(var i=0;i<a;i++){var w=E[(i*r+D)*4+0],A=E[(i*r+D)*4+1],x=E[(i*r+D)*4+2];d.set(D,i,.2126*w+.7152*A+.0722*x)}for(var B=Math.ceil(r/f),e=Math.ceil(a/f),C=new c(B,e),t=0;t<e;t++)for(var n=0;n<B;n++){for(var k=0,m=1/0,v=0,i=0;i<f;i++)for(var D=0;D<f;D++){var M=d.get(n*f+D,t*f+i);k+=M,m=Math.min(m,M),v=Math.max(v,M)}var p=k/Math.pow(f,2);if(v-m<=l&&(p=m/2,t>0&&n>0)){var h=(C.get(n,t-1)+2*C.get(n-1,t)+C.get(n-1,t-1))/4;m<h&&(p=h)}C.set(n,t,p)}var I=g.BitMatrix.createEmpty(r,a),b=null;F&&(b=g.BitMatrix.createEmpty(r,a));for(var t=0;t<e;t++)for(var n=0;n<B;n++){for(var S=s(n,2,B-3),O=s(t,2,e-3),k=0,T=-2;T<=2;T++)for(var y=-2;y<=2;y++)k+=C.get(S+T,O+y);for(var z=k/25,T=0;T<f;T++)for(var y=0;y<f;y++){var D=n*f+T,i=t*f+y,X=d.get(D,i);I.set(D,i,X<=z),F&&b.set(D,i,!(X<=z))}}return F?{binarized:I,inverted:b}:{binarized:I}}u.binarize=o}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=P(0),f=P(6),l=P(9),s=P(10);function c(x,B){for(var e=x^B,C=0;e;)C++,e&=e-1;return C}function o(x,B){return B<<1|x}var E=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,dataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,formatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,dataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],r=[function(x){return(x.y+x.x)%2===0},function(x){return x.y%2===0},function(x){return x.x%3===0},function(x){return(x.y+x.x)%3===0},function(x){return(Math.floor(x.y/2)+Math.floor(x.x/3))%2===0},function(x){return x.x*x.y%2+x.x*x.y%3===0},function(x){return(x.y*x.x%2+x.y*x.x%3)%2===0},function(x){return((x.y+x.x)%2+x.y*x.x%3)%2===0}];function a(x){var B=17+4*x.versionNumber,e=g.BitMatrix.createEmpty(B,B);e.setRegion(0,0,9,9,!0),e.setRegion(B-8,0,8,9,!0),e.setRegion(0,B-8,9,8,!0);for(var C=0,t=x.alignmentPatternCenters;C<t.length;C++)for(var n=t[C],k=0,m=x.alignmentPatternCenters;k<m.length;k++){var v=m[k];n===6&&v===6||n===6&&v===B-7||n===B-7&&v===6||e.setRegion(n-2,v-2,5,5,!0)}return e.setRegion(6,9,1,B-17,!0),e.setRegion(9,6,B-17,1,!0),x.versionNumber>6&&(e.setRegion(B-11,0,3,6,!0),e.setRegion(0,B-11,6,3,!0)),e}function F(x,B,e){for(var C=r[e.dataMask],t=x.height,n=a(B),k=[],m=0,v=0,M=!0,p=t-1;p>0;p-=2){p===6&&p--;for(var h=0;h<t;h++)for(var I=M?t-1-h:h,b=0;b<2;b++){var S=p-b;if(!n.get(S,I)){v++;var O=x.get(S,I);C({y:I,x:S})&&(O=!O),m=o(O,m),v===8&&(k.push(m),v=0,m=0)}}M=!M}return k}function d(x){var B=x.height,e=Math.floor((B-17)/4);if(e<=6)return s.VERSIONS[e-1];for(var C=0,t=5;t>=0;t--)for(var n=B-9;n>=B-11;n--)C=o(x.get(n,t),C);for(var k=0,n=5;n>=0;n--)for(var t=B-9;t>=B-11;t--)k=o(x.get(n,t),k);for(var m=1/0,v,M=0,p=s.VERSIONS;M<p.length;M++){var h=p[M];if(h.infoBits===C||h.infoBits===k)return h;var I=c(C,h.infoBits);I<m&&(v=h,m=I),I=c(k,h.infoBits),I<m&&(v=h,m=I)}if(m<=3)return v}function D(x){for(var B=0,e=0;e<=8;e++)e!==6&&(B=o(x.get(e,8),B));for(var C=7;C>=0;C--)C!==6&&(B=o(x.get(8,C),B));for(var t=x.height,n=0,C=t-1;C>=t-7;C--)n=o(x.get(8,C),n);for(var e=t-8;e<t;e++)n=o(x.get(e,8),n);for(var k=1/0,m=null,v=0,M=E;v<M.length;v++){var p=M[v],h=p.bits,I=p.formatInfo;if(h===B||h===n)return I;var b=c(B,h);b<k&&(m=I,k=b),B!==n&&(b=c(n,h),b<k&&(m=I,k=b))}return k<=3?m:null}function i(x,B,e){var C=B.errorCorrectionLevels[e],t=[],n=0;if(C.ecBlocks.forEach(function(O){for(var T=0;T<O.numBlocks;T++)t.push({numDataCodewords:O.dataCodewordsPerBlock,codewords:[]}),n+=O.dataCodewordsPerBlock+C.ecCodewordsPerBlock}),x.length<n)return null;x=x.slice(0,n);for(var k=C.ecBlocks[0].dataCodewordsPerBlock,m=0;m<k;m++)for(var v=0,M=t;v<M.length;v++){var p=M[v];p.codewords.push(x.shift())}if(C.ecBlocks.length>1)for(var h=C.ecBlocks[0].numBlocks,I=C.ecBlocks[1].numBlocks,m=0;m<I;m++)t[h+m].codewords.push(x.shift());for(;x.length>0;)for(var b=0,S=t;b<S.length;b++){var p=S[b];p.codewords.push(x.shift())}return t}function w(x){var B=d(x);if(!B)return null;var e=D(x);if(!e)return null;var C=F(x,B,e),t=i(C,B,e.errorCorrectionLevel);if(!t)return null;for(var n=t.reduce(function(b,S){return b+S.numDataCodewords},0),k=new Uint8ClampedArray(n),m=0,v=0,M=t;v<M.length;v++){var p=M[v],h=l.decode(p.codewords,p.codewords.length-p.numDataCodewords);if(!h)return null;for(var I=0;I<p.numDataCodewords;I++)k[m++]=h[I]}try{return f.decode(k,B.versionNumber)}catch{return null}}function A(x){if(x==null)return null;var B=w(x);if(B)return B;for(var e=0;e<x.width;e++)for(var C=e+1;C<x.height;C++)x.get(e,C)!==x.get(C,e)&&(x.set(e,C,!x.get(e,C)),x.set(C,e,!x.get(C,e)));return w(x)}u.decode=A}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=P(7),f=P(8),l;(function(d){d.Numeric="numeric",d.Alphanumeric="alphanumeric",d.Byte="byte",d.Kanji="kanji",d.ECI="eci"})(l=u.Mode||(u.Mode={}));var s;(function(d){d[d.Terminator=0]="Terminator",d[d.Numeric=1]="Numeric",d[d.Alphanumeric=2]="Alphanumeric",d[d.Byte=4]="Byte",d[d.Kanji=8]="Kanji",d[d.ECI=7]="ECI"})(s||(s={}));function c(d,D){for(var i=[],w="",A=[10,12,14][D],x=d.readBits(A);x>=3;){var B=d.readBits(10);if(B>=1e3)throw new Error("Invalid numeric value above 999");var e=Math.floor(B/100),C=Math.floor(B/10)%10,t=B%10;i.push(48+e,48+C,48+t),w+=e.toString()+C.toString()+t.toString(),x-=3}if(x===2){var B=d.readBits(7);if(B>=100)throw new Error("Invalid numeric value above 99");var e=Math.floor(B/10),C=B%10;i.push(48+e,48+C),w+=e.toString()+C.toString()}else if(x===1){var B=d.readBits(4);if(B>=10)throw new Error("Invalid numeric value above 9");i.push(48+B),w+=B.toString()}return{bytes:i,text:w}}var o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function E(d,D){for(var i=[],w="",A=[9,11,13][D],x=d.readBits(A);x>=2;){var B=d.readBits(11),e=Math.floor(B/45),C=B%45;i.push(o[e].charCodeAt(0),o[C].charCodeAt(0)),w+=o[e]+o[C],x-=2}if(x===1){var e=d.readBits(6);i.push(o[e].charCodeAt(0)),w+=o[e]}return{bytes:i,text:w}}function r(d,D){for(var i=[],w="",A=[8,16,16][D],x=d.readBits(A),B=0;B<x;B++){var e=d.readBits(8);i.push(e)}try{w+=decodeURIComponent(i.map(function(C){return"%"+("0"+C.toString(16)).substr(-2)}).join(""))}catch{}return{bytes:i,text:w}}function a(d,D){for(var i=[],w="",A=[8,10,12][D],x=d.readBits(A),B=0;B<x;B++){var e=d.readBits(13),C=Math.floor(e/192)<<8|e%192;C<7936?C+=33088:C+=49472,i.push(C>>8,C&255),w+=String.fromCharCode(f.shiftJISTable[C])}return{bytes:i,text:w}}function F(d,D){for(var i,w,A,x,B=new g.BitStream(d),e=D<=9?0:D<=26?1:2,C={text:"",bytes:[],chunks:[],version:D};B.available()>=4;){var t=B.readBits(4);if(t===s.Terminator)return C;if(t===s.ECI)B.readBits(1)===0?C.chunks.push({type:l.ECI,assignmentNumber:B.readBits(7)}):B.readBits(1)===0?C.chunks.push({type:l.ECI,assignmentNumber:B.readBits(14)}):B.readBits(1)===0?C.chunks.push({type:l.ECI,assignmentNumber:B.readBits(21)}):C.chunks.push({type:l.ECI,assignmentNumber:-1});else if(t===s.Numeric){var n=c(B,e);C.text+=n.text,(i=C.bytes).push.apply(i,n.bytes),C.chunks.push({type:l.Numeric,text:n.text})}else if(t===s.Alphanumeric){var k=E(B,e);C.text+=k.text,(w=C.bytes).push.apply(w,k.bytes),C.chunks.push({type:l.Alphanumeric,text:k.text})}else if(t===s.Byte){var m=r(B,e);C.text+=m.text,(A=C.bytes).push.apply(A,m.bytes),C.chunks.push({type:l.Byte,bytes:m.bytes,text:m.text})}else if(t===s.Kanji){var v=a(B,e);C.text+=v.text,(x=C.bytes).push.apply(x,v.bytes),C.chunks.push({type:l.Kanji,bytes:v.bytes,text:v.text})}}if(B.available()===0||B.readBits(B.available())===0)return C}u.decode=F}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=(function(){function f(l){this.byteOffset=0,this.bitOffset=0,this.bytes=l}return f.prototype.readBits=function(l){if(l<1||l>32||l>this.available())throw new Error("Cannot read "+l.toString()+" bits");var s=0;if(this.bitOffset>0){var c=8-this.bitOffset,o=l<c?l:c,E=c-o,r=255>>8-o<<E;s=(this.bytes[this.byteOffset]&r)>>E,l-=o,this.bitOffset+=o,this.bitOffset===8&&(this.bitOffset=0,this.byteOffset++)}if(l>0){for(;l>=8;)s=s<<8|this.bytes[this.byteOffset]&255,this.byteOffset++,l-=8;if(l>0){var E=8-l,r=255>>E<<E;s=s<<l|(this.bytes[this.byteOffset]&r)>>E,this.bitOffset+=l}}return s},f.prototype.available=function(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset},f})();u.BitStream=g}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0}),u.shiftJISTable={32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,58:58,59:59,60:60,61:61,62:62,63:63,64:64,65:65,66:66,67:67,68:68,69:69,70:70,71:71,72:72,73:73,74:74,75:75,76:76,77:77,78:78,79:79,80:80,81:81,82:82,83:83,84:84,85:85,86:86,87:87,88:88,89:89,90:90,91:91,92:165,93:93,94:94,95:95,96:96,97:97,98:98,99:99,100:100,101:101,102:102,103:103,104:104,105:105,106:106,107:107,108:108,109:109,110:110,111:111,112:112,113:113,114:114,115:115,116:116,117:117,118:118,119:119,120:120,121:121,122:122,123:123,124:124,125:125,126:8254,33088:12288,33089:12289,33090:12290,33091:65292,33092:65294,33093:12539,33094:65306,33095:65307,33096:65311,33097:65281,33098:12443,33099:12444,33100:180,33101:65344,33102:168,33103:65342,33104:65507,33105:65343,33106:12541,33107:12542,33108:12445,33109:12446,33110:12291,33111:20189,33112:12293,33113:12294,33114:12295,33115:12540,33116:8213,33117:8208,33118:65295,33119:92,33120:12316,33121:8214,33122:65372,33123:8230,33124:8229,33125:8216,33126:8217,33127:8220,33128:8221,33129:65288,33130:65289,33131:12308,33132:12309,33133:65339,33134:65341,33135:65371,33136:65373,33137:12296,33138:12297,33139:12298,33140:12299,33141:12300,33142:12301,33143:12302,33144:12303,33145:12304,33146:12305,33147:65291,33148:8722,33149:177,33150:215,33152:247,33153:65309,33154:8800,33155:65308,33156:65310,33157:8806,33158:8807,33159:8734,33160:8756,33161:9794,33162:9792,33163:176,33164:8242,33165:8243,33166:8451,33167:65509,33168:65284,33169:162,33170:163,33171:65285,33172:65283,33173:65286,33174:65290,33175:65312,33176:167,33177:9734,33178:9733,33179:9675,33180:9679,33181:9678,33182:9671,33183:9670,33184:9633,33185:9632,33186:9651,33187:9650,33188:9661,33189:9660,33190:8251,33191:12306,33192:8594,33193:8592,33194:8593,33195:8595,33196:12307,33208:8712,33209:8715,33210:8838,33211:8839,33212:8834,33213:8835,33214:8746,33215:8745,33224:8743,33225:8744,33226:172,33227:8658,33228:8660,33229:8704,33230:8707,33242:8736,33243:8869,33244:8978,33245:8706,33246:8711,33247:8801,33248:8786,33249:8810,33250:8811,33251:8730,33252:8765,33253:8733,33254:8757,33255:8747,33256:8748,33264:8491,33265:8240,33266:9839,33267:9837,33268:9834,33269:8224,33270:8225,33271:182,33276:9711,33359:65296,33360:65297,33361:65298,33362:65299,33363:65300,33364:65301,33365:65302,33366:65303,33367:65304,33368:65305,33376:65313,33377:65314,33378:65315,33379:65316,33380:65317,33381:65318,33382:65319,33383:65320,33384:65321,33385:65322,33386:65323,33387:65324,33388:65325,33389:65326,33390:65327,33391:65328,33392:65329,33393:65330,33394:65331,33395:65332,33396:65333,33397:65334,33398:65335,33399:65336,33400:65337,33401:65338,33409:65345,33410:65346,33411:65347,33412:65348,33413:65349,33414:65350,33415:65351,33416:65352,33417:65353,33418:65354,33419:65355,33420:65356,33421:65357,33422:65358,33423:65359,33424:65360,33425:65361,33426:65362,33427:65363,33428:65364,33429:65365,33430:65366,33431:65367,33432:65368,33433:65369,33434:65370,33439:12353,33440:12354,33441:12355,33442:12356,33443:12357,33444:12358,33445:12359,33446:12360,33447:12361,33448:12362,33449:12363,33450:12364,33451:12365,33452:12366,33453:12367,33454:12368,33455:12369,33456:12370,33457:12371,33458:12372,33459:12373,33460:12374,33461:12375,33462:12376,33463:12377,33464:12378,33465:12379,33466:12380,33467:12381,33468:12382,33469:12383,33470:12384,33471:12385,33472:12386,33473:12387,33474:12388,33475:12389,33476:12390,33477:12391,33478:12392,33479:12393,33480:12394,33481:12395,33482:12396,33483:12397,33484:12398,33485:12399,33486:12400,33487:12401,33488:12402,33489:12403,33490:12404,33491:12405,33492:12406,33493:12407,33494:12408,33495:12409,33496:12410,33497:12411,33498:12412,33499:12413,33500:12414,33501:12415,33502:12416,33503:12417,33504:12418,33505:12419,33506:12420,33507:12421,33508:12422,33509:12423,33510:12424,33511:12425,33512:12426,33513:12427,33514:12428,33515:12429,33516:12430,33517:12431,33518:12432,33519:12433,33520:12434,33521:12435,33600:12449,33601:12450,33602:12451,33603:12452,33604:12453,33605:12454,33606:12455,33607:12456,33608:12457,33609:12458,33610:12459,33611:12460,33612:12461,33613:12462,33614:12463,33615:12464,33616:12465,33617:12466,33618:12467,33619:12468,33620:12469,33621:12470,33622:12471,33623:12472,33624:12473,33625:12474,33626:12475,33627:12476,33628:12477,33629:12478,33630:12479,33631:12480,33632:12481,33633:12482,33634:12483,33635:12484,33636:12485,33637:12486,33638:12487,33639:12488,33640:12489,33641:12490,33642:12491,33643:12492,33644:12493,33645:12494,33646:12495,33647:12496,33648:12497,33649:12498,33650:12499,33651:12500,33652:12501,33653:12502,33654:12503,33655:12504,33656:12505,33657:12506,33658:12507,33659:12508,33660:12509,33661:12510,33662:12511,33664:12512,33665:12513,33666:12514,33667:12515,33668:12516,33669:12517,33670:12518,33671:12519,33672:12520,33673:12521,33674:12522,33675:12523,33676:12524,33677:12525,33678:12526,33679:12527,33680:12528,33681:12529,33682:12530,33683:12531,33684:12532,33685:12533,33686:12534,33695:913,33696:914,33697:915,33698:916,33699:917,33700:918,33701:919,33702:920,33703:921,33704:922,33705:923,33706:924,33707:925,33708:926,33709:927,33710:928,33711:929,33712:931,33713:932,33714:933,33715:934,33716:935,33717:936,33718:937,33727:945,33728:946,33729:947,33730:948,33731:949,33732:950,33733:951,33734:952,33735:953,33736:954,33737:955,33738:956,33739:957,33740:958,33741:959,33742:960,33743:961,33744:963,33745:964,33746:965,33747:966,33748:967,33749:968,33750:969,33856:1040,33857:1041,33858:1042,33859:1043,33860:1044,33861:1045,33862:1025,33863:1046,33864:1047,33865:1048,33866:1049,33867:1050,33868:1051,33869:1052,33870:1053,33871:1054,33872:1055,33873:1056,33874:1057,33875:1058,33876:1059,33877:1060,33878:1061,33879:1062,33880:1063,33881:1064,33882:1065,33883:1066,33884:1067,33885:1068,33886:1069,33887:1070,33888:1071,33904:1072,33905:1073,33906:1074,33907:1075,33908:1076,33909:1077,33910:1105,33911:1078,33912:1079,33913:1080,33914:1081,33915:1082,33916:1083,33917:1084,33918:1085,33920:1086,33921:1087,33922:1088,33923:1089,33924:1090,33925:1091,33926:1092,33927:1093,33928:1094,33929:1095,33930:1096,33931:1097,33932:1098,33933:1099,33934:1100,33935:1101,33936:1102,33937:1103,33951:9472,33952:9474,33953:9484,33954:9488,33955:9496,33956:9492,33957:9500,33958:9516,33959:9508,33960:9524,33961:9532,33962:9473,33963:9475,33964:9487,33965:9491,33966:9499,33967:9495,33968:9507,33969:9523,33970:9515,33971:9531,33972:9547,33973:9504,33974:9519,33975:9512,33976:9527,33977:9535,33978:9501,33979:9520,33980:9509,33981:9528,33982:9538,34975:20124,34976:21782,34977:23043,34978:38463,34979:21696,34980:24859,34981:25384,34982:23030,34983:36898,34984:33909,34985:33564,34986:31312,34987:24746,34988:25569,34989:28197,34990:26093,34991:33894,34992:33446,34993:39925,34994:26771,34995:22311,34996:26017,34997:25201,34998:23451,34999:22992,35e3:34427,35001:39156,35002:32098,35003:32190,35004:39822,35005:25110,35006:31903,35007:34999,35008:23433,35009:24245,35010:25353,35011:26263,35012:26696,35013:38343,35014:38797,35015:26447,35016:20197,35017:20234,35018:20301,35019:20381,35020:20553,35021:22258,35022:22839,35023:22996,35024:23041,35025:23561,35026:24799,35027:24847,35028:24944,35029:26131,35030:26885,35031:28858,35032:30031,35033:30064,35034:31227,35035:32173,35036:32239,35037:32963,35038:33806,35039:34915,35040:35586,35041:36949,35042:36986,35043:21307,35044:20117,35045:20133,35046:22495,35047:32946,35048:37057,35049:30959,35050:19968,35051:22769,35052:28322,35053:36920,35054:31282,35055:33576,35056:33419,35057:39983,35058:20801,35059:21360,35060:21693,35061:21729,35062:22240,35063:23035,35064:24341,35065:39154,35066:28139,35067:32996,35068:34093,35136:38498,35137:38512,35138:38560,35139:38907,35140:21515,35141:21491,35142:23431,35143:28879,35144:32701,35145:36802,35146:38632,35147:21359,35148:40284,35149:31418,35150:19985,35151:30867,35152:33276,35153:28198,35154:22040,35155:21764,35156:27421,35157:34074,35158:39995,35159:23013,35160:21417,35161:28006,35162:29916,35163:38287,35164:22082,35165:20113,35166:36939,35167:38642,35168:33615,35169:39180,35170:21473,35171:21942,35172:23344,35173:24433,35174:26144,35175:26355,35176:26628,35177:27704,35178:27891,35179:27945,35180:29787,35181:30408,35182:31310,35183:38964,35184:33521,35185:34907,35186:35424,35187:37613,35188:28082,35189:30123,35190:30410,35191:39365,35192:24742,35193:35585,35194:36234,35195:38322,35196:27022,35197:21421,35198:20870,35200:22290,35201:22576,35202:22852,35203:23476,35204:24310,35205:24616,35206:25513,35207:25588,35208:27839,35209:28436,35210:28814,35211:28948,35212:29017,35213:29141,35214:29503,35215:32257,35216:33398,35217:33489,35218:34199,35219:36960,35220:37467,35221:40219,35222:22633,35223:26044,35224:27738,35225:29989,35226:20985,35227:22830,35228:22885,35229:24448,35230:24540,35231:25276,35232:26106,35233:27178,35234:27431,35235:27572,35236:29579,35237:32705,35238:35158,35239:40236,35240:40206,35241:40644,35242:23713,35243:27798,35244:33659,35245:20740,35246:23627,35247:25014,35248:33222,35249:26742,35250:29281,35251:20057,35252:20474,35253:21368,35254:24681,35255:28201,35256:31311,35257:38899,35258:19979,35259:21270,35260:20206,35261:20309,35262:20285,35263:20385,35264:20339,35265:21152,35266:21487,35267:22025,35268:22799,35269:23233,35270:23478,35271:23521,35272:31185,35273:26247,35274:26524,35275:26550,35276:27468,35277:27827,35278:28779,35279:29634,35280:31117,35281:31166,35282:31292,35283:31623,35284:33457,35285:33499,35286:33540,35287:33655,35288:33775,35289:33747,35290:34662,35291:35506,35292:22057,35293:36008,35294:36838,35295:36942,35296:38686,35297:34442,35298:20420,35299:23784,35300:25105,35301:29273,35302:30011,35303:33253,35304:33469,35305:34558,35306:36032,35307:38597,35308:39187,35309:39381,35310:20171,35311:20250,35312:35299,35313:22238,35314:22602,35315:22730,35316:24315,35317:24555,35318:24618,35319:24724,35320:24674,35321:25040,35322:25106,35323:25296,35324:25913,35392:39745,35393:26214,35394:26800,35395:28023,35396:28784,35397:30028,35398:30342,35399:32117,35400:33445,35401:34809,35402:38283,35403:38542,35404:35997,35405:20977,35406:21182,35407:22806,35408:21683,35409:23475,35410:23830,35411:24936,35412:27010,35413:28079,35414:30861,35415:33995,35416:34903,35417:35442,35418:37799,35419:39608,35420:28012,35421:39336,35422:34521,35423:22435,35424:26623,35425:34510,35426:37390,35427:21123,35428:22151,35429:21508,35430:24275,35431:25313,35432:25785,35433:26684,35434:26680,35435:27579,35436:29554,35437:30906,35438:31339,35439:35226,35440:35282,35441:36203,35442:36611,35443:37101,35444:38307,35445:38548,35446:38761,35447:23398,35448:23731,35449:27005,35450:38989,35451:38990,35452:25499,35453:31520,35454:27179,35456:27263,35457:26806,35458:39949,35459:28511,35460:21106,35461:21917,35462:24688,35463:25324,35464:27963,35465:28167,35466:28369,35467:33883,35468:35088,35469:36676,35470:19988,35471:39993,35472:21494,35473:26907,35474:27194,35475:38788,35476:26666,35477:20828,35478:31427,35479:33970,35480:37340,35481:37772,35482:22107,35483:40232,35484:26658,35485:33541,35486:33841,35487:31909,35488:21e3,35489:33477,35490:29926,35491:20094,35492:20355,35493:20896,35494:23506,35495:21002,35496:21208,35497:21223,35498:24059,35499:21914,35500:22570,35501:23014,35502:23436,35503:23448,35504:23515,35505:24178,35506:24185,35507:24739,35508:24863,35509:24931,35510:25022,35511:25563,35512:25954,35513:26577,35514:26707,35515:26874,35516:27454,35517:27475,35518:27735,35519:28450,35520:28567,35521:28485,35522:29872,35523:29976,35524:30435,35525:30475,35526:31487,35527:31649,35528:31777,35529:32233,35530:32566,35531:32752,35532:32925,35533:33382,35534:33694,35535:35251,35536:35532,35537:36011,35538:36996,35539:37969,35540:38291,35541:38289,35542:38306,35543:38501,35544:38867,35545:39208,35546:33304,35547:20024,35548:21547,35549:23736,35550:24012,35551:29609,35552:30284,35553:30524,35554:23721,35555:32747,35556:36107,35557:38593,35558:38929,35559:38996,35560:39e3,35561:20225,35562:20238,35563:21361,35564:21916,35565:22120,35566:22522,35567:22855,35568:23305,35569:23492,35570:23696,35571:24076,35572:24190,35573:24524,35574:25582,35575:26426,35576:26071,35577:26082,35578:26399,35579:26827,35580:26820,35648:27231,35649:24112,35650:27589,35651:27671,35652:27773,35653:30079,35654:31048,35655:23395,35656:31232,35657:32e3,35658:24509,35659:35215,35660:35352,35661:36020,35662:36215,35663:36556,35664:36637,35665:39138,35666:39438,35667:39740,35668:20096,35669:20605,35670:20736,35671:22931,35672:23452,35673:25135,35674:25216,35675:25836,35676:27450,35677:29344,35678:30097,35679:31047,35680:32681,35681:34811,35682:35516,35683:35696,35684:25516,35685:33738,35686:38816,35687:21513,35688:21507,35689:21931,35690:26708,35691:27224,35692:35440,35693:30759,35694:26485,35695:40653,35696:21364,35697:23458,35698:33050,35699:34384,35700:36870,35701:19992,35702:20037,35703:20167,35704:20241,35705:21450,35706:21560,35707:23470,35708:24339,35709:24613,35710:25937,35712:26429,35713:27714,35714:27762,35715:27875,35716:28792,35717:29699,35718:31350,35719:31406,35720:31496,35721:32026,35722:31998,35723:32102,35724:26087,35725:29275,35726:21435,35727:23621,35728:24040,35729:25298,35730:25312,35731:25369,35732:28192,35733:34394,35734:35377,35735:36317,35736:37624,35737:28417,35738:31142,35739:39770,35740:20136,35741:20139,35742:20140,35743:20379,35744:20384,35745:20689,35746:20807,35747:31478,35748:20849,35749:20982,35750:21332,35751:21281,35752:21375,35753:21483,35754:21932,35755:22659,35756:23777,35757:24375,35758:24394,35759:24623,35760:24656,35761:24685,35762:25375,35763:25945,35764:27211,35765:27841,35766:29378,35767:29421,35768:30703,35769:33016,35770:33029,35771:33288,35772:34126,35773:37111,35774:37857,35775:38911,35776:39255,35777:39514,35778:20208,35779:20957,35780:23597,35781:26241,35782:26989,35783:23616,35784:26354,35785:26997,35786:29577,35787:26704,35788:31873,35789:20677,35790:21220,35791:22343,35792:24062,35793:37670,35794:26020,35795:27427,35796:27453,35797:29748,35798:31105,35799:31165,35800:31563,35801:32202,35802:33465,35803:33740,35804:34943,35805:35167,35806:35641,35807:36817,35808:37329,35809:21535,35810:37504,35811:20061,35812:20534,35813:21477,35814:21306,35815:29399,35816:29590,35817:30697,35818:33510,35819:36527,35820:39366,35821:39368,35822:39378,35823:20855,35824:24858,35825:34398,35826:21936,35827:31354,35828:20598,35829:23507,35830:36935,35831:38533,35832:20018,35833:27355,35834:37351,35835:23633,35836:23624,35904:25496,35905:31391,35906:27795,35907:38772,35908:36705,35909:31402,35910:29066,35911:38536,35912:31874,35913:26647,35914:32368,35915:26705,35916:37740,35917:21234,35918:21531,35919:34219,35920:35347,35921:32676,35922:36557,35923:37089,35924:21350,35925:34952,35926:31041,35927:20418,35928:20670,35929:21009,35930:20804,35931:21843,35932:22317,35933:29674,35934:22411,35935:22865,35936:24418,35937:24452,35938:24693,35939:24950,35940:24935,35941:25001,35942:25522,35943:25658,35944:25964,35945:26223,35946:26690,35947:28179,35948:30054,35949:31293,35950:31995,35951:32076,35952:32153,35953:32331,35954:32619,35955:33550,35956:33610,35957:34509,35958:35336,35959:35427,35960:35686,35961:36605,35962:38938,35963:40335,35964:33464,35965:36814,35966:39912,35968:21127,35969:25119,35970:25731,35971:28608,35972:38553,35973:26689,35974:20625,35975:27424,35976:27770,35977:28500,35978:31348,35979:32080,35980:34880,35981:35363,35982:26376,35983:20214,35984:20537,35985:20518,35986:20581,35987:20860,35988:21048,35989:21091,35990:21927,35991:22287,35992:22533,35993:23244,35994:24314,35995:25010,35996:25080,35997:25331,35998:25458,35999:26908,36e3:27177,36001:29309,36002:29356,36003:29486,36004:30740,36005:30831,36006:32121,36007:30476,36008:32937,36009:35211,36010:35609,36011:36066,36012:36562,36013:36963,36014:37749,36015:38522,36016:38997,36017:39443,36018:40568,36019:20803,36020:21407,36021:21427,36022:24187,36023:24358,36024:28187,36025:28304,36026:29572,36027:29694,36028:32067,36029:33335,36030:35328,36031:35578,36032:38480,36033:20046,36034:20491,36035:21476,36036:21628,36037:22266,36038:22993,36039:23396,36040:24049,36041:24235,36042:24359,36043:25144,36044:25925,36045:26543,36046:28246,36047:29392,36048:31946,36049:34996,36050:32929,36051:32993,36052:33776,36053:34382,36054:35463,36055:36328,36056:37431,36057:38599,36058:39015,36059:40723,36060:20116,36061:20114,36062:20237,36063:21320,36064:21577,36065:21566,36066:23087,36067:24460,36068:24481,36069:24735,36070:26791,36071:27278,36072:29786,36073:30849,36074:35486,36075:35492,36076:35703,36077:37264,36078:20062,36079:39881,36080:20132,36081:20348,36082:20399,36083:20505,36084:20502,36085:20809,36086:20844,36087:21151,36088:21177,36089:21246,36090:21402,36091:21475,36092:21521,36160:21518,36161:21897,36162:22353,36163:22434,36164:22909,36165:23380,36166:23389,36167:23439,36168:24037,36169:24039,36170:24055,36171:24184,36172:24195,36173:24218,36174:24247,36175:24344,36176:24658,36177:24908,36178:25239,36179:25304,36180:25511,36181:25915,36182:26114,36183:26179,36184:26356,36185:26477,36186:26657,36187:26775,36188:27083,36189:27743,36190:27946,36191:28009,36192:28207,36193:28317,36194:30002,36195:30343,36196:30828,36197:31295,36198:31968,36199:32005,36200:32024,36201:32094,36202:32177,36203:32789,36204:32771,36205:32943,36206:32945,36207:33108,36208:33167,36209:33322,36210:33618,36211:34892,36212:34913,36213:35611,36214:36002,36215:36092,36216:37066,36217:37237,36218:37489,36219:30783,36220:37628,36221:38308,36222:38477,36224:38917,36225:39321,36226:39640,36227:40251,36228:21083,36229:21163,36230:21495,36231:21512,36232:22741,36233:25335,36234:28640,36235:35946,36236:36703,36237:40633,36238:20811,36239:21051,36240:21578,36241:22269,36242:31296,36243:37239,36244:40288,36245:40658,36246:29508,36247:28425,36248:33136,36249:29969,36250:24573,36251:24794,36252:39592,36253:29403,36254:36796,36255:27492,36256:38915,36257:20170,36258:22256,36259:22372,36260:22718,36261:23130,36262:24680,36263:25031,36264:26127,36265:26118,36266:26681,36267:26801,36268:28151,36269:30165,36270:32058,36271:33390,36272:39746,36273:20123,36274:20304,36275:21449,36276:21766,36277:23919,36278:24038,36279:24046,36280:26619,36281:27801,36282:29811,36283:30722,36284:35408,36285:37782,36286:35039,36287:22352,36288:24231,36289:25387,36290:20661,36291:20652,36292:20877,36293:26368,36294:21705,36295:22622,36296:22971,36297:23472,36298:24425,36299:25165,36300:25505,36301:26685,36302:27507,36303:28168,36304:28797,36305:37319,36306:29312,36307:30741,36308:30758,36309:31085,36310:25998,36311:32048,36312:33756,36313:35009,36314:36617,36315:38555,36316:21092,36317:22312,36318:26448,36319:32618,36320:36001,36321:20916,36322:22338,36323:38442,36324:22586,36325:27018,36326:32948,36327:21682,36328:23822,36329:22524,36330:30869,36331:40442,36332:20316,36333:21066,36334:21643,36335:25662,36336:26152,36337:26388,36338:26613,36339:31364,36340:31574,36341:32034,36342:37679,36343:26716,36344:39853,36345:31545,36346:21273,36347:20874,36348:21047,36416:23519,36417:25334,36418:25774,36419:25830,36420:26413,36421:27578,36422:34217,36423:38609,36424:30352,36425:39894,36426:25420,36427:37638,36428:39851,36429:30399,36430:26194,36431:19977,36432:20632,36433:21442,36434:23665,36435:24808,36436:25746,36437:25955,36438:26719,36439:29158,36440:29642,36441:29987,36442:31639,36443:32386,36444:34453,36445:35715,36446:36059,36447:37240,36448:39184,36449:26028,36450:26283,36451:27531,36452:20181,36453:20180,36454:20282,36455:20351,36456:21050,36457:21496,36458:21490,36459:21987,36460:22235,36461:22763,36462:22987,36463:22985,36464:23039,36465:23376,36466:23629,36467:24066,36468:24107,36469:24535,36470:24605,36471:25351,36472:25903,36473:23388,36474:26031,36475:26045,36476:26088,36477:26525,36478:27490,36480:27515,36481:27663,36482:29509,36483:31049,36484:31169,36485:31992,36486:32025,36487:32043,36488:32930,36489:33026,36490:33267,36491:35222,36492:35422,36493:35433,36494:35430,36495:35468,36496:35566,36497:36039,36498:36060,36499:38604,36500:39164,36501:27503,36502:20107,36503:20284,36504:20365,36505:20816,36506:23383,36507:23546,36508:24904,36509:25345,36510:26178,36511:27425,36512:28363,36513:27835,36514:29246,36515:29885,36516:30164,36517:30913,36518:31034,36519:32780,36520:32819,36521:33258,36522:33940,36523:36766,36524:27728,36525:40575,36526:24335,36527:35672,36528:40235,36529:31482,36530:36600,36531:23437,36532:38635,36533:19971,36534:21489,36535:22519,36536:22833,36537:23241,36538:23460,36539:24713,36540:28287,36541:28422,36542:30142,36543:36074,36544:23455,36545:34048,36546:31712,36547:20594,36548:26612,36549:33437,36550:23649,36551:34122,36552:32286,36553:33294,36554:20889,36555:23556,36556:25448,36557:36198,36558:26012,36559:29038,36560:31038,36561:32023,36562:32773,36563:35613,36564:36554,36565:36974,36566:34503,36567:37034,36568:20511,36569:21242,36570:23610,36571:26451,36572:28796,36573:29237,36574:37196,36575:37320,36576:37675,36577:33509,36578:23490,36579:24369,36580:24825,36581:20027,36582:21462,36583:23432,36584:25163,36585:26417,36586:27530,36587:29417,36588:29664,36589:31278,36590:33131,36591:36259,36592:37202,36593:39318,36594:20754,36595:21463,36596:21610,36597:23551,36598:25480,36599:27193,36600:32172,36601:38656,36602:22234,36603:21454,36604:21608,36672:23447,36673:23601,36674:24030,36675:20462,36676:24833,36677:25342,36678:27954,36679:31168,36680:31179,36681:32066,36682:32333,36683:32722,36684:33261,36685:33311,36686:33936,36687:34886,36688:35186,36689:35728,36690:36468,36691:36655,36692:36913,36693:37195,36694:37228,36695:38598,36696:37276,36697:20160,36698:20303,36699:20805,36700:21313,36701:24467,36702:25102,36703:26580,36704:27713,36705:28171,36706:29539,36707:32294,36708:37325,36709:37507,36710:21460,36711:22809,36712:23487,36713:28113,36714:31069,36715:32302,36716:31899,36717:22654,36718:29087,36719:20986,36720:34899,36721:36848,36722:20426,36723:23803,36724:26149,36725:30636,36726:31459,36727:33308,36728:39423,36729:20934,36730:24490,36731:26092,36732:26991,36733:27529,36734:28147,36736:28310,36737:28516,36738:30462,36739:32020,36740:24033,36741:36981,36742:37255,36743:38918,36744:20966,36745:21021,36746:25152,36747:26257,36748:26329,36749:28186,36750:24246,36751:32210,36752:32626,36753:26360,36754:34223,36755:34295,36756:35576,36757:21161,36758:21465,36759:22899,36760:24207,36761:24464,36762:24661,36763:37604,36764:38500,36765:20663,36766:20767,36767:21213,36768:21280,36769:21319,36770:21484,36771:21736,36772:21830,36773:21809,36774:22039,36775:22888,36776:22974,36777:23100,36778:23477,36779:23558,36780:23567,36781:23569,36782:23578,36783:24196,36784:24202,36785:24288,36786:24432,36787:25215,36788:25220,36789:25307,36790:25484,36791:25463,36792:26119,36793:26124,36794:26157,36795:26230,36796:26494,36797:26786,36798:27167,36799:27189,36800:27836,36801:28040,36802:28169,36803:28248,36804:28988,36805:28966,36806:29031,36807:30151,36808:30465,36809:30813,36810:30977,36811:31077,36812:31216,36813:31456,36814:31505,36815:31911,36816:32057,36817:32918,36818:33750,36819:33931,36820:34121,36821:34909,36822:35059,36823:35359,36824:35388,36825:35412,36826:35443,36827:35937,36828:36062,36829:37284,36830:37478,36831:37758,36832:37912,36833:38556,36834:38808,36835:19978,36836:19976,36837:19998,36838:20055,36839:20887,36840:21104,36841:22478,36842:22580,36843:22732,36844:23330,36845:24120,36846:24773,36847:25854,36848:26465,36849:26454,36850:27972,36851:29366,36852:30067,36853:31331,36854:33976,36855:35698,36856:37304,36857:37664,36858:22065,36859:22516,36860:39166,36928:25325,36929:26893,36930:27542,36931:29165,36932:32340,36933:32887,36934:33394,36935:35302,36936:39135,36937:34645,36938:36785,36939:23611,36940:20280,36941:20449,36942:20405,36943:21767,36944:23072,36945:23517,36946:23529,36947:24515,36948:24910,36949:25391,36950:26032,36951:26187,36952:26862,36953:27035,36954:28024,36955:28145,36956:30003,36957:30137,36958:30495,36959:31070,36960:31206,36961:32051,36962:33251,36963:33455,36964:34218,36965:35242,36966:35386,36967:36523,36968:36763,36969:36914,36970:37341,36971:38663,36972:20154,36973:20161,36974:20995,36975:22645,36976:22764,36977:23563,36978:29978,36979:23613,36980:33102,36981:35338,36982:36805,36983:38499,36984:38765,36985:31525,36986:35535,36987:38920,36988:37218,36989:22259,36990:21416,36992:36887,36993:21561,36994:22402,36995:24101,36996:25512,36997:27700,36998:28810,36999:30561,37e3:31883,37001:32736,37002:34928,37003:36930,37004:37204,37005:37648,37006:37656,37007:38543,37008:29790,37009:39620,37010:23815,37011:23913,37012:25968,37013:26530,37014:36264,37015:38619,37016:25454,37017:26441,37018:26905,37019:33733,37020:38935,37021:38592,37022:35070,37023:28548,37024:25722,37025:23544,37026:19990,37027:28716,37028:30045,37029:26159,37030:20932,37031:21046,37032:21218,37033:22995,37034:24449,37035:24615,37036:25104,37037:25919,37038:25972,37039:26143,37040:26228,37041:26866,37042:26646,37043:27491,37044:28165,37045:29298,37046:29983,37047:30427,37048:31934,37049:32854,37050:22768,37051:35069,37052:35199,37053:35488,37054:35475,37055:35531,37056:36893,37057:37266,37058:38738,37059:38745,37060:25993,37061:31246,37062:33030,37063:38587,37064:24109,37065:24796,37066:25114,37067:26021,37068:26132,37069:26512,37070:30707,37071:31309,37072:31821,37073:32318,37074:33034,37075:36012,37076:36196,37077:36321,37078:36447,37079:30889,37080:20999,37081:25305,37082:25509,37083:25666,37084:25240,37085:35373,37086:31363,37087:31680,37088:35500,37089:38634,37090:32118,37091:33292,37092:34633,37093:20185,37094:20808,37095:21315,37096:21344,37097:23459,37098:23554,37099:23574,37100:24029,37101:25126,37102:25159,37103:25776,37104:26643,37105:26676,37106:27849,37107:27973,37108:27927,37109:26579,37110:28508,37111:29006,37112:29053,37113:26059,37114:31359,37115:31661,37116:32218,37184:32330,37185:32680,37186:33146,37187:33307,37188:33337,37189:34214,37190:35438,37191:36046,37192:36341,37193:36984,37194:36983,37195:37549,37196:37521,37197:38275,37198:39854,37199:21069,37200:21892,37201:28472,37202:28982,37203:20840,37204:31109,37205:32341,37206:33203,37207:31950,37208:22092,37209:22609,37210:23720,37211:25514,37212:26366,37213:26365,37214:26970,37215:29401,37216:30095,37217:30094,37218:30990,37219:31062,37220:31199,37221:31895,37222:32032,37223:32068,37224:34311,37225:35380,37226:38459,37227:36961,37228:40736,37229:20711,37230:21109,37231:21452,37232:21474,37233:20489,37234:21930,37235:22766,37236:22863,37237:29245,37238:23435,37239:23652,37240:21277,37241:24803,37242:24819,37243:25436,37244:25475,37245:25407,37246:25531,37248:25805,37249:26089,37250:26361,37251:24035,37252:27085,37253:27133,37254:28437,37255:29157,37256:20105,37257:30185,37258:30456,37259:31379,37260:31967,37261:32207,37262:32156,37263:32865,37264:33609,37265:33624,37266:33900,37267:33980,37268:34299,37269:35013,37270:36208,37271:36865,37272:36973,37273:37783,37274:38684,37275:39442,37276:20687,37277:22679,37278:24974,37279:33235,37280:34101,37281:36104,37282:36896,37283:20419,37284:20596,37285:21063,37286:21363,37287:24687,37288:25417,37289:26463,37290:28204,37291:36275,37292:36895,37293:20439,37294:23646,37295:36042,37296:26063,37297:32154,37298:21330,37299:34966,37300:20854,37301:25539,37302:23384,37303:23403,37304:23562,37305:25613,37306:26449,37307:36956,37308:20182,37309:22810,37310:22826,37311:27760,37312:35409,37313:21822,37314:22549,37315:22949,37316:24816,37317:25171,37318:26561,37319:33333,37320:26965,37321:38464,37322:39364,37323:39464,37324:20307,37325:22534,37326:23550,37327:32784,37328:23729,37329:24111,37330:24453,37331:24608,37332:24907,37333:25140,37334:26367,37335:27888,37336:28382,37337:32974,37338:33151,37339:33492,37340:34955,37341:36024,37342:36864,37343:36910,37344:38538,37345:40667,37346:39899,37347:20195,37348:21488,37349:22823,37350:31532,37351:37261,37352:38988,37353:40441,37354:28381,37355:28711,37356:21331,37357:21828,37358:23429,37359:25176,37360:25246,37361:25299,37362:27810,37363:28655,37364:29730,37365:35351,37366:37944,37367:28609,37368:35582,37369:33592,37370:20967,37371:34552,37372:21482,37440:21481,37441:20294,37442:36948,37443:36784,37444:22890,37445:33073,37446:24061,37447:31466,37448:36799,37449:26842,37450:35895,37451:29432,37452:40008,37453:27197,37454:35504,37455:20025,37456:21336,37457:22022,37458:22374,37459:25285,37460:25506,37461:26086,37462:27470,37463:28129,37464:28251,37465:28845,37466:30701,37467:31471,37468:31658,37469:32187,37470:32829,37471:32966,37472:34507,37473:35477,37474:37723,37475:22243,37476:22727,37477:24382,37478:26029,37479:26262,37480:27264,37481:27573,37482:30007,37483:35527,37484:20516,37485:30693,37486:22320,37487:24347,37488:24677,37489:26234,37490:27744,37491:30196,37492:31258,37493:32622,37494:33268,37495:34584,37496:36933,37497:39347,37498:31689,37499:30044,37500:31481,37501:31569,37502:33988,37504:36880,37505:31209,37506:31378,37507:33590,37508:23265,37509:30528,37510:20013,37511:20210,37512:23449,37513:24544,37514:25277,37515:26172,37516:26609,37517:27880,37518:34411,37519:34935,37520:35387,37521:37198,37522:37619,37523:39376,37524:27159,37525:28710,37526:29482,37527:33511,37528:33879,37529:36015,37530:19969,37531:20806,37532:20939,37533:21899,37534:23541,37535:24086,37536:24115,37537:24193,37538:24340,37539:24373,37540:24427,37541:24500,37542:25074,37543:25361,37544:26274,37545:26397,37546:28526,37547:29266,37548:30010,37549:30522,37550:32884,37551:33081,37552:33144,37553:34678,37554:35519,37555:35548,37556:36229,37557:36339,37558:37530,37559:38263,37560:38914,37561:40165,37562:21189,37563:25431,37564:30452,37565:26389,37566:27784,37567:29645,37568:36035,37569:37806,37570:38515,37571:27941,37572:22684,37573:26894,37574:27084,37575:36861,37576:37786,37577:30171,37578:36890,37579:22618,37580:26626,37581:25524,37582:27131,37583:20291,37584:28460,37585:26584,37586:36795,37587:34086,37588:32180,37589:37716,37590:26943,37591:28528,37592:22378,37593:22775,37594:23340,37595:32044,37596:29226,37597:21514,37598:37347,37599:40372,37600:20141,37601:20302,37602:20572,37603:20597,37604:21059,37605:35998,37606:21576,37607:22564,37608:23450,37609:24093,37610:24213,37611:24237,37612:24311,37613:24351,37614:24716,37615:25269,37616:25402,37617:25552,37618:26799,37619:27712,37620:30855,37621:31118,37622:31243,37623:32224,37624:33351,37625:35330,37626:35558,37627:36420,37628:36883,37696:37048,37697:37165,37698:37336,37699:40718,37700:27877,37701:25688,37702:25826,37703:25973,37704:28404,37705:30340,37706:31515,37707:36969,37708:37841,37709:28346,37710:21746,37711:24505,37712:25764,37713:36685,37714:36845,37715:37444,37716:20856,37717:22635,37718:22825,37719:23637,37720:24215,37721:28155,37722:32399,37723:29980,37724:36028,37725:36578,37726:39003,37727:28857,37728:20253,37729:27583,37730:28593,37731:3e4,37732:38651,37733:20814,37734:21520,37735:22581,37736:22615,37737:22956,37738:23648,37739:24466,37740:26007,37741:26460,37742:28193,37743:30331,37744:33759,37745:36077,37746:36884,37747:37117,37748:37709,37749:30757,37750:30778,37751:21162,37752:24230,37753:22303,37754:22900,37755:24594,37756:20498,37757:20826,37758:20908,37760:20941,37761:20992,37762:21776,37763:22612,37764:22616,37765:22871,37766:23445,37767:23798,37768:23947,37769:24764,37770:25237,37771:25645,37772:26481,37773:26691,37774:26812,37775:26847,37776:30423,37777:28120,37778:28271,37779:28059,37780:28783,37781:29128,37782:24403,37783:30168,37784:31095,37785:31561,37786:31572,37787:31570,37788:31958,37789:32113,37790:21040,37791:33891,37792:34153,37793:34276,37794:35342,37795:35588,37796:35910,37797:36367,37798:36867,37799:36879,37800:37913,37801:38518,37802:38957,37803:39472,37804:38360,37805:20685,37806:21205,37807:21516,37808:22530,37809:23566,37810:24999,37811:25758,37812:27934,37813:30643,37814:31461,37815:33012,37816:33796,37817:36947,37818:37509,37819:23776,37820:40199,37821:21311,37822:24471,37823:24499,37824:28060,37825:29305,37826:30563,37827:31167,37828:31716,37829:27602,37830:29420,37831:35501,37832:26627,37833:27233,37834:20984,37835:31361,37836:26932,37837:23626,37838:40182,37839:33515,37840:23493,37841:37193,37842:28702,37843:22136,37844:23663,37845:24775,37846:25958,37847:27788,37848:35930,37849:36929,37850:38931,37851:21585,37852:26311,37853:37389,37854:22856,37855:37027,37856:20869,37857:20045,37858:20970,37859:34201,37860:35598,37861:28760,37862:25466,37863:37707,37864:26978,37865:39348,37866:32260,37867:30071,37868:21335,37869:26976,37870:36575,37871:38627,37872:27741,37873:20108,37874:23612,37875:24336,37876:36841,37877:21250,37878:36049,37879:32905,37880:34425,37881:24319,37882:26085,37883:20083,37884:20837,37952:22914,37953:23615,37954:38894,37955:20219,37956:22922,37957:24525,37958:35469,37959:28641,37960:31152,37961:31074,37962:23527,37963:33905,37964:29483,37965:29105,37966:24180,37967:24565,37968:25467,37969:25754,37970:29123,37971:31896,37972:20035,37973:24316,37974:20043,37975:22492,37976:22178,37977:24745,37978:28611,37979:32013,37980:33021,37981:33075,37982:33215,37983:36786,37984:35223,37985:34468,37986:24052,37987:25226,37988:25773,37989:35207,37990:26487,37991:27874,37992:27966,37993:29750,37994:30772,37995:23110,37996:32629,37997:33453,37998:39340,37999:20467,38e3:24259,38001:25309,38002:25490,38003:25943,38004:26479,38005:30403,38006:29260,38007:32972,38008:32954,38009:36649,38010:37197,38011:20493,38012:22521,38013:23186,38014:26757,38016:26995,38017:29028,38018:29437,38019:36023,38020:22770,38021:36064,38022:38506,38023:36889,38024:34687,38025:31204,38026:30695,38027:33833,38028:20271,38029:21093,38030:21338,38031:25293,38032:26575,38033:27850,38034:30333,38035:31636,38036:31893,38037:33334,38038:34180,38039:36843,38040:26333,38041:28448,38042:29190,38043:32283,38044:33707,38045:39361,38046:40614,38047:20989,38048:31665,38049:30834,38050:31672,38051:32903,38052:31560,38053:27368,38054:24161,38055:32908,38056:30033,38057:30048,38058:20843,38059:37474,38060:28300,38061:30330,38062:37271,38063:39658,38064:20240,38065:32624,38066:25244,38067:31567,38068:38309,38069:40169,38070:22138,38071:22617,38072:34532,38073:38588,38074:20276,38075:21028,38076:21322,38077:21453,38078:21467,38079:24070,38080:25644,38081:26001,38082:26495,38083:27710,38084:27726,38085:29256,38086:29359,38087:29677,38088:30036,38089:32321,38090:33324,38091:34281,38092:36009,38093:31684,38094:37318,38095:29033,38096:38930,38097:39151,38098:25405,38099:26217,38100:30058,38101:30436,38102:30928,38103:34115,38104:34542,38105:21290,38106:21329,38107:21542,38108:22915,38109:24199,38110:24444,38111:24754,38112:25161,38113:25209,38114:25259,38115:26e3,38116:27604,38117:27852,38118:30130,38119:30382,38120:30865,38121:31192,38122:32203,38123:32631,38124:32933,38125:34987,38126:35513,38127:36027,38128:36991,38129:38750,38130:39131,38131:27147,38132:31800,38133:20633,38134:23614,38135:24494,38136:26503,38137:27608,38138:29749,38139:30473,38140:32654,38208:40763,38209:26570,38210:31255,38211:21305,38212:30091,38213:39661,38214:24422,38215:33181,38216:33777,38217:32920,38218:24380,38219:24517,38220:30050,38221:31558,38222:36924,38223:26727,38224:23019,38225:23195,38226:32016,38227:30334,38228:35628,38229:20469,38230:24426,38231:27161,38232:27703,38233:28418,38234:29922,38235:31080,38236:34920,38237:35413,38238:35961,38239:24287,38240:25551,38241:30149,38242:31186,38243:33495,38244:37672,38245:37618,38246:33948,38247:34541,38248:39981,38249:21697,38250:24428,38251:25996,38252:27996,38253:28693,38254:36007,38255:36051,38256:38971,38257:25935,38258:29942,38259:19981,38260:20184,38261:22496,38262:22827,38263:23142,38264:23500,38265:20904,38266:24067,38267:24220,38268:24598,38269:25206,38270:25975,38272:26023,38273:26222,38274:28014,38275:29238,38276:31526,38277:33104,38278:33178,38279:33433,38280:35676,38281:36e3,38282:36070,38283:36212,38284:38428,38285:38468,38286:20398,38287:25771,38288:27494,38289:33310,38290:33889,38291:34154,38292:37096,38293:23553,38294:26963,38295:39080,38296:33914,38297:34135,38298:20239,38299:21103,38300:24489,38301:24133,38302:26381,38303:31119,38304:33145,38305:35079,38306:35206,38307:28149,38308:24343,38309:25173,38310:27832,38311:20175,38312:29289,38313:39826,38314:20998,38315:21563,38316:22132,38317:22707,38318:24996,38319:25198,38320:28954,38321:22894,38322:31881,38323:31966,38324:32027,38325:38640,38326:25991,38327:32862,38328:19993,38329:20341,38330:20853,38331:22592,38332:24163,38333:24179,38334:24330,38335:26564,38336:20006,38337:34109,38338:38281,38339:38491,38340:31859,38341:38913,38342:20731,38343:22721,38344:30294,38345:30887,38346:21029,38347:30629,38348:34065,38349:31622,38350:20559,38351:22793,38352:29255,38353:31687,38354:32232,38355:36794,38356:36820,38357:36941,38358:20415,38359:21193,38360:23081,38361:24321,38362:38829,38363:20445,38364:33303,38365:37610,38366:22275,38367:25429,38368:27497,38369:29995,38370:35036,38371:36628,38372:31298,38373:21215,38374:22675,38375:24917,38376:25098,38377:26286,38378:27597,38379:31807,38380:33769,38381:20515,38382:20472,38383:21253,38384:21574,38385:22577,38386:22857,38387:23453,38388:23792,38389:23791,38390:23849,38391:24214,38392:25265,38393:25447,38394:25918,38395:26041,38396:26379,38464:27861,38465:27873,38466:28921,38467:30770,38468:32299,38469:32990,38470:33459,38471:33804,38472:34028,38473:34562,38474:35090,38475:35370,38476:35914,38477:37030,38478:37586,38479:39165,38480:40179,38481:40300,38482:20047,38483:20129,38484:20621,38485:21078,38486:22346,38487:22952,38488:24125,38489:24536,38490:24537,38491:25151,38492:26292,38493:26395,38494:26576,38495:26834,38496:20882,38497:32033,38498:32938,38499:33192,38500:35584,38501:35980,38502:36031,38503:37502,38504:38450,38505:21536,38506:38956,38507:21271,38508:20693,38509:21340,38510:22696,38511:25778,38512:26420,38513:29287,38514:30566,38515:31302,38516:37350,38517:21187,38518:27809,38519:27526,38520:22528,38521:24140,38522:22868,38523:26412,38524:32763,38525:20961,38526:30406,38528:25705,38529:30952,38530:39764,38531:40635,38532:22475,38533:22969,38534:26151,38535:26522,38536:27598,38537:21737,38538:27097,38539:24149,38540:33180,38541:26517,38542:39850,38543:26622,38544:40018,38545:26717,38546:20134,38547:20451,38548:21448,38549:25273,38550:26411,38551:27819,38552:36804,38553:20397,38554:32365,38555:40639,38556:19975,38557:24930,38558:28288,38559:28459,38560:34067,38561:21619,38562:26410,38563:39749,38564:24051,38565:31637,38566:23724,38567:23494,38568:34588,38569:28234,38570:34001,38571:31252,38572:33032,38573:22937,38574:31885,38575:27665,38576:30496,38577:21209,38578:22818,38579:28961,38580:29279,38581:30683,38582:38695,38583:40289,38584:26891,38585:23167,38586:23064,38587:20901,38588:21517,38589:21629,38590:26126,38591:30431,38592:36855,38593:37528,38594:40180,38595:23018,38596:29277,38597:28357,38598:20813,38599:26825,38600:32191,38601:32236,38602:38754,38603:40634,38604:25720,38605:27169,38606:33538,38607:22916,38608:23391,38609:27611,38610:29467,38611:30450,38612:32178,38613:32791,38614:33945,38615:20786,38616:26408,38617:40665,38618:30446,38619:26466,38620:21247,38621:39173,38622:23588,38623:25147,38624:31870,38625:36016,38626:21839,38627:24758,38628:32011,38629:38272,38630:21249,38631:20063,38632:20918,38633:22812,38634:29242,38635:32822,38636:37326,38637:24357,38638:30690,38639:21380,38640:24441,38641:32004,38642:34220,38643:35379,38644:36493,38645:38742,38646:26611,38647:34222,38648:37971,38649:24841,38650:24840,38651:27833,38652:30290,38720:35565,38721:36664,38722:21807,38723:20305,38724:20778,38725:21191,38726:21451,38727:23461,38728:24189,38729:24736,38730:24962,38731:25558,38732:26377,38733:26586,38734:28263,38735:28044,38736:29494,38737:29495,38738:30001,38739:31056,38740:35029,38741:35480,38742:36938,38743:37009,38744:37109,38745:38596,38746:34701,38747:22805,38748:20104,38749:20313,38750:19982,38751:35465,38752:36671,38753:38928,38754:20653,38755:24188,38756:22934,38757:23481,38758:24248,38759:25562,38760:25594,38761:25793,38762:26332,38763:26954,38764:27096,38765:27915,38766:28342,38767:29076,38768:29992,38769:31407,38770:32650,38771:32768,38772:33865,38773:33993,38774:35201,38775:35617,38776:36362,38777:36965,38778:38525,38779:39178,38780:24958,38781:25233,38782:27442,38784:27779,38785:28020,38786:32716,38787:32764,38788:28096,38789:32645,38790:34746,38791:35064,38792:26469,38793:33713,38794:38972,38795:38647,38796:27931,38797:32097,38798:33853,38799:37226,38800:20081,38801:21365,38802:23888,38803:27396,38804:28651,38805:34253,38806:34349,38807:35239,38808:21033,38809:21519,38810:23653,38811:26446,38812:26792,38813:29702,38814:29827,38815:30178,38816:35023,38817:35041,38818:37324,38819:38626,38820:38520,38821:24459,38822:29575,38823:31435,38824:33870,38825:25504,38826:30053,38827:21129,38828:27969,38829:28316,38830:29705,38831:30041,38832:30827,38833:31890,38834:38534,38835:31452,38836:40845,38837:20406,38838:24942,38839:26053,38840:34396,38841:20102,38842:20142,38843:20698,38844:20001,38845:20940,38846:23534,38847:26009,38848:26753,38849:28092,38850:29471,38851:30274,38852:30637,38853:31260,38854:31975,38855:33391,38856:35538,38857:36988,38858:37327,38859:38517,38860:38936,38861:21147,38862:32209,38863:20523,38864:21400,38865:26519,38866:28107,38867:29136,38868:29747,38869:33256,38870:36650,38871:38563,38872:40023,38873:40607,38874:29792,38875:22593,38876:28057,38877:32047,38878:39006,38879:20196,38880:20278,38881:20363,38882:20919,38883:21169,38884:23994,38885:24604,38886:29618,38887:31036,38888:33491,38889:37428,38890:38583,38891:38646,38892:38666,38893:40599,38894:40802,38895:26278,38896:27508,38897:21015,38898:21155,38899:28872,38900:35010,38901:24265,38902:24651,38903:24976,38904:28451,38905:29001,38906:31806,38907:32244,38908:32879,38976:34030,38977:36899,38978:37676,38979:21570,38980:39791,38981:27347,38982:28809,38983:36034,38984:36335,38985:38706,38986:21172,38987:23105,38988:24266,38989:24324,38990:26391,38991:27004,38992:27028,38993:28010,38994:28431,38995:29282,38996:29436,38997:31725,38998:32769,38999:32894,39e3:34635,39001:37070,39002:20845,39003:40595,39004:31108,39005:32907,39006:37682,39007:35542,39008:20525,39009:21644,39010:35441,39011:27498,39012:36036,39013:33031,39014:24785,39015:26528,39016:40434,39017:20121,39018:20120,39019:39952,39020:35435,39021:34241,39022:34152,39023:26880,39024:28286,39025:30871,39026:33109,39071:24332,39072:19984,39073:19989,39074:20010,39075:20017,39076:20022,39077:20028,39078:20031,39079:20034,39080:20054,39081:20056,39082:20098,39083:20101,39084:35947,39085:20106,39086:33298,39087:24333,39088:20110,39089:20126,39090:20127,39091:20128,39092:20130,39093:20144,39094:20147,39095:20150,39096:20174,39097:20173,39098:20164,39099:20166,39100:20162,39101:20183,39102:20190,39103:20205,39104:20191,39105:20215,39106:20233,39107:20314,39108:20272,39109:20315,39110:20317,39111:20311,39112:20295,39113:20342,39114:20360,39115:20367,39116:20376,39117:20347,39118:20329,39119:20336,39120:20369,39121:20335,39122:20358,39123:20374,39124:20760,39125:20436,39126:20447,39127:20430,39128:20440,39129:20443,39130:20433,39131:20442,39132:20432,39133:20452,39134:20453,39135:20506,39136:20520,39137:20500,39138:20522,39139:20517,39140:20485,39141:20252,39142:20470,39143:20513,39144:20521,39145:20524,39146:20478,39147:20463,39148:20497,39149:20486,39150:20547,39151:20551,39152:26371,39153:20565,39154:20560,39155:20552,39156:20570,39157:20566,39158:20588,39159:20600,39160:20608,39161:20634,39162:20613,39163:20660,39164:20658,39232:20681,39233:20682,39234:20659,39235:20674,39236:20694,39237:20702,39238:20709,39239:20717,39240:20707,39241:20718,39242:20729,39243:20725,39244:20745,39245:20737,39246:20738,39247:20758,39248:20757,39249:20756,39250:20762,39251:20769,39252:20794,39253:20791,39254:20796,39255:20795,39256:20799,39257:20800,39258:20818,39259:20812,39260:20820,39261:20834,39262:31480,39263:20841,39264:20842,39265:20846,39266:20864,39267:20866,39268:22232,39269:20876,39270:20873,39271:20879,39272:20881,39273:20883,39274:20885,39275:20886,39276:20900,39277:20902,39278:20898,39279:20905,39280:20906,39281:20907,39282:20915,39283:20913,39284:20914,39285:20912,39286:20917,39287:20925,39288:20933,39289:20937,39290:20955,39291:20960,39292:34389,39293:20969,39294:20973,39296:20976,39297:20981,39298:20990,39299:20996,39300:21003,39301:21012,39302:21006,39303:21031,39304:21034,39305:21038,39306:21043,39307:21049,39308:21071,39309:21060,39310:21067,39311:21068,39312:21086,39313:21076,39314:21098,39315:21108,39316:21097,39317:21107,39318:21119,39319:21117,39320:21133,39321:21140,39322:21138,39323:21105,39324:21128,39325:21137,39326:36776,39327:36775,39328:21164,39329:21165,39330:21180,39331:21173,39332:21185,39333:21197,39334:21207,39335:21214,39336:21219,39337:21222,39338:39149,39339:21216,39340:21235,39341:21237,39342:21240,39343:21241,39344:21254,39345:21256,39346:30008,39347:21261,39348:21264,39349:21263,39350:21269,39351:21274,39352:21283,39353:21295,39354:21297,39355:21299,39356:21304,39357:21312,39358:21318,39359:21317,39360:19991,39361:21321,39362:21325,39363:20950,39364:21342,39365:21353,39366:21358,39367:22808,39368:21371,39369:21367,39370:21378,39371:21398,39372:21408,39373:21414,39374:21413,39375:21422,39376:21424,39377:21430,39378:21443,39379:31762,39380:38617,39381:21471,39382:26364,39383:29166,39384:21486,39385:21480,39386:21485,39387:21498,39388:21505,39389:21565,39390:21568,39391:21548,39392:21549,39393:21564,39394:21550,39395:21558,39396:21545,39397:21533,39398:21582,39399:21647,39400:21621,39401:21646,39402:21599,39403:21617,39404:21623,39405:21616,39406:21650,39407:21627,39408:21632,39409:21622,39410:21636,39411:21648,39412:21638,39413:21703,39414:21666,39415:21688,39416:21669,39417:21676,39418:21700,39419:21704,39420:21672,39488:21675,39489:21698,39490:21668,39491:21694,39492:21692,39493:21720,39494:21733,39495:21734,39496:21775,39497:21780,39498:21757,39499:21742,39500:21741,39501:21754,39502:21730,39503:21817,39504:21824,39505:21859,39506:21836,39507:21806,39508:21852,39509:21829,39510:21846,39511:21847,39512:21816,39513:21811,39514:21853,39515:21913,39516:21888,39517:21679,39518:21898,39519:21919,39520:21883,39521:21886,39522:21912,39523:21918,39524:21934,39525:21884,39526:21891,39527:21929,39528:21895,39529:21928,39530:21978,39531:21957,39532:21983,39533:21956,39534:21980,39535:21988,39536:21972,39537:22036,39538:22007,39539:22038,39540:22014,39541:22013,39542:22043,39543:22009,39544:22094,39545:22096,39546:29151,39547:22068,39548:22070,39549:22066,39550:22072,39552:22123,39553:22116,39554:22063,39555:22124,39556:22122,39557:22150,39558:22144,39559:22154,39560:22176,39561:22164,39562:22159,39563:22181,39564:22190,39565:22198,39566:22196,39567:22210,39568:22204,39569:22209,39570:22211,39571:22208,39572:22216,39573:22222,39574:22225,39575:22227,39576:22231,39577:22254,39578:22265,39579:22272,39580:22271,39581:22276,39582:22281,39583:22280,39584:22283,39585:22285,39586:22291,39587:22296,39588:22294,39589:21959,39590:22300,39591:22310,39592:22327,39593:22328,39594:22350,39595:22331,39596:22336,39597:22351,39598:22377,39599:22464,39600:22408,39601:22369,39602:22399,39603:22409,39604:22419,39605:22432,39606:22451,39607:22436,39608:22442,39609:22448,39610:22467,39611:22470,39612:22484,39613:22482,39614:22483,39615:22538,39616:22486,39617:22499,39618:22539,39619:22553,39620:22557,39621:22642,39622:22561,39623:22626,39624:22603,39625:22640,39626:27584,39627:22610,39628:22589,39629:22649,39630:22661,39631:22713,39632:22687,39633:22699,39634:22714,39635:22750,39636:22715,39637:22712,39638:22702,39639:22725,39640:22739,39641:22737,39642:22743,39643:22745,39644:22744,39645:22757,39646:22748,39647:22756,39648:22751,39649:22767,39650:22778,39651:22777,39652:22779,39653:22780,39654:22781,39655:22786,39656:22794,39657:22800,39658:22811,39659:26790,39660:22821,39661:22828,39662:22829,39663:22834,39664:22840,39665:22846,39666:31442,39667:22869,39668:22864,39669:22862,39670:22874,39671:22872,39672:22882,39673:22880,39674:22887,39675:22892,39676:22889,39744:22904,39745:22913,39746:22941,39747:20318,39748:20395,39749:22947,39750:22962,39751:22982,39752:23016,39753:23004,39754:22925,39755:23001,39756:23002,39757:23077,39758:23071,39759:23057,39760:23068,39761:23049,39762:23066,39763:23104,39764:23148,39765:23113,39766:23093,39767:23094,39768:23138,39769:23146,39770:23194,39771:23228,39772:23230,39773:23243,39774:23234,39775:23229,39776:23267,39777:23255,39778:23270,39779:23273,39780:23254,39781:23290,39782:23291,39783:23308,39784:23307,39785:23318,39786:23346,39787:23248,39788:23338,39789:23350,39790:23358,39791:23363,39792:23365,39793:23360,39794:23377,39795:23381,39796:23386,39797:23387,39798:23397,39799:23401,39800:23408,39801:23411,39802:23413,39803:23416,39804:25992,39805:23418,39806:23424,39808:23427,39809:23462,39810:23480,39811:23491,39812:23495,39813:23497,39814:23508,39815:23504,39816:23524,39817:23526,39818:23522,39819:23518,39820:23525,39821:23531,39822:23536,39823:23542,39824:23539,39825:23557,39826:23559,39827:23560,39828:23565,39829:23571,39830:23584,39831:23586,39832:23592,39833:23608,39834:23609,39835:23617,39836:23622,39837:23630,39838:23635,39839:23632,39840:23631,39841:23409,39842:23660,39843:23662,39844:20066,39845:23670,39846:23673,39847:23692,39848:23697,39849:23700,39850:22939,39851:23723,39852:23739,39853:23734,39854:23740,39855:23735,39856:23749,39857:23742,39858:23751,39859:23769,39860:23785,39861:23805,39862:23802,39863:23789,39864:23948,39865:23786,39866:23819,39867:23829,39868:23831,39869:23900,39870:23839,39871:23835,39872:23825,39873:23828,39874:23842,39875:23834,39876:23833,39877:23832,39878:23884,39879:23890,39880:23886,39881:23883,39882:23916,39883:23923,39884:23926,39885:23943,39886:23940,39887:23938,39888:23970,39889:23965,39890:23980,39891:23982,39892:23997,39893:23952,39894:23991,39895:23996,39896:24009,39897:24013,39898:24019,39899:24018,39900:24022,39901:24027,39902:24043,39903:24050,39904:24053,39905:24075,39906:24090,39907:24089,39908:24081,39909:24091,39910:24118,39911:24119,39912:24132,39913:24131,39914:24128,39915:24142,39916:24151,39917:24148,39918:24159,39919:24162,39920:24164,39921:24135,39922:24181,39923:24182,39924:24186,39925:40636,39926:24191,39927:24224,39928:24257,39929:24258,39930:24264,39931:24272,39932:24271,4e4:24278,40001:24291,40002:24285,40003:24282,40004:24283,40005:24290,40006:24289,40007:24296,40008:24297,40009:24300,40010:24305,40011:24307,40012:24304,40013:24308,40014:24312,40015:24318,40016:24323,40017:24329,40018:24413,40019:24412,40020:24331,40021:24337,40022:24342,40023:24361,40024:24365,40025:24376,40026:24385,40027:24392,40028:24396,40029:24398,40030:24367,40031:24401,40032:24406,40033:24407,40034:24409,40035:24417,40036:24429,40037:24435,40038:24439,40039:24451,40040:24450,40041:24447,40042:24458,40043:24456,40044:24465,40045:24455,40046:24478,40047:24473,40048:24472,40049:24480,40050:24488,40051:24493,40052:24508,40053:24534,40054:24571,40055:24548,40056:24568,40057:24561,40058:24541,40059:24755,40060:24575,40061:24609,40062:24672,40064:24601,40065:24592,40066:24617,40067:24590,40068:24625,40069:24603,40070:24597,40071:24619,40072:24614,40073:24591,40074:24634,40075:24666,40076:24641,40077:24682,40078:24695,40079:24671,40080:24650,40081:24646,40082:24653,40083:24675,40084:24643,40085:24676,40086:24642,40087:24684,40088:24683,40089:24665,40090:24705,40091:24717,40092:24807,40093:24707,40094:24730,40095:24708,40096:24731,40097:24726,40098:24727,40099:24722,40100:24743,40101:24715,40102:24801,40103:24760,40104:24800,40105:24787,40106:24756,40107:24560,40108:24765,40109:24774,40110:24757,40111:24792,40112:24909,40113:24853,40114:24838,40115:24822,40116:24823,40117:24832,40118:24820,40119:24826,40120:24835,40121:24865,40122:24827,40123:24817,40124:24845,40125:24846,40126:24903,40127:24894,40128:24872,40129:24871,40130:24906,40131:24895,40132:24892,40133:24876,40134:24884,40135:24893,40136:24898,40137:24900,40138:24947,40139:24951,40140:24920,40141:24921,40142:24922,40143:24939,40144:24948,40145:24943,40146:24933,40147:24945,40148:24927,40149:24925,40150:24915,40151:24949,40152:24985,40153:24982,40154:24967,40155:25004,40156:24980,40157:24986,40158:24970,40159:24977,40160:25003,40161:25006,40162:25036,40163:25034,40164:25033,40165:25079,40166:25032,40167:25027,40168:25030,40169:25018,40170:25035,40171:32633,40172:25037,40173:25062,40174:25059,40175:25078,40176:25082,40177:25076,40178:25087,40179:25085,40180:25084,40181:25086,40182:25088,40183:25096,40184:25097,40185:25101,40186:25100,40187:25108,40188:25115,40256:25118,40257:25121,40258:25130,40259:25134,40260:25136,40261:25138,40262:25139,40263:25153,40264:25166,40265:25182,40266:25187,40267:25179,40268:25184,40269:25192,40270:25212,40271:25218,40272:25225,40273:25214,40274:25234,40275:25235,40276:25238,40277:25300,40278:25219,40279:25236,40280:25303,40281:25297,40282:25275,40283:25295,40284:25343,40285:25286,40286:25812,40287:25288,40288:25308,40289:25292,40290:25290,40291:25282,40292:25287,40293:25243,40294:25289,40295:25356,40296:25326,40297:25329,40298:25383,40299:25346,40300:25352,40301:25327,40302:25333,40303:25424,40304:25406,40305:25421,40306:25628,40307:25423,40308:25494,40309:25486,40310:25472,40311:25515,40312:25462,40313:25507,40314:25487,40315:25481,40316:25503,40317:25525,40318:25451,40320:25449,40321:25534,40322:25577,40323:25536,40324:25542,40325:25571,40326:25545,40327:25554,40328:25590,40329:25540,40330:25622,40331:25652,40332:25606,40333:25619,40334:25638,40335:25654,40336:25885,40337:25623,40338:25640,40339:25615,40340:25703,40341:25711,40342:25718,40343:25678,40344:25898,40345:25749,40346:25747,40347:25765,40348:25769,40349:25736,40350:25788,40351:25818,40352:25810,40353:25797,40354:25799,40355:25787,40356:25816,40357:25794,40358:25841,40359:25831,40360:33289,40361:25824,40362:25825,40363:25260,40364:25827,40365:25839,40366:25900,40367:25846,40368:25844,40369:25842,40370:25850,40371:25856,40372:25853,40373:25880,40374:25884,40375:25861,40376:25892,40377:25891,40378:25899,40379:25908,40380:25909,40381:25911,40382:25910,40383:25912,40384:30027,40385:25928,40386:25942,40387:25941,40388:25933,40389:25944,40390:25950,40391:25949,40392:25970,40393:25976,40394:25986,40395:25987,40396:35722,40397:26011,40398:26015,40399:26027,40400:26039,40401:26051,40402:26054,40403:26049,40404:26052,40405:26060,40406:26066,40407:26075,40408:26073,40409:26080,40410:26081,40411:26097,40412:26482,40413:26122,40414:26115,40415:26107,40416:26483,40417:26165,40418:26166,40419:26164,40420:26140,40421:26191,40422:26180,40423:26185,40424:26177,40425:26206,40426:26205,40427:26212,40428:26215,40429:26216,40430:26207,40431:26210,40432:26224,40433:26243,40434:26248,40435:26254,40436:26249,40437:26244,40438:26264,40439:26269,40440:26305,40441:26297,40442:26313,40443:26302,40444:26300,40512:26308,40513:26296,40514:26326,40515:26330,40516:26336,40517:26175,40518:26342,40519:26345,40520:26352,40521:26357,40522:26359,40523:26383,40524:26390,40525:26398,40526:26406,40527:26407,40528:38712,40529:26414,40530:26431,40531:26422,40532:26433,40533:26424,40534:26423,40535:26438,40536:26462,40537:26464,40538:26457,40539:26467,40540:26468,40541:26505,40542:26480,40543:26537,40544:26492,40545:26474,40546:26508,40547:26507,40548:26534,40549:26529,40550:26501,40551:26551,40552:26607,40553:26548,40554:26604,40555:26547,40556:26601,40557:26552,40558:26596,40559:26590,40560:26589,40561:26594,40562:26606,40563:26553,40564:26574,40565:26566,40566:26599,40567:27292,40568:26654,40569:26694,40570:26665,40571:26688,40572:26701,40573:26674,40574:26702,40576:26803,40577:26667,40578:26713,40579:26723,40580:26743,40581:26751,40582:26783,40583:26767,40584:26797,40585:26772,40586:26781,40587:26779,40588:26755,40589:27310,40590:26809,40591:26740,40592:26805,40593:26784,40594:26810,40595:26895,40596:26765,40597:26750,40598:26881,40599:26826,40600:26888,40601:26840,40602:26914,40603:26918,40604:26849,40605:26892,40606:26829,40607:26836,40608:26855,40609:26837,40610:26934,40611:26898,40612:26884,40613:26839,40614:26851,40615:26917,40616:26873,40617:26848,40618:26863,40619:26920,40620:26922,40621:26906,40622:26915,40623:26913,40624:26822,40625:27001,40626:26999,40627:26972,40628:27e3,40629:26987,40630:26964,40631:27006,40632:26990,40633:26937,40634:26996,40635:26941,40636:26969,40637:26928,40638:26977,40639:26974,40640:26973,40641:27009,40642:26986,40643:27058,40644:27054,40645:27088,40646:27071,40647:27073,40648:27091,40649:27070,40650:27086,40651:23528,40652:27082,40653:27101,40654:27067,40655:27075,40656:27047,40657:27182,40658:27025,40659:27040,40660:27036,40661:27029,40662:27060,40663:27102,40664:27112,40665:27138,40666:27163,40667:27135,40668:27402,40669:27129,40670:27122,40671:27111,40672:27141,40673:27057,40674:27166,40675:27117,40676:27156,40677:27115,40678:27146,40679:27154,40680:27329,40681:27171,40682:27155,40683:27204,40684:27148,40685:27250,40686:27190,40687:27256,40688:27207,40689:27234,40690:27225,40691:27238,40692:27208,40693:27192,40694:27170,40695:27280,40696:27277,40697:27296,40698:27268,40699:27298,40700:27299,40768:27287,40769:34327,40770:27323,40771:27331,40772:27330,40773:27320,40774:27315,40775:27308,40776:27358,40777:27345,40778:27359,40779:27306,40780:27354,40781:27370,40782:27387,40783:27397,40784:34326,40785:27386,40786:27410,40787:27414,40788:39729,40789:27423,40790:27448,40791:27447,40792:30428,40793:27449,40794:39150,40795:27463,40796:27459,40797:27465,40798:27472,40799:27481,40800:27476,40801:27483,40802:27487,40803:27489,40804:27512,40805:27513,40806:27519,40807:27520,40808:27524,40809:27523,40810:27533,40811:27544,40812:27541,40813:27550,40814:27556,40815:27562,40816:27563,40817:27567,40818:27570,40819:27569,40820:27571,40821:27575,40822:27580,40823:27590,40824:27595,40825:27603,40826:27615,40827:27628,40828:27627,40829:27635,40830:27631,40832:40638,40833:27656,40834:27667,40835:27668,40836:27675,40837:27684,40838:27683,40839:27742,40840:27733,40841:27746,40842:27754,40843:27778,40844:27789,40845:27802,40846:27777,40847:27803,40848:27774,40849:27752,40850:27763,40851:27794,40852:27792,40853:27844,40854:27889,40855:27859,40856:27837,40857:27863,40858:27845,40859:27869,40860:27822,40861:27825,40862:27838,40863:27834,40864:27867,40865:27887,40866:27865,40867:27882,40868:27935,40869:34893,40870:27958,40871:27947,40872:27965,40873:27960,40874:27929,40875:27957,40876:27955,40877:27922,40878:27916,40879:28003,40880:28051,40881:28004,40882:27994,40883:28025,40884:27993,40885:28046,40886:28053,40887:28644,40888:28037,40889:28153,40890:28181,40891:28170,40892:28085,40893:28103,40894:28134,40895:28088,40896:28102,40897:28140,40898:28126,40899:28108,40900:28136,40901:28114,40902:28101,40903:28154,40904:28121,40905:28132,40906:28117,40907:28138,40908:28142,40909:28205,40910:28270,40911:28206,40912:28185,40913:28274,40914:28255,40915:28222,40916:28195,40917:28267,40918:28203,40919:28278,40920:28237,40921:28191,40922:28227,40923:28218,40924:28238,40925:28196,40926:28415,40927:28189,40928:28216,40929:28290,40930:28330,40931:28312,40932:28361,40933:28343,40934:28371,40935:28349,40936:28335,40937:28356,40938:28338,40939:28372,40940:28373,40941:28303,40942:28325,40943:28354,40944:28319,40945:28481,40946:28433,40947:28748,40948:28396,40949:28408,40950:28414,40951:28479,40952:28402,40953:28465,40954:28399,40955:28466,40956:28364,161:65377,162:65378,163:65379,164:65380,165:65381,166:65382,167:65383,168:65384,169:65385,170:65386,171:65387,172:65388,173:65389,174:65390,175:65391,176:65392,177:65393,178:65394,179:65395,180:65396,181:65397,182:65398,183:65399,184:65400,185:65401,186:65402,187:65403,188:65404,189:65405,190:65406,191:65407,192:65408,193:65409,194:65410,195:65411,196:65412,197:65413,198:65414,199:65415,200:65416,201:65417,202:65418,203:65419,204:65420,205:65421,206:65422,207:65423,208:65424,209:65425,210:65426,211:65427,212:65428,213:65429,214:65430,215:65431,216:65432,217:65433,218:65434,219:65435,220:65436,221:65437,222:65438,223:65439,57408:28478,57409:28435,57410:28407,57411:28550,57412:28538,57413:28536,57414:28545,57415:28544,57416:28527,57417:28507,57418:28659,57419:28525,57420:28546,57421:28540,57422:28504,57423:28558,57424:28561,57425:28610,57426:28518,57427:28595,57428:28579,57429:28577,57430:28580,57431:28601,57432:28614,57433:28586,57434:28639,57435:28629,57436:28652,57437:28628,57438:28632,57439:28657,57440:28654,57441:28635,57442:28681,57443:28683,57444:28666,57445:28689,57446:28673,57447:28687,57448:28670,57449:28699,57450:28698,57451:28532,57452:28701,57453:28696,57454:28703,57455:28720,57456:28734,57457:28722,57458:28753,57459:28771,57460:28825,57461:28818,57462:28847,57463:28913,57464:28844,57465:28856,57466:28851,57467:28846,57468:28895,57469:28875,57470:28893,57472:28889,57473:28937,57474:28925,57475:28956,57476:28953,57477:29029,57478:29013,57479:29064,57480:29030,57481:29026,57482:29004,57483:29014,57484:29036,57485:29071,57486:29179,57487:29060,57488:29077,57489:29096,57490:29100,57491:29143,57492:29113,57493:29118,57494:29138,57495:29129,57496:29140,57497:29134,57498:29152,57499:29164,57500:29159,57501:29173,57502:29180,57503:29177,57504:29183,57505:29197,57506:29200,57507:29211,57508:29224,57509:29229,57510:29228,57511:29232,57512:29234,57513:29243,57514:29244,57515:29247,57516:29248,57517:29254,57518:29259,57519:29272,57520:29300,57521:29310,57522:29314,57523:29313,57524:29319,57525:29330,57526:29334,57527:29346,57528:29351,57529:29369,57530:29362,57531:29379,57532:29382,57533:29380,57534:29390,57535:29394,57536:29410,57537:29408,57538:29409,57539:29433,57540:29431,57541:20495,57542:29463,57543:29450,57544:29468,57545:29462,57546:29469,57547:29492,57548:29487,57549:29481,57550:29477,57551:29502,57552:29518,57553:29519,57554:40664,57555:29527,57556:29546,57557:29544,57558:29552,57559:29560,57560:29557,57561:29563,57562:29562,57563:29640,57564:29619,57565:29646,57566:29627,57567:29632,57568:29669,57569:29678,57570:29662,57571:29858,57572:29701,57573:29807,57574:29733,57575:29688,57576:29746,57577:29754,57578:29781,57579:29759,57580:29791,57581:29785,57582:29761,57583:29788,57584:29801,57585:29808,57586:29795,57587:29802,57588:29814,57589:29822,57590:29835,57591:29854,57592:29863,57593:29898,57594:29903,57595:29908,57596:29681,57664:29920,57665:29923,57666:29927,57667:29929,57668:29934,57669:29938,57670:29936,57671:29937,57672:29944,57673:29943,57674:29956,57675:29955,57676:29957,57677:29964,57678:29966,57679:29965,57680:29973,57681:29971,57682:29982,57683:29990,57684:29996,57685:30012,57686:30020,57687:30029,57688:30026,57689:30025,57690:30043,57691:30022,57692:30042,57693:30057,57694:30052,57695:30055,57696:30059,57697:30061,57698:30072,57699:30070,57700:30086,57701:30087,57702:30068,57703:30090,57704:30089,57705:30082,57706:30100,57707:30106,57708:30109,57709:30117,57710:30115,57711:30146,57712:30131,57713:30147,57714:30133,57715:30141,57716:30136,57717:30140,57718:30129,57719:30157,57720:30154,57721:30162,57722:30169,57723:30179,57724:30174,57725:30206,57726:30207,57728:30204,57729:30209,57730:30192,57731:30202,57732:30194,57733:30195,57734:30219,57735:30221,57736:30217,57737:30239,57738:30247,57739:30240,57740:30241,57741:30242,57742:30244,57743:30260,57744:30256,57745:30267,57746:30279,57747:30280,57748:30278,57749:30300,57750:30296,57751:30305,57752:30306,57753:30312,57754:30313,57755:30314,57756:30311,57757:30316,57758:30320,57759:30322,57760:30326,57761:30328,57762:30332,57763:30336,57764:30339,57765:30344,57766:30347,57767:30350,57768:30358,57769:30355,57770:30361,57771:30362,57772:30384,57773:30388,57774:30392,57775:30393,57776:30394,57777:30402,57778:30413,57779:30422,57780:30418,57781:30430,57782:30433,57783:30437,57784:30439,57785:30442,57786:34351,57787:30459,57788:30472,57789:30471,57790:30468,57791:30505,57792:30500,57793:30494,57794:30501,57795:30502,57796:30491,57797:30519,57798:30520,57799:30535,57800:30554,57801:30568,57802:30571,57803:30555,57804:30565,57805:30591,57806:30590,57807:30585,57808:30606,57809:30603,57810:30609,57811:30624,57812:30622,57813:30640,57814:30646,57815:30649,57816:30655,57817:30652,57818:30653,57819:30651,57820:30663,57821:30669,57822:30679,57823:30682,57824:30684,57825:30691,57826:30702,57827:30716,57828:30732,57829:30738,57830:31014,57831:30752,57832:31018,57833:30789,57834:30862,57835:30836,57836:30854,57837:30844,57838:30874,57839:30860,57840:30883,57841:30901,57842:30890,57843:30895,57844:30929,57845:30918,57846:30923,57847:30932,57848:30910,57849:30908,57850:30917,57851:30922,57852:30956,57920:30951,57921:30938,57922:30973,57923:30964,57924:30983,57925:30994,57926:30993,57927:31001,57928:31020,57929:31019,57930:31040,57931:31072,57932:31063,57933:31071,57934:31066,57935:31061,57936:31059,57937:31098,57938:31103,57939:31114,57940:31133,57941:31143,57942:40779,57943:31146,57944:31150,57945:31155,57946:31161,57947:31162,57948:31177,57949:31189,57950:31207,57951:31212,57952:31201,57953:31203,57954:31240,57955:31245,57956:31256,57957:31257,57958:31264,57959:31263,57960:31104,57961:31281,57962:31291,57963:31294,57964:31287,57965:31299,57966:31319,57967:31305,57968:31329,57969:31330,57970:31337,57971:40861,57972:31344,57973:31353,57974:31357,57975:31368,57976:31383,57977:31381,57978:31384,57979:31382,57980:31401,57981:31432,57982:31408,57984:31414,57985:31429,57986:31428,57987:31423,57988:36995,57989:31431,57990:31434,57991:31437,57992:31439,57993:31445,57994:31443,57995:31449,57996:31450,57997:31453,57998:31457,57999:31458,58e3:31462,58001:31469,58002:31472,58003:31490,58004:31503,58005:31498,58006:31494,58007:31539,58008:31512,58009:31513,58010:31518,58011:31541,58012:31528,58013:31542,58014:31568,58015:31610,58016:31492,58017:31565,58018:31499,58019:31564,58020:31557,58021:31605,58022:31589,58023:31604,58024:31591,58025:31600,58026:31601,58027:31596,58028:31598,58029:31645,58030:31640,58031:31647,58032:31629,58033:31644,58034:31642,58035:31627,58036:31634,58037:31631,58038:31581,58039:31641,58040:31691,58041:31681,58042:31692,58043:31695,58044:31668,58045:31686,58046:31709,58047:31721,58048:31761,58049:31764,58050:31718,58051:31717,58052:31840,58053:31744,58054:31751,58055:31763,58056:31731,58057:31735,58058:31767,58059:31757,58060:31734,58061:31779,58062:31783,58063:31786,58064:31775,58065:31799,58066:31787,58067:31805,58068:31820,58069:31811,58070:31828,58071:31823,58072:31808,58073:31824,58074:31832,58075:31839,58076:31844,58077:31830,58078:31845,58079:31852,58080:31861,58081:31875,58082:31888,58083:31908,58084:31917,58085:31906,58086:31915,58087:31905,58088:31912,58089:31923,58090:31922,58091:31921,58092:31918,58093:31929,58094:31933,58095:31936,58096:31941,58097:31938,58098:31960,58099:31954,58100:31964,58101:31970,58102:39739,58103:31983,58104:31986,58105:31988,58106:31990,58107:31994,58108:32006,58176:32002,58177:32028,58178:32021,58179:32010,58180:32069,58181:32075,58182:32046,58183:32050,58184:32063,58185:32053,58186:32070,58187:32115,58188:32086,58189:32078,58190:32114,58191:32104,58192:32110,58193:32079,58194:32099,58195:32147,58196:32137,58197:32091,58198:32143,58199:32125,58200:32155,58201:32186,58202:32174,58203:32163,58204:32181,58205:32199,58206:32189,58207:32171,58208:32317,58209:32162,58210:32175,58211:32220,58212:32184,58213:32159,58214:32176,58215:32216,58216:32221,58217:32228,58218:32222,58219:32251,58220:32242,58221:32225,58222:32261,58223:32266,58224:32291,58225:32289,58226:32274,58227:32305,58228:32287,58229:32265,58230:32267,58231:32290,58232:32326,58233:32358,58234:32315,58235:32309,58236:32313,58237:32323,58238:32311,58240:32306,58241:32314,58242:32359,58243:32349,58244:32342,58245:32350,58246:32345,58247:32346,58248:32377,58249:32362,58250:32361,58251:32380,58252:32379,58253:32387,58254:32213,58255:32381,58256:36782,58257:32383,58258:32392,58259:32393,58260:32396,58261:32402,58262:32400,58263:32403,58264:32404,58265:32406,58266:32398,58267:32411,58268:32412,58269:32568,58270:32570,58271:32581,58272:32588,58273:32589,58274:32590,58275:32592,58276:32593,58277:32597,58278:32596,58279:32600,58280:32607,58281:32608,58282:32616,58283:32617,58284:32615,58285:32632,58286:32642,58287:32646,58288:32643,58289:32648,58290:32647,58291:32652,58292:32660,58293:32670,58294:32669,58295:32666,58296:32675,58297:32687,58298:32690,58299:32697,58300:32686,58301:32694,58302:32696,58303:35697,58304:32709,58305:32710,58306:32714,58307:32725,58308:32724,58309:32737,58310:32742,58311:32745,58312:32755,58313:32761,58314:39132,58315:32774,58316:32772,58317:32779,58318:32786,58319:32792,58320:32793,58321:32796,58322:32801,58323:32808,58324:32831,58325:32827,58326:32842,58327:32838,58328:32850,58329:32856,58330:32858,58331:32863,58332:32866,58333:32872,58334:32883,58335:32882,58336:32880,58337:32886,58338:32889,58339:32893,58340:32895,58341:32900,58342:32902,58343:32901,58344:32923,58345:32915,58346:32922,58347:32941,58348:20880,58349:32940,58350:32987,58351:32997,58352:32985,58353:32989,58354:32964,58355:32986,58356:32982,58357:33033,58358:33007,58359:33009,58360:33051,58361:33065,58362:33059,58363:33071,58364:33099,58432:38539,58433:33094,58434:33086,58435:33107,58436:33105,58437:33020,58438:33137,58439:33134,58440:33125,58441:33126,58442:33140,58443:33155,58444:33160,58445:33162,58446:33152,58447:33154,58448:33184,58449:33173,58450:33188,58451:33187,58452:33119,58453:33171,58454:33193,58455:33200,58456:33205,58457:33214,58458:33208,58459:33213,58460:33216,58461:33218,58462:33210,58463:33225,58464:33229,58465:33233,58466:33241,58467:33240,58468:33224,58469:33242,58470:33247,58471:33248,58472:33255,58473:33274,58474:33275,58475:33278,58476:33281,58477:33282,58478:33285,58479:33287,58480:33290,58481:33293,58482:33296,58483:33302,58484:33321,58485:33323,58486:33336,58487:33331,58488:33344,58489:33369,58490:33368,58491:33373,58492:33370,58493:33375,58494:33380,58496:33378,58497:33384,58498:33386,58499:33387,58500:33326,58501:33393,58502:33399,58503:33400,58504:33406,58505:33421,58506:33426,58507:33451,58508:33439,58509:33467,58510:33452,58511:33505,58512:33507,58513:33503,58514:33490,58515:33524,58516:33523,58517:33530,58518:33683,58519:33539,58520:33531,58521:33529,58522:33502,58523:33542,58524:33500,58525:33545,58526:33497,58527:33589,58528:33588,58529:33558,58530:33586,58531:33585,58532:33600,58533:33593,58534:33616,58535:33605,58536:33583,58537:33579,58538:33559,58539:33560,58540:33669,58541:33690,58542:33706,58543:33695,58544:33698,58545:33686,58546:33571,58547:33678,58548:33671,58549:33674,58550:33660,58551:33717,58552:33651,58553:33653,58554:33696,58555:33673,58556:33704,58557:33780,58558:33811,58559:33771,58560:33742,58561:33789,58562:33795,58563:33752,58564:33803,58565:33729,58566:33783,58567:33799,58568:33760,58569:33778,58570:33805,58571:33826,58572:33824,58573:33725,58574:33848,58575:34054,58576:33787,58577:33901,58578:33834,58579:33852,58580:34138,58581:33924,58582:33911,58583:33899,58584:33965,58585:33902,58586:33922,58587:33897,58588:33862,58589:33836,58590:33903,58591:33913,58592:33845,58593:33994,58594:33890,58595:33977,58596:33983,58597:33951,58598:34009,58599:33997,58600:33979,58601:34010,58602:34e3,58603:33985,58604:33990,58605:34006,58606:33953,58607:34081,58608:34047,58609:34036,58610:34071,58611:34072,58612:34092,58613:34079,58614:34069,58615:34068,58616:34044,58617:34112,58618:34147,58619:34136,58620:34120,58688:34113,58689:34306,58690:34123,58691:34133,58692:34176,58693:34212,58694:34184,58695:34193,58696:34186,58697:34216,58698:34157,58699:34196,58700:34203,58701:34282,58702:34183,58703:34204,58704:34167,58705:34174,58706:34192,58707:34249,58708:34234,58709:34255,58710:34233,58711:34256,58712:34261,58713:34269,58714:34277,58715:34268,58716:34297,58717:34314,58718:34323,58719:34315,58720:34302,58721:34298,58722:34310,58723:34338,58724:34330,58725:34352,58726:34367,58727:34381,58728:20053,58729:34388,58730:34399,58731:34407,58732:34417,58733:34451,58734:34467,58735:34473,58736:34474,58737:34443,58738:34444,58739:34486,58740:34479,58741:34500,58742:34502,58743:34480,58744:34505,58745:34851,58746:34475,58747:34516,58748:34526,58749:34537,58750:34540,58752:34527,58753:34523,58754:34543,58755:34578,58756:34566,58757:34568,58758:34560,58759:34563,58760:34555,58761:34577,58762:34569,58763:34573,58764:34553,58765:34570,58766:34612,58767:34623,58768:34615,58769:34619,58770:34597,58771:34601,58772:34586,58773:34656,58774:34655,58775:34680,58776:34636,58777:34638,58778:34676,58779:34647,58780:34664,58781:34670,58782:34649,58783:34643,58784:34659,58785:34666,58786:34821,58787:34722,58788:34719,58789:34690,58790:34735,58791:34763,58792:34749,58793:34752,58794:34768,58795:38614,58796:34731,58797:34756,58798:34739,58799:34759,58800:34758,58801:34747,58802:34799,58803:34802,58804:34784,58805:34831,58806:34829,58807:34814,58808:34806,58809:34807,58810:34830,58811:34770,58812:34833,58813:34838,58814:34837,58815:34850,58816:34849,58817:34865,58818:34870,58819:34873,58820:34855,58821:34875,58822:34884,58823:34882,58824:34898,58825:34905,58826:34910,58827:34914,58828:34923,58829:34945,58830:34942,58831:34974,58832:34933,58833:34941,58834:34997,58835:34930,58836:34946,58837:34967,58838:34962,58839:34990,58840:34969,58841:34978,58842:34957,58843:34980,58844:34992,58845:35007,58846:34993,58847:35011,58848:35012,58849:35028,58850:35032,58851:35033,58852:35037,58853:35065,58854:35074,58855:35068,58856:35060,58857:35048,58858:35058,58859:35076,58860:35084,58861:35082,58862:35091,58863:35139,58864:35102,58865:35109,58866:35114,58867:35115,58868:35137,58869:35140,58870:35131,58871:35126,58872:35128,58873:35148,58874:35101,58875:35168,58876:35166,58944:35174,58945:35172,58946:35181,58947:35178,58948:35183,58949:35188,58950:35191,58951:35198,58952:35203,58953:35208,58954:35210,58955:35219,58956:35224,58957:35233,58958:35241,58959:35238,58960:35244,58961:35247,58962:35250,58963:35258,58964:35261,58965:35263,58966:35264,58967:35290,58968:35292,58969:35293,58970:35303,58971:35316,58972:35320,58973:35331,58974:35350,58975:35344,58976:35340,58977:35355,58978:35357,58979:35365,58980:35382,58981:35393,58982:35419,58983:35410,58984:35398,58985:35400,58986:35452,58987:35437,58988:35436,58989:35426,58990:35461,58991:35458,58992:35460,58993:35496,58994:35489,58995:35473,58996:35493,58997:35494,58998:35482,58999:35491,59e3:35524,59001:35533,59002:35522,59003:35546,59004:35563,59005:35571,59006:35559,59008:35556,59009:35569,59010:35604,59011:35552,59012:35554,59013:35575,59014:35550,59015:35547,59016:35596,59017:35591,59018:35610,59019:35553,59020:35606,59021:35600,59022:35607,59023:35616,59024:35635,59025:38827,59026:35622,59027:35627,59028:35646,59029:35624,59030:35649,59031:35660,59032:35663,59033:35662,59034:35657,59035:35670,59036:35675,59037:35674,59038:35691,59039:35679,59040:35692,59041:35695,59042:35700,59043:35709,59044:35712,59045:35724,59046:35726,59047:35730,59048:35731,59049:35734,59050:35737,59051:35738,59052:35898,59053:35905,59054:35903,59055:35912,59056:35916,59057:35918,59058:35920,59059:35925,59060:35938,59061:35948,59062:35960,59063:35962,59064:35970,59065:35977,59066:35973,59067:35978,59068:35981,59069:35982,59070:35988,59071:35964,59072:35992,59073:25117,59074:36013,59075:36010,59076:36029,59077:36018,59078:36019,59079:36014,59080:36022,59081:36040,59082:36033,59083:36068,59084:36067,59085:36058,59086:36093,59087:36090,59088:36091,59089:36100,59090:36101,59091:36106,59092:36103,59093:36111,59094:36109,59095:36112,59096:40782,59097:36115,59098:36045,59099:36116,59100:36118,59101:36199,59102:36205,59103:36209,59104:36211,59105:36225,59106:36249,59107:36290,59108:36286,59109:36282,59110:36303,59111:36314,59112:36310,59113:36300,59114:36315,59115:36299,59116:36330,59117:36331,59118:36319,59119:36323,59120:36348,59121:36360,59122:36361,59123:36351,59124:36381,59125:36382,59126:36368,59127:36383,59128:36418,59129:36405,59130:36400,59131:36404,59132:36426,59200:36423,59201:36425,59202:36428,59203:36432,59204:36424,59205:36441,59206:36452,59207:36448,59208:36394,59209:36451,59210:36437,59211:36470,59212:36466,59213:36476,59214:36481,59215:36487,59216:36485,59217:36484,59218:36491,59219:36490,59220:36499,59221:36497,59222:36500,59223:36505,59224:36522,59225:36513,59226:36524,59227:36528,59228:36550,59229:36529,59230:36542,59231:36549,59232:36552,59233:36555,59234:36571,59235:36579,59236:36604,59237:36603,59238:36587,59239:36606,59240:36618,59241:36613,59242:36629,59243:36626,59244:36633,59245:36627,59246:36636,59247:36639,59248:36635,59249:36620,59250:36646,59251:36659,59252:36667,59253:36665,59254:36677,59255:36674,59256:36670,59257:36684,59258:36681,59259:36678,59260:36686,59261:36695,59262:36700,59264:36706,59265:36707,59266:36708,59267:36764,59268:36767,59269:36771,59270:36781,59271:36783,59272:36791,59273:36826,59274:36837,59275:36834,59276:36842,59277:36847,59278:36999,59279:36852,59280:36869,59281:36857,59282:36858,59283:36881,59284:36885,59285:36897,59286:36877,59287:36894,59288:36886,59289:36875,59290:36903,59291:36918,59292:36917,59293:36921,59294:36856,59295:36943,59296:36944,59297:36945,59298:36946,59299:36878,59300:36937,59301:36926,59302:36950,59303:36952,59304:36958,59305:36968,59306:36975,59307:36982,59308:38568,59309:36978,59310:36994,59311:36989,59312:36993,59313:36992,59314:37002,59315:37001,59316:37007,59317:37032,59318:37039,59319:37041,59320:37045,59321:37090,59322:37092,59323:25160,59324:37083,59325:37122,59326:37138,59327:37145,59328:37170,59329:37168,59330:37194,59331:37206,59332:37208,59333:37219,59334:37221,59335:37225,59336:37235,59337:37234,59338:37259,59339:37257,59340:37250,59341:37282,59342:37291,59343:37295,59344:37290,59345:37301,59346:37300,59347:37306,59348:37312,59349:37313,59350:37321,59351:37323,59352:37328,59353:37334,59354:37343,59355:37345,59356:37339,59357:37372,59358:37365,59359:37366,59360:37406,59361:37375,59362:37396,59363:37420,59364:37397,59365:37393,59366:37470,59367:37463,59368:37445,59369:37449,59370:37476,59371:37448,59372:37525,59373:37439,59374:37451,59375:37456,59376:37532,59377:37526,59378:37523,59379:37531,59380:37466,59381:37583,59382:37561,59383:37559,59384:37609,59385:37647,59386:37626,59387:37700,59388:37678,59456:37657,59457:37666,59458:37658,59459:37667,59460:37690,59461:37685,59462:37691,59463:37724,59464:37728,59465:37756,59466:37742,59467:37718,59468:37808,59469:37804,59470:37805,59471:37780,59472:37817,59473:37846,59474:37847,59475:37864,59476:37861,59477:37848,59478:37827,59479:37853,59480:37840,59481:37832,59482:37860,59483:37914,59484:37908,59485:37907,59486:37891,59487:37895,59488:37904,59489:37942,59490:37931,59491:37941,59492:37921,59493:37946,59494:37953,59495:37970,59496:37956,59497:37979,59498:37984,59499:37986,59500:37982,59501:37994,59502:37417,59503:38e3,59504:38005,59505:38007,59506:38013,59507:37978,59508:38012,59509:38014,59510:38017,59511:38015,59512:38274,59513:38279,59514:38282,59515:38292,59516:38294,59517:38296,59518:38297,59520:38304,59521:38312,59522:38311,59523:38317,59524:38332,59525:38331,59526:38329,59527:38334,59528:38346,59529:28662,59530:38339,59531:38349,59532:38348,59533:38357,59534:38356,59535:38358,59536:38364,59537:38369,59538:38373,59539:38370,59540:38433,59541:38440,59542:38446,59543:38447,59544:38466,59545:38476,59546:38479,59547:38475,59548:38519,59549:38492,59550:38494,59551:38493,59552:38495,59553:38502,59554:38514,59555:38508,59556:38541,59557:38552,59558:38549,59559:38551,59560:38570,59561:38567,59562:38577,59563:38578,59564:38576,59565:38580,59566:38582,59567:38584,59568:38585,59569:38606,59570:38603,59571:38601,59572:38605,59573:35149,59574:38620,59575:38669,59576:38613,59577:38649,59578:38660,59579:38662,59580:38664,59581:38675,59582:38670,59583:38673,59584:38671,59585:38678,59586:38681,59587:38692,59588:38698,59589:38704,59590:38713,59591:38717,59592:38718,59593:38724,59594:38726,59595:38728,59596:38722,59597:38729,59598:38748,59599:38752,59600:38756,59601:38758,59602:38760,59603:21202,59604:38763,59605:38769,59606:38777,59607:38789,59608:38780,59609:38785,59610:38778,59611:38790,59612:38795,59613:38799,59614:38800,59615:38812,59616:38824,59617:38822,59618:38819,59619:38835,59620:38836,59621:38851,59622:38854,59623:38856,59624:38859,59625:38876,59626:38893,59627:40783,59628:38898,59629:31455,59630:38902,59631:38901,59632:38927,59633:38924,59634:38968,59635:38948,59636:38945,59637:38967,59638:38973,59639:38982,59640:38991,59641:38987,59642:39019,59643:39023,59644:39024,59712:39025,59713:39028,59714:39027,59715:39082,59716:39087,59717:39089,59718:39094,59719:39108,59720:39107,59721:39110,59722:39145,59723:39147,59724:39171,59725:39177,59726:39186,59727:39188,59728:39192,59729:39201,59730:39197,59731:39198,59732:39204,59733:39200,59734:39212,59735:39214,59736:39229,59737:39230,59738:39234,59739:39241,59740:39237,59741:39248,59742:39243,59743:39249,59744:39250,59745:39244,59746:39253,59747:39319,59748:39320,59749:39333,59750:39341,59751:39342,59752:39356,59753:39391,59754:39387,59755:39389,59756:39384,59757:39377,59758:39405,59759:39406,59760:39409,59761:39410,59762:39419,59763:39416,59764:39425,59765:39439,59766:39429,59767:39394,59768:39449,59769:39467,59770:39479,59771:39493,59772:39490,59773:39488,59774:39491,59776:39486,59777:39509,59778:39501,59779:39515,59780:39511,59781:39519,59782:39522,59783:39525,59784:39524,59785:39529,59786:39531,59787:39530,59788:39597,59789:39600,59790:39612,59791:39616,59792:39631,59793:39633,59794:39635,59795:39636,59796:39646,59797:39647,59798:39650,59799:39651,59800:39654,59801:39663,59802:39659,59803:39662,59804:39668,59805:39665,59806:39671,59807:39675,59808:39686,59809:39704,59810:39706,59811:39711,59812:39714,59813:39715,59814:39717,59815:39719,59816:39720,59817:39721,59818:39722,59819:39726,59820:39727,59821:39730,59822:39748,59823:39747,59824:39759,59825:39757,59826:39758,59827:39761,59828:39768,59829:39796,59830:39827,59831:39811,59832:39825,59833:39830,59834:39831,59835:39839,59836:39840,59837:39848,59838:39860,59839:39872,59840:39882,59841:39865,59842:39878,59843:39887,59844:39889,59845:39890,59846:39907,59847:39906,59848:39908,59849:39892,59850:39905,59851:39994,59852:39922,59853:39921,59854:39920,59855:39957,59856:39956,59857:39945,59858:39955,59859:39948,59860:39942,59861:39944,59862:39954,59863:39946,59864:39940,59865:39982,59866:39963,59867:39973,59868:39972,59869:39969,59870:39984,59871:40007,59872:39986,59873:40006,59874:39998,59875:40026,59876:40032,59877:40039,59878:40054,59879:40056,59880:40167,59881:40172,59882:40176,59883:40201,59884:40200,59885:40171,59886:40195,59887:40198,59888:40234,59889:40230,59890:40367,59891:40227,59892:40223,59893:40260,59894:40213,59895:40210,59896:40257,59897:40255,59898:40254,59899:40262,59900:40264,59968:40285,59969:40286,59970:40292,59971:40273,59972:40272,59973:40281,59974:40306,59975:40329,59976:40327,59977:40363,59978:40303,59979:40314,59980:40346,59981:40356,59982:40361,59983:40370,59984:40388,59985:40385,59986:40379,59987:40376,59988:40378,59989:40390,59990:40399,59991:40386,59992:40409,59993:40403,59994:40440,59995:40422,59996:40429,59997:40431,59998:40445,59999:40474,6e4:40475,60001:40478,60002:40565,60003:40569,60004:40573,60005:40577,60006:40584,60007:40587,60008:40588,60009:40594,60010:40597,60011:40593,60012:40605,60013:40613,60014:40617,60015:40632,60016:40618,60017:40621,60018:38753,60019:40652,60020:40654,60021:40655,60022:40656,60023:40660,60024:40668,60025:40670,60026:40669,60027:40672,60028:40677,60029:40680,60030:40687,60032:40692,60033:40694,60034:40695,60035:40697,60036:40699,60037:40700,60038:40701,60039:40711,60040:40712,60041:30391,60042:40725,60043:40737,60044:40748,60045:40766,60046:40778,60047:40786,60048:40788,60049:40803,60050:40799,60051:40800,60052:40801,60053:40806,60054:40807,60055:40812,60056:40810,60057:40823,60058:40818,60059:40822,60060:40853,60061:40860,60062:40864,60063:22575,60064:27079,60065:36953,60066:29796,60067:20956,60068:29081}}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=P(1),f=P(2);function l(E,r,a,F){var d;r.degree()<a.degree()&&(d=[a,r],r=d[0],a=d[1]);for(var D=r,i=a,w=E.zero,A=E.one;i.degree()>=F/2;){var x=D,B=w;if(D=i,w=A,D.isZero())return null;i=x;for(var e=E.zero,C=D.getCoefficient(D.degree()),t=E.inverse(C);i.degree()>=D.degree()&&!i.isZero();){var n=i.degree()-D.degree(),k=E.multiply(i.getCoefficient(i.degree()),t);e=e.addOrSubtract(E.buildMonomial(n,k)),i=i.addOrSubtract(D.multiplyByMonomial(n,k))}if(A=e.multiplyPoly(w).addOrSubtract(B),i.degree()>=D.degree())return null}var m=A.getCoefficient(0);if(m===0)return null;var v=E.inverse(m);return[A.multiply(v),i.multiply(v)]}function s(E,r){var a=r.degree();if(a===1)return[r.getCoefficient(1)];for(var F=new Array(a),d=0,D=1;D<E.size&&d<a;D++)r.evaluateAt(D)===0&&(F[d]=E.inverse(D),d++);return d!==a?null:F}function c(E,r,a){for(var F=a.length,d=new Array(F),D=0;D<F;D++){for(var i=E.inverse(a[D]),w=1,A=0;A<F;A++)D!==A&&(w=E.multiply(w,g.addOrSubtractGF(1,E.multiply(a[A],i))));d[D]=E.multiply(r.evaluateAt(i),E.inverse(w)),E.generatorBase!==0&&(d[D]=E.multiply(d[D],i))}return d}function o(E,r){var a=new Uint8ClampedArray(E.length);a.set(E);for(var F=new g.default(285,256,0),d=new f.default(F,a),D=new Uint8ClampedArray(r),i=!1,w=0;w<r;w++){var A=d.evaluateAt(F.exp(w+F.generatorBase));D[D.length-1-w]=A,A!==0&&(i=!0)}if(!i)return a;var x=new f.default(F,D),B=l(F,F.buildMonomial(r,1),x,r);if(B===null)return null;var e=s(F,B[0]);if(e==null)return null;for(var C=c(F,B[1],e),t=0;t<e.length;t++){var n=a.length-1-F.log(e[t]);if(n<0)return null;a[n]=g.addOrSubtractGF(a[n],C[t])}return a}u.decode=o}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0}),u.VERSIONS=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,versionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,dataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,versionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},{numBlocks:61,dataCodewordsPerBlock:16}]}]}]}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=P(0);function f(o,E,r,a){var F=o.x-E.x+r.x-a.x,d=o.y-E.y+r.y-a.y;if(F===0&&d===0)return{a11:E.x-o.x,a12:E.y-o.y,a13:0,a21:r.x-E.x,a22:r.y-E.y,a23:0,a31:o.x,a32:o.y,a33:1};var D=E.x-r.x,i=a.x-r.x,w=E.y-r.y,A=a.y-r.y,x=D*A-i*w,B=(F*A-i*d)/x,e=(D*d-F*w)/x;return{a11:E.x-o.x+B*E.x,a12:E.y-o.y+B*E.y,a13:B,a21:a.x-o.x+e*a.x,a22:a.y-o.y+e*a.y,a23:e,a31:o.x,a32:o.y,a33:1}}function l(o,E,r,a){var F=f(o,E,r,a);return{a11:F.a22*F.a33-F.a23*F.a32,a12:F.a13*F.a32-F.a12*F.a33,a13:F.a12*F.a23-F.a13*F.a22,a21:F.a23*F.a31-F.a21*F.a33,a22:F.a11*F.a33-F.a13*F.a31,a23:F.a13*F.a21-F.a11*F.a23,a31:F.a21*F.a32-F.a22*F.a31,a32:F.a12*F.a31-F.a11*F.a32,a33:F.a11*F.a22-F.a12*F.a21}}function s(o,E){return{a11:o.a11*E.a11+o.a21*E.a12+o.a31*E.a13,a12:o.a12*E.a11+o.a22*E.a12+o.a32*E.a13,a13:o.a13*E.a11+o.a23*E.a12+o.a33*E.a13,a21:o.a11*E.a21+o.a21*E.a22+o.a31*E.a23,a22:o.a12*E.a21+o.a22*E.a22+o.a32*E.a23,a23:o.a13*E.a21+o.a23*E.a22+o.a33*E.a23,a31:o.a11*E.a31+o.a21*E.a32+o.a31*E.a33,a32:o.a12*E.a31+o.a22*E.a32+o.a32*E.a33,a33:o.a13*E.a31+o.a23*E.a32+o.a33*E.a33}}function c(o,E){for(var r=l({x:3.5,y:3.5},{x:E.dimension-3.5,y:3.5},{x:E.dimension-6.5,y:E.dimension-6.5},{x:3.5,y:E.dimension-3.5}),a=f(E.topLeft,E.topRight,E.alignmentPattern,E.bottomLeft),F=s(a,r),d=g.BitMatrix.createEmpty(E.dimension,E.dimension),D=function(e,C){var t=F.a13*e+F.a23*C+F.a33;return{x:(F.a11*e+F.a21*C+F.a31)/t,y:(F.a12*e+F.a22*C+F.a32)/t}},i=0;i<E.dimension;i++)for(var w=0;w<E.dimension;w++){var A=w+.5,x=i+.5,B=D(A,x);d.set(w,i,o.get(Math.floor(B.x),Math.floor(B.y)))}return{matrix:d,mappingFunction:D}}u.extract=c}),(function(N,u,P){"use strict";Object.defineProperty(u,"__esModule",{value:!0});var g=4,f=.5,l=1.5,s=function(A,x){return Math.sqrt(Math.pow(x.x-A.x,2)+Math.pow(x.y-A.y,2))};function c(A){return A.reduce(function(x,B){return x+B})}function o(A,x,B){var e,C,t,n,k=s(A,x),m=s(x,B),v=s(A,B),M,p,h;return m>=k&&m>=v?(e=[x,A,B],M=e[0],p=e[1],h=e[2]):v>=m&&v>=k?(C=[A,x,B],M=C[0],p=C[1],h=C[2]):(t=[A,B,x],M=t[0],p=t[1],h=t[2]),(h.x-p.x)*(M.y-p.y)-(h.y-p.y)*(M.x-p.x)<0&&(n=[h,M],M=n[0],h=n[1]),{bottomLeft:M,topLeft:p,topRight:h}}function E(A,x,B,e){var C=(c(a(A,B,e,5))/7+c(a(A,x,e,5))/7+c(a(B,A,e,5))/7+c(a(x,A,e,5))/7)/4;if(C<1)throw new Error("Invalid module size");var t=Math.round(s(A,x)/C),n=Math.round(s(A,B)/C),k=Math.floor((t+n)/2)+7;switch(k%4){case 0:k++;break;case 2:k--;break}return{dimension:k,moduleSize:C}}function r(A,x,B,e){var C=[{x:Math.floor(A.x),y:Math.floor(A.y)}],t=Math.abs(x.y-A.y)>Math.abs(x.x-A.x),n,k,m,v;t?(n=Math.floor(A.y),k=Math.floor(A.x),m=Math.floor(x.y),v=Math.floor(x.x)):(n=Math.floor(A.x),k=Math.floor(A.y),m=Math.floor(x.x),v=Math.floor(x.y));for(var M=Math.abs(m-n),p=Math.abs(v-k),h=Math.floor(-M/2),I=n<m?1:-1,b=k<v?1:-1,S=!0,O=n,T=k;O!==m+I;O+=I){var y=t?T:O,z=t?O:T;if(B.get(y,z)!==S&&(S=!S,C.push({x:y,y:z}),C.length===e+1))break;if(h+=p,h>0){if(T===v)break;T+=b,h-=M}}for(var X=[],L=0;L<e;L++)C[L]&&C[L+1]?X.push(s(C[L],C[L+1])):X.push(0);return X}function a(A,x,B,e){var C,t=x.y-A.y,n=x.x-A.x,k=r(A,x,B,Math.ceil(e/2)),m=r(A,{x:A.x-n,y:A.y-t},B,Math.ceil(e/2)),v=k.shift()+m.shift()-1;return(C=m.concat(v)).concat.apply(C,k)}function F(A,x){var B=c(A)/c(x),e=0;return x.forEach(function(C,t){e+=Math.pow(A[t]-C*B,2)}),{averageSize:B,error:e}}function d(A,x,B){try{var e=a(A,{x:-1,y:A.y},B,x.length),C=a(A,{x:A.x,y:-1},B,x.length),t={x:Math.max(0,A.x-A.y)-1,y:Math.max(0,A.y-A.x)-1},n=a(A,t,B,x.length),k={x:Math.min(B.width,A.x+A.y)+1,y:Math.min(B.height,A.y+A.x)+1},m=a(A,k,B,x.length),v=F(e,x),M=F(C,x),p=F(n,x),h=F(m,x),I=Math.sqrt(v.error*v.error+M.error*M.error+p.error*p.error+h.error*h.error),b=(v.averageSize+M.averageSize+p.averageSize+h.averageSize)/4,S=(Math.pow(v.averageSize-b,2)+Math.pow(M.averageSize-b,2)+Math.pow(p.averageSize-b,2)+Math.pow(h.averageSize-b,2))/b;return I+S}catch{return 1/0}}function D(A,x){for(var B=Math.round(x.x);A.get(B,Math.round(x.y));)B--;for(var e=Math.round(x.x);A.get(e,Math.round(x.y));)e++;for(var C=(B+e)/2,t=Math.round(x.y);A.get(Math.round(C),t);)t--;for(var n=Math.round(x.y);A.get(Math.round(C),n);)n++;var k=(t+n)/2;return{x:C,y:k}}function i(A){for(var x=[],B=[],e=[],C=[],t=function(y){for(var z=0,X=!1,L=[0,0,0,0,0],V=function(G){var H=A.get(G,y);if(H===X)z++;else{L=[L[1],L[2],L[3],L[4],z],z=1,X=H;var _=c(L)/7,e0=Math.abs(L[0]-_)<_&&Math.abs(L[1]-_)<_&&Math.abs(L[2]-3*_)<3*_&&Math.abs(L[3]-_)<_&&Math.abs(L[4]-_)<_&&!H,K=c(L.slice(-3))/3,F0=Math.abs(L[2]-K)<K&&Math.abs(L[3]-K)<K&&Math.abs(L[4]-K)<K&&H;if(e0){var $=G-L[3]-L[4],Y=$-L[2],Q={startX:Y,endX:$,y},Z=B.filter(function(R){return Y>=R.bottom.startX&&Y<=R.bottom.endX||$>=R.bottom.startX&&Y<=R.bottom.endX||Y<=R.bottom.startX&&$>=R.bottom.endX&&L[2]/(R.bottom.endX-R.bottom.startX)<l&&L[2]/(R.bottom.endX-R.bottom.startX)>f});Z.length>0?Z[0].bottom=Q:B.push({top:Q,bottom:Q})}if(F0){var q=G-L[4],J=q-L[3],Q={startX:J,y,endX:q},Z=C.filter(function(U){return J>=U.bottom.startX&&J<=U.bottom.endX||q>=U.bottom.startX&&J<=U.bottom.endX||J<=U.bottom.startX&&q>=U.bottom.endX&&L[2]/(U.bottom.endX-U.bottom.startX)<l&&L[2]/(U.bottom.endX-U.bottom.startX)>f});Z.length>0?Z[0].bottom=Q:C.push({top:Q,bottom:Q})}}},j=-1;j<=A.width;j++)V(j);x.push.apply(x,B.filter(function(G){return G.bottom.y!==y&&G.bottom.y-G.top.y>=2})),B=B.filter(function(G){return G.bottom.y===y}),e.push.apply(e,C.filter(function(G){return G.bottom.y!==y})),C=C.filter(function(G){return G.bottom.y===y})},n=0;n<=A.height;n++)t(n);x.push.apply(x,B.filter(function(y){return y.bottom.y-y.top.y>=2})),e.push.apply(e,C);var k=x.filter(function(y){return y.bottom.y-y.top.y>=2}).map(function(y){var z=(y.top.startX+y.top.endX+y.bottom.startX+y.bottom.endX)/4,X=(y.top.y+y.bottom.y+1)/2;if(A.get(Math.round(z),Math.round(X))){var L=[y.top.endX-y.top.startX,y.bottom.endX-y.bottom.startX,y.bottom.y-y.top.y+1],V=c(L)/L.length,j=d({x:Math.round(z),y:Math.round(X)},[1,1,3,1,1],A);return{score:j,x:z,y:X,size:V}}}).filter(function(y){return!!y}).sort(function(y,z){return y.score-z.score}).map(function(y,z,X){if(z>g)return null;var L=X.filter(function(j,G){return z!==G}).map(function(j){return{x:j.x,y:j.y,score:j.score+Math.pow(j.size-y.size,2)/y.size,size:j.size}}).sort(function(j,G){return j.score-G.score});if(L.length<2)return null;var V=y.score+L[0].score+L[1].score;return{points:[y].concat(L.slice(0,2)),score:V}}).filter(function(y){return!!y}).sort(function(y,z){return y.score-z.score});if(k.length===0)return null;var m=o(k[0].points[0],k[0].points[1],k[0].points[2]),v=m.topRight,M=m.topLeft,p=m.bottomLeft,h=w(A,e,v,M,p),I=[];h&&I.push({alignmentPattern:{x:h.alignmentPattern.x,y:h.alignmentPattern.y},bottomLeft:{x:p.x,y:p.y},dimension:h.dimension,topLeft:{x:M.x,y:M.y},topRight:{x:v.x,y:v.y}});var b=D(A,v),S=D(A,M),O=D(A,p),T=w(A,e,b,S,O);return T&&I.push({alignmentPattern:{x:T.alignmentPattern.x,y:T.alignmentPattern.y},bottomLeft:{x:O.x,y:O.y},topLeft:{x:S.x,y:S.y},topRight:{x:b.x,y:b.y},dimension:T.dimension}),I.length===0?null:I}u.locate=i;function w(A,x,B,e,C){var t,n,k;try{t=E(e,B,C,A),n=t.dimension,k=t.moduleSize}catch{return null}var m={x:B.x-e.x+C.x,y:B.y-e.y+C.y},v=(s(e,C)+s(e,B))/2/k,M=1-3/v,p={x:e.x+M*(m.x-e.x),y:e.y+M*(m.y-e.y)},h=x.map(function(b){var S=(b.top.startX+b.top.endX+b.bottom.startX+b.bottom.endX)/4,O=(b.top.y+b.bottom.y+1)/2;if(A.get(Math.floor(S),Math.floor(O))){var T=[b.top.endX-b.top.startX,b.bottom.endX-b.bottom.startX,b.bottom.y-b.top.y+1],y=c(T)/T.length,z=d({x:Math.floor(S),y:Math.floor(O)},[1,1,1],A),X=z+s({x:S,y:O},p);return{x:S,y:O,score:X}}}).filter(function(b){return!!b}).sort(function(b,S){return b.score-S.score}),I=v>=15&&h.length?h[0]:p;return{alignmentPattern:I,dimension:n}}})]).default})});var C0=c0(B0());window.KDQR=C0.default;})();

/* Kontar · ponte entre os dados (kd.js) e o protótipo 08.
   - install: troca os dados de exemplo do Component pelos dados reais
   - apply:   dados que dependem do mês selecionado
   - vals:    valores que o template usa e que eram fixos no protótipo
   - sync:    grava no banco o que o usuário muda (o protótipo guardava só em memória) */
(function () {
  'use strict';
  const KD = window.KD;
  const { MES, MESL, int, brl0, mShort, mIdx } = KD;
  const last = (a, i) => i === a.length - 1 ? '0' : '1px dashed #2B2B30';

  KD.norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  KD.signedInt = v => (v < 0 ? '−' : '') + int(Math.abs(v));
  KD.daysLeftLbl = () => { const T = KD.today, n = new Date(T.getFullYear(), T.getMonth() + 1, 0).getDate() - T.getDate(); return n === 0 ? 'último dia do mês' : n + (n === 1 ? ' dia até o fim do mês' : ' dias até o fim do mês'); };
  KD.isDemo = () => !!(KD.user && KD.user.email === 'teste@kontar.app');
  const DEMO_MSG = 'Esta é a conta de demonstração: isso fica travado para todo mundo poder testar.';
  KD.since = () => new Date((KD.user && KD.user.created_at) || Date.now());
  KD.kList = () => [...new Set(KD.M.rows.map(r => r.k))].filter(k => k && k !== '—');
  KD.lastAte = P => { let best = null, bi = -1; P.forEach(p => { const q = p.ate.split('/'), i = (2000 + +q[1]) * 12 + MES.indexOf(q[0]); if (i > bi) { bi = i; best = p.ate; } }); return best || '—'; };
  KD.noFat = mi => ({ n: '—', v: '0', sub: 'nenhuma fatura vence em ' + mShort(mi), cor: '#1C1C20', ink: '#FFFFFF' });
  KD.cardMap = key => { const o = {}; KD.M.cards.forEach(c => { const n = c.nick || c.n; o[n] = key === 'code' ? KD.CODE(c.n) : c[key]; if (n !== c.n) o[c.n] = o[n]; }); return o; };
  KD.accLogo = () => { const o = {}; KD.M.accs.forEach(a => { const b = KD.colorOf(a.nome, '', '') && (KD.BANK[a.nome] ? a.nome : null); o[a.nome] = /Mercado Pago/.test(a.nome) ? 'Mercado Pago' : /Nubank/.test(a.nome) ? 'Nubank' : /Itaú/.test(a.nome) ? 'Itaú' : /C6/.test(a.nome) ? 'C6' : b || a.nome; }); return o; };
  KD.alert = k => (KD._C && KD._C.NOTIFS.find(n => n.home === k && n.kind === 'block' && (k !== 'a1' || n.card))) || {};

  /* ---------------- dropdowns: abrem com a opção atual em cima do campo (como o menu do sistema) ----------------
     Vale pra todo dropdown de escolha única da plataforma. A opção selecionada ([data-dd-on="1"]) fica centrada
     no campo que abriu o menu; se isso empurraria o menu pra fora da tela (ou de um container que corta, tipo
     a área rolável da página ou o painel com máscara), ele desliza pra dentro e, se a lista for maior que o
     espaço, ela já abre rolada de forma que a opção atual continue alinhada com o campo.
     Menus do template ganham [data-dd] e são posicionados sozinhos ao aparecer (observer lá embaixo);
     o painel de transação chama KD.drop.place direto porque redesenha por innerHTML. */
  const DD_GAP = 8;
  const ddBounds = (el, minTop) => {
    let t = DD_GAP, b = window.innerHeight - DD_GAP, l = DD_GAP, r = window.innerWidth - DD_GAP;
    for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
      const c = getComputedStyle(e), cut = c.clipPath !== 'none' || (c.maskImage && c.maskImage !== 'none') || (c.webkitMaskImage && c.webkitMaskImage !== 'none');
      const cy = cut || c.overflowY !== 'visible', cx = cut || c.overflowX !== 'visible';
      if (!cx && !cy) continue;
      const rc = e.getBoundingClientRect();
      if (cy) { t = Math.max(t, rc.top + DD_GAP); b = Math.min(b, rc.bottom - DD_GAP); }
      if (cx) { l = Math.max(l, rc.left + DD_GAP); r = Math.min(r, rc.right - DD_GAP); }
    }
    if (minTop != null) t = Math.max(t, minTop);
    return { t, b, l, r };
  };
  const ddScale = (m) => { const p = m.offsetParent; if (!p || !p.offsetHeight) return 1; return p.getBoundingClientRect().height / p.offsetHeight || 1; };
  KD.drop = {
    // o = { anchor, minTop (px de tela), maxH (px do layout), animate (default true) }
    place(m, o) {
      o = o || {}; const anchor = o.anchor || m.previousElementSibling; if (!anchor || !m.offsetParent) return null;
      const sc = m.querySelector('[data-popscroll]') || m, k = ddScale(m);
      if (!m.dataset.ddCap) { const mh = parseFloat(getComputedStyle(m).maxHeight); m.dataset.ddCap = String(o.maxH || (isFinite(mh) ? mh : 1e5)); }
      const cap = +m.dataset.ddCap * k;
      // a animação de entrada antiga de cada menu (translate/scaleY) distorce a medida: sai antes de medir
      m.style.animation = 'none';
      m.style.bottom = 'auto'; m.style.marginTop = '0px'; m.style.marginBottom = '0px'; m.style.maxHeight = 'none'; m.style.translate = '';
      sc.scrollTop = 0;
      const pr = m.offsetParent.getBoundingClientRect(), A = anchor.getBoundingClientRect(), cy = A.top + A.height / 2, pt = pr.top + m.offsetParent.clientTop * k;
      m.style.top = (A.top - pt) / k + 'px';
      const R = m.getBoundingClientRect(), full = R.height;
      const on = m.querySelector('[data-dd-on="1"]'), oR = on && on.getBoundingClientRect();
      const oy = oR ? oR.top - R.top + oR.height / 2 : A.height / 2;   // sem opção marcada: o topo do menu encosta no topo do campo
      const B = ddBounds(m, o.minTop), h = Math.max(Math.min(full, cap, B.b - B.t), Math.min(full, 120 * k)), ih = oR ? oR.height : 0;
      // s = quanto a lista já abre rolada; top = cy - oy + s mantém a opção atual exatamente no centro do campo.
      // Restrições: menu dentro dos limites, opção atual visível dentro do menu, rolagem possível. Se a lista
      // precisa rolar, prefere o menu centrado no campo; se cabe inteira, s = 0. Sem solução (campo colado na
      // borda), o menu só desliza pra dentro — como o sistema faz.
      const cl = (v, a, b) => Math.min(Math.max(v, a), b), sPref = full > h ? oy - h / 2 : 0;
      const lo = Math.max(0, B.t - cy + oy, oy - h + ih / 2), hi = Math.min(full - h, B.b - h - cy + oy, oy - ih / 2);
      let s, top;
      if (lo <= hi) { s = cl(sPref, lo, hi); top = cy - oy + s; }
      else {   // campo colado na borda: o menu encosta no limite e a lista rola pra opção ficar o mais perto possível do campo
        top = cl(full > h ? cy - h / 2 : cy - oy, B.t, B.b - h);
        const l2 = Math.max(0, oy - h + ih / 2), h2 = Math.min(full - h, oy - ih / 2);
        s = l2 <= h2 ? cl(top + oy - cy, l2, h2) : cl(top + oy - cy, 0, full - h);
      }
      m.style.top = (top - pt) / k + 'px'; m.style.maxHeight = h / k + 'px';
      sc.scrollTop = s / k;
      // lateral: se escapar da tela/container, desliza pra dentro
      const R2 = m.getBoundingClientRect(); let dx = 0;
      if (R2.right > B.r) dx = B.r - R2.right; if (R2.left + dx < B.l) dx = B.l - R2.left;
      if (dx) m.style.translate = dx / k + 'px 0';
      const pos = { top: m.style.top, maxH: m.style.maxHeight, tr: m.style.translate, s: s / k, oy: (cy - top) / k };
      if (o.animate !== false) {
        m.style.transformOrigin = '50% ' + pos.oy + 'px';
        if (m.animate) m.animate([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'cubic-bezier(.2,.7,.2,1)' });
      }
      return pos;
    },
    // reaplica uma posição já calculada (o painel redesenhou com o menu ainda aberto): sem animar, sem pular
    apply(m, pos) {
      m.style.bottom = 'auto'; m.style.marginTop = '0px'; m.style.marginBottom = '0px';
      m.style.top = pos.top; m.style.maxHeight = pos.maxH; m.style.translate = pos.tr || ''; m.style.animation = 'none';
    }
  };
  if (window.MutationObserver) new MutationObserver(ms => {
    ms.forEach(mu => mu.addedNodes.forEach(n => {
      if (n.nodeType !== 1) return;
      (n.matches('[data-dd]') ? [n] : []).concat([...n.querySelectorAll('[data-dd]')]).forEach(m => { if (!m.__dd) { m.__dd = 1; KD.drop.place(m); } });
    }));
  }).observe(document.documentElement, { childList: true, subtree: true });


  /* ---------------- rotas: a página atual vive no endereço (#/extrato), voltar/avançar e reload funcionam ---------------- */
  const SLUG = { home: '', extrato: 'extrato', metas: 'metas', categorias: 'categorias', cartoes: 'cartoes', estab: 'estabelecimentos', config: 'preferencias', conta: 'conta', ajuda: 'ajuda' };
  const REV = Object.fromEntries(Object.entries(SLUG).filter(e => e[1]).map(e => [e[1], e[0]]));
  KD.pageFromHash = () => { const h = String(location.hash || '').replace(/^#\/?/, '').split(/[?&/]/)[0].toLowerCase(); return h === '' ? 'home' : (REV[h] || null); };
  KD.urlFor = pg => location.pathname + location.search + (SLUG[pg] ? '#/' + SLUG[pg] : '');
  KD.routeStart = c => {
    KD._lastPage = c.state.page;
    try { history.replaceState({ kpg: c.state.page }, '', KD.urlFor(c.state.page)); } catch (e) {}
    if (c.state.page !== 'home') setTimeout(() => { try { c.pgSeq(c.state.page); } catch (e) {} }, 140);
    window.addEventListener('popstate', () => {
      const pg = KD.pageFromHash() || 'home', go = n => { const k = KD.comp; if (!k || pg === k.state.page) return; if (k._fading && n < 12) return setTimeout(() => go(n + 1), 120); KD._popTo = pg; k.goPage(pg); };
      go(0);
    });
  };
  KD.routeSync = c => {
    const pg = c.state.page; if (pg === KD._lastPage) return; KD._lastPage = pg;
    if (KD._popTo === pg) { KD._popTo = null; return; }
    try { history.pushState({ kpg: pg }, '', KD.urlFor(pg)); } catch (e) {}
  };

  /* ---------------- install ---------------- */
  KD.install = function (C) {
    const M = KD.M; KD._C = C;
    C.CUR = M.CUR; C.MIN = M.MIN;
    C.ROWS = M.rows; C.EST = M.est; C.DOM = M.DOM;
    const CAT = {}; Object.values(M.catById).forEach(c => { if (c.nome in KD.CAT_DEF) CAT[c.nome] = KD.CAT_DEF[c.nome]; }); C.CAT = CAT;
    const KC = {}; M.accs.forEach(a => { KC[a.nome] = a.cor; }); M.cards.forEach(c => { KC[c.n] = c.cor; if (c.nick) KC[c.nick] = c.cor; }); C.KC = KC;
    C.METAS = KD.metas();
    C.NOTIFS = KD.notifs();
    KD.ux();
    C.EXP.lanc.nav = '';
    const did = C.prototype.componentDidMount, dup = C.prototype.componentDidUpdate;
    C.prototype.componentDidMount = function () {
      KD.comp = this; KD.snap(this.state);
      const r = did && did.apply(this, arguments);
      KD.routeStart(this); KD.sessGuard();
      return r;
    };
    C.prototype.componentDidUpdate = function () {
      try { KD.sync(this); } catch (e) { console.error('[kontar] sync', e); }
      try { KD.routeSync(this); } catch (e) { console.error('[kontar] rota', e); }
      // Card Sobra/Patrimônio: meshTone() só rodava na montagem e ao clicar na aba, então a cor
      // do gradiente ficava presa no sinal antigo depois de trocar de mês ou editar uma transação,
      // mesmo com o número e o texto já certos (eles são recalculados a cada render; o gradiente não).
      try { this.meshTone(false); } catch (e) { /* ainda sem o DOM montado */ }
      return dup && dup.apply(this, arguments);
    };
    KD._applied = null;
  };
  KD.metas = () => KD.M.goals.map(g => {
    const alvo = Number(g.alvo), gd = Number(g.guardado), pz = KD.pd(g.prazo), ink = (c => { const h = c.replace('#', ''), n = parseInt(h, 16), L = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; return L > 0.55 ? '#0A0A0A' : '#FFFFFF'; })(g.cor);
    return { id: g.id, n: g.nome, p: alvo ? Math.round(gd / alvo * 100) : 0, ate: mShort(mIdx(pz)), g: brl0(gd), of: brl0(alvo), f: brl0(Math.max(0, alvo - gd)), c: g.cor, ink, i: g.icone, _v: alvo, _g: gd };
  });

  KD.apply = function (C, mi) {
    if (KD._applied === mi && KD._ver === KD._appliedVer) return;
    const S = KD.month(mi);
    Object.assign(C, { LANC: S.LANC, FATS: S.FATS, FUT: S.FUT, PARC: S.PARC, TET: S.TET, ONDE: S.ONDE, ASSIN: S.ASSIN, SVAL: S.SVAL, SOBEV: S.SOBEV, PATEV: S.PATEV, CONTAS: S.CONTAS, LIM: S.LIM });
    const E = C.EXP, futTot = S.FUT.reduce((a, f) => a + Object.values(f.s).reduce((x, y) => x + y, 0), 0), futM = S.FUT.filter(f => Object.keys(f.s).length);
    E.limite.big = brl0(S.lim.used); E.limite.bigL = 'usados de ' + brl0(S.lim.tot) + ' em limite cadastrado';
    E.futuras.big = brl0(futTot); E.futuras.bigL = futM.length ? 'já comprometidos de ' + futM[0].m + ' a ' + futM[futM.length - 1].m : 'nada comprometido nos próximos meses';
    const half = S.TET.filter(t => t.t && t.v / t.t >= 0.5).length; E.tetos.big = half + ' de ' + S.TET.length; E.tetos.bigL = 'categorias já passaram da metade do teto';
    const ot = S.ONDE.reduce((a, o) => a + o.v, 0), ml = MESL[mi % 12];
    E.onde.d = 'O valor cheio de cada compra, no mês em que você decidiu comprar. ' + ml + ', por competência.'; E.onde.big = brl0(ot); E.onde.bigL = 'em ' + ml.toLowerCase() + ', em ' + S.ONDE.length + (S.ONDE.length === 1 ? ' categoria' : ' categorias');
    const pt = S.PARC.reduce((a, p) => a + p.r, 0); E.parc.big = brl0(pt); E.parc.bigL = 'ainda a pagar em ' + S.PARC.length + (S.PARC.length === 1 ? ' parcelamento' : ' parcelamentos');
    KD._applied = mi; KD._appliedVer = KD._ver;
  };

  /* cartões com as edições da tela (mesma regra do protótipo) */
  function lims(comp) {
    const C = KD._C, st = comp.state, ce = st.ce, cOv = st.cOv || {}, del = st.cDel || [];
    return C.LIM.concat(st.nCards || []).filter(c => del.indexOf(c.n) < 0).map(c => {
      const o = ce && ce.n === c.n && !ce.closing ? ce.d : cOv[c.n]; if (!o) return c;
      const lim = Number(o.lim) || 0, u = c.u != null ? c.u : c.lim * (c.p || 0) / 100;
      return Object.assign({}, c, { u, nick: (o.name || '').trim(), fin: o.fin || c.fin, lim, p: lim ? Math.round(u / lim * 100) : 0, ciclo: 'fecha ' + (o.fe || '—') + ' · vence ' + (o.ve || '—'), fe: o.fe, ve: o.ve, orig: (o.fe || o.ve) ? 'cadastro manual' : c.orig });
    });
  }

  /* ---------------- vals ---------------- */
  KD.vals = function (comp, o) {
    const C = KD._C, st = comp.state, M = KD.M, mi = st.mes, S = KD.month(mi), T = KD.today;
    const L = lims(comp), withL = L.filter(c => c.lim > 0), noL = L.filter(c => !c.lim), U = c => c.u != null ? c.u : c.lim * (c.p || 0) / 100;
    /* Cartões · quanto do limite já foi */
    const hl = withL.concat(noL);
    o.hmLim = hl.map((c, i, a) => { const more = i >= 3, endVis = i === 2 && a.length > 3;
      return { has: c.lim > 0, none: !c.lim, n: c.nick || c.n, cor: c.cor, w: (c.p || 0) + '%', p: (c.p || 0) + '%', tip: (c.nick || c.n) + '|' + brl0(U(c)) + ' de ' + brl0(c.lim),
        more: more ? 'grid' : null, lastrow: endVis ? '1' : null, bd: endVis || i === a.length - 1 ? '0' : '1px dashed #2B2B30', disp: more ? '' : 'display:grid;' }; });
    /* Limite */
    const lt = withL.reduce((a, c) => a + c.lim, 0), lu = withL.reduce((a, c) => a + U(c), 0), pct = lt ? lu / lt * 100 : 0;
    o.hmLimDash = (pct / 100 * 125.7).toFixed(1) + ' 125.7'; o.hmLimW = Math.min(100, pct).toFixed(1) + '%';
    o.hmLimUsed = brl0(lu) + ' usados'; o.hmLimPct = pct.toFixed(1).replace('.', ',') + '%'; o.hmLimDisp = int(lt - lu); o.hmLimDe = 'de ' + brl0(lt) + ' que você definiu';
    o.lmUsed = brl0(lu); o.lmTot = brl0(lt);
    /* Assinaturas */
    o.hmAssinSub = M.assinAtivas + (M.assinAtivas === 1 ? ' cobrança que se repete' : ' cobranças que se repetem'); o.hmAssinV = int(S.assinTot);
    o.assinHead = M.assinAtivas + (M.assinAtivas === 1 ? ' assinatura ativa' : ' assinaturas ativas') + ' · ' + S.ASSIN.length + (S.ASSIN.length === 1 ? ' cobrada' : ' cobradas') + ' em ' + MESL[mi % 12].toLowerCase();
    /* Fluxo */
    const fi = S.comp.in, fo = S.comp.out, fm = Math.max(fi, fo, 1), fv = fi - fo;
    o.fxIn = brl0(fi); o.fxOut = brl0(fo); o.fxInW = (fi / fm * 100).toFixed(1) + '%'; o.fxOutW = (fo / fm * 100).toFixed(1) + '%';
    o.fxV = KD.signedInt(fv); o.fxInk = fv < 0 ? '#FF6A5C' : '#6AFF2A'; o.fxRInk = fv < 0 ? '#C9574D' : '#9A9AA3';
    /* Gastos */
    o.gBars = S.bars; o.gL1 = S.gL[0]; o.gL2 = S.gL[1]; o.gL3 = S.gL[2];
    /* Faturas futuras */
    const F9 = S.FUT.slice(0, 9);
    o.hmFut = F9.map((f, i) => { const tot = Object.values(f.s).reduce((a, b) => a + b, 0);
      return { lc: i === 0 ? '#fff' : '#8A8A93', xm: i >= 6 ? 'w' : null, v: tot ? brl0(tot) : '—', h: Math.min(100, tot / 1000 * 100).toFixed(1) + '%', m: f.m, segs: Object.keys(f.s).map(k => ({ tip: k + ' · ' + f.m + '|' + brl0(f.s[k]), flex: f.s[k].toFixed(2), cor: C.KC[k] || '#78788A' })) }; });
    const legN = [...new Set(F9.flatMap(f => Object.keys(f.s)))];
    o.hmFutLeg = M.cards.filter(c => legN.includes(c.nick || c.n)).map(c => ({ n: c.nick || c.n, cor: c.cor }));
    /* Tetos (home): os 5 mais perto do teto */
    o.hmTet = (o.exTet || []).slice(0, 5).map((t, i, a) => Object.assign({}, t, { xmPrev: i === 2 && a.length > 3 ? '1' : null, xm: i >= 3 ? String(i - 2) : null, xd: i >= 3 ? '--xd:grid;' : '', bd: (i === 2 && a.length > 3) || i === a.length - 1 ? '0' : '1px dashed #2B2B30' }));
    /* Para onde foi (home) */
    const otot = C.ONDE.reduce((a, x) => a + x.v, 0), omx = C.ONDE.length ? C.ONDE[0].v : 1;
    o.hmOnde = C.ONDE.map((t, i, a) => ({ n: t.n, cor: comp.cor(t.n), img: 'url("' + C.uri(comp.icSvg(t.n), '#000') + '")', w: (t.v / omx * 100).toFixed(1) + '%', tip: t.n + '|' + brl0(t.v), v: brl0(t.v), p: (otot ? t.v / otot * 100 : 0).toFixed(1).replace('.', ',') + '%', sub: t.c === 1 ? '1 compra · ' + t.top : t.c + ' compras · maior: ' + t.top, bd: last(a, i) }));
    /* Lançamentos do mês */
    o.lancSub = 'Por data de compra. ' + C.LANC.length + ' neste mês.';
    o.lancRows = (o.lancRows || []).map((r, i) => Object.assign(r, { kc: C.KC[r.k] || r.kc }));
    /* Parcelamentos (home) */
    o.hmParc = C.PARC.map((p, i, a) => { const pagas = p.x - p.f, cor = C.KC[p.k] || '#78788A', cat = p.c || 'Outros';
      return Object.assign(comp.av(p.n, cat), { n: p.n, k: p.k, cor, sub: p.tot + ' · até ' + p.ate, rest: brl0(p.r), falta: 'faltam ' + p.f + ' de ' + p.x, bd: last(a, i),
        segs: Array.from({ length: p.x }, (_, j) => ({ tip: 'Parcela ' + (j + 1) + '/' + p.x + '|' + (j < pagas ? 'paga' : 'a pagar'), c: j < pagas ? cor : '#26262B' })) }); });
    /* Ciclos dos cartões */
    o.hmCic = L.map((c, i, a) => { const fe = c.fe != null ? c.fe : (String(c.ciclo).match(/fecha\s*(\S+)/) || [])[1], ve = c.ve != null ? c.ve : (String(c.ciclo).match(/vence\s*(\S+)/) || [])[1];
      return { n: c.nick || c.n, fin: '•••• ' + c.fin, cor: c.cor, fe: fe || '—', ve: ve || '—', real: c.orig === 'fatura real', chute: c.orig === 'chute', manual: c.orig !== 'fatura real' && c.orig !== 'chute', desde: c.since ? c.since.split('-').reverse().join('/') : '—', has: c.lim > 0, none: !c.lim, lim: brl0(c.lim), bd: last(a, i) }; });
    const reais = L.filter(c => c.orig === 'fatura real').map(c => c.nick || c.n), chut = L.filter(c => c.orig === 'chute').map(c => c.nick || c.n);
    const lst = a => a.length === 1 ? a[0] : a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1];
    o.cicloTxt = (reais.length ? lst(reais) + (reais.length === 1 ? ' foi lido da fatura de verdade.' : ' foram lidos das faturas de verdade.') : '') + (chut.length ? (reais.length ? ' ' : '') + lst(chut) + (chut.length === 1 ? ' ainda está com um dia chutado.' : ' ainda estão com um dia chutado.') : '');
    /* Alertas */
    const used = n => M.rows.some(r => r.card === n);
    const nl = noL.map(c => c.nick || c.n), ng = L.filter(c => c.orig === 'chute').map(c => c.nick || c.n);
    o.a1Lim = nl.length > 0; o.a1LimN = String(nl.length); o.a1LimTxt = (nl.length === 1 ? 'cartão sem limite cadastrado.' : 'cartões sem limite cadastrado.') + ' O módulo de limite não fecha sem isso.';
    o.a1Fech = ng.length > 0; o.a1FechN = String(ng.length); o.a1FechTxt = (ng.length === 1 ? 'cartão ainda com o dia de fechamento chutado — ' : 'cartões ainda com o dia de fechamento chutado — ') + lst(ng) + '.' + (ng.every(n => !used(n)) ? ' Sem uso, não afetam os números.' : '');
    o.showAlerts = st.alerts && (o.a1Lim || o.a1Fech);
    const a2 = KD.alert('a2');
    o.showAtyp = st.atyp && !!a2.title; o.a2Title = a2.title || ''; o.a2Body = a2.body || '';
    const a2c = (M.rows.find(r => r.e === a2.e && r.atyp) || {}).c || 'Outros'; o.a2Cat = a2c; o.atypIc = 'url("' + C.uri(comp.icSvg(a2c), comp.cor(a2c)) + '")';
    /* Seletor de mês, conta, conexões */
    o.hojeLbl = 'Ir pra hoje · ' + mShort(C.CUR); o.desdeLbl = 'Dados desde ' + mShort(C.MIN); o.ac_since = 'Desde ' + mShort(mIdx(KD.since()));
    o.ac_ses = (o.ac_ses || []).map(x => Object.assign(x, { meta: x.meta.replace(/^ · /, '') }));
    o.hasConn = false;
    o.ac_hasOthers = true; o.ac_othDone = !!st.ac.oth; o.ac_othIdle = !st.ac.oth; o.ac_endAll = () => { if (!KD.isDemo()) KD.signOutOthers(); comp.setState(x => ({ ac: Object.assign({}, x.ac, { oth: true }) })); };
    { /* Conta: nome em duas linhas, pílulas do topo, senha, toggles de segurança */
      const ac = st.ac, A = p => comp.setState(x => ({ ac: Object.assign({}, x.ac, p) }));
      const nmv = (ac.n0 || '').trim(), sp = nmv.split(/\s+/).filter(Boolean), l1 = sp[0] || '', l2 = sp.slice(1).join(' ');
      /* nome: uma linha se couber (≥84px de corpo); senão quebra entre nome e sobrenome */
      const fullW = st.vw / st.vh >= 2 && st.wd !== 'full' ? Math.round(st.vw * 0.75) : st.vw, avail = Math.max(240, Math.min(fullW - 48, 1000) - 380 - 8);
      const fs1 = Math.min(172, Math.floor(avail / (Math.max(nmv.length, 3) * 0.53))), one = !l2 || fs1 >= 84;
      const Lm = Math.max(l1.length, l2.length, 3), ln = one ? 1 : 2, fs = one ? Math.max(56, fs1) : Math.max(56, Math.min(118, Math.floor(avail / (Lm * 0.53))));
      o.ac_nm1 = one ? nmv : l1; o.ac_nm2 = one ? '' : l2; o.ac_nm2on = !one; o.ac_nameFs = fs + 'px'; o.ac_nameB = Math.round(-fs * 0.08) + 'px'; o.ac_heroH = Math.max(210, Math.round(fs * 0.86 * ln + 56)) + 'px';
      o.ac_nmFull = nmv || l1; o.ac_name0 = l1; o.ac_ini = (l1.charAt(0) || 'J').toUpperCase();
      o.ac_countLbl = M.accs.length + (M.accs.length === 1 ? ' conta' : ' contas'); o.ac_chipTfa = M.cards.length + (M.cards.length === 1 ? ' cartão' : ' cartões'); o.ac_chipBd = '#3A3A40'; o.ac_chipInk = '#B4B4BC';
      o.ac_inName = e => A({ name: e.target.value.slice(0, 60) }); o.ac_inEmail = e => A({ email: e.target.value.slice(0, 80) });
      o.ac_pw1 = ac.pw1 || ''; o.ac_pw2 = ac.pw2 || ''; o.ac_pwCodeV = ac.pwCodeV || ''; o.ac_pwCode = ac.pwStep === 1;
      o.ac_inPw1 = e => A({ pw1: e.target.value.slice(0, 72), pwMsg: '' }); o.ac_inPw2 = e => A({ pw2: e.target.value.slice(0, 72), pwMsg: '' });
      o.ac_inPwCode = e => A({ pwCodeV: e.target.value.replace(/\D/g, '').slice(0, 8) });
      o.ac_pwMsg = ac.pwMsg || ''; o.ac_pwMsgC = ac.pwErr ? '#FF6A5C' : '#6AFF2A';
      { const c = KD.pwCheck(ac.pw1 || '', ac.pw2 || ''); o.ac_pwPct = c.pct; o.ac_pwCol = c.col; o.ac_pwLbl = c.lbl; o.ac_pwHint = c.hint; o.ac_pwHintC = c.hintC;
        o.ac_pwOk = !ac.pwBusy && (ac.pwStep === 1 ? (ac.pwCodeV || '').length >= 6 : c.ok); }
      o.ac_pwBtn = ac.pwBusy ? 'Aguarde…' : ac.pwStep === 1 ? 'Confirmar código' : 'Salvar senha'; o.ac_pwO = o.ac_pwOk ? '1' : '.35'; o.ac_pwCur = o.ac_pwOk ? 'pointer' : 'default';
      o.ac_pwGo = () => { if (o.ac_pwOk) KD.changePassword(comp); };
      const sw = (p, on) => { o[p + '_track'] = on ? '#5B3DF5' : '#26262B'; o[p + '_knob'] = on ? '31px' : '3px'; };
      o.ac_ss_knob = st.sess24 ? '49px' : '3px'; o.ac_ss_inkA = st.sess24 ? '#9A9AA3' : '#000'; o.ac_ss_inkB = st.sess24 ? '#000' : '#9A9AA3';
      o.ac_ss_lbl = 'Duração da sessão'; o.ac_ss_word = st.sess24 ? '24 horas' : 'Sem limite';
      o.ac_ss_txt = st.sess24 ? 'Por segurança, o Kontar pede seu login de novo a cada 24 horas, mesmo que você não saia.' : 'Você fica conectado neste aparelho até sair por conta própria. Indicado para um computador só seu.';
      o.ac_togSs = () => KD.isDemo() ? A({ pwMsg: DEMO_MSG, pwErr: true }) : comp.setState(x => ({ sess24: x.sess24 ? false : Date.now() }));
    }
    o.ac_doExp = () => { KD.exportCsv(); comp.setState(x => ({ ac: Object.assign({}, x.ac, { exp: true }) })); };
    o.ac_save = ((orig) => () => { orig(); setTimeout(() => KD.saveAccount(comp.state.ac), 0); })(o.ac_save);
    o.ac_delGo = ((orig) => () => { if (KD.isDemo()) return comp.setState(x => ({ ac: Object.assign({}, x.ac, { delTxt: '', pwMsg: DEMO_MSG, pwErr: true }) })); const ok = comp.state.ac.delTxt.trim().toUpperCase() === 'EXCLUIR'; orig(); if (ok) KD.deleteAccount(); })(o.ac_delGo);
    /* Extrato: busca */
    o.xfQ = st.xf.q || ''; o.xfSetQ = e => { const v = e.target.value; comp.setState(x => ({ xf: Object.assign({}, x.xf, { q: v }) })); };
    o.xfAny = o.xfAny || !!st.xf.q; o.xfClear = ((orig) => () => { orig(); comp.setState(x => ({ xf: Object.assign({}, x.xf, { q: '' }) })); })(o.xfClear);
    /* listas longas: 50 por vez; as próximas entram em cascata quando o fim da lista é alcançado */
    KD._more = KD._more || {}; KD._sig = KD._sig || {};
    const lim = (k, sig) => { const l = (st.lim || {})[k]; KD._sig[k] = sig; return l && l.sig === sig ? l : { n: 50, prev: 0, sig }; };
    const AN = (i, L) => (L.prev > 0 && i >= L.prev) ? 'animation:kRowIn .5s cubic-bezier(.2,.7,.2,1) both;animation-delay:' + Math.min(1100, (i - L.prev) * 32) + 'ms;' : '';
    if (Array.isArray(o.days)) {
      const L = lim('extrato', JSON.stringify([st.mes, st.xf])); let c = 0, tot = 0; o.days.forEach(d => { tot += (d.rows || []).length; });
      o.days = o.days.map(d => { const rows = (d.rows || []).slice(0, Math.max(0, L.n - c)).map((r, i) => Object.assign({}, r, { an: AN(c + i, L) })); c += rows.length; return rows.length ? Object.assign({}, d, { rows }) : null; }).filter(Boolean);
      KD._more.extrato = tot > L.n;
    }
    if (Array.isArray(o.estRowsF)) {
      const L = lim('estab', JSON.stringify([st.ef, st.eq, st.mes])); KD._more.estab = o.estRowsF.length > L.n;
      o.estRowsF = o.estRowsF.slice(0, L.n).map((r, i) => Object.assign({}, r, { an: AN(i, L) }));
    }
    return o;
  };
  KD.loadMore = function (k) {
    const comp = KD.comp; if (!comp || !KD._more[k] || Date.now() - (KD._lm || 0) < 450) return; KD._lm = Date.now();
    comp.setState(x => { const cur = (x.lim || {})[k], sig = KD._sig[k], n = cur && cur.sig === sig ? cur.n : 50; return { lim: Object.assign({}, x.lim, { [k]: { n: n + 50, prev: n, sig } }) }; });
  };


  /* ---------------- interações globais: arrastar com o mouse e rolar pelas laterais ---------------- */
  KD.ux = function () {
    if (KD._ux) return; KD._ux = true;
    const sx = e => { const c = getComputedStyle(e); return (c.overflowX === 'auto' || c.overflowX === 'scroll') && e.scrollWidth > e.clientWidth + 2; };
    const sy = e => { const c = getComputedStyle(e); return (c.overflowY === 'auto' || c.overflowY === 'scroll') && e.scrollHeight > e.clientHeight + 2; };
    /* 1) clicar e arrastar pro lado em qualquer lista com scroll horizontal */
    let d = null;
    document.addEventListener('pointerdown', ev => {
      if (ev.pointerType !== 'mouse' || ev.button !== 0) return;
      if (ev.target.closest && ev.target.closest('input,textarea,select,[data-rg-hist],[data-nodrag]')) return;
      let el = ev.target; while (el && el !== document.body && !sx(el)) el = el.parentElement;
      if (!el || el === document.body) return;
      d = { el, x: ev.clientX, sl: el.scrollLeft, on: false, snap: el.style.scrollSnapType, id: ev.pointerId };
    }, true);
    document.addEventListener('pointermove', ev => {
      if (!d) return; const dx = ev.clientX - d.x;
      if (!d.on) { if (Math.abs(dx) < 6) return; d.on = true; d.el.style.scrollSnapType = 'none'; d.el.style.cursor = 'grabbing'; d.el.style.userSelect = 'none'; try { d.el.setPointerCapture(d.id); } catch (e) {} }
      d.el.scrollLeft = d.sl - dx; ev.preventDefault();
    }, true);
    const end = () => { if (!d) return; const q = d; d = null; if (!q.on) return;
      q.el.style.cursor = ''; q.el.style.userSelect = ''; const cur = q.el.scrollLeft; q.el.style.scrollSnapType = q.snap;
      /* devolve o snap suavemente à coluna mais próxima */
      q.el.scrollTo({ left: cur, behavior: 'auto' }); KD._dragged = Date.now(); };
    document.addEventListener('pointerup', end, true); document.addEventListener('pointercancel', end, true);
    document.addEventListener('click', ev => { if (KD._dragged && Date.now() - KD._dragged < 250) { ev.stopPropagation(); ev.preventDefault(); KD._dragged = 0; } }, true);
    const st = document.createElement('style'); st.textContent = '.kscroll[data-dragx]{cursor:grab}'; document.head.appendChild(st);
    document.addEventListener('scroll', ev => { const el = ev.target; if (!el || !el.getAttribute) return; const pg = el.getAttribute('data-page-scroll'); if (!pg || !KD._more || !KD._more[pg]) return; if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) KD.loadMore(pg); }, true);
    const mark = () => document.querySelectorAll('.kscroll').forEach(e => { if (sx(e)) e.setAttribute('data-dragx', '1'); else e.removeAttribute('data-dragx'); });
    new MutationObserver(() => { clearTimeout(KD._mk); KD._mk = setTimeout(mark, 200); cancelAnimationFrame(KD._lp); KD._lp = requestAnimationFrame(() => { KD.lgPass(); KD.wide(); }); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] }); setTimeout(mark, 1500);
    /* 2) laterais (fora do artboard) fazem parte do scroll: o scroller se estende até as bordas da janela, então a roda é nativa (mesma suavização do conteúdo) */
    KD.wide = function () {
      const ab = document.querySelector('[data-screen-label]'); if (!ab) return;
      const r = ab.getBoundingClientRect(), k = (ab.offsetWidth ? r.width / ab.offsetWidth : 1) || 1, L = Math.max(0, Math.round(r.left)), R = Math.max(0, Math.round(window.innerWidth - r.right));
      const out = L > 2 || R > 2; const sy2 = (el, v) => { if (el.style.overflow !== v) el.style.overflow = v; };
      document.querySelectorAll('[data-px-scroll],[data-page-scroll]').forEach(sc => {
        if (!sc.offsetParent) return;
        const D = sc.dataset, cs = getComputedStyle(sc), l = out ? L / k : 0, rr = out ? R / k : 0;
        let pl = parseFloat(cs.paddingLeft) || 0, pr = parseFloat(cs.paddingRight) || 0;
        if (D.kwPL && Math.abs(parseFloat(sc.style.paddingLeft) - parseFloat(D.kwPL)) < 0.6) pl -= +D.kwL || 0; if (D.kwPR && Math.abs(parseFloat(sc.style.paddingRight) - parseFloat(D.kwPR)) < 0.6) pr -= +D.kwR || 0;
        const nl = (pl + l) + 'px', nr = (pr + rr) + 'px', ml = (-l) + 'px', mr = (-rr) + 'px';
        const df = (a, b) => Math.abs((parseFloat(a) || 0) - parseFloat(b)) > 0.6;
        if (df(sc.style.marginLeft, ml)) sc.style.marginLeft = ml; if (df(sc.style.marginRight, mr)) sc.style.marginRight = mr;
        if (df(sc.style.paddingLeft, nl)) sc.style.paddingLeft = nl; if (df(sc.style.paddingRight, nr)) sc.style.paddingRight = nr;
        D.kwPL = nl; D.kwPR = nr; D.kwL = l; D.kwR = rr;
        if (out) for (let e = sc.parentElement; e && e.getBoundingClientRect().width < window.innerWidth - 1; e = e.parentElement) sy2(e, 'visible clip');
      });
    };
    window.addEventListener('resize', () => KD.wide()); setTimeout(() => KD.wide(), 600);
    /* 3) clique na lateral (fora do conteúdo) fecha o painel/menu aberto mais acima */
    document.addEventListener('click', ev => {
      const ab = document.querySelector('[data-screen-label]'); if (!ab) return; const rc = ab.getBoundingClientRect(); if (ev.clientX >= rc.left && ev.clientX <= rc.right) return;
      let best = null, bz = -1; document.querySelectorAll('[data-away]').forEach(o => { const c = getComputedStyle(o); if (c.display === 'none' || c.pointerEvents === 'none' || +c.opacity < 0.05) return; const z = parseInt(c.zIndex, 10) || 0; if (z >= bz) { bz = z; best = o; } });
      if (best) best.click();
    }, true);
  };
  /* ---------------- gravação ---------------- */
  const TRACK = ['cats', 'alt', 'eov', 'tet', 'cor', 'ico', 'custom', 'cOv', 'cDel', 'nCards', 'mU', 'mEd', 'mDel', 'nRead', 'alerts', 'atyp', 'ms', 'fc', 'anim', 'sv', 'lay', 'dord', 'nm', 'wd', 'exl', 'pwMail', 'sess24'];
  const PREF = { nRead: 'nRead', alerts: 'alerts', atyp: 'atyp', ms: 'ms', fc: 'fc', anim: 'anim', sv: 'sv', lay: 'lay', dord: 'dord', nm: 'nm', wd: 'wd', exl: 'exl', pwMail: 'pwMail', sess24: 'sess24' };
  KD.snap = st => { KD._snap = {}; TRACK.forEach(k => { KD._snap[k] = JSON.stringify(st[k]); }); };
  const changedKeys = (a, b) => { a = a || {}; b = b || {}; return [...new Set(Object.keys(a).concat(Object.keys(b)))].filter(k => JSON.stringify(a[k]) !== JSON.stringify(b[k])); };
  let prefT = null, dataQ = Promise.resolve(), dataDirty = false;
  const sb = () => KD.sb, uid = () => KD.user.id;
  const ck = r => { if (r && r.error) throw r.error; return r; };
  const catId = n => (KD.M.catByName[n] || {}).id || null;
  const queue = fn => { dataDirty = true; dataQ = dataQ.then(fn).catch(e => console.error('[kontar] gravação', e)); };

  KD.sync = function (comp) {
    const st = comp.state, prev = KD._snap; if (!prev) return;
    const ch = TRACK.filter(k => JSON.stringify(st[k]) !== prev[k]); if (!ch.length) return;
    const old = {}; ch.forEach(k => { old[k] = prev[k] === undefined ? undefined : JSON.parse(prev[k]); KD._snap[k] = JSON.stringify(st[k]); });
    const M = KD.M;
    if (ch.some(k => k in PREF)) { clearTimeout(prefT); prefT = setTimeout(() => KD.savePrefs(comp.state), 600); }
    if (ch.includes('cats')) changedKeys(old.cats, st.cats).forEach(id => { const n = st.cats[id]; if (!n) return; queue(async () => ck(await sb().from('transactions').update({ category_id: catId(n), status: 'confirmado', categoria_origem: 'usuario' }).eq('id', id))); });
    if (ch.includes('alt')) changedKeys(old.alt, st.alt).forEach(nome => { const e = M.estByName[nome]; if (!e) return; queue(async () => ck(await sb().from('merchant_aliases').update({ sempre_perguntar: !!st.alt[nome] }).in('chave', e.chaves))); });
    if (ch.includes('tet')) changedKeys(old.tet, st.tet).forEach(n => { const id = catId(n); if (!id) return; queue(async () => ck(await sb().from('categories').update({ teto_mensal: st.tet[n] || null }).eq('id', id))); });
    if (ch.includes('cor')) changedKeys(old.cor, st.cor).forEach(n => { const id = catId(n); if (!id) return; queue(async () => ck(await sb().from('categories').update({ cor: st.cor[n] || KD.CAT_DEF[n] || '#78788A' }).eq('id', id))); });
    if (ch.includes('ico')) changedKeys(old.ico, st.ico).forEach(n => { const id = catId(n); if (!id) return; queue(async () => ck(await sb().from('categories').update({ icone: st.ico[n] || (n in KD.CAT_DEF ? n : 'Outros') }).eq('id', id))); });
    if (ch.includes('custom')) {
      const was = old.custom || [], now = st.custom || [];
      now.filter(n => !was.includes(n)).forEach(n => queue(async () => { const ord = Math.max(0, ...Object.values(M.catById).map(c => c.ordem || 0)) + 1;
        ck(await sb().from('categories').insert({ user_id: uid(), nome: n, slug: KD.norm(n).replace(/[^a-z0-9]+/g, '-'), cor: (st.cor[n] || '#22D3EE').toUpperCase(), cor_barra: (st.cor[n] || '#22D3EE').toUpperCase(), icone: st.ico[n] || 'Outros', ordem: ord })); }));
      was.filter(n => !now.includes(n)).forEach(n => { const id = catId(n); if (!id) return; queue(async () => {
        ck(await sb().from('transactions').update({ category_id: null, status: 'pendente_revisao', categoria_origem: null }).eq('category_id', id));
        ck(await sb().from('merchant_aliases').update({ category_id: null }).eq('category_id', id));
        ck(await sb().from('categories').delete().eq('id', id)); }); });
    }
    if (ch.includes('eov')) changedKeys(old.eov, st.eov).forEach(nome => { const e = M.estByName[nome], ov = st.eov[nome]; if (!e || !ov) return; queue(async () => {
      const p = {}; if (ov.name != null && ov.name.trim() && ov.name.trim() !== nome) p.apelido = ov.name.trim(); if (ov.cat) p.category_id = catId(ov.cat);
      if (ov.logo !== undefined) p.logo_url = ov.logo ? await KD.smallImage(ov.logo) : null;
      if (Object.keys(p).length) ck(await sb().from('merchant_aliases').update(p).in('chave', e.chaves));
      if (p.apelido) ck(await sb().from('transactions').update({ apelido: null }).in('chave', e.chaves)); }); });
    if (ch.includes('cOv')) changedKeys(old.cOv, st.cOv).forEach(n => { const c = M.cards.find(x => x.n === n), o = st.cOv[n]; if (!c || !o) return; queue(async () => {
      const lim = Number(o.lim) || null; ck(await sb().from('cards').update({ apelido: o.name || null, final4: o.fin || null, limite: lim, disponivel_informado: lim != null ? Math.max(0, lim - c.used) : null, limite_em: KD.iso(KD.today) }).eq('id', c.id));
      const fe = +o.fe || null, ve = +o.ve || null;
      if (fe && ve && (fe !== c.fe || ve !== c.ve)) { if (c.cy) ck(await sb().from('card_cycles').update({ vigencia_fim: KD.iso(KD.today) }).eq('card_id', c.id).eq('vigencia_inicio', c.cy.vigencia_inicio));
        ck(await sb().from('card_cycles').insert({ user_id: uid(), card_id: c.id, vigencia_inicio: KD.iso(KD.today), dia_fechamento: fe, dia_vencimento: ve, regra: 'dia_fixo', origem: 'manual' })); } }); });
    if (ch.includes('cDel')) (st.cDel || []).filter(n => !(old.cDel || []).includes(n)).forEach(n => { const c = M.cards.find(x => x.n === n); if (!c) return; queue(async () => ck(await sb().from('cards').update({ removido_em: new Date().toISOString(), ativo: false }).eq('id', c.id))); });
    if (ch.includes('nCards')) (st.nCards || []).slice((old.nCards || []).length).forEach(c => queue(async () => {
      const m = String(c.ciclo).match(/fecha\s*(\d+).*?vence\s*(\d+)/), lim = c.lim || null;
      const r = ck(await sb().from('cards').insert({ user_id: uid(), nome: c.n, instituicao: c.n, brand_hex: c.cor, tinta: c.ink, final4: /\d{4}/.test(c.fin) ? c.fin : null, limite: lim, disponivel_informado: lim, limite_em: lim ? KD.iso(KD.today) : null, ordem: M.cards.length + 1, ativo: true }).select());
      const id = r.data && r.data[0] && r.data[0].id;
      if (id && m) ck(await sb().from('card_cycles').insert({ user_id: uid(), card_id: id, vigencia_inicio: KD.iso(KD.today), dia_fechamento: +m[1], dia_vencimento: +m[2], regra: 'dia_fixo', origem: 'manual' })); }));
    if (ch.includes('mU')) (st.mU || []).slice((old.mU || []).length).forEach(m => { if (!m._new) return; queue(async () => {
      const ord = Math.max(0, ...M.goals.map(g => g.ordem || 0)) + 1, pz = KD.mStart(m._new.m);
      ck(await sb().from('goals').insert({ user_id: uid(), nome: m.n, icone: m.i, cor: m.c, alvo: m._new.v, guardado: m._new.g, prazo: KD.iso(pz), ordem: ord })); }); });
    if (ch.includes('mEd')) changedKeys(old.mEd, st.mEd).forEach(id => { const e = st.mEd[id]; if (!e) return; queue(async () => {
      ck(await sb().from('goals').update({ nome: e.n, icone: e.i, cor: e.c, alvo: e.v, guardado: e.g, prazo: KD.iso(KD.mStart(e.m)) }).eq('id', id)); }); });
    if (ch.includes('mDel')) (st.mDel || []).filter(id => !(old.mDel || []).includes(id)).forEach(id => queue(async () => ck(await sb().from('goals').update({ arquivada_em: new Date().toISOString() }).eq('id', id))));
    if (dataDirty) { dataDirty = false; dataQ = dataQ.then(() => KD.refresh(comp)); }
  };

  KD.savePrefs = st => { const P = Object.assign({}, KD.M.prefs); Object.keys(PREF).forEach(k => { if (st[k] !== undefined) P[PREF[k]] = st[k]; }); KD.M.prefs = P;
    sb().from('user_prefs').upsert({ user_id: uid(), prefs: P, updated_at: new Date().toISOString() }, { onConflict: 'user_id' }).then(r => r && r.error && console.error('[kontar] preferências', r.error)); };
  KD.saveAccount = async ac => {
    try { ck(await sb().from('profiles').upsert({ user_id: uid(), nome_exibicao: ac.n0 }, { onConflict: 'user_id' }));
      if (!KD.isDemo() && ac.e0 && ac.e0 !== KD.user.email) ck(await sb().auth.updateUser({ email: ac.e0 }, { emailRedirectTo: location.origin + location.pathname })); } catch (e) { console.error('[kontar] conta', e); } };
  KD.saveAvatar = async blob => { try { const path = uid() + '/avatar.jpg';
    ck(await sb().storage.from('avatars').upload(path, blob, { upsert: true, contentType: 'image/jpeg' }));
    ck(await sb().from('profiles').upsert({ user_id: uid(), avatar_url: path }, { onConflict: 'user_id' })); } catch (e) { console.error('[kontar] foto', e); } };

  /* ---- logos: modos de encaixe (ajustar / preencher / estender cor) + URL de imagem ---- */
  const hsh = u => { let h = 5381; for (let i = 0; i < u.length; i++) h = ((h << 5) + h + u.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  KD.lg = { info: {}, tmpU: null, tmpM: null,
    fit(u) { if (!u) return 'cor'; if (KD.lg.tmpU === u && KD.lg.tmpM) return KD.lg.tmpM; return ((KD.M && KD.M.prefs && KD.M.prefs.lgFit) || {})[hsh(u)] || 'cor'; },
    tmp(u, m) { KD.lg.tmpU = u; KD.lg.tmpM = m; KD.lgPass(); },
    clear() { KD.lg.tmpU = KD.lg.tmpM = null; KD.lgPass(); },
    set(u, m) { if (!u || !m) return; const P = Object.assign({}, KD.M.prefs); P.lgFit = Object.assign({}, P.lgFit); if (m === 'cor') delete P.lgFit[hsh(u)]; else P.lgFit[hsh(u)] = m; KD.M.prefs = P;
      sb().from('user_prefs').upsert({ user_id: uid(), prefs: P, updated_at: new Date().toISOString() }, { onConflict: 'user_id' }).then(r => r && r.error && console.error('[kontar] logo', r.error)); KD.lg.clear(); },
    probe(u) { if (u in KD.lg.info) return KD.lg.info[u]; KD.lg.info[u] = null; const im = new Image(); im.crossOrigin = 'anonymous';
      im.onload = () => { try { const n = 24, cv = document.createElement('canvas'); cv.width = cv.height = n; const g = cv.getContext('2d', { willReadFrequently: true }); g.drawImage(im, 0, 0, n, n); const d = g.getImageData(0, 0, n, n).data; let r = 0, gg = 0, b = 0, a = 0, c = 0;
          for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { if (y > 1 && y < n - 2 && x > 1 && x < n - 2) continue; const i = (y * n + x) * 4; r += d[i]; gg += d[i + 1]; b += d[i + 2]; a += d[i + 3]; c++; }
          a /= c; const col = a < 128 ? '#ffffff' : 'rgb(' + Math.round(r / c) + ',' + Math.round(gg / c) + ',' + Math.round(b / c) + ')'; const lum = a < 128 ? 1 : (0.2126 * r + 0.7152 * gg + 0.0722 * b) / c / 255;
          KD.lg.info[u] = { ok: true, col: col, dark: lum < 0.16 }; } catch (e) { KD.lg.info[u] = { ok: false }; } KD.lgPass(); };
      im.onerror = () => { KD.lg.info[u] = { ok: false }; KD.lgPass(); }; im.src = u; return null; } };
  KD.lgPass = function () {
    document.querySelectorAll('[data-lg]').forEach(el => { const m = /url\(["']?(.*?)["']?\)/.exec(el.style.backgroundImage || ''); if (!m) return; const u = m[1].replace(/&amp;/g, '&');
      if (!el.dataset.lgS) el.dataset.lgS = el.style.backgroundSize || '';
      const mode = KD.lg.fit(u), inf = mode === 'cor' ? KD.lg.probe(u) : null, base = el.dataset.lgS;
      let size = base, bg = '#fff', sh = 'none';
      if (mode === 'preencher') size = '136%';
      else if (mode === 'cor') { if (inf && inf.ok) { size = '100%'; bg = inf.col; sh = inf.dark ? 'inset 0 0 0 1px rgba(255,255,255,.22)' : 'none'; } else if (inf) size = '136%'; }
      if (el.style.backgroundSize !== size) el.style.backgroundSize = size; if (el.style.backgroundColor !== bg) el.style.backgroundColor = bg; if (el.style.boxShadow !== sh) el.style.boxShadow = sh; }); };
  KD.imgFromUrl = u => new Promise(res => { fetch(u, { mode: 'cors' }).then(r => r.ok ? r.blob() : Promise.reject()).then(b => /^image\//.test(b.type) ? res(URL.createObjectURL(b)) : res(null)).catch(() => { const im = new Image(); im.onload = () => res(u); im.onerror = () => res(null); im.src = u; }); });
  KD.smallImage = src => new Promise(res => { if (/^data:/.test(src) || /^https?:/.test(src)) return res(src); const im = new Image(); im.onload = () => { const s = 128, cv = document.createElement('canvas'); cv.width = cv.height = s; const g = cv.getContext('2d'), k = Math.min(s / im.width, s / im.height); g.drawImage(im, (s - im.width * k) / 2, (s - im.height * k) / 2, im.width * k, im.height * k); res(cv.toDataURL('image/png')); }; im.onerror = () => res(null); im.src = src; });
  /* força da senha + dicas curtas: UMA função, usada na Conta e na tela Nova senha (boot.js) */
  KD.pwCheck = (pw, c) => {
    pw = pw || ''; c = c || ''; const cls = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter(r => r.test(pw)).length, pts = (pw.length >= 8) + (pw.length >= 12) + cls,
      lv = !pw ? 0 : pw.length < 8 || pts <= 3 ? 1 : pts <= 5 ? 2 : 3, same = !!pw && pw === c, lst = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1], miss = [];
    if (pw.length < 8) miss.push('mais ' + (8 - pw.length) + (8 - pw.length === 1 ? ' caractere' : ' caracteres')); if (!/[A-Z]/.test(pw)) miss.push('maiúscula'); if (!/[a-z]/.test(pw)) miss.push('minúscula'); if (!/\d/.test(pw)) miss.push('número'); if (!/[^A-Za-z0-9]/.test(pw)) miss.push('símbolo');
    return { lv, same, ok: lv >= 2 && same, pct: ['0%', '33.3%', '66.6%', '100%'][lv], col: ['#26262B', '#FF4436', '#F5B83D', '#00E08A'][lv], lbl: ['', 'Fraca', 'Média', 'Forte'][lv],
      hint: !pw ? 'Mínimo 8 caracteres' : lv === 1 ? 'Falta ' + lst(miss.slice(0, 2)) : lv === 2 && miss.length ? 'Melhore com ' + lst(miss.slice(0, 2)) : (c && !same) ? 'As senhas não são iguais' : !c ? 'Repita a senha acima' : 'Tudo certo',
      hintC: !pw ? '#7C7C85' : lv === 1 || (c && !same) ? '#FF6A5C' : lv === 3 && same ? '#00E08A' : '#B4B4BC' };
  };
  KD.sendReset = () => sb().auth.resetPasswordForEmail(KD.user.email, { redirectTo: location.origin + location.pathname });

  KD.changePassword = async comp => {
    const A = p => comp.setState(x => ({ ac: Object.assign({}, x.ac, p) })), ac = comp.state.ac, S = sb();
    if (ac.pwBusy) return;
    if (KD.isDemo()) return A({ pwMsg: DEMO_MSG, pwErr: true });
    if ((ac.pw1 || '').length < 8) return A({ pwMsg: 'Use pelo menos 8 caracteres.', pwErr: true });
    if (ac.pw1 !== ac.pw2) return A({ pwMsg: 'As duas senhas não conferem.', pwErr: true });
    A({ pwBusy: true, pwMsg: '', pwErr: false });
    const askCode = async txt => { ck(await S.auth.reauthenticate()); A({ pwBusy: false, pwStep: 1, pwMsg: txt, pwErr: false }); };
    try {
      if (ac.pwStep !== 1) return await askCode('Mandamos um código de 6 dígitos para o seu e-mail.');
      const body = { password: ac.pw1 }; if (ac.pwStep === 1) body.nonce = (ac.pwCodeV || '').trim();
      const r = await S.auth.updateUser(body);
      if (r.error) { if (/reauth/i.test(r.error.message || '') && ac.pwStep !== 1) return await askCode('Por segurança, mandamos um código de 6 dígitos para o seu e-mail.'); throw r.error; }
      A({ pwBusy: false, pwStep: 0, pw1: '', pw2: '', pwCodeV: '', pwMsg: 'Senha trocada.', pwErr: false });
    } catch (e) { A({ pwBusy: false, pwMsg: /nonce|token|expired|invalid/i.test(e.message || '') ? 'Código inválido ou vencido.' : (e.message || 'Não deu pra trocar a senha.'), pwErr: true }); }
  };
  /* sessão de 24h (opcional): vale a partir do último login ou do momento em que o toggle foi ligado */
  KD.sessGuard = () => {
    clearInterval(KD._sg);
    const chk = () => { try { const t = KD.comp && KD.comp.state.sess24; if (!t) return; const last = Date.parse((KD.user && KD.user.last_sign_in_at) || '') || 0, since = Math.max(last, Number(t) || 0);
      if (since && Date.now() - since > 864e5) { try { localStorage.setItem('kontar-sessao-vencida', JSON.stringify({ email: KD.user.email, nome: (KD.M.profile && KD.M.profile.nome_exibicao) || '' })); } catch (e) {} KD.signOut().then(() => location.reload()); } } catch (e) {} };
    chk(); KD._sg = setInterval(chk, 300000);
  };
  KD.signOut = () => sb().auth.signOut();
  KD.signOutOthers = () => sb().auth.signOut({ scope: 'others' });
  KD.relogin = () => location.reload();
  KD.deleteAccount = async () => { try { ck(await sb().rpc('kontar_excluir_conta')); await sb().auth.signOut(); setTimeout(() => location.reload(), 1600); } catch (e) { console.error('[kontar] excluir', e); } };
  KD.exportCsv = () => {
    const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const lines = [['data', 'estabelecimento', 'valor', 'meio', 'categoria', 'cartao_ou_conta', 'parcelas', 'trabalho', 'observacao'].join(',')]
      .concat(KD.M.rows.map(r => [KD.iso(r.dt), q(r.e), r.amt.toFixed(2), r.meio, q(r.c), q(r.k), r.x, r.trab ? 1 : 0, q(r.obs)].join(',')));
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' })); a.download = 'kontar-' + KD.iso(KD.today) + '.csv'; document.body.appendChild(a); a.click(); a.remove();
  };

  /* recarrega do banco e devolve à tela os dados já com as mudanças */
  KD.refresh = async comp => {
    await KD.load(KD.sb, KD.user); KD._ver = (KD._ver || 0) + 1;
    const C = KD._C; C.ROWS = KD.M.rows; C.EST = KD.M.est; C.DOM = KD.M.DOM; C.METAS = KD.metas(); C.NOTIFS = KD.notifs();
    const KC = {}; KD.M.accs.forEach(a => { KC[a.nome] = a.cor; }); KD.M.cards.forEach(c => { KC[c.n] = c.cor; if (c.nick) KC[c.nick] = c.cor; }); C.KC = KC;
    const busy = comp.state.ce || comp.state.es || comp.state.nc || comp.state.mf || comp.state.me || comp.state.edit;
    const reset = { cats: {}, eov: {}, alt: Object.fromEntries(KD.M.est.map(e => [e.nome, e.alterna])), cOv: {}, cDel: [], nCards: [], mU: [], mEd: {}, mDel: [] };
    if (busy) { setTimeout(() => KD.refresh2(comp, reset), 900); return; }
    KD.refresh2(comp, reset);
  };
  KD.refresh2 = (comp, reset) => { Object.keys(reset).forEach(k => { KD._snap[k] = JSON.stringify(reset[k]); }); comp.setState(reset); };

  /* editar transação: grava campos, nota (itens) e divisão de uma vez e recarrega */
  /* excluir transação: só lançamento manual. Itens, nota, divisão, parcelas e tags saem junto (ON DELETE
     CASCADE no banco). Confere que apagou mesmo — com RLS, apagar algo que não é seu volta 0 linhas sem erro. */
  KD.txDelete = async (comp, id) => {
    const q = ck(await sb().from('transactions').delete().eq('id', id).eq('origem', 'manual').select('id'));
    if (!q.data || !q.data.length) throw new Error('transação não encontrada');
    await KD.refresh(comp);
  };
  KD.txSave = async (comp, d) => {
    const c = sb(); let id = d.id, r = id ? KD.M.rowById[id] : null;
    if (d.isNew) {
      const nm = (d.nome || '').trim();
      // chave é coluna gerada pelo banco a partir de estabelecimento; nunca enviar aqui.
      const ins = { user_id: uid(), estabelecimento: nm, valor_total: Math.round(d.totalV * 100) / 100, direcao: d.dir, meio: d.cardId ? 'cartao' : d.meio, data_compra: d.iso, card_id: d.cardId || null, account_id: d.cardId ? null : (d.accId || null), category_id: d.catId || null, observacao: d.obs || null, parcelas_total: d.cardId ? Math.max(1, d.parc || 1) : 1, origem: 'manual', status: d.catId ? 'confirmado' : 'pendente_revisao', categoria_origem: d.catId ? 'usuario' : null };
      const q = ck(await c.from('transactions').insert(ins).select('id').single());
      id = Array.isArray(q.data) ? q.data[0].id : q.data.id; r = { items: [], e: nm, obs: '', iso: d.iso };
    } else {
    const p = {};
    const nm = (d.nome || '').trim(); if (nm && nm !== r.e) p.apelido = nm;
    if ((d.obs || '') !== (r.obs || '')) p.observacao = d.obs || null;
    if (d.iso && d.iso !== r.iso) p.data_compra = d.iso;
    if (d.cardId !== (r.cardId || null) || d.accId !== (r.accId || null)) { p.card_id = d.cardId || null; p.account_id = d.cardId ? null : (d.accId || null); }
    if (d.catId && d.catId !== r.catId) { p.category_id = d.catId; p.status = 'confirmado'; p.categoria_origem = 'usuario'; }
    // valor e direção só são editáveis (no painel) pra lançamento manual; mesmo assim confere de novo aqui.
    if (r.origem === 'manual') {
      const dirAtual = (r.amt < 0 || r.out > 0) ? 'saida' : 'entrada';
      if (d.totalV > 0 && Math.round(d.totalV * 100) !== Math.round(r.total * 100)) p.valor_total = Math.round(d.totalV * 100) / 100;
      if (d.dir && d.dir !== dirAtual) p.direcao = d.dir;
    }
    if (Object.keys(p).length) ck(await c.from('transactions').update(p).eq('id', id));
    }
    let ids = (r.items || []).map(i => i.id);
    if (d.notaDirty) {
      ck(await c.rpc('kontar_salvar_nota', { p_tx: id, p_nota: d.nota || {}, p_itens: (d.itens || []).map(i => ({ nome: i.nome, quantidade: i.qtd, unidade: i.un, valor: i.valor, category_id: i.catId || null })) }));
      const q = ck(await c.from('transaction_items').select('id,ordem').eq('transaction_id', id).order('ordem')); ids = (q.data || []).map(x => x.id);
    }
    if (d.notaDirty || d.partesDirty) {
      ck(await c.rpc('kontar_dividir', { p_tx: id, p_partes: (d.partes || []).map(x => ({ category_id: x.catId || null, valor: Math.round(x.valor * 100) / 100, rotulo: x.rotulo || null, itens: (x.itens || []).map(k => ids[k]).filter(Boolean) })) }));
    }
    await KD.refresh(comp);
  };
})();

/* Kontar · painel de edição da transação (Dados · Ler nota · Dividir)
   Desenhado direto no DOM (fora do template) para não depender do re-render do protótipo. */
(function () {
  'use strict';
  const KD = window.KD, TX = (KD.tx = {});
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const brl = n => (Math.round(n * 100) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const num = s => { const t = String(s == null ? '' : s).trim().replace(/[^\d.,-]/g, ''); if (!t) return 0; const v = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t; return Number(v) || 0; };
  const MES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const dfmt = iso => { const p = String(iso || '').split('-'); return p.length === 3 ? p[2] + ' ' + MES[+p[1] - 1] + ' ' + p[0] : '—'; };
  const E = 'cubic-bezier(.2,.7,.2,1)';
  // E é "fast-in": quase todo o movimento acontece logo no começo, ótimo pra fade/transform rápido (.2-.3s),
  // mas numa mudança de ALTURA isso lê como um salto (cresce quase tudo de uma vez, depois rasteja). Pra
  // crescer/encolher o card do reduzido usamos um ease-in-out de verdade, que também começa e termina suave.
  const EH = 'cubic-bezier(.65,0,.35,1)';
  const I = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/>',
    lines: '<path d="M4 6h16M4 12h16M4 18h10"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 10h19M6 15h4"/>',
    tag: '<path d="M20.5 13.5 13.5 20.5a2 2 0 0 1-2.8 0L3 12.8V4h8.8l8.7 8.7a1 1 0 0 1 0 .8Z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    chev: '<path d="m6 9 6 6 6-6"/>', left: '<path d="m15 6-6 6 6 6"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>', check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    split: '<circle cx="6" cy="5" r="2.2"/><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="12" r="2.2"/><path d="M6 7.2v9.6M8 5h4a4 4 0 0 1 4 4v.8M8 19h4a4 4 0 0 0 4-4v-.8"/>',
    qr: '<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><rect x="7" y="7" width="4" height="4" rx=".5"/><rect x="13" y="7" width="4" height="4" rx=".5"/><rect x="7" y="13" width="4" height="4" rx=".5"/><path d="M13 13h1.5M16.5 13H17M13 16.5V17M16 15v2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', pencil: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V4.5h6V7"/><path d="M6 7l1 12.2A2 2 0 0 0 9 21h6a2 2 0 0 0 2-1.8L18 7"/><path d="M10 11v6M14 11v6"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M16 8V6a2.5 2.5 0 0 0-2.5-2.5h-7A2.5 2.5 0 0 0 4 6v7A2.5 2.5 0 0 0 6.5 16H8"/>', check2: '<path d="m5 12.5 4.5 4.5L19 7.5"/>'
  };
  const warnIco = (w) => '<svg width="' + w + '" height="' + w + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex:none;display:block"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v5"/><path d="M12 17.5v.01"/></svg>';
  const svg = (k, w, sw, col) => '<svg width="' + w + '" height="' + w + '" viewBox="0 0 24 24" fill="none" stroke="' + (col || 'currentColor') + '" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" style="flex:none;display:block">' + I[k] + '</svg>';
  let S = null, host = null, comp = null;

  const cats = () => comp.cats().filter(n => n !== 'Transferência');
  const catId = n => (KD.M.catByName[n] || {}).id || null;
  const catName = id => (KD.M.catById[id] || {}).nome || 'Outros';
  const catCor = n => comp.cor(n);
  // aspas simples: todo style="..." aqui já usa aspas duplas, então url("...") quebraria o atributo
  // no meio (é exatamente por isso que o ícone nunca aparecia dentro do painel de transação).
  const catIc = (n, col) => "url('" + comp.constructor.uri(comp.icSvg(n), col || '#000') + "')";
  const icDot = (n, sz, bg) => '<span style="width:' + sz + 'px;height:' + sz + 'px;flex:none;border-radius:50%;background:' + (bg || catCor(n)) + ';display:flex;align-items:center;justify-content:center"><span style="display:block;width:' + Math.round(sz * .55) + 'px;height:' + Math.round(sz * .55) + 'px;background-image:' + catIc(n) + ';background-size:contain;background-repeat:no-repeat;background-position:center"></span></span>';
  // lançamento manual (criado aqui ou importado como "manual") sempre pode ter valor/direção corrigidos;
  // só lançamentos vindos de extrato/Open Finance ficam travados nesses dois campos.
  const editavelValor = () => S.isNew || S.row.origem === 'manual';
  const total = () => editavelValor() ? S.totalV : S.row.total;
  const somaPartes = () => S.partes.reduce((a, p) => a + p.valor, 0);
  const catAtual = () => S.catId ? catName(S.catId) : (S.isNew ? 'Sem categoria' : 'Outros');

  // encolhe a fonte na proporção exata pra caber em avail, até um mínimo legível; abaixo disso a reticência
  // do próprio elemento segura nomes extremamente longos.
  function shrinkTo(t, max, min, avail) {
    t.style.fontSize = max + 'px'; const w = t.scrollWidth;
    if (w > avail && avail > 0) t.style.fontSize = Math.max(min, Math.floor(max * avail / w)) + 'px';
  }
  function fitTitle(pn) {   // encolhe o título só o bastante pra não bater no valor (overlay e inline)
    if (!S) return; const t = pn.querySelector('[data-ttl]'); if (!t) return; t.style.overflow = 'hidden'; t.style.textOverflow = 'ellipsis';
    const hd = t.parentElement.parentElement, right = hd.lastElementChild;
    shrinkTo(t, 64, 40, hd.clientWidth - (right ? right.offsetWidth : 0) - 36);
  }
  // dropdowns de escolha (categoria, cartão, categoria da parte): abrem com a opção atual em cima do campo e
  // se ajustam ao espaço (KD.drop, em kd-ui.js). No overlay, o teto é o valor lá em cima (+ folga do brilho do
  // alerta). A busca de estabelecimento não entra: é um campo de digitar, a lista abre embaixo dele.
  function fitPop(pw) {
    const pop = pw && pw.querySelector('[data-pop]'); if (!pop || !S || !S.pop) { if (S) S._pp = null; return; }
    if (S.pop === 'est') pop.style.maxHeight = POPMAXH + 'px';
    else if (S._pp && S._pp.k === S.pop) { KD.drop.apply(pop, S._pp); if (S.inline) (pop.querySelector('[data-popscroll]') || pop).scrollTop = S._pp.s; }
    else {
      const teto = S.inline ? null : pw.querySelector('[data-tot]');
      const p = KD.drop.place(pop, { minTop: teto ? teto.getBoundingClientRect().bottom + 28 : null });
      S._pp = p ? Object.assign(p, { k: S.pop }) : null;
    }
    const sc = pop.querySelector('[data-popscroll]');
    if (sc) { syncFade(pop); sc.onscroll = () => syncFade(pop); }
  }
  // fade de topo/base: só aparece do lado pra onde ainda dá pra rolar (atualiza a cada scroll)
  function syncFade(pop) {
    const sc = pop.querySelector('[data-popscroll]'); if (!sc) return;
    const top = pop.querySelector('[data-fadetop]'), bot = pop.querySelector('[data-fadebot]');
    const scrollable = sc.scrollHeight > sc.clientHeight + 1;
    const atTop = sc.scrollTop <= 1, atBot = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 1;
    if (top) top.style.opacity = (scrollable && !atTop) ? '1' : '0';
    if (bot) bot.style.opacity = (scrollable && !atBot) ? '1' : '0';
  }
  // entrada escalonada: cada bloco aparece em fade + subida curta, um depois do outro (delay crescente).
  // WAAPI com fill 'backwards': nada fica gravado no elemento depois (sem stacking context sobrando, que cortaria dropdowns).
  const REDUCE = () => window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
  function stagger(els, base, step, dur) {
    if (REDUCE()) return;
    const max = 420; // o último bloco nunca espera mais que isso
    els.forEach((el, i) => { if (el && el.animate) el.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: dur || 420, delay: base + Math.min(i * step, max), easing: E, fill: 'backwards' }); });
  }
  // os blocos de cada tela do painel completo: cabeçalho (título / valor), colunas do corpo (um bloco por filho),
  // rodapé e a coluna lateral — em ordem de leitura. Mesma estrutura nas 3 telas (Dados, Ler nota, Dividir).
  function viewBlocks(pn) {
    const root = pn.querySelector(':scope > div[style*="padding:26px 34px"]'), rail = pn.querySelector(':scope > div[style*="width:331px"]'), out = [];
    if (root) [...root.children].forEach((c, i) => {
      if (i === 0) out.push(...c.children);                                   // título + valor
      else if (c.style.display === 'grid') [...c.children].forEach(col => { out.push(...(col.children.length > 1 ? col.children : [col])); });
      else out.push(c);                                                       // rodapé
    });
    if (rail) out.push(...rail.children);
    return out.filter(e => e.style.position !== 'absolute' || e.hasAttribute('data-a') || e.tagName === 'DIV');
  }
  /* ---- coreografia do painel completo ----
     Dados: título (e a linha) → valor rolando como placar de aeroporto (_roll do protótipo, o mesmo dos valores
     do app) + toggle entrada/saída que parte do meio e encaixa → campos por LINHA subindo de baixo
     (estabelecimento+data, depois observação+cartão+categoria) → coluna lateral: "Dividir" e a nota saindo da
     maquininha (20px de descida revelada por uma fenda fixa, botões junto). Ler nota e Dividir: blocos em
     sequência + valor rolando; no Dividir a barra de progresso é a última, crescendo da esquerda. */
  const SNAP = 'cubic-bezier(.16,1,.3,1)', LONG = 'cubic-bezier(.55,0,.1,1)';   // LONG: ease acentuado das peças que abrem primeiro e fecham por último
  const anim = (el, kf, o) => { if (el && el.animate) el.animate(kf, Object.assign({ easing: E, fill: 'backwards' }, o)); };
  const upIn = (el, d, px, dur) => anim(el, [{ opacity: 0, transform: 'translateY(' + px + 'px)' }, { opacity: 1, transform: 'none' }], { delay: d, duration: dur || 460 });
  function rollValue(pn, d) {
    const tot = pn.querySelector('[data-tot]'); if (!tot || !comp || !comp._roll) return;
    comp._roll(tot.querySelector('.txtot') || tot.firstElementChild, d, 800);
  }
  function enterDados(pn, b) {
    const root = pn.querySelector(':scope > div[style*="padding:26px 34px"]'), rail = pn.querySelector(':scope > div[style*="width:331px"]');
    if (!root) return;
    const hdr = root.children[0], grid = root.children[1], cols = grid ? [...grid.children] : [];
    anim(pn.querySelector(':scope > div[style*="height:1px"]'), [{ opacity: 0 }, { opacity: 1 }], { delay: b, duration: 400 });   // a linha horizontal
    upIn(hdr.children[0], b, 10, 420);                                                                   // título
    const tot = pn.querySelector('[data-tot]');
    if (tot) {
      upIn(tot, b + 70, 8, 380); rollValue(pn, b + 110);
      const tg = tot.children.length > 1 ? tot.firstElementChild : null;                                // toggle entrada/saída: parte do meio e encaixa
      if (tg && tg.children.length === 2) {
        const top = S.dir === 'entrada', on = tg.children[top ? 0 : 1], half = (on.offsetHeight + 2) / 2;
        anim(on, [{ transform: 'translateY(' + (top ? half : -half) + 'px)' }, { transform: 'none' }], { delay: b + 300, duration: 560, easing: SNAP });
      }
    }
    const L = cols[0] ? [...cols[0].children] : [], M = cols[1] ? [...cols[1].children] : [];
    [[L[0], M[0]], [L[1], M[1], M[2]]].forEach((row, i) => row.forEach(el => upIn(el, b + 280 + i * 110, 26, 520)));
    if (rail) {
      const dv = rail.querySelector('[data-a="mode"][data-v="dividir"]'), tk = dv && dv.nextElementSibling;   // (o link Excluir, quando existe, é outro filho da coluna)
      upIn(rail.querySelector('[data-a="askdel"]'), b + 280, 8, 420); upIn(dv, b + 280, 12, 460);
      if (tk) {   // a nota sai da fenda: desce 36px e é revelada de cima pra baixo (a fenda fica parada), junto com os botões. Começa JUNTO com o título e termina depois de todo o resto: a ordem parece intencional e nada fica esperando
        anim(tk, [{ opacity: 0, transform: 'translateY(-36px)', clipPath: 'inset(36px -40px -40px -40px)' }, { opacity: 1, offset: .3, transform: 'translateY(-26px)', clipPath: 'inset(26px -40px -40px -40px)' }, { opacity: 1, transform: 'none', clipPath: 'inset(0px -40px -40px -40px)' }], { delay: b, duration: 1500, easing: LONG });
      }
    }
  }
  // clicar num item da nota cria a primeira parte. Ordem, sem nada sobreposto e sem nenhum item sumir:
  //  1) a lista de itens desliza pra baixo até o lugar novo (FLIP, sempre 100% visível; a dica antiga só esmaece);
  //  2) só depois, Categoria e Título descem com fade, emergindo de baixo da linha horizontal (recortados nela),
  //     e o rótulo "Itens da nota" aparece por último no espaço que a lista abriu.
  function revealParte(pn, pre) {
    if (REDUCE() || !pre) return;
    const root = pn.querySelector(':scope > div[style*="padding:26px 34px"]'), rc = root && root.children[1] && root.children[1].children[1];
    if (!rc) return;
    const pw = pn.closest('[data-pw]'), sc = (pw.getBoundingClientRect().width / pw.offsetWidth) || 1;
    const f = rc.children[0], label = rc.children[1], list = rc.children[2] || rc.children[1], it = rc.querySelector('[data-a="item"]');
    const T1 = 460, d = (pre.top - it.getBoundingClientRect().top) / sc;
    if (pre.hint) {   // a dica antiga não some de uma vez: um fantasma esmaece no lugar dela, antes dos campos chegarem
      const g = document.createElement('div'); g.innerHTML = pre.hint.html; const gh = g.firstElementChild;
      gh.style.cssText += ';position:absolute;left:' + pre.hint.left + 'px;top:' + pre.hint.top + 'px;width:' + pre.hint.w + 'px;pointer-events:none';
      rc.appendChild(gh); const a = gh.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, easing: 'ease', fill: 'forwards' }); a.onfinish = () => gh.remove();
    }
    anim(list, [{ transform: 'translateY(' + d + 'px)' }, { transform: 'none' }], { delay: 0, duration: T1, easing: EH });   // sem opacity: nenhum item some
    const line = pn.querySelector(':scope > div[style*="height:1px"]');
    const gap = line ? Math.max(0, (f.getBoundingClientRect().top - line.getBoundingClientRect().bottom) / sc) : 24, fh = f.offsetHeight, T2 = T1 - 60, D2 = 560;
    const clip = 'inset(' + (-gap) + 'px -30px -30px -30px)';
    anim(f, [{ clipPath: clip }, { clipPath: clip }], { delay: 0, duration: T2 + 70 + D2 });   // a linha horizontal é a "borda": nada aparece acima dela
    [...f.children].forEach((c, i) => anim(c, [{ opacity: 0, transform: 'translateY(' + (-(gap + fh)) + 'px)' }, { opacity: 1, transform: 'none' }], { delay: T2 + i * 70, duration: D2, easing: SNAP }));
    if (label !== list) anim(label, [{ opacity: 0 }, { opacity: 1 }], { delay: T2 + 150, duration: 360 });
  }
  function enterView(pn, b) {
    if (REDUCE()) return;
    if (S.mode === 'dados') { enterDados(pn, b); return; }
    let bl = viewBlocks(pn), bar = null;
    if (S.mode === 'dividir') { bar = pn.querySelector('[style*="height:14px"][style*="overflow:hidden"]'); bl = bl.filter(e => e !== bar); }
    stagger(bl, b, 45); rollValue(pn, b + 60);
    if (bar) anim(bar, [{ opacity: 0, clipPath: 'inset(0 100% 0 0 round 9999px)' }, { opacity: 1, clipPath: 'inset(0 0 0 0 round 9999px)' }], { delay: b, duration: 1500, easing: LONG });
  }
  const dirtyKey = () => JSON.stringify([S.nome, S.obs, S.iso, S.cardId, S.accId, S.catId, S.totalV, S.dir, S.meio, S.parc || 1, S.itens, S.partes, S.nota && S.nota.url]);
  const isDirty = () => !!S && S.base !== undefined && dirtyKey() !== S.base;
  function init(row) {
    const S = { row, mode: 'dados', nome: row.e, obs: row.obs || '', iso: row.iso, cardId: row.cardId, accId: row.accId, catId: row.catId || catId(row.c), pop: null,
      link: row.nota && row.nota.url || '', texto: '', nota: row.nota ? { url: row.nota.url, chave_acesso: row.nota.chave_acesso, emitente: row.nota.emitente, cnpj: row.nota.cnpj, emitida_em: row.nota.emitida_em, total: row.nota.total } : null,
      itens: row.items.map(i => Object.assign({}, i)), partes: [], notaDirty: false, partesDirty: false, msg: '', alertField: null, busy: false, sel: 0 };
    const idx = {}; row.items.forEach((i, k) => { idx[i.id] = k; });
    S.partes = row.parts.filter(p => !p.auto).map(p => ({ catId: p.catId, valor: p.valor, rotulo: p.rotulo, itens: row.items.filter(i => i.partId === p.id).map(i => idx[i.id]) }));
    // valor/direção de um lançamento existente: totalV é sempre o módulo (valor_total), dir vem do sinal
    S.totalV = row.total || 0;
    S.dir = (row.amt < 0 || row.out > 0) ? 'saida' : 'entrada';
    return S;
  }

  let timers = [];
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const kidsOf = (h) => { const rw = h && h.closest && h.closest('[data-x-e]'); return { rw, kids: rw ? [...rw.children].filter(c => c !== h) : [] }; };
  // cardOn: o conteúdo original da linha (kids) nunca some — o inline reduzido (host) só nasce visualmente
  // ACIMA dele via order (os dois continuam na mesma ordem no DOM), e um card único (deco) por trás dos dois
  // dá o fundo mais claro + sombra, encobrindo linha+reduzido como uma peça só. 16px de respiro só quando a
  // linha é a primeira/última da lista (senão encostaria na borda do card master, alguns níveis acima).
  const CLIP = 'inset(0 -40px 0 -40px)', SLIDE = '.5s ' + EH, PADX = 20;
  const noDeco = (els) => els.filter(c => !c.hasAttribute('data-tx-card'));
  // as linhas originais têm transição própria no template (hover, acordeão); a nossa entra somada a ela e
  // depois volta exatamente ao que era, em vez de apagar.
  const T0 = new WeakMap();
  const kidT = (k, t) => { if (!T0.has(k)) T0.set(k, k.style.transition); const b = T0.get(k); k.style.transition = t === 'none' ? 'none' : (b ? b + ',' : '') + t; };
  const kidT0 = (k) => { if (T0.has(k)) { k.style.transition = T0.get(k); T0.delete(k); } };
  // FLIP + respiro: dy = deslocamento vertical, pad = padding lateral (as 2 colunas da esquerda entram pra
  // direita e a de valores pra esquerda, junto com a curva da abertura)
  // hover da linha dentro do card aberto: canto reto (o arredondado de 12px é só da lista normal) e recortado
  // 1px pra dentro, pra nunca pintar por cima do contorno do card. Se a linha encosta no fundo do card, os
  // cantos de baixo seguem a curva interna dele (19px) — reto ali ele vazaria pra fora do card arredondado.
  const KIDT = 'transform ' + SLIDE + ',padding-left ' + SLIDE + ',padding-right ' + SLIDE + ',border-radius ' + SLIDE + ',clip-path ' + SLIDE;
  const R0 = new WeakMap();
  const kidSet = (k, dy, pad, last) => {
    if (!R0.has(k)) R0.set(k, k.style.borderRadius);
    k.style.transform = 'translateY(' + dy + 'px)'; k.style.paddingLeft = pad + 'px'; k.style.paddingRight = pad + 'px';
    k.style.borderRadius = pad ? '0px' : (R0.get(k) || '0px');
    k.style.clipPath = pad ? 'inset(0px 1px 1px 1px round 0px 0px ' + (last ? 19 : 0) + 'px ' + (last ? 19 : 0) + 'px)' : 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)';
  };
  const lastKid = (kids) => { const v = kids.filter(k => k.offsetHeight > 0); return v[v.length - 1]; };
  function cardOn(rw, kids, host) {
    rw.style.position = 'relative'; rw.style.display = 'flex'; rw.style.flexDirection = 'column'; rw.style.clipPath = CLIP;
    // camada própria da linha: sem isso, quando o clip-path sai (fim da animação) o deco (z-index:-1) cai
    // pra trás do fundo do card mestre da lista e o fundo mais claro some.
    rw.style.isolation = 'isolate';
    // o respiro lateral fica só no próprio painel reduzido (data-pw), não aqui: a linha original (kids) não
    // pode mudar de padding em relação ao estado colapsado normal.
    host.style.order = '-1'; kids.forEach(k => { k.style.order = '1'; });
    let deco = rw.querySelector('[data-tx-card]');
    if (!deco) {
      deco = document.createElement('div'); deco.setAttribute('data-tx-card', '1');
      deco.style.cssText = 'position:absolute;inset:0;z-index:-1;border-radius:20px;background:#17171B;border:1px solid #28282D;box-shadow:0 30px 54px -16px rgba(0,0,0,.42),0 10px 26px -6px rgba(0,0,0,.22);opacity:0;transition:opacity .4s ease;pointer-events:none';
      rw.insertBefore(deco, rw.firstChild);
      requestAnimationFrame(() => { deco.style.opacity = '1'; });
    }
    // respiro de 16px só quando o vizinho não é outra linha (cabeçalho do dia, borda do card da lista etc.);
    // devolvido em vez de aplicado, pra entrar animado junto com a altura (aplicar direto dava um salto).
    const prevRow = rw.previousElementSibling && rw.previousElementSibling.hasAttribute('data-x-e');
    const nextRow = rw.nextElementSibling && rw.nextElementSibling.hasAttribute('data-x-e');
    return { mt: prevRow ? '0px' : '16px', mb: nextRow ? '0px' : '16px' };
  }
  function inlineReset(h) {
    const { rw, kids } = kidsOf(h);
    if (rw) {
      rw.style.height = ''; rw.style.transition = ''; rw.style.position = ''; rw.style.clipPath = ''; rw.style.isolation = '';
      rw.style.display = ''; rw.style.flexDirection = ''; rw.style.marginTop = ''; rw.style.marginBottom = '';
      const deco = rw.querySelector('[data-tx-card]'); if (deco) deco.remove();
    }
    kids.forEach(c => { kidT0(c); c.style.order = ''; c.style.transform = ''; c.style.paddingLeft = ''; c.style.paddingRight = ''; c.style.clipPath = ''; if (R0.has(c)) { c.style.borderRadius = R0.get(c); R0.delete(c); } });
    ['left', 'right', 'top', 'height', 'transition', 'order', 'clipPath'].forEach(k => { h.style[k] = ''; }); h.style.position = 'relative';
    h.innerHTML = '';
  }
  // Editar: o overlay abre por cima e a linha expandida continua aberta por baixo (intacta). Quando o overlay
  // fecha, o estado do reduzido volta como estava (ou é refeito, se o overlay salvou alguma coisa).
  let under = null;
  const keyOf = (st) => { const t = S; S = st; const k = dirtyKey(); S = t; return k; };
  function restoreUnder() {
    const u = under; under = null; if (!u || !u.host.isConnected) return;
    const r = KD.M.rowById[u.S.row.id]; if (!r) return;
    const { rw, kids } = kidsOf(u.host);
    if (rw) { rw.style.height = ''; rw.style.transition = ''; rw.style.clipPath = ''; u.host.style.transition = ''; u.host.style.clipPath = ''; kids.forEach(k => { kidT0(k); k.style.transform = ''; }); }
    const fresh = init(r); fresh.inline = true;
    host = u.host;
    if (keyOf(fresh) === keyOf(u.S)) { S = u.S; return; }   // nada mudou: o mesmo reduzido, sem redesenhar (sem piscar)
    S = fresh; S.base = dirtyKey(); render();
  }
  TX.openFull = function (c, row) {
    const ab = document.querySelector('[data-tx-host]');
    if (!S || !S.inline || !ab) { TX.open(c, row); return; }
    under = { S, host }; comp = c; S = init(row); S.base = dirtyKey();
    host = ab; host.style.pointerEvents = 'auto'; render(true);
  };
  TX.open = function (c, row, o) {
    const had = !!under; comp = c; TX.close(true); if (had) TX.close(true);
    S = init(row); S.inline = !!(o && o.inline); S.base = dirtyKey();
    const ab = document.querySelector(S.inline ? '[data-tx-in="' + row.id + '"]' : '[data-tx-host]'); if (!ab) { S = null; return; }
    host = ab;
    if (!S.inline) { host.style.pointerEvents = 'auto'; render(true); return; }
    host.style.pointerEvents = '';
    // inline: o card cresce, a linha original DESLIZA pra baixo junto com a borda de baixo do card (nunca
    // some nem pula), e o reduzido vai sendo revelado no espaço que a linha libera — sem sobreposição.
    const { rw, kids } = kidsOf(host);
    if (!rw) { render(true); return; }
    const H0 = rw.offsetHeight;
    const m = cardOn(rw, kids, host);
    rw.style.transition = 'none'; rw.style.height = H0 + 'px'; rw.style.marginTop = '0px'; rw.style.marginBottom = '0px';
    render(true);
    rw.style.height = 'auto'; const H1 = rw.offsetHeight; rw.style.height = H0 + 'px';
    const D = H1 - H0;
    // FLIP: no quadro 0 a linha é puxada de volta (-D) pro lugar onde estava; o reduzido começa todo coberto
    const lk = lastKid(kids);
    kids.forEach(k => { kidT(k, 'none'); kidSet(k, -D, 0, k === lk); });
    host.style.transition = 'none'; host.style.clipPath = 'inset(0 0 ' + D + 'px 0)';
    void rw.offsetHeight;
    rw.style.transition = 'height ' + SLIDE + ',margin-top ' + SLIDE + ',margin-bottom ' + SLIDE;
    rw.style.height = H1 + 'px'; rw.style.marginTop = m.mt; rw.style.marginBottom = m.mb;
    kids.forEach(k => { kidT(k, KIDT); kidSet(k, 0, PADX, k === lk); });
    host.style.transition = 'clip-path ' + SLIDE; host.style.clipPath = 'inset(0 0 0px 0)';
    const mine = S;
    // os clips só valem ENQUANTO anima; assentado, têm que sair senão cortam os popups (categoria, cartão)
    // que aparecem por cima da linha. TX.close reaplica antes da animação de saída. O padding fica.
    later(() => {
      if (S !== mine || !host) return;
      rw.style.height = ''; rw.style.transition = ''; rw.style.clipPath = '';
      host.style.transition = ''; host.style.clipPath = '';
      kids.forEach(k => { kidT0(k); k.style.transform = ''; });
    }, 520);
  };
  TX.openNew = function (c) {
    comp = c; TX.close(true);
    const t = KD.today, iso = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
    const row = { id: null, e: '', obs: '', iso, cardId: null, accId: null, catId: null, c: 'Outros', total: 0, inn: 0, items: [], parts: [], nota: null, origem: 'manual' };
    S = init(row); S.isNew = true; S.totalV = 0; S.dir = 'entrada'; S.meio = 'pix'; S.catId = null; S.nome = ''; S.base = dirtyKey();
    const ab = document.querySelector('[data-tx-host]'); if (!ab) return;
    host = ab; host.style.pointerEvents = 'auto'; render(true);
  };
  TX.requestClose = function () { if (!S || S.busy) return; S.askDel = false; if (isDirty()) { S.askClose = true; S.askBack = false; render(); return; } TX.close(); };
  TX.isOpen = function (id) { return !!(S && S.row && S.row.id === id); };
  let pendingDone = null;
  TX.close = function (quick) {
    if (pendingDone) { const f = pendingDone; pendingDone = null; clearTimers(); f(); }   // fecha de vez o painel que ainda estava animando saída
    clearTimers();
    if (!host) { S = null; return; }
    const inl = S && S.inline, h = host;
    const pn = h.querySelector('[data-pw]'), bd = h.querySelector('[data-bd]'), xi = h.querySelector('[data-xi]');
    const done = () => { if (pendingDone === done) pendingDone = null; if (inl) inlineReset(h); else { h.innerHTML = ''; if (h.hasAttribute('data-tx-host')) h.style.pointerEvents = 'none'; if (under) restoreUnder(); } };
    S = null;
    if (quick || !pn) { if (!pn && !inl) { h.innerHTML = ''; if (h.hasAttribute('data-tx-host')) h.style.pointerEvents = 'none'; } else done(); return; }
    if (xi) { xi.style.transition = 'transform .3s cubic-bezier(.65,0,.2,1)'; xi.style.transform = 'rotate(180deg)'; }
    // a animação de entrada (fill both) segura a opacidade em 1 e ignora o inline — tira ela antes do fade de saída
    pn.style.opacity = getComputedStyle(pn).opacity; pn.style.animation = 'none'; void pn.offsetHeight;
    pn.style.transition = 'opacity .24s ease, transform .3s ' + E; pn.style.opacity = '0'; if (!inl) pn.style.transform = pn.style.transform + ' translateY(14px)'; else pn.style.transform = pn.style.transform + ' translateY(6px)';
    if (bd) { bd.style.transition = 'opacity .25s ease'; bd.style.opacity = '0'; }
    if (inl) {
      const { rw } = kidsOf(h);
      if (rw) {
        const kids = noDeco(kidsOf(h).kids);
        const deco = rw.querySelector('[data-tx-card]'); if (deco) { deco.style.transition = 'opacity .45s ease'; deco.style.opacity = '0'; }
        // altura "fechada" = altura atual menos o reduzido. Não esconder o host pra medir: display:none
        // reinicia a animação de entrada do painel (ele piscava e voltava em fade enquanto era coberto).
        const H1 = rw.offsetHeight, D = h.offsetHeight, H0 = H1 - D;
        // o inverso da abertura: a linha sobe colada na borda de baixo do card, cobrindo o reduzido
        rw.style.clipPath = CLIP; rw.style.transition = 'none'; rw.style.height = H1 + 'px';
        rw.style.marginTop = getComputedStyle(rw).marginTop; rw.style.marginBottom = getComputedStyle(rw).marginBottom;
        const lk = lastKid(kids);
        kids.forEach(k => { kidT(k, 'none'); kidSet(k, 0, PADX, k === lk); });
        h.style.transition = 'none'; h.style.clipPath = 'inset(0 0 0px 0)';
        void rw.offsetHeight;
        rw.style.transition = 'height ' + SLIDE + ',margin-top ' + SLIDE + ',margin-bottom ' + SLIDE;
        rw.style.height = H0 + 'px'; rw.style.marginTop = '0px'; rw.style.marginBottom = '0px';
        kids.forEach(k => { kidT(k, KIDT); kidSet(k, -D, 0, k === lk); });
        const sep = h.querySelector('[data-sep]'); if (sep) { sep.style.animation = 'none'; sep.style.transition = 'opacity .24s ease'; sep.style.opacity = '0'; }
        h.style.transition = 'clip-path ' + SLIDE; h.style.clipPath = 'inset(0 0 ' + D + 'px 0)';
        pendingDone = done; later(done, 540);
        return;
      }
    }
    pendingDone = done; later(done, 300);
  };

  /* ---------------- peças ---------------- */
  const lb = (ic, t) => '<div style="display:flex;align-items:center;gap:10px;font-size:20px;font-weight:700;white-space:nowrap;color:#F2F0EB"><span style="color:#9A9AA3;display:flex">' + svg(ic, 22, 2) + '</span>' + t + '</div>';
  const fieldCss = 'background:#000;border:2px solid #2A2A2F;border-radius:28px;padding:15px 20px;font-size:16px;font-weight:500;color:#F2F0EB;font-family:inherit;outline:0;width:100%;box-sizing:border-box;';
  const pill = (t, extra) => '<div style="' + fieldCss + 'border-radius:9999px;text-align:center;font-weight:700;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' + (extra || '') + '">' + t + '</div>';
  const PR = 26; // raio compartilhado entre o campo e seu dropdown: o dropdown tampa o campo inteiro, mesmo radius, sem troca de forma
  const POPMAXH = 260;
  // css mínimo do inline reduzido: as mesmas keyframes/alertas do painel completo, sem repetir o resto
  const REDUCED_CSS = '<style>@keyframes txin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}[data-pw] .txtot:empty:before{content:"0,00";color:#51515C}'
    + '@keyframes txAlertPulse{0%,100%{border-color:#FFC24A;box-shadow:0 0 0 0 rgba(255,194,74,.4)}50%{border-color:#FFE29A;box-shadow:0 0 16px 2px rgba(255,194,74,.4)}}@keyframes txAlertGlow{0%,100%{text-shadow:0 0 0 rgba(255,194,74,0)}50%{text-shadow:0 0 20px rgba(255,194,74,.85)}}.txalert-box{animation:txAlertPulse 1.7s ease-in-out infinite}.txalert-text{animation:txAlertGlow 1.7s ease-in-out infinite}'
    + '@media (prefers-reduced-motion:reduce){.txalert-box,.txalert-text{animation:none!important;border-color:#FFC24A!important}.txalert-text{text-shadow:0 0 16px rgba(255,194,74,.85)!important}}</style>';

  function header(eyebrow) {
    const cor = S.catId ? catCor(catAtual()) : '#F2F0EB';
    return '<div style="display:flex;justify-content:space-between;align-items:flex-end;height:92px;flex:none"><div style="min-width:0;overflow:visible;position:relative;z-index:1"><div style="font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9A9AA3">' + eyebrow + '</div><div data-ttl style="font-size:64px;font-weight:700;letter-spacing:-.06em;line-height:1;margin:6px 0 -6px;white-space:nowrap;overflow:visible">' + esc(S.nome || (S.isNew ? 'Nova transação' : '—')) + '</div></div>'
      + (editavelValor() ? '<div data-tot style="display:flex;align-items:flex-end;gap:18px">' + dirToggle() + '<div style="display:flex;align-items:flex-end;gap:8px"><span data-in="total" data-alert-target="total" class="txtot ' + (S.alertField === 'total' ? 'txalert-text' : '') + '" contenteditable="plaintext-only" inputmode="decimal" spellcheck="false" style="display:block;min-width:150px;outline:0;text-align:right;font-family:inherit;font-size:96px;font-weight:700;letter-spacing:-.065em;line-height:.8;height:78px;white-space:nowrap;cursor:text;color:' + cor + '">' + (S.totalV ? brl(S.totalV) : '') + '</span><small style="font-size:20px;color:#F2F0EB;margin-bottom:2px">R$</small></div></div>'
      : '<div data-tot style="text-align:right;padding-right:' + 0 + 'px"><div style="font-size:76px;font-weight:700;letter-spacing:-.065em;line-height:.8;margin-top:12px;color:' + cor + ';transition:color .3s ease">' + brl(total()) + '<small style="font-size:20px;color:#F2F0EB;letter-spacing:0;margin-left:8px">R$</small></div></div>') + '</div>';
  }

  function dirToggle() {
    const mk = (d, ic, col) => { const on = S.dir === d; return '<span data-a="dir" data-v="' + d + '" title="' + (d === 'entrada' ? 'Entrada' : 'Saída') + '" style="width:29px;height:29px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;background:' + (on ? col : 'transparent') + ';color:' + (on ? '#0A0A0A' : '#6A6A72') + ';transition:background .3s ' + E + ',color .3s ease"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">' + ic + '</svg></span>'; };
    return '<div style="display:flex;flex-direction:column;gap:2px;padding:3px;border-radius:9999px;border:2px solid #2A2A2F;background:#000;flex:none;margin-bottom:3px">' + mk('entrada', '<path d="M12 5v14M5 12h14"/>', '#6AFF2A') + mk('saida', '<path d="M5 12h14"/>', '#FF5A4A') + '</div>';
  }
  function popCat() {
    // tampa o campo inteiro (mesmo radius em todo canto, sem vão) em vez de emendar com cantos retos:
    // assim o campo nunca precisa trocar de forma pra abrir/fechar (sem flicker de corner-radius).
    // o fade de topo/base é um par de overlays fora do fluxo (não um mask na própria caixa): um mask
    // junto com o box-shadow + corner-radius criava aquele recorte diagonal estranho no canto.
    return '<div data-pop style="position:absolute;z-index:6;left:0;right:0;top:0;max-height:' + POPMAXH + 'px;overflow:hidden;background:#151518;border:1px solid #2A2A2F;border-radius:' + PR + 'px;box-shadow:0 24px 48px rgba(0,0,0,.6);display:flex;flex-direction:column;animation:txin .22s ' + E + '">'
      + '<div class="kscroll" data-popscroll style="flex:1;min-height:0;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px">'
      + cats().map(n => { const on = catAtual() === n; return '<span data-a="cat" data-v="' + esc(n) + '"' + (on ? ' data-dd-on="1"' : '') + ' style="display:flex;align-items:center;gap:12px;height:46px;flex:none;border-radius:16px;border:1px solid ' + (on ? '#F2F0EB' : '#2A2A2F') + ';background:#0D0D10;padding:0 12px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;overflow:hidden">' + icDot(n, 26) + '<span style="flex:1;overflow:hidden;text-overflow:ellipsis">' + esc(n) + '</span>' + (on ? '<span style="color:#F2F0EB;display:flex">' + svg('check', 15, 2.6) + '</span>' : '') + '</span>'; }).join('') + '</div>'
      + '<i data-fadetop style="position:absolute;left:0;right:0;top:0;height:40px;background:linear-gradient(#151518,rgba(21,21,24,0));pointer-events:none;opacity:0;transition:opacity .2s ease"></i>'
      + '<i data-fadebot style="position:absolute;left:0;right:0;bottom:0;height:40px;background:linear-gradient(rgba(21,21,24,0),#151518);pointer-events:none;opacity:0;transition:opacity .2s ease"></i>'
      + '</div>';
  }
  // "bank" vem do apelido pra cor (BANK, em kd.js: 'Itaú Azul', 'Nubank PJ'...) mas o acervo de logos
  // (Component.LGC) só tem a marca-mãe — sem esse mapa, essas variantes caíam num logo em branco.
  const LOGOKEY = { 'Itaú Azul': 'Itaú', 'Nubank PJ': 'Nubank', 'Nubank Pessoal': 'Nubank', 'CDB Mercado Pago': 'Mercado Pago' };
  const bankChip = (bank, cor) => {
    const key = bank ? (LOGOKEY[bank] || bank) : null;
    const url = key ? comp.constructor.lgcUrl(key) : '';
    if (!url) return '<i style="width:10px;height:10px;border-radius:50%;background:' + cor + ';flex:none"></i>'; // sem asset de logo: cai pro ponto de cor
    const mono = key === 'C6'; // svg sem cor própria (fill preto default); recolorido via mask pra aparecer no fundo escuro
    return mono
      ? '<span style="width:28px;height:28px;flex:none;display:flex;align-items:center;justify-content:center"><span style="display:block;width:100%;height:58%;background:#F2F0EB;-webkit-mask:url(\'' + url + '\') center/contain no-repeat;mask:url(\'' + url + '\') center/contain no-repeat"></span></span>'
      : '<span style="width:28px;height:28px;flex:none;background-image:url(\'' + url + '\');background-size:contain;background-repeat:no-repeat;background-position:center"></span>';
  };
  function popCard() {
    const opts = KD.M.cards.map(c => ({ k: 'c:' + c.id, n: c.nick || c.n, cor: c.cor, bank: c.bank })).concat(KD.M.accs.map(a => ({ k: 'a:' + a.id, n: a.nome, cor: a.cor, bank: a.bank })));
    const cur = S.cardId ? 'c:' + S.cardId : S.accId ? 'a:' + S.accId : '';
    return '<div data-pop style="position:absolute;z-index:6;left:0;right:0;top:0;max-height:' + POPMAXH + 'px;overflow:hidden;background:#151518;border:1px solid #2A2A2F;border-radius:' + PR + 'px;box-shadow:0 24px 48px rgba(0,0,0,.6);display:flex;flex-direction:column;animation:txin .22s ' + E + '">'
      + '<div class="kscroll" data-popscroll style="flex:1;min-height:0;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px">'
      + (S.isNew ? '<div style="display:flex;gap:6px;padding:2px 2px 6px;flex-wrap:wrap">' + [['pix', 'Pix'], ['debito', 'Débito'], ['boleto', 'Boleto'], ['dinheiro', 'Dinheiro']].map(m => '<span data-a="forma" data-v="' + m[0] + '" style="padding:6px 12px;border-radius:9999px;border:1px solid ' + (S.meio === m[0] && !S.cardId ? '#F2F0EB' : '#2A2A2F') + ';font-size:12px;font-weight:700;cursor:pointer">' + m[1] + '</span>').join('') + '</div>' : '')
      + opts.map(o => '<span data-a="meio" data-v="' + o.k + '"' + (o.k === cur ? ' data-dd-on="1"' : '') + ' style="flex:none;display:flex;align-items:center;gap:12px;height:46px;border-radius:16px;border:1px solid ' + (o.k === cur ? '#F2F0EB' : '#2A2A2F') + ';background:#0D0D10;padding:0 12px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;overflow:hidden">' + bankChip(o.bank, o.cor) + '<span style="overflow:hidden;text-overflow:ellipsis">' + esc(o.n) + '</span></span>').join('') + '</div>'
      + '<i data-fadetop style="position:absolute;left:0;right:0;top:0;height:40px;background:linear-gradient(#151518,rgba(21,21,24,0));pointer-events:none;opacity:0;transition:opacity .2s ease"></i>'
      + '<i data-fadebot style="position:absolute;left:0;right:0;bottom:0;height:40px;background:linear-gradient(rgba(21,21,24,0),#151518);pointer-events:none;opacity:0;transition:opacity .2s ease"></i>'
      + '</div>';
  }

  /* ---------------- estabelecimento: busca no que já existe (KD.M.est) ou cria digitando um nome novo.
     Compartilhado entre o inline reduzido e o painel completo — um só componente pros dois lugares. */
  function estOptions(q) {
    const nq = KD.norm((q || '').trim()), all = (KD.M && KD.M.est) || [];
    return (nq ? all.filter(e => KD.norm(e.nome).indexOf(nq) >= 0) : all).slice(0, 30);
  }
  function estPop(q) {
    const opts = estOptions(q), nq = KD.norm((q || '').trim()), exact = opts.some(e => KD.norm(e.nome) === nq);
    const items = opts.map(e => '<span data-a="estpick" data-v="' + esc(e.nome) + '" style="display:flex;align-items:center;gap:12px;height:46px;flex:none;border-radius:16px;border:1px solid #2A2A2F;background:#0D0D10;padding:0 12px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;overflow:hidden">' + icDot(e.cat, 26) + '<span style="flex:1;overflow:hidden;text-overflow:ellipsis">' + esc(e.nome) + '</span><span style="font-size:12px;font-weight:600;color:#6A6A72;flex:none">' + e.n + 'x</span></span>').join('');
    const novo = (nq && !exact) ? '<span data-a="estnew" data-v="' + esc(q.trim()) + '" style="display:flex;align-items:center;gap:12px;height:46px;flex:none;border-radius:16px;border:1px dashed #51515C;padding:0 12px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;color:#F2F0EB">' + '<span style="width:26px;height:26px;border-radius:50%;background:#1C1C20;display:flex;align-items:center;justify-content:center;flex:none">' + svg('plus', 14, 2.4) + '</span>Criar "' + esc(q.trim()) + '"</span>' : '';
    const vazio = (!items && !novo) ? '<div style="padding:14px 10px;color:#6A6A72;font-size:13px">Comece a digitar pra buscar ou criar</div>' : '';
    return '<div data-pop style="position:absolute;z-index:6;left:0;right:0;top:100%;margin-top:8px;max-height:' + POPMAXH + 'px;overflow:hidden;background:#151518;border:1px solid #2A2A2F;border-radius:' + PR + 'px;box-shadow:0 24px 48px rgba(0,0,0,.6);display:flex;flex-direction:column;animation:txin .22s ' + E + '">'
      + '<div class="kscroll" data-popscroll style="flex:1;min-height:0;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px">' + items + novo + vazio + '</div>'
      + '<i data-fadetop style="position:absolute;left:0;right:0;top:0;height:40px;background:linear-gradient(#151518,rgba(21,21,24,0));pointer-events:none;opacity:0;transition:opacity .2s ease"></i>'
      + '<i data-fadebot style="position:absolute;left:0;right:0;bottom:0;height:40px;background:linear-gradient(rgba(21,21,24,0),#151518);pointer-events:none;opacity:0;transition:opacity .2s ease"></i>'
      + '</div>';
  }
  function estField() {
    return '<input data-in="nome" data-estq="1" data-alert-target="nome" autocomplete="off" placeholder="Onde foi? Ex.: Padaria Central" value="' + esc(S.nome) + '" style="' + fieldCss + '" class="' + (S.alertField === 'nome' ? 'txalert-box' : '') + '">' + (S.pop === 'est' ? estPop(S.nome) : '');
  }
  const origemInfo = (o) => o === 'open_finance' ? { t: 'Open Finance', ic: 'link' } : o === 'importacao' ? { t: 'Importação', ic: 'copy' } : { t: 'Manual', ic: 'pencil' };

  function viewDados() {
    const cn = catAtual(), cor = catCor(cn);
    const meioObj = S.cardId ? KD.M.cardById[S.cardId] : S.accId ? KD.M.accs.find(a => a.id === S.accId) : null;
    const meio = meioObj ? (meioObj.nick || meioObj.n || meioObj.nome) : '—';
    const left = '<div style="display:flex;flex-direction:column;gap:10px"><div>' + lb('home', 'Estabelecimento') + '</div><div style="display:flex;gap:10px;align-items:stretch"><div style="position:relative;flex:1;min-width:0">' + estField() + '</div>' + (!S.isNew ? '<span data-a="goest" title="Ver o estabelecimento" style="width:54px;flex:none;border-radius:9999px;border:2px solid #2A2A2F;background:#000;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#F2F0EB;transition:border-color .25s ease,background .25s ease" onmouseover="this.style.borderColor=\'#51515C\';this.style.background=\'#151518\'" onmouseout="this.style.borderColor=\'#2A2A2F\';this.style.background=\'#000\'">' + svg('home', 20, 1.9) + '</span>' : '') + '</div></div>'
      + '<div style="display:flex;flex-direction:column;gap:10px;flex:1;min-height:0">' + lb('lines', 'Observação') + '<textarea data-in="obs" placeholder="Adicionar observação" style="' + fieldCss + 'flex:1;resize:none;font-family:inherit"></textarea></div>';
    const mid = '<div style="display:flex;flex-direction:column;gap:10px">' + lb('cal', 'Data') + '<label style="position:relative;display:block">' + pill(dfmt(S.iso), 'pointer-events:none') + '<input data-in="iso" type="date" value="' + esc(S.iso) + '" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%"></label></div>'
      + '<div style="display:flex;flex-direction:column;gap:10px">' + lb('card', 'Cartão / Conta') + '<div style="display:flex;gap:8px;align-items:flex-start"><div style="position:relative;flex:1;min-width:0"><div data-a="pop" data-v="card" data-alert-target="card" style="' + fieldCss + 'border-radius:' + PR + 'px;flex:1;min-width:0;display:flex;align-items:center;gap:10px;cursor:pointer" class="' + (S.alertField === 'card' ? 'txalert-box' : '') + '">' + bankChip(meioObj && meioObj.bank, (meioObj || {}).cor || '#3A3A40') + '<span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:700">' + esc(meio) + '</span></div>' + (S.pop === 'card' ? popCard() : '') + '</div>' + (S.isNew && S.cardId ? '<div data-a="parc" title="Parcelas" style="flex:none;width:74px">' + pill((S.parc || 1) + 'x') + '</div>' : '') + '</div></div>'
      + '<div style="display:flex;flex-direction:column;gap:10px;position:relative">' + lb('tag', 'Categoria') + '<div data-a="pop" data-v="cat" style="display:flex;align-items:center;gap:12px;border-radius:' + PR + 'px;padding:9px 12px 9px 10px;border:2px solid ' + cor + '8C;background:color-mix(in srgb,' + cor + ' 14%,#000);cursor:pointer">' + icDot(cn, 30) + '<b style="font-size:16px;flex:1">' + esc(cn) + '</b><span style="width:28px;height:28px;border-radius:50%;background:#0A0A0A;display:flex;align-items:center;justify-content:center;color:#F2F0EB">' + svg('chev', 14, 2.6) + '</span></div>' + (S.pop === 'cat' ? popCat() : '') + '</div>';
    const nf = S.itens.length ? S.itens.length + (S.itens.length === 1 ? ' item lido' : ' itens lidos') : 'Escaneie ou cole o link<br>pra ver os itens da compra';
    // excluir: só lançamento manual já salvo (os de extrato/Open Finance voltariam na próxima importação).
    // pequeno e discreto no vão acima do "Dividir"; abre a confirmação, nunca apaga direto.
    const podeExcluir = !S.isNew && S.row.id && S.row.origem === 'manual';
    const delLink = podeExcluir ? '<span data-a="askdel" style="position:absolute;left:26px;top:26px;display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#FF6B5A;cursor:pointer;opacity:.85;transition:opacity .25s ease" onmouseover="this.style.opacity=\'1\'" onmouseout="this.style.opacity=\'.85\'">' + svg('trash', 13, 2.2) + 'Excluir transação</span>' : '';
    const rail = '<div style="width:331px;flex:none;background:#1C1C20;border-left:1px solid #3A3A40;border-radius:0 30px 30px 0;padding:66px 24px 24px 26px;display:flex;flex-direction:column;box-sizing:border-box;position:relative">' + delLink
      + '<div data-a="mode" data-v="dividir" style="height:54px;flex:none;display:flex;align-items:center;justify-content:center;gap:14px;padding:0 20px;white-space:nowrap;border:2px solid #2A2A2F;border-radius:28px;background:#000;cursor:pointer;transition:border-color .25s ease" onmouseover="this.style.borderColor=\'#51515C\'" onmouseout="this.style.borderColor=\'#2A2A2F\'"><span style="color:#F2F0EB;display:flex">' + svg('split', 30, 1.7) + '</span><div style="display:flex;flex-direction:column;line-height:1.15;align-items:flex-start"><span style="font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase">Dividir transação</span><span style="font-size:12.5px;color:#9A9AA3">' + (S.partes.length ? S.partes.length + (S.partes.length === 1 ? ' parte' : ' partes') : 'Separe em categorias') + '</span></div></div>'
      + '<div style="height:313px;flex:none;margin-top:21px;position:relative"><svg data-tk style="position:absolute;inset:0;overflow:visible" width="280" height="313"></svg>'
      + '<div data-a="mode" data-v="ler" class="txnf" style="position:absolute;left:0;right:0;top:0;height:249px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase;cursor:pointer;color:#0A0A0A;transition:transform .35s ' + E + '"><span style="display:flex">' + svg('qr', 60, 1.5, '#1A1A1A') + '</span><span>Nota fiscal</span><small style="font-size:12.5px;font-weight:500;letter-spacing:0;text-transform:none;color:#6A6A72;text-align:center;line-height:1.4;margin-top:-6px">' + nf + '</small></div>'
      + '<div style="position:absolute;left:0;right:0;top:0;height:60px;overflow:hidden;pointer-events:none"><svg style="position:absolute;left:0;top:0" width="280" height="40" fill="#0A0A0A"><rect x="30.4" y="0" width="4.7" height="32"/><rect x="44.3" y="0" width="2.4" height="32"/><rect x="51.7" y="0" width="5.7" height="32"/><rect x="66.3" y="0" width="1.7" height="32"/><rect x="75.1" y="0" width="7.4" height="32"/><rect x="86.9" y="0" width="4.7" height="32"/><rect x="98.1" y="0" width="8.5" height="32"/><rect x="109.2" y="0" width="4.4" height="32"/><rect x="120.4" y="0" width="2.4" height="32"/><rect x="131.9" y="0" width="4.4" height="32"/><rect x="143.0" y="0" width="7.4" height="32"/><rect x="156.9" y="0" width="2.0" height="32"/><rect x="165.7" y="0" width="4.4" height="32"/><rect x="175.5" y="0" width="2.7" height="32"/><rect x="185.3" y="0" width="2.4" height="32"/><rect x="196.5" y="0" width="9.5" height="32"/><rect x="215.7" y="0" width="4.4" height="32"/><rect x="228.3" y="0" width="4.4" height="32"/><rect x="234.3" y="0" width="6.8" height="32"/><rect x="244.5" y="0" width="5.1" height="32"/><rect x="251.3" y="0" width="2.4" height="32"/></svg></div>'
      + '<div style="position:absolute;left:0;right:0;top:0;height:46px;background:linear-gradient(rgba(0,0,0,.52),rgba(0,0,0,.24) 45%,rgba(0,0,0,0));pointer-events:none"></div>'
      + '<div data-a="save" class="txsv" style="position:absolute;left:0;top:249px;width:140px;height:64px;border-radius:0 0 0 28px;display:flex;align-items:center;justify-content:center;font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase;color:#F2F0EB;cursor:pointer;opacity:' + (S.busy ? .5 : 1) + '">' + (S.busy ? 'Salvando…' : S.isNew ? 'Criar' : 'Salvar') + '</div>'
      + '<div data-a="close" class="txcn" style="position:absolute;left:140px;top:249px;width:140px;height:64px;border-radius:0 0 28px 0;display:flex;align-items:center;justify-content:center;font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase;color:#F2F0EB;cursor:pointer">Cancelar</div></div></div>';
    return '<div style="flex:1;min-width:0;padding:26px 34px 24px 30px;display:flex;flex-direction:column;gap:22px;box-sizing:border-box">' + header(S.isNew ? 'Nova transação // Manual' : 'Editando // ' + (S.row.origem === 'open_finance' ? 'Open Finance' : 'Transação'))
      + '<div style="display:grid;grid-template-columns:1fr 304px;flex:1;min-height:0"><div style="padding:24px 28px 0 0;display:flex;flex-direction:column;gap:24px;min-width:0">' + left + '</div><div style="border-left:1px solid #3A3A40;padding:24px 0 0 28px;display:flex;flex-direction:column;gap:20px">' + mid + '</div></div></div>' + rail
      + (S.msg ? '<div style="position:absolute;left:30px;bottom:14px;font-size:12.5px;color:#FFC24A">' + esc(S.msg) + '</div>' : '');
  }

  const footer = (primary, dis) => '<div style="display:flex;justify-content:space-between;align-items:center;flex:none"><span data-a="mode" data-v="dados" style="height:46px;display:flex;align-items:center;gap:8px;padding:0 22px 0 14px;border-radius:9999px;border:2px solid #2A2A2F;font-weight:900;letter-spacing:.06em;font-size:13px;text-transform:uppercase;cursor:pointer">' + svg('left', 18, 2.4) + 'Voltar</span>' + (S.msg ? '<span style="font-size:12.5px;color:#FFC24A;flex:1;padding:0 20px;text-align:center">' + esc(S.msg) + '</span>' : '<span></span>') + primary + '</div>';
  const primaryBtn = (a, t, dis) => '<span data-a="' + a + '" style="height:46px;display:flex;align-items:center;padding:0 28px;border-radius:9999px;background:#F2F0EB;color:#0A0A0A;font-weight:900;letter-spacing:.06em;font-size:13px;text-transform:uppercase;cursor:' + (dis ? 'default' : 'pointer') + ';opacity:' + (dis ? .35 : 1) + '">' + t + '</span>';

  function viewLer() {
    const body = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:34px;flex:1;min-height:0;padding:24px 0 0">'
      + '<div style="display:flex;flex-direction:column;gap:10px;min-height:0"><div style="display:flex;align-items:center;justify-content:space-between">' + lb('link', 'Link da nota') + '<span style="font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:9999px;background:#1C1C20;color:#6AFF2A">Mais rápido</span></div>'
      + '<div style="display:flex;gap:10px"><div style="position:relative;flex:1;min-width:0"><input data-in="link" value="' + esc(S.link) + '" placeholder="Cole o link do QR da nota" style="' + fieldCss + 'width:100%;padding-right:46px">' + (S.link ? '<span style="position:absolute;right:48px;top:1px;bottom:1px;width:34px;border-radius:0 26px 26px 0;background:linear-gradient(90deg,transparent,#000 60%);pointer-events:none"></span><span data-a="copylink" title="Copiar link" style="position:absolute;right:11px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:' + (S.copied ? '#6AFF2A' : '#9A9AA3') + ';transition:color .2s ease">' + svg(S.copied ? 'check2' : 'copy', 17, 2) + '</span>' : '') + '</div><span data-a="lerlink" style="height:56px;display:flex;align-items:center;padding:0 24px;border-radius:9999px;background:#F2F0EB;color:#0A0A0A;font-weight:900;letter-spacing:.06em;font-size:13px;text-transform:uppercase;cursor:pointer;flex:none">Ler</span></div>'
      + '<div style="font-size:12.5px;color:#9A9AA3;line-height:1.4">O QR Code da nota abre uma página com os itens. Copie o endereço dela e cole aqui.</div>'
      + '<div style="margin-top:6px;font-size:16px;font-weight:700;color:#F2F0EB">Ou cole o texto da página</div><textarea data-in="texto" placeholder="Abra o link, selecione tudo, copie e cole aqui" style="' + fieldCss + 'flex:1;min-height:0;resize:none"></textarea></div>'
      + (S.err ? '<div data-up style="display:flex;align-items:center;justify-content:center;border:2px dashed #5A4A1E;border-radius:28px;margin-bottom:4px;padding:0 34px"><div style="display:flex;flex-direction:column;gap:22px;max-width:520px"><div style="display:flex;align-items:flex-start;gap:20px"><span style="flex:none;display:flex;color:#FFC24A">' + warnIco(56) + '</span><div style="display:flex;flex-direction:column;gap:6px;min-width:0"><span style="font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase;color:#FFC24A">' + esc(S.err.t) + '</span><span style="font-size:13.5px;color:#C9C9D0;line-height:1.45">' + esc(S.err.d) + '</span>' + (S.err.x ? '<span style="font-size:11px;color:#6A6A74;line-height:1.4;word-break:break-word">' + esc(S.err.x) + '</span>' : '') + '</div></div><span data-a="retry" style="align-self:flex-start;margin-left:76px;height:38px;display:flex;align-items:center;gap:8px;padding:0 18px;border-radius:9999px;background:#F2F0EB;color:#0A0A0A;font-weight:900;letter-spacing:.06em;font-size:12px;text-transform:uppercase;cursor:pointer">Tente novamente</span></div><input data-in="foto" type="file" accept="image/*,.heic,.heif,.dng,.tif,.tiff,.webp,.avif" style="display:none"></div>' : '<label data-up style="display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px dashed #3A3A40;border-radius:28px;cursor:pointer;margin-bottom:4px"><input data-in="foto" type="file" accept="image/*,.heic,.heif,.dng,.tif,.tiff,.webp,.avif" style="display:none"><div style="display:flex;align-items:center;gap:22px"><span style="color:#F2F0EB;display:flex">' + svg('qr', 64, 1.4) + '</span><div style="display:flex;flex-direction:column;gap:6px"><span style="font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase">Enviar foto ou print</span><span style="font-size:12.5px;color:#9A9AA3">Arraste a imagem aqui ou clique pra escolher</span><span style="font-size:11px;color:#51515C;font-weight:700;letter-spacing:.08em">PNG · JPG · HEIC · DNG · WEBP</span></div></div></label>') + '</div>';
    return '<div style="flex:1;min-width:0;padding:26px 34px 24px 30px;display:flex;flex-direction:column;gap:22px;box-sizing:border-box">' + header('Ler nota fiscal') + body + footer(primaryBtn('lertexto', 'Ler nota', false)) + '</div>';
  }

  function viewDividir() {
    const t = total(), soma = somaPartes(), resto = Math.max(0, t - soma), over = soma > t + 0.005;
    const nomeP = p => p.rotulo || catName(p.catId);
    const bar = S.partes.map(p => '<i style="flex:' + Math.max(p.valor, 0.01) + ';background:' + catCor(catName(p.catId)) + '"></i>').join('') + (resto > 0.004 ? '<i style="flex:' + resto + ';background:repeating-linear-gradient(135deg,#2A2A2F 0 6px,#1C1C20 6px 12px)"></i>' : '');
    const rows = S.partes.map((p, k) => { const cor = catCor(catName(p.catId)), on = S.sel === k;
      if (S.merge && S.merge.from === k) return '<div data-a="domerge" style="display:flex;align-items:center;justify-content:center;gap:10px;padding:13px 14px;border-radius:9999px;background:#F2F0EB;color:#0A0A0A;font-weight:900;letter-spacing:.08em;font-size:13px;text-transform:uppercase;cursor:pointer;flex:none;animation:txfade .25s ease">Confirmar?<span style="font-weight:600;letter-spacing:0;text-transform:none;font-size:12px;opacity:.6">juntar com ' + esc(nomeP(S.partes[S.merge.to])) + '</span></div>';
      return '<div draggable="true" data-pdrag="' + k + '" data-a="sel" data-v="' + k + '" data-drop="' + k + '" style="display:flex;align-items:center;gap:12px;padding:8px 10px 8px 14px;border-radius:9999px;border:2px solid ' + (on ? cor : '#2A2A2F') + ';background:#000;cursor:pointer;transition:border-color .25s ease;flex:none"><i style="width:12px;height:12px;border-radius:50%;background:' + cor + ';flex:none"></i><span style="font-size:15px;font-weight:700;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(nomeP(p)) + '</span><span style="font-size:12px;color:#9A9AA3;white-space:nowrap">' + p.itens.length + (p.itens.length === 1 ? ' item' : ' itens') + '</span><span style="display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:9999px;background:#1C1C20;font-size:11px;color:#9A9AA3;font-weight:700">R$<input data-in="pv" data-k="' + k + '" value="' + brl(p.valor) + '" style="width:78px;background:transparent;border:0;outline:0;color:#F2F0EB;font-family:inherit;font-size:15px;font-weight:700;text-align:right"></span><span data-a="pdel" data-v="' + k + '" style="width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#9A9AA3">' + svg('x', 14, 2.4) + '</span></div>'; }).join('');
    const left = '<div style="display:flex;flex-direction:column;gap:14px;min-height:0;padding-right:34px"><div style="display:flex;height:14px;border-radius:9999px;overflow:hidden;gap:2px;flex:none">' + bar + '</div><div style="display:flex;flex-direction:column;gap:8px;overflow:auto;min-height:0;flex:1" class="kscroll">' + rows
      + '<div data-a="padd" style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:9999px;border:2px dashed #3A3A40;cursor:pointer;color:#9A9AA3;font-size:14px;font-weight:700;flex:none"><span style="display:flex">' + svg('plus', 18, 2.4) + '</span>Adicionar parte<span style="font-weight:500;font-size:12.5px;margin-left:6px">o que sobrar vira parte “Outros” sozinho</span></div></div>'
      + '<div style="font-size:12.5px;color:' + (over ? '#FF6B5A' : '#9A9AA3') + ';flex:none">' + (over ? 'As partes passam do total em R$ ' + brl(soma - t) : 'A transação original continua intacta · R$ ' + brl(resto) + ' sem parte') + '</div></div>';
    const P = S.partes[S.sel];
    let right;
    if (!P) {
      const its0 = S.itens.map((it, k) => '<div draggable="true" data-a="item" data-v="' + k + '" data-drag="' + k + '" style="display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:1px dashed #2B2B30;cursor:pointer"><i style="width:10px;height:10px;border-radius:50%;background:#3A3A40;flex:none"></i><span style="flex:1;min-width:0;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(it.nome) + '</span><span style="font-size:11px;color:#9A9AA3">R$</span><span style="font-size:14px;font-weight:700;font-variant-numeric:tabular-nums">' + brl(it.valor) + '</span></div>').join('');
      right = '<div style="border-left:1px solid #3A3A40;padding-left:34px;display:flex;flex-direction:column;gap:10px;min-height:0"><div style="font-size:13px;color:#9A9AA3;line-height:1.5">' + (S.itens.length ? 'Clique num item pra criar a primeira parte com ele, ou arraste os itens pra uma parte.' : 'Adicione uma parte pra editar o título, a categoria e o valor dela.') + '</div>' + (S.itens.length ? '<div class="kscroll" style="overflow:auto;min-height:0;flex:1;-webkit-mask-image:linear-gradient(#0000,#000 8px,#000 calc(100% - 18px),#0000);mask-image:linear-gradient(#0000,#000 8px,#000 calc(100% - 18px),#0000)">' + its0 + '</div>' : '') + '</div>';
    }
    else {
      const cn = catName(P.catId), cor = catCor(cn);
      const its = S.itens.map((it, k) => { const pi = S.partes.findIndex(q => q.itens.includes(k)), mine = pi === S.sel, c2 = pi >= 0 ? catCor(catName(S.partes[pi].catId)) : '#3A3A40';
        return '<div draggable="true" data-a="item" data-v="' + k + '" data-drag="' + k + '" style="display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:1px dashed #2B2B30;cursor:pointer"><i style="width:10px;height:10px;border-radius:50%;background:' + c2 + ';flex:none;box-shadow:' + (mine ? '0 0 0 3px #111114,0 0 0 4px ' + c2 : 'none') + '"></i><span style="flex:1;min-width:0;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:' + (pi >= 0 && !mine ? .5 : 1) + '">' + esc(it.nome) + '</span><span style="font-size:11px;color:#9A9AA3">R$</span><span style="font-size:14px;font-weight:700;font-variant-numeric:tabular-nums">' + brl(it.valor) + '</span></div>'; }).join('');
      right = '<div style="border-left:1px solid #3A3A40;padding-left:34px;display:flex;flex-direction:column;gap:14px;min-height:0;position:relative">'
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px"><div style="display:flex;flex-direction:column;gap:8px;position:relative"><div style="font-size:14px;font-weight:700;color:#9A9AA3">Categoria</div><div data-a="pcat" style="display:flex;align-items:center;gap:12px;border-radius:9999px;padding:6px 10px 6px 8px;border:2px solid ' + cor + '8C;background:color-mix(in srgb,' + cor + ' 14%,#000);cursor:pointer;height:50px;box-sizing:border-box">' + icDot(cn, 30) + '<b style="font-size:15px;flex:1">' + esc(cn) + '</b><span style="width:28px;height:28px;border-radius:50%;background:#0A0A0A;display:flex;align-items:center;justify-content:center;color:#F2F0EB;transition:transform .3s ' + E + ';transform:rotate(' + (S.pop === 'pcat' ? 180 : 0) + 'deg)">' + svg('chev', 14, 2.6) + '</span></div>'
        + (S.pop === 'pcat' ? '<div data-pop class="kscroll" style="position:absolute;z-index:8;left:0;right:0;top:calc(100% + 6px);max-height:172px;overflow-y:auto;background:#151518;border:1px solid #2A2A2F;border-radius:20px;padding:8px;display:flex;flex-direction:column;gap:4px;box-shadow:0 24px 48px rgba(0,0,0,.6);transform-origin:top;animation:txdrop .26s ' + E + '">' + cats().map(n => '<span data-a="pset" data-v="' + esc(n) + '"' + (n === cn ? ' data-dd-on="1"' : '') + ' style="flex:none;display:flex;align-items:center;gap:10px;height:38px;border-radius:12px;border:1px solid ' + (n === cn ? '#F2F0EB' : 'transparent') + ';padding:0 10px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap" onmouseover="this.style.background=\'#1C1C20\'" onmouseout="this.style.background=\'\'">' + icDot(n, 22) + '<span style="flex:1">' + esc(n) + '</span>' + (n === cn ? '<span style="display:flex">' + svg('check', 14, 2.6) + '</span>' : '') + '</span>').join('') + '</div>' : '') + '</div>'
        + '<div style="display:flex;flex-direction:column;gap:8px"><div style="font-size:14px;font-weight:700;color:#9A9AA3">Título da parte <span style="font-weight:500">· opcional</span></div><input data-in="ptit" maxlength="40" value="' + esc(P.rotulo || '') + '" placeholder="Ex.: Água, Luz" style="' + fieldCss + 'border-radius:9999px;height:50px;padding:0 20px"></div></div>'
        + (S.itens.length ? '<div style="font-size:13px;font-weight:700;color:#9A9AA3;margin-top:2px">Itens da nota <span style="font-weight:500">· clique ou arraste pra incluir nesta parte</span></div><div class="kscroll" style="overflow:auto;min-height:0;flex:1;-webkit-mask-image:linear-gradient(#0000,#000 8px,#000 calc(100% - 18px),#0000);mask-image:linear-gradient(#0000,#000 8px,#000 calc(100% - 18px),#0000)">' + its + '</div>' : '') + '</div>';
    }
    const anot = S.itens.length ? '<span data-a="anotar" title="Guarda a lista na observação e não cria partes no extrato" style="height:46px;display:flex;align-items:center;gap:10px;padding:0 20px;border-radius:9999px;border:2px solid #2A2A2F;font-weight:900;letter-spacing:.06em;font-size:13px;text-transform:uppercase;cursor:pointer;transition:border-color .25s ease" onmouseover="this.style.borderColor=\'#51515C\'" onmouseout="this.style.borderColor=\'#2A2A2F\'"><span style="display:flex">' + svg('lines', 20, 2) + '</span>Itens na obs.</span>' : '';
    const ler = '<span data-a="mode" data-v="ler" style="height:46px;display:flex;align-items:center;gap:10px;padding:0 22px 0 16px;border-radius:9999px;border:2px solid #2A2A2F;font-weight:900;letter-spacing:.06em;font-size:13px;text-transform:uppercase;cursor:pointer"><span style="display:flex">' + svg('qr', 22, 1.7) + '</span>' + (S.itens.length ? 'Reler nota' : 'Ler nota fiscal') + '</span>';
    return '<div style="flex:1;min-width:0;padding:26px 34px 24px 30px;display:flex;flex-direction:column;gap:22px;box-sizing:border-box">' + header('Dividir transação') + '<div style="display:grid;grid-template-columns:1fr 1fr;flex:1;min-height:0;padding:22px 0 0">' + left + right + '</div>' + footer('<span style="display:flex;gap:10px">' + anot + ler + primaryBtn('confirm', S.busy ? 'Salvando…' : 'Confirmar divisão', over) + '</span>') + '</div>';
  }

  /* bilhete (SVG): cantos, entalhes e perfuração */
  function ticket() {
    const sv = host.querySelector('[data-tk]'); if (!sv) return;
    const W = 280, H = 313, hB = 64, n = 13, R = 28, seam = H - hB;
    const P = 'M0,0H' + W + 'V' + (seam - n) + 'A' + n + ',' + n + ' 0 0 0 ' + (W - n) + ',' + seam + 'H' + n + 'A' + n + ',' + n + ' 0 0 0 0,' + (seam - n) + 'Z';
    const P2 = 'M' + (W - n) + ',' + seam + 'A' + n + ',' + n + ' 0 0 0 ' + W + ',' + (seam + n) + 'V' + (H - R) + 'A' + R + ',' + R + ' 0 0 1 ' + (W - R) + ',' + H + 'H' + R + 'A' + R + ',' + R + ' 0 0 1 0,' + (H - R) + 'V' + (seam + n) + 'A' + n + ',' + n + ' 0 0 0 ' + n + ',' + seam + 'Z';
    sv.innerHTML = '<path d="' + P + '" fill="#FFFFFF"/><path d="' + P2 + '" fill="#414045"/><line x1="' + (W / 2) + '" x2="' + (W / 2) + '" y1="' + (seam + 12) + '" y2="' + (H - 12) + '" stroke="#6A6A72" stroke-width="1" stroke-dasharray="3 4"/><line x1="' + (n + 8) + '" x2="' + (W - n - 8) + '" y1="' + seam + '" y2="' + seam + '" stroke="#0A0A0A" stroke-width="1.4" stroke-dasharray="4 3"/>';
  }

  /* ---------------- inline reduzido (clicar na linha): só o essencial pra corrigir rápido, sem abrir o painel inteiro.
     "Editar" promove pro overlay completo (ver a === 'full' em wire()). O inline completo antigo (ticket/mask/goo,
     mais abaixo em render()) fica no bundle mas não é mais chamado por nada — pra reativar, é só tirar esse branch. */
  async function salvarReduzido() {
    if (!S) return;
    const r = S.row;
    const d = { id: r.id, nome: S.nome, obs: r.obs || '', iso: r.iso, cardId: S.cardId, accId: S.accId, catId: S.catId, totalV: S.totalV, dir: S.dir, notaDirty: false, partesDirty: false, itens: r.items, partes: [] };
    try { await KD.txSave(comp, d); if (S) S.base = dirtyKey(); } catch (e) { }
  }
  function renderReduced(first) {
    const keep = {}; host.querySelectorAll('[data-in]').forEach(i => { if (document.activeElement === i) keep.k = i.getAttribute('data-in'); });
    const cn = catAtual(), cor = catCor(cn);
    const meioObj = S.cardId ? KD.M.cardById[S.cardId] : S.accId ? KD.M.accs.find(a => a.id === S.accId) : null;
    const meio = meioObj ? (meioObj.nick || meioObj.n || meioObj.nome) : '—';
    // valor/direção saíram daqui (editam só no overlay completo — um split, por ex., quebraria editando aqui).
    // estabelecimento aqui é só leitura (título, sem cara de campo/pill) — buscar/trocar é coisa do "Editar".
    // o título fica com todo o espaço que sobra à esquerda (as pills vão pra direita) e encolhe se não couber
    const estBit = '<div style="flex:1 1 0;min-width:0;padding-right:12px;display:flex;align-items:center"><b data-rttl style="display:block;min-width:0;font-size:23px;font-weight:800;letter-spacing:-.01em;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(S.nome || 'Sem nome') + '</b></div>';
    const oi = origemInfo(S.row.origem);
    const origemTag = '<span title="Origem" style="display:flex;align-items:center;gap:7px;height:38px;flex:none;padding:0 14px;border-radius:9999px;background:#1C1C20;color:#9A9AA3;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap">' + svg(oi.ic, 14, 2.2) + oi.t + '</span>';
    const notaInd = S.nota ? '<span title="Nota fiscal lida" style="width:38px;height:38px;flex:none;border-radius:50%;background:#1C1C20;display:flex;align-items:center;justify-content:center;color:#6AFF2A">' + svg('qr', 17, 2) + '</span>' : '';
    const obsInd = (S.obs && S.obs.trim()) ? '<span title="Tem observação" style="width:38px;height:38px;flex:none;border-radius:50%;background:#1C1C20;display:flex;align-items:center;justify-content:center;color:#9A9AA3">' + svg('lines', 16, 2.2) + '</span>' : '';
    // pills de categoria/cartão com a mesma cara (fieldCss/PR) do painel completo, só que mais estreitas —
    // não precisam da largura toda pra caber um nome curto; o dropdown acompanha a largura do chip.
    const catChip = '<div style="position:relative;width:190px;flex:none"><div data-a="pop" data-v="cat" style="display:flex;align-items:center;gap:10px;border-radius:' + PR + 'px;padding:11px 14px;border:2px solid ' + cor + '8C;background:color-mix(in srgb,' + cor + ' 14%,#000);cursor:pointer">' + icDot(cn, 26) + '<b style="font-size:15px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(cn) + '</b><span style="width:24px;height:24px;border-radius:50%;background:#0A0A0A;display:flex;align-items:center;justify-content:center;color:#F2F0EB;flex:none">' + svg('chev', 12, 2.6) + '</span></div>' + (S.pop === 'cat' ? popCat() : '') + '</div>';
    const cardChip = '<div style="position:relative;width:190px;flex:none"><div data-a="pop" data-v="card" style="' + fieldCss + 'border-radius:' + PR + 'px;padding:11px 14px;display:flex;align-items:center;gap:10px;cursor:pointer">' + bankChip(meioObj && meioObj.bank, (meioObj || {}).cor || '#3A3A40') + '<span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:700;font-size:15px">' + esc(meio) + '</span></div>' + (S.pop === 'card' ? popCard() : '') + '</div>';
    const editBtn = '<span data-a="full" style="flex:none;height:46px;display:flex;align-items:center;gap:8px;padding:0 26px;border-radius:9999px;background:#F2F0EB;color:#0A0A0A;font-weight:900;letter-spacing:.06em;font-size:12.5px;text-transform:uppercase;cursor:pointer">' + svg('pencil', 14, 2.6) + 'Editar</span>';
    // botão de fechar maior e com presença (círculo com borda interna, "bonitinho"), no lugar do x pequeno/discreto de antes
    const closeBtn = '<span data-a="close" title="Fechar" style="flex:none;width:44px;height:44px;border-radius:9999px;background:#1C1C20;color:#F2F0EB;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:inset 0 0 0 1px #3A3A40;transition:box-shadow .3s cubic-bezier(.45,0,.55,1)" onmouseover="this.style.boxShadow=\'inset 0 0 0 1px #6A6A72\'" onmouseout="this.style.boxShadow=\'inset 0 0 0 1px #3A3A40\'">' + svg('x', 18, 2.4) + '</span>';
    // padding de baixo (12) + linha + padding de cima da própria linha da transação (12, do template) =
    // o mesmo respiro dos dois lados da linha divisória.
    host.innerHTML = REDUCED_CSS + '<div data-pw style="position:relative;display:flex;align-items:center;gap:12px;padding:16px ' + PADX + 'px 12px;font-family:Helvetica,Arial,sans-serif;color:#F2F0EB">' + estBit + origemTag + notaInd + obsInd + catChip + cardChip + editBtn + closeBtn + '</div>'
      + '<div data-sep style="height:1px;margin:0 ' + PADX + 'px;background:#2A2A2F"></div>';
    const pw = host.querySelector('[data-pw]');
    if (first) { stagger([...pw.children], 90, 40, 380); stagger([host.querySelector('[data-sep]')], 90 + 40 * pw.children.length, 0, 380); }
    const rt = pw.querySelector('[data-rttl]'); if (rt) shrinkTo(rt, 23, 15, rt.parentElement.clientWidth - 12);
    if (keep.k) { const el = pw.querySelector('[data-in="' + keep.k + '"]'); if (el) { el.focus(); try { if (el.tagName === 'INPUT') { const l = el.value.length; el.setSelectionRange(l, l); } else { const l = el.textContent.length; const rg = document.createRange(); rg.selectNodeContents(el); rg.collapse(false); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(rg); } } catch (e) { } } }
    fitPop(pw);
    wire(pw);
  }
  /* ---------------- render ---------------- */
  function render(first) {
    if (!S || !host) return;
    if (S.inline) { renderReduced(first); return; }
    const keep = {}; host.querySelectorAll('[data-in]').forEach(i => { if (document.activeElement === i) keep.k = i.getAttribute('data-in') + (i.getAttribute('data-k') || ''); });
    // mantém a posição das listas roláveis: render() troca o painel inteiro, o que por padrão zera o scroll
    const scrollKeep = [...host.querySelectorAll('.kscroll')].map(e => e.scrollTop);
    const hw = host.clientWidth || 1358, W = S.inline ? Math.max(1000, Math.min(1358, Math.round(hw / 0.9))) : 1358, k = S.inline ? Math.min(1, hw / W) : Math.min(1, (hw - 32) / 1358), TOPI = 14;
    if (S.inline) host.style.height = (Math.round(480 * k) + TOPI + 26) + 'px';
    const bodyHtml = S.mode === 'dados' ? viewDados() : S.mode === 'ler' ? viewLer() : viewDividir();
    const x = '<span data-a="close" style="position:absolute;right:0;top:0;width:44px;height:44px;border-radius:50%;background:#F2F0EB;color:#0A0A0A;display:flex;align-items:center;justify-content:center;z-index:3;cursor:pointer;"><span data-xi style="display:flex;transition:transform .5s cubic-bezier(.65,0,.2,1)">' + svg('x', 18, 2.4) + '</span></span>';
    const prevPn = host.querySelector('[data-pn]');
    // Dividir com itens de nota lidos: o card cresce (~30%) pra dar respiro à lista; sai desse modo e volta ao normal.
    // Como o painel é redesenhado a cada render, a altura anterior é lida do DOM e animada até a nova (FLIP).
    const prevPw = host.querySelector('[data-pw]'), prevH = prevPw && !S.inline ? prevPw.offsetHeight : 0;
    const Ht = S.inline ? 480 : (S.mode === 'dividir' && S.itens.length) ? Math.min(624, Math.max(480, Math.floor(((host.clientHeight || 0) - 48) / k))) : 480;
    const Hs = (prevH && !first) ? prevH : Ht;
    // estado visual ANTES do redesenho (só quando a primeira parte está nascendo): onde estava a lista e o texto de dica
    const preItem = (S.mode === 'dividir' && S._hadP === false) ? (() => {
      const it = host.querySelector('[data-a="item"]'); if (!it) return null;
      const rc = it.parentElement && it.parentElement.parentElement, hint = rc && rc.firstElementChild;
      return { top: it.getBoundingClientRect().top, hint: hint && hint !== it.parentElement ? { html: hint.outerHTML, top: hint.offsetTop, w: hint.offsetWidth, left: hint.offsetLeft } : null };
    })() : null;
    const modal = S.dup ? dupModal() : S.askDel ? '<div data-modal style="position:absolute;inset:0;z-index:9;background:rgba(0,0,0,.6);border-radius:30px;display:flex;align-items:center;justify-content:center;animation:txfade .2s ease"><div style="width:460px;background:#151518;border:1px solid #3A3A40;border-radius:28px;padding:28px;display:flex;flex-direction:column;gap:12px">'
        + '<div style="display:flex;align-items:center;gap:12px"><span style="width:40px;height:40px;flex:none;border-radius:50%;background:rgba(255,107,90,.14);color:#FF6B5A;display:flex;align-items:center;justify-content:center">' + svg('trash', 18, 2.2) + '</span><div style="font-size:22px;font-weight:700;letter-spacing:-.02em">Excluir transação?</div></div>'
        + '<div style="font-size:14px;color:#9A9AA3;line-height:1.5"><b style="color:#F2F0EB">' + esc(S.row.e || 'Sem nome') + '</b> · R$ ' + brl(S.row.total || 0) + ' · ' + dfmt(S.row.iso) + '<br>Ela some do extrato e dos totais, junto com a nota e a divisão em categorias, se tiver.</div>'
        + '<div style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:14px;background:rgba(255,107,90,.08);border:1px solid rgba(255,107,90,.28);color:#FF8A7C;font-size:13px;font-weight:700">' + warnIco(16) + 'Isso não pode ser desfeito.</div>'
        + (S.delErr ? '<div style="font-size:12.5px;color:#FFC24A">' + esc(S.delErr) + '</div>' : '')
        + '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:10px"><span data-a="keep" style="height:44px;display:flex;align-items:center;padding:0 22px;border-radius:9999px;border:2px solid #2A2A2F;font-weight:900;letter-spacing:.06em;font-size:12.5px;text-transform:uppercase;cursor:pointer">Cancelar</span><span data-a="dodel" style="height:44px;display:flex;align-items:center;gap:8px;padding:0 22px;border-radius:9999px;background:#FF6B5A;color:#0A0A0A;font-weight:900;letter-spacing:.06em;font-size:12.5px;text-transform:uppercase;cursor:pointer;opacity:' + (S.busy ? .5 : 1) + '">' + svg('trash', 14, 2.4) + (S.busy ? 'Excluindo…' : 'Excluir') + '</span></div></div></div>'
      : (S.askBack || S.askClose) ? '<div data-modal style="position:absolute;inset:0;z-index:9;background:rgba(0,0,0,.6);border-radius:30px;display:flex;align-items:center;justify-content:center;animation:txfade .2s ease"><div style="width:460px;background:#151518;border:1px solid #3A3A40;border-radius:28px;padding:28px;display:flex;flex-direction:column;gap:12px"><div style="font-size:22px;font-weight:700;letter-spacing:-.02em">' + (S.askClose ? 'Fechar sem salvar?' : 'Sair sem confirmar?') + '</div><div style="font-size:14px;color:#9A9AA3;line-height:1.5">' + (S.askClose ? (S.isNew ? 'Essa transação ainda não foi salva e o que você preencheu vai se perder.' : 'As alterações dessa transação não foram salvas e vão se perder.') : 'As alterações dessa divisão não foram salvas e vão se perder. Elas só valem quando você clica em Confirmar divisão.') + '</div><div style="display:flex;gap:10px;justify-content:flex-end;margin-top:10px"><span data-a="keep" style="height:44px;display:flex;align-items:center;padding:0 22px;border-radius:9999px;border:2px solid #2A2A2F;font-weight:900;letter-spacing:.06em;font-size:12.5px;text-transform:uppercase;cursor:pointer">Continuar editando</span><span data-a="discard" style="height:44px;display:flex;align-items:center;padding:0 22px;border-radius:9999px;background:#FF6B5A;color:#0A0A0A;font-weight:900;letter-spacing:.06em;font-size:12.5px;text-transform:uppercase;cursor:pointer">Descartar</span></div></div></div>' : '';
    const Wn = 120, r = 32, fr = 10, cy = 22, cx = Wn - 22, dd = Math.sqrt((r + fr) ** 2 - (cy - fr) ** 2), xf = cx - dd, yf = cy + dd, P1 = [cx + (xf - cx) * r / (r + fr), cy + (fr - cy) * r / (r + fr)], P2 = [cx + (Wn - fr - cx) * r / (r + fr), cy + (yf - cy) * r / (r + fr)];
    const bdp = 'M' + xf + ',0.5A' + fr + ',' + fr + ' 0 0 1 ' + P1[0] + ',' + P1[1] + 'A' + r + ',' + r + ' 0 0 0 ' + P2[0] + ',' + P2[1] + 'A' + fr + ',' + fr + ' 0 0 1 ' + (Wn - .5) + ',' + yf;
    const goo = '<div style="position:absolute;right:0;top:0;width:119px;height:119px;overflow:hidden;border-radius:0 30px 0 0;z-index:2;pointer-events:none"><svg width="120" height="120" style="position:absolute;right:-1px;top:-1px;overflow:visible"><path d="' + bdp + '" fill="none" stroke="#2A2A2F" stroke-width="1"/></svg></div>';
    const ox = W - 119, oy = -1, sh = (d) => d.replace(/([MLHVA])([^MLHVAZ]*)/g, (m0, c, rest) => { const nums = rest.trim().split(/[ ,]+/).filter(Boolean).map(Number); if (c === 'M' || c === 'L') return c + (nums[0] + ox) + ',' + (nums[1] + oy); if (c === 'H') return 'H' + (nums[0] + ox); if (c === 'V') return 'V' + (nums[0] + oy); return 'A' + nums[0] + ',' + nums[1] + ' ' + nums[2] + ' ' + nums[3] + ' ' + nums[4] + ' ' + (nums[5] + ox) + ',' + (nums[6] + oy); });
    const notchD = sh(bdp + 'L' + (Wn + 4) + ',' + yf + 'V-4H' + xf + 'Z');
    const maskSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="480"><path fill-rule="evenodd" d="M0,0H' + W + 'V480H0Z' + notchD + '"/></svg>';
    const maskUrl = "url('data:image/svg+xml," + encodeURIComponent(maskSvg).replace(/'/g, '%27') + "')";
    const css = '<style>@keyframes txfade{from{opacity:0}to{opacity:1}}@keyframes txin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@keyframes txdrop{from{opacity:0;transform:translateY(-8px) scaleY(.9)}to{opacity:1;transform:none}}@keyframes txup{from{opacity:0;translate:0 18px}to{opacity:1;translate:0 0}}[data-pw] .txsv,[data-pw] .txcn{transition:background .25s ease,color .25s ease}[data-pw] .txsv:hover,[data-pw] .txcn:hover{background:rgba(255,255,255,.1)}[data-pw] .txnf:hover{transform:translateY(-3px)}[data-pw] .txnf svg{transition:transform .35s cubic-bezier(.2,.7,.2,1)}[data-pw] .txnf:hover svg{transform:scale(1.1)}[data-pw] .txtot:empty:before{content:"0,00";color:#51515C}[data-x-e]:has(>[data-tx-in] [data-pw][data-settled])>:not([data-tx-in]){display:none!important}[data-pw] input::placeholder,[data-pw] textarea::placeholder{color:#51515C}'
      + '@keyframes txAlertPulse{0%,100%{border-color:#FFC24A;box-shadow:0 0 0 0 rgba(255,194,74,.4)}50%{border-color:#FFE29A;box-shadow:0 0 16px 2px rgba(255,194,74,.4)}}@keyframes txAlertGlow{0%,100%{text-shadow:0 0 0 rgba(255,194,74,0)}50%{text-shadow:0 0 20px rgba(255,194,74,.85)}}.txalert-box{animation:txAlertPulse 1.7s ease-in-out infinite}.txalert-text{animation:txAlertGlow 1.7s ease-in-out infinite}'
      + '@media (prefers-reduced-motion:reduce){.txalert-box,.txalert-text{animation:none!important;border-color:#FFC24A!important}.txalert-text{text-shadow:0 0 16px rgba(255,194,74,.85)!important}}</style>';
    // máscara do canto: o desenho tem altura fixa (480) no topo; o resto (quando o card cresce) fica inteiro
    const maskPbg = maskUrl + ' 0 0/100% 480px no-repeat,linear-gradient(#000,#000) 0 480px/100% calc(100% - 480px) no-repeat';
    const pos = S.inline ? 'position:absolute;left:0;top:' + TOPI + 'px;width:' + W + 'px;height:480px;transform:scale(' + k + ');transform-origin:top left;' : 'position:absolute;left:50%;top:50%;width:' + W + 'px;height:' + Hs + 'px;margin:-' + (Hs / 2) + 'px 0 0 -' + (W / 2) + 'px;transform:scale(' + k + ');transform-origin:center;';
    host.innerHTML = (S.inline ? '' : '<div data-bd style="position:absolute;inset:0;background:rgba(0,0,0,.72);' + (first ? 'animation:txfade .25s ease' : '') + '"></div>') + css
      + '<div data-pw' + (S.settled ? ' data-settled="1"' : '') + ' style="' + pos + 'font-family:Helvetica,Arial,sans-serif;color:#F2F0EB;' + (first ? 'animation:txup .4s ' + E + (S.inline ? ' .1s backwards' : '') : '') + '">' + (S.inline ? '<div style="position:absolute;inset:0;border-radius:30px;box-shadow:0 30px 54px -16px rgba(0,0,0,.42),0 10px 26px -6px rgba(0,0,0,.22);pointer-events:none"></div>' : '') + '<div data-pn style="position:absolute;inset:0;padding:1px;box-sizing:border-box;isolation:isolate;border-radius:30px;display:flex;overflow:visible">'
      // o recorte do canto (onde fica o X) vale só pro fundo/contorno e pra coluna lateral — não pro painel inteiro:
      // com a máscara no painel todo, os dropdowns ficavam presos dentro dele e não conseguiam abrir centrados na opção.
      + '<div data-pbg style="position:absolute;inset:0;z-index:-1;background:#111114;border:1px solid #2A2A2F;border-radius:30px;pointer-events:none;-webkit-mask:' + maskPbg + ';mask:' + maskPbg + ';-webkit-mask-origin:border-box;mask-origin:border-box"></div>'
      // a linha precisa estar dentro de data-pn: a mask cria um contexto de empilhamento próprio,
      // então um z-index fora dele (irmão) nunca compara com o z-index dos dropdowns (popCat/popCard) lá dentro
      + '<div style="position:absolute;left:0;right:0;top:140px;height:1px;background:#3A3A40;z-index:1;pointer-events:none"></div>'
      + bodyHtml + modal + '</div>'
      + goo + x + '</div>';
    const pn = host.querySelector('[data-pn]');
    { const rl = pn.querySelector(':scope > div[style*="width:331px"]'); if (rl) { const m = maskUrl + ' ' + (-(W - 332)) + 'px -1px/' + W + 'px 480px no-repeat'; rl.style.webkitMask = m; rl.style.mask = m; } }
    if (Hs !== Ht) { const pwE = host.querySelector('[data-pw]'); void pwE.offsetHeight; pwE.style.transition = 'height .5s ' + EH + ',margin-top .5s ' + EH; pwE.style.height = Ht + 'px'; pwE.style.marginTop = (-Ht / 2) + 'px'; }
    if (S.mode === 'dividir') {
      const hasP = !!S.partes[S.sel];
      if (S._hadP === false && hasP) revealParte(pn, preItem);
      S._hadP = hasP;
    } else S._hadP = undefined;
    if (S.mode === 'dados') ticket();
    const ta = pn.querySelector('[data-in="obs"]'); if (ta) ta.value = S.obs;
    const tt = pn.querySelector('[data-in="texto"]'); if (tt) tt.value = S.texto;
    if (keep.k) { const el = [...pn.querySelectorAll('[data-in]')].find(i => i.getAttribute('data-in') + (i.getAttribute('data-k') || '') === keep.k); if (el) { el.focus(); try { const l = el.value.length; el.setSelectionRange(l, l); } catch (e) { } } }
    pn.querySelectorAll('.kscroll').forEach((e, i) => { if (scrollKeep[i] != null) e.scrollTop = scrollKeep[i]; });
    fitTitle(host.querySelector('[data-pw]'));
    fitPop(host.querySelector('[data-pw]'));
    wire(host.querySelector('[data-pw]'));
    // só quando a tela é nova (abriu o painel ou trocou Dados/Ler nota/Dividir); redesenhar por clique não reanima
    if (first || S._sm !== S.mode) { enterView(pn, first ? 120 : 0); S._sm = S.mode; }
    const xi = host.querySelector('[data-xi]'); if (xi && first) { xi.style.transform = 'rotate(-180deg)'; requestAnimationFrame(() => requestAnimationFrame(() => { xi.style.transform = 'rotate(0deg)'; })); }
    void prevPn;
  }

  /* ---------------- ações ---------------- */
  // Lê o texto colado da página da nota (Ctrl+A / Ctrl+C), mesmo com muito lixo em volta e campos em qualquer ordem.
  function parseTexto(raw) {
    const t = (raw || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim(), out = [];
    const N = '(?:R\\$\\s*)?(\\d[\\d.]*,\\d{1,4}|\\d+(?:\\.\\d+)?)';
    const marks = []; const rc = /\(\s*C[óo]digo:?\s*([\w.\-]+)\s*\)/gi; let m;
    while ((m = rc.exec(t))) marks.push({ i: m.index, e: rc.lastIndex });
    const grab = (seg, re) => { const x = re.exec(seg); return x ? { v: x[1], e: x.index + x[0].length } : null; };
    let prevEnd = 0;
    marks.forEach((mk, k) => {
      let seg = t.slice(mk.e, k + 1 < marks.length ? marks[k + 1].i : t.length);
      const fim = seg.search(/Valor\s+total|Valor\s+a\s+pagar|Qtd\.?\s+total|Informa[çc][õo]es\s+gerais|Forma\s+de\s+pagamento/i); if (fim >= 0) seg = seg.slice(0, fim);
      const q = grab(seg, /Qtde\.?\s*(?:total)?:?\s*(\d[\d.,]*)/i), u = grab(seg, /\bUN:?\s*([A-Za-z]{1,4})\b/i), vu = grab(seg, new RegExp('Vl\\.?\\s*Unit(?:\\.|ário)?:?\\s*' + N, 'i')), vt = grab(seg, new RegExp('Vl\\.?\\s*Total:?\\s*' + N, 'i'));
      let name = t.slice(prevEnd, mk.i);
      if (k === 0) { const ad = [...name.matchAll(/,\s*[A-Z]{2}\s+/g)].pop(); if (ad && /CNPJ/i.test(name)) name = name.slice(ad.index + ad[0].length); }
      if (k === 0) name = name.split(/Documento Auxiliar[^]*?Eletr[ôo]nica|Vl\.?\s*Total\s*(?:\(R\$\))?|\bItens?\b|\bProdutos?\b/i).pop();
      name = name.trim().replace(/^[\d\s.\-:]+(?=[A-Za-zÀ-ú])/, '').trim();
      const ends = [q, u, vu, vt].filter(Boolean).map(x => x.e); prevEnd = mk.e + (ends.length ? Math.max(...ends) : 0);
      const qtd = q ? num(q.v) || 1 : 1, unit = vu ? num(vu.v) : 0, tot = vt ? num(vt.v) : Math.round(qtd * unit * 100) / 100;
      if (name && tot > 0) out.push({ nome: name.slice(0, 90), qtd, un: u ? u.v.toUpperCase() : '', valor: tot, catId: null });
    });
    if (!out.length) {   // plano B: linhas do tipo "NOME 1 UN x 4,65 4,65"
      const rb = /([A-Za-zÀ-ú][^\d]{2,80}?)\s+(\d[\d.,]*)\s*(UN|KG|L|PC|PCT|CX|G|ML)\s*[xX]\s*(\d[\d.]*,\d{2})\s+(\d[\d.]*,\d{2})/gi;
      while ((m = rb.exec(t))) out.push({ nome: m[1].trim(), qtd: num(m[2]) || 1, un: m[3].toUpperCase(), valor: num(m[5]), catId: null });
    }
    parseTexto.meta = { cnpj: (t.match(/CNPJ:?\s*(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})/i) || [])[1] || null, chave_acesso: ((t.match(/(?:\d{4}\s){10}\d{4}/) || [])[0] || '').replace(/\s/g, '') || null, emitida_em: (() => { const e = t.match(/Emiss[ãa]o:?\s*(\d{2})\/(\d{2})\/(\d{4})/i); return e ? e[3] + '-' + e[2] + '-' + e[1] : null; })(), emitente: ((t.match(/([A-ZÀ-Ú0-9][A-ZÀ-Ú0-9&.\- ]{4,120}?)\s+CNPJ:?\s*\d{2}\./) || [])[1] || '').replace(/^.*ELETR[ÔO]NICA\s+/i, '').trim() || null };
    return out;
  }
  function aceitarItens(its, url) {
    if (!its.length) { S.msg = 'Não achei itens nesse texto. Confira se copiou a página inteira.'; render(); return; }
    S.itens = its; S.nota = Object.assign({}, S.nota || {}, { url: url || (S.nota && S.nota.url) || null, total: its.reduce((a, i) => a + i.valor, 0) }); S.notaDirty = true; S.partes = []; S.partesDirty = true; S.msg = ''; S.mode = 'dividir';
    if (S.isNew) { const n = S.nota || {}; if (!(S.totalV > 0)) S.totalV = Math.round(its.reduce((a, i) => a + i.valor, 0) * 100) / 100; if (!(S.nome || '').trim() && n.emitente) S.nome = n.emitente.toLowerCase().replace(/(^|[\s.])([a-zà-ú])/g, (m0, a, b) => a + b.toUpperCase()); if (n.emitida_em && /^\d{4}-\d{2}-\d{2}$/.test(n.emitida_em)) S.iso = n.emitida_em; }
    S.dup = null;
    if (S.isNew && KD.dup) { const n = S.nota || {}, cand = { nome: n.emitente || S.nome, valor: n.total || S.totalV, dir: 'saida', iso: S.iso, cardId: S.cardId, accId: S.accId }, f = KD.dup.find(cand); if (f.length) S.dup = { m: f[0], n: f.length, cand }; }
    render();
  }
  // aviso de duplicata (mockup 1A): a nota que acabou de ser lida ao lado da transação que já existe
  function dupModal() {
    const D = S.dup, m = D.m, r = m.row, c = D.cand, prov = m.conf === 'provavel', AM = '#F0C24B';
    const bate = '<i style="font-style:normal;font-size:10px;letter-spacing:.1em;background:' + AM + ';color:#000;border-radius:99px;padding:3px 8px;font-weight:800">BATE</i>';
    const row = (k, v, ok) => '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 0;border-bottom:1px dashed #3a3a3e"><span style="font-size:11px;letter-spacing:.12em;color:#8a8a90;text-transform:uppercase">' + k + '</span><span style="font-size:17px;font-weight:700;display:flex;gap:10px;align-items:center;text-align:right;min-width:0">' + v + (ok ? bate : '') + '</span></div>';
    const org = r.origem === 'manual' ? 'lançada à mão' : r.origem === 'import' ? 'via extrato' : 'via ' + r.origem;
    const temItens = r.items && r.items.length;
    const dOk = m.days === 0, nOk = m.nameSim != null && m.nameSim >= 0.5;
    const btn = (a, t, cls) => '<span data-a="' + a + '" style="height:46px;display:flex;align-items:center;padding:0 26px;border-radius:9999px;font-weight:900;letter-spacing:.1em;font-size:12px;text-transform:uppercase;cursor:pointer;' + cls + '">' + t + '</span>';
    return '<div data-modal style="position:absolute;inset:0;z-index:9;background:#1b1b1d;border-radius:30px;display:flex;flex-direction:column;padding:26px 30px;box-sizing:border-box;animation:txfade .25s ease">'
      + '<div style="display:flex;align-items:flex-start;gap:16px"><div style="min-width:0"><div style="font-size:10px;letter-spacing:.18em;color:#8a8a90">LENDO NOTA // ' + (prov ? 'PROVÁVEL' : 'POSSÍVEL') + ' DUPLICATA</div><div style="font-size:46px;font-weight:800;letter-spacing:-.03em;line-height:1.1;margin-top:4px">Já está no extrato.</div></div>'
      + '<span style="margin-left:auto;flex:none;background:' + AM + ';color:#000;border-radius:99px;padding:9px 16px;font-size:11px;font-weight:800;letter-spacing:.12em">' + (prov ? 'PROVÁVEL · VALOR, DATA E NOME BATEM' : 'POSSÍVEL · VALOR E DATA BATEM') + '</span></div>'
      + '<div style="display:flex;gap:22px;margin-top:18px;flex:1;min-height:0">'
      + '<div style="flex:1;border-radius:22px;background:#111;padding:18px 26px;box-sizing:border-box;min-width:0"><div style="font-size:10px;letter-spacing:.18em;color:#8a8a90;margin-bottom:4px">NOTA QUE VOCÊ ACABOU DE LER</div>'
      + row('Estabelecimento', '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:300px">' + esc(c.nome || '—') + '</span>', nOk) + row('Valor', 'R$ ' + brl(c.valor), true) + row('Data', dfmt(c.iso), dOk) + row('Itens', S.itens.length + (S.itens.length === 1 ? ' item' : ' itens')) + '</div>'
      + '<div style="flex:1;border-radius:22px;background:#111;padding:18px 26px;box-sizing:border-box;box-shadow:0 0 0 2px ' + AM + ';min-width:0"><div style="font-size:10px;letter-spacing:.18em;color:' + AM + ';margin-bottom:4px">JÁ NO EXTRATO · ' + esc(String(r.k || '').toUpperCase()) + ' · ' + org.toUpperCase() + '</div>'
      + row('Estabelecimento', '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:300px">' + esc(r.e) + '</span>', nOk) + row('Valor', 'R$ ' + brl(r.total), true) + row('Data', dfmt(r.iso), dOk) + row('Categoria', esc(r.c)) + '</div></div>'
      + '<div style="display:flex;align-items:center;gap:20px;margin-top:18px"><div style="font-size:13px;color:#a0a0a6;line-height:1.4;max-width:520px">' + (temItens ? 'Essa transação já tem itens; se for a mesma, eles serão trocados pelos da nota. ' : 'Se é a mesma, os itens da nota entram nessa transação. ') + 'Nada é criado em dobro.' + (D.n > 1 ? ' Há outras ' + (D.n - 1) + ' parecidas no extrato.' : '') + '</div>'
      + '<div style="margin-left:auto;display:flex;gap:12px">' + btn('dupother', 'É outra · criar nova', 'border:1px solid #555') + btn('dupsame', 'É a mesma · ' + (temItens ? 'trocar' : 'anexar') + ' itens', 'background:#fff;color:#000') + '</div></div></div>';
  }
  async function lerLink() {
    const url = (S.link || '').trim(); if (!/^https?:\/\//i.test(url)) { S.msg = 'Cole o endereço completo do link da nota.'; render(); return; }
    S.msg = 'Lendo a nota…'; S.err = null; render();
    try {
      const r = await KD.sb.functions.invoke('ler-nota', { body: { url } });
      if (r.error || !r.data || !r.data.itens) throw r.error || new Error('sem dados');
      S.nota = { url, chave_acesso: r.data.chave_acesso || null, emitente: r.data.emitente || null, cnpj: r.data.cnpj || null, emitida_em: r.data.emitida_em || null, total: r.data.total || null };
      aceitarItens(r.data.itens.map(i => ({ nome: i.nome, qtd: i.quantidade || 1, un: i.unidade || '', valor: i.valor, catId: null })), url);
    } catch (e) { let x = ''; try { const j = e && e.context && (await e.context.json()); x = j ? [j.erro, j.detalhe].filter(Boolean).join(': ') : ''; } catch (_) {} if (!x && e && e.message) x = e.message; S.msg = ''; S.err = { t: 'Não consegui ler a nota', d: 'O portal da Fazenda não respondeu como esperado. Tente de novo, ou abra o link, copie o texto da página e cole no campo ao lado.', x: String(x).slice(0, 300) }; render(); }
  }
  // ---- Conversão de imagens (formatos de celular) ----
  const loadScript = (src) => new Promise((ok, no) => { const el = document.createElement('script'); el.src = src; el.onload = ok; el.onerror = () => no(new Error('script')); document.head.appendChild(el); });
  const extOf = (f) => ((f.name || '').split('.').pop() || '').toLowerCase();
  // DNG/TIFF-RAW: o navegador não abre, mas o arquivo carrega JPEGs de prévia. Lê os IFDs e devolve os candidatos (maior primeiro).
  async function jpegsDoTiff(file) {
    const buf = await file.arrayBuffer(), dv = new DataView(buf), n = buf.byteLength;
    const le = dv.getUint16(0) === 0x4949; if (!le && dv.getUint16(0) !== 0x4D4D) return [];
    const u16 = (o) => dv.getUint16(o, le), u32 = (o) => dv.getUint32(o, le), out = [], seen = new Set();
    const tipo = { 1: 1, 3: 2, 4: 4, 8: 2, 9: 4, 16: 8 };
    const vals = (o, t, c) => { const sz = (tipo[t] || 1) * c, base = sz <= 4 ? o + 8 : u32(o + 8), r = []; for (let i = 0; i < Math.min(c, 4000); i++) { const q = base + i * (tipo[t] || 1); if (q + 4 > n) break; r.push(t === 3 ? u16(q) : u32(q)); } return r; };
    const ifd = (off, depth) => {
      if (!off || off + 2 > n || seen.has(off) || depth > 4) return; seen.add(off);
      const cnt = u16(off), T = {};
      for (let i = 0; i < cnt; i++) { const o = off + 2 + i * 12; if (o + 12 > n) break; T[u16(o)] = { t: u16(o + 2), c: u32(o + 4), o }; }
      const g = (k) => T[k] ? vals(T[k].o, T[k].t, T[k].c) : null;
      const jo = g(0x201), jl = g(0x202); if (jo && jl) out.push([jo[0], jl[0]]);
      const so = g(0x111), sl = g(0x117), cp = g(0x103);
      if (so && sl && cp && cp[0] === 7) { const a = Math.min(...so), last = so.length - 1; out.push([a, so[last] + sl[last] - a]); }
      (g(0x14A) || []).forEach(x => ifd(x, depth + 1));
      const nx = off + 2 + cnt * 12; if (nx + 4 <= n) { const nn = u32(nx); if (nn) ifd(nn, depth); }
    };
    ifd(u32(4), 0);
    return out.filter(([o, l]) => o > 0 && l > 1000 && o + l <= n).sort((x, y) => y[1] - x[1]).slice(0, 5).map(([o, l]) => new Blob([buf.slice(o, o + l)], { type: 'image/jpeg' }));
  }
  // Devolve uma lista de bitmaps candidatos a partir de qualquer arquivo de imagem comum de celular.
  async function bitmaps(file) {
    const ext = extOf(file), t = (file.type || '').toLowerCase(), r = [];
    const abrir = async (blob) => { try { return await createImageBitmap(blob, { imageOrientation: 'from-image' }); } catch (e) { return null; } };
    if (/heic|heif/.test(t) || /^hei[cf]$/.test(ext)) {
      let bm = await abrir(file);   // Safari abre HEIC direto
      if (!bm) { if (!window.heic2any) await loadScript('https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js'); const o = await window.heic2any({ blob: file, toType: 'image/jpeg', quality: .92 }); bm = await abrir(Array.isArray(o) ? o[0] : o); }
      if (bm) r.push(bm);
    } else if (ext === 'dng' || /tiff?$/.test(ext) || /dng|tiff/.test(t)) {
      for (const j of await jpegsDoTiff(file)) { const bm = await abrir(j); if (bm) { r.push(bm); if (r.length >= 2) break; } }
    } else { const bm = await abrir(file); if (bm) r.push(bm); }
    return r;
  }
  // Procura o QR em várias escalas e rotações (foto torta, de lado, de longe), com e sem contraste reforçado.
  function acharQR(bmp) {
    const rots = [0, 90, 180, 270], maxLado = 2000;
    for (const [contr, escalas] of [[false, [1, .5]], [true, [1, .5]], [false, [.75, .35]], [true, [.75]]]) for (const k of escalas) for (const rot of rots) {
      let w = Math.round(bmp.width * k), h = Math.round(bmp.height * k); const m = Math.max(w, h); if (m > maxLado) { w = Math.round(w * maxLado / m); h = Math.round(h * maxLado / m); }
      if (w < 60 || h < 60) continue;
      const cv = document.createElement('canvas'), sw = rot % 180; cv.width = sw ? h : w; cv.height = sw ? w : h;
      const cx = cv.getContext('2d', { willReadFrequently: true }); cx.translate(cv.width / 2, cv.height / 2); cx.rotate(rot * Math.PI / 180); if (contr) cx.filter = 'grayscale(1) contrast(1.9) brightness(1.15)'; cx.drawImage(bmp, -w / 2, -h / 2, w, h);
      const d = cx.getImageData(0, 0, cv.width, cv.height), f = window.KDQR && window.KDQR(d.data, cv.width, cv.height, { inversionAttempts: 'attemptBoth' }); if (f) return f;
    }
    return null;
  }
  async function lerImagem(file) {
    const ext = extOf(file);
    if (file.type === 'application/pdf' || ext === 'pdf') { S.msg = ''; S.err = { t: 'PDF não dá pra ler', d: 'Tire um print da nota (ou da tela com o QR) e envie a imagem.' }; render(); return; }
    S.msg = 'Procurando o QR Code…'; S.err = null; render();
    try {
      const bms = await bitmaps(file);
      if (!bms.length) { S.msg = ''; S.err = { t: 'Arquivo não abriu', d: 'Não consegui abrir esse arquivo. Tente enviar como JPG ou PNG (um print resolve).' }; render(); return; }
      let found = null; for (const b of bms) { await new Promise(r => setTimeout(r, 30)); found = acharQR(b); if (found) break; }
      if (!found) { S.msg = ''; S.err = { t: 'QR Code não encontrado', d: 'Não achei um QR Code nessa imagem. Tente uma foto mais de perto, sem reflexo e com o QR inteiro e nítido.' }; render(); return; }
      S.link = found.data; S.msg = ''; if (/^https?:\/\//i.test(found.data)) { render(); lerLink(); } else { S.msg = ''; S.err = { t: 'QR não é de nota', d: 'O QR foi lido, mas não é um link de nota fiscal.', x: found.data.slice(0, 80) }; render(); }
    } catch (e) { S.msg = ''; S.err = { t: 'Imagem não abriu', d: 'Não consegui abrir essa imagem. Tente enviar como JPG ou PNG.' }; render(); }
  }
  async function salvar(stay) {
    if (S.busy) return;
    if (S.isNew) {
      const field = !(S.nome || '').trim() ? 'nome' : !(S.totalV > 0) ? 'total' : (!S.cardId && !S.accId) ? 'card' : '';
      if (field) { S.alertField = field; S.msg = ''; S.mode = 'dados'; render(); const el = host.querySelector('[data-alert-target="' + field + '"]'); if (el) el.scrollIntoView({ block: 'center' }); return; }
    } else if (editavelValor() && !(S.totalV > 0)) {
      S.alertField = 'total'; S.msg = ''; S.mode = 'dados'; render(); const el = host.querySelector('[data-alert-target="total"]'); if (el) el.scrollIntoView({ block: 'center' }); return;
    }
    S.busy = true; S.msg = ''; render();
    S.partes = S.partes.filter(p => p.valor > 0);
    const d = { parc: S.parc || 1, isNew: !!S.isNew, totalV: S.totalV, dir: S.dir, meio: S.meio, id: S.row.id, nome: S.nome, obs: S.obs, iso: S.iso, cardId: S.cardId, accId: S.accId, catId: S.catId, notaDirty: S.notaDirty, partesDirty: S.partesDirty, nota: S.nota, itens: S.itens, partes: S.partes };
    try { await KD.txSave(comp, d); if (stay && S) { const r = KD.M.rowById[S.row.id]; if (r) { const inl = S.inline; S = init(r); S.inline = inl; S.mode = 'dados'; S.base = dirtyKey(); render(); } else TX.close(); } else TX.close(); }
    catch (e) { console.error('[kontar] salvar transação', e); S.busy = false; S.msg = 'Não consegui salvar: ' + ((e && e.message) || 'erro'); render(); }
  }

  // o modal some em fade (não some de uma vez) antes do painel redesenhar sem ele
  function fecharModal() {
    const md = host && host.querySelector('[data-modal]'), mine = S;
    const fim = () => { if (S !== mine) return; S.askBack = false; S.askClose = false; S.askDel = false; S.delErr = ''; render(); };
    if (!md) { fim(); return; }
    md.style.animation = 'none'; md.style.transition = 'opacity .2s ease'; md.style.pointerEvents = 'none';
    requestAnimationFrame(() => { md.style.opacity = '0'; }); setTimeout(fim, 210);
  }
  async function excluir() {
    if (!S || S.busy || !S.row.id || S.row.origem !== 'manual') return;
    S.busy = true; S.delErr = ''; render();
    try { await KD.txDelete(comp, S.row.id); TX.close(); }
    catch (e) { console.error('[kontar] excluir transação', e); if (!S) return; S.busy = false; S.delErr = 'Não consegui excluir: ' + ((e && e.message) || 'erro'); render(); }
  }
  function anotar() {
    if (!S.itens.length) return;
    const linhas = S.itens.map(i => '• ' + i.nome + (i.qtd && i.qtd !== 1 ? ' (' + String(i.qtd).replace('.', ',') + (i.un ? ' ' + i.un : '') + ')' : '') + ' — R$ ' + brl(i.valor)).join('\n');
    S.obs = ((S.obs || '').trim() ? S.obs.trim() + '\n\n' : '') + 'Itens da nota' + (S.nota && S.nota.emitente ? ' · ' + S.nota.emitente : '') + ':\n' + linhas;
    S.itens = []; S.partes = []; S.notaDirty = true; S.partesDirty = true; S.snap = null; S.msg = ''; S.mode = 'dados'; render();
  }
  function recalc() { S.partes.forEach(q => { if (q.itens.length) q.valor = Math.round(q.itens.reduce((a, x) => a + S.itens[x].valor, 0) * 100) / 100; }); }
  const snapNow = () => JSON.stringify({ p: S.partes, i: S.itens, n: S.nota, nd: S.notaDirty, pd: S.partesDirty });
  function restoreSnap() { if (!S.snap) return; const o = JSON.parse(S.snap); S.partes = o.p; S.itens = o.i; S.nota = o.n; S.notaDirty = o.nd; S.partesDirty = o.pd; S.sel = 0; S.msg = ''; }
  function goMode(v) {
    S.pop = null; S.msg = '';
    if (S.mode === 'dados' && v !== 'dados') { S.snap = snapNow(); S.from = 'dados'; }
    else if (S.mode === 'dividir' && v === 'ler') S.from = 'dividir';
    if (v === 'dados' && S.mode === 'dividir') { if (S.snap && snapNow() !== S.snap) { S.askBack = true; render(); return; } S.mode = 'dados'; render(); return; }
    if (v === 'dados' && S.mode === 'ler') { if (S.from === 'dividir') { S.mode = 'dividir'; render(); return; } restoreSnap(); S.mode = 'dados'; render(); return; }
    S.mode = v; render();
  }
  function wire(pn) {
    pn.addEventListener('focusout', ev => {
      if (!S || !ev.target.getAttribute) return;
      const k = ev.target.getAttribute('data-in');
      if (k === 'total') { if (S.inline) { render(); if (S.totalV > 0) salvarReduzido(); } else if (S.pd) S.dirty = true; else render(); }
      // não fecha o pop aqui: fechar no blur é frágil (dispara em blur/foco transitório de automação/alguns
      // navegadores) — quem fecha é o clique fora (ver o "if (!el || !S)" do click), focusout só salva.
      else if (k === 'nome' && ev.target.getAttribute('data-estq') === '1') { if (S.inline && S.nome && S.nome.trim()) salvarReduzido(); }
    });
    pn.addEventListener('focusin', ev => { if (S && ev.target.getAttribute && ev.target.getAttribute('data-estq') === '1' && S.pop !== 'est') { S.pop = 'est'; render(); } });
    pn.addEventListener('keydown', ev => {
      if (!ev.target.getAttribute) return;
      if (ev.key === 'Enter' && ev.target.getAttribute('data-in') === 'total') { ev.preventDefault(); ev.target.blur(); }
      else if (ev.target.getAttribute('data-estq') === '1') {
        if (ev.key === 'Enter') {
          ev.preventDefault();
          const opts = estOptions(S.nome), nq = KD.norm((S.nome || '').trim()), pick = opts.find(e => KD.norm(e.nome) === nq) || opts[0];
          if (pick) S.nome = pick.nome;
          S.pop = null; render(); if (S.inline) salvarReduzido();
        } else if (ev.key === 'Escape') { S.pop = null; render(); }
      }
    });
    pn.addEventListener('pointerdown', () => { if (S) S.pd = true; });
    pn.addEventListener('click', ev => {
      if (S) S.pd = false; const had = S && S.dirty; if (S) S.dirty = false;
      if (S && S.merge && !ev.target.closest('[data-a="domerge"]')) { S.merge = null; render(); }
      const el = ev.target.closest('[data-a]');
      if (!el || !S) {
        if (S && S.pop && !ev.target.closest('[data-pop]') && !(ev.target.getAttribute && ev.target.getAttribute('data-estq') === '1')) { S.pop = null; render(); }
        // reduzido: clicar num pedaço vazio do topo (fora de pill/botão) fecha, igual clicar na linha de novo
        else if (S && S.inline && !ev.target.closest('input,textarea,[contenteditable]')) TX.requestClose();
        else if (had) render();
        return;
      }
      const a = el.getAttribute('data-a'), v = el.getAttribute('data-v');
      if (a === 'close') TX.requestClose();
      else if (a === 'estpick' || a === 'estnew') { S.nome = v; S.pop = null; render(); if (S.inline) salvarReduzido(); }
      else if (a === 'mode') goMode(v);
      else if (a === 'retry') { S.err = null; S.msg = ''; render(); const fi = pn.querySelector('[data-in="foto"]'); if (fi) { fi.value = ''; fi.click(); } }
      else if (a === 'discard') { if (S.askClose) { TX.close(); return; } restoreSnap(); S.askBack = false; S.mode = 'dados'; render(); }
      else if (a === 'keep') { if (S.busy) return; fecharModal(); }
      else if (a === 'dupother') { const md = host.querySelector('[data-modal]'), mine = S; if (md) { md.style.animation = 'none'; md.style.transition = 'opacity .2s ease'; md.style.pointerEvents = 'none'; requestAnimationFrame(() => { md.style.opacity = '0'; }); } setTimeout(() => { if (S !== mine) return; S.dup = null; render(); }, md ? 210 : 0); }
      else if (a === 'dupsame') { const D = S.dup, keep = { itens: S.itens, nota: S.nota }, md = host.querySelector('[data-modal]'); if (!D) return; const go = () => { TX.open(comp, D.m.row); if (!S) return; S.itens = keep.itens; S.nota = Object.assign({}, S.nota || {}, keep.nota); S.notaDirty = true; S.partes = []; S.partesDirty = true; S.mode = 'dividir'; render(); }; if (md) { md.style.animation = 'none'; md.style.transition = 'opacity .2s ease'; md.style.pointerEvents = 'none'; requestAnimationFrame(() => { md.style.opacity = '0'; }); setTimeout(go, 210); } else go(); }
      else if (a === 'askdel') { S.askDel = true; S.delErr = ''; S.askBack = false; S.askClose = false; render(); }
      else if (a === 'dodel') excluir();
      else if (a === 'pop') { ev.stopPropagation(); S.pop = S.pop === v ? null : v; render(); }
      else if (a === 'domerge') { const m = S.merge; S.merge = null; if (m && S.partes[m.from] && S.partes[m.to]) { const A = S.partes[m.from], B = S.partes[m.to]; B.valor = Math.round((A.valor + B.valor) * 100) / 100; B.itens = B.itens.concat(A.itens); S.partes.splice(m.from, 1); S.sel = Math.min(m.to > m.from ? m.to - 1 : m.to, S.partes.length - 1); S.partesDirty = true; } render(); }
      else if (a === 'anotar') anotar();
      else if (a === 'goest') { const n = S.row.e; TX.close(true); comp.goEst(n); }
      else if (a === 'full') { const r = S.row; TX.openFull(comp, r); }
      else if (a === 'parc') { S.parc = (S.parc || 1) % 12 + 1; render(); }
      else if (a === 'dir') { S.dir = v; render(); if (S.inline) salvarReduzido(); }
      else if (a === 'forma') { ev.stopPropagation(); S.meio = v; S.cardId = null; render(); }
      else if (a === 'cat') { S.catId = catId(v); S.pop = null; render(); if (S.inline) salvarReduzido(); }
      else if (a === 'meio') { const [t, id] = v.split(':'); if (t !== 'c') S.parc = 1; S.cardId = t === 'c' ? id : null; S.accId = t === 'a' ? id : null; S.pop = null; if (S.alertField === 'card') S.alertField = null; render(); if (S.inline) salvarReduzido(); }
      else if (a === 'save') salvar();
      else if (a === 'confirm') { if (somaPartes() <= total() + 0.005) { S.partesDirty = true; salvar(true); } }
      else if (a === 'lerlink') lerLink();
      else if (a === 'copylink') { ev.stopPropagation(); navigator.clipboard?.writeText(S.link || '').then(() => { S.copied = true; render(); clearTimeout(S._copyT); S._copyT = setTimeout(() => { if (S) { S.copied = false; render(); } }, 1600); }); }
      else if (a === 'lertexto') { const its = parseTexto(S.texto || ''); if (its.length) S.nota = Object.assign({}, S.nota || {}, parseTexto.meta); aceitarItens(its, S.link); }
      else if (a === 'padd') { const used = new Set(S.partes.map(p => p.catId)), n = cats().find(c => !used.has(catId(c))) || 'Outros'; S.partes.push({ catId: catId(n), valor: Math.max(0, Math.round((total() - somaPartes()) * 100) / 100) || 0.01, rotulo: '', itens: [] }); S.sel = S.partes.length - 1; S.partesDirty = true; render(); }
      else if (a === 'pdel') { ev.stopPropagation(); S.partes.splice(+v, 1); S.sel = 0; S.partesDirty = true; render(); }
      else if (a === 'pcat') { ev.stopPropagation(); S.pop = S.pop === 'pcat' ? null : 'pcat'; render(); }
      else if (a === 'pset') { if (S.partes[S.sel]) S.partes[S.sel].catId = catId(v); S.pop = null; S.partesDirty = true; render(); }
      else if (a === 'sel') { if (!ev.target.closest('input')) { S.sel = +v; render(); } }
      else if (a === 'item') { const q = S.partes[S.sel]; if (q && q.itens.includes(+v)) { q.itens = q.itens.filter(x => x !== +v); recalc(); S.partesDirty = true; render(); } else assign(+v, S.sel); }
      if (had && S) render();
    });
    pn.addEventListener('input', ev => {
      const el = ev.target, k = el.getAttribute && el.getAttribute('data-in'); if (!k) return;
      if (k === 'nome') {
        S.nome = el.value; if (S.alertField === 'nome' && S.nome.trim()) { S.alertField = null; el.classList.remove('txalert-box'); }
        const b = pn.querySelector('[data-ttl]'); if (b) { b.textContent = S.nome || '—'; fitTitle(pn); }
        // reescreve só o dropdown (nunca o input) pra não perder foco/cursor a cada tecla
        if (el.getAttribute('data-estq') === '1' && S.pop === 'est') {
          const wrap = el.parentElement, old = wrap.querySelector('[data-pop]'), fresh = estPop(S.nome);
          if (old) old.outerHTML = fresh; else wrap.insertAdjacentHTML('beforeend', fresh);
          const pop = wrap.querySelector('[data-pop]'); if (pop) { pop.style.maxHeight = POPMAXH + 'px'; const sc = pop.querySelector('[data-popscroll]'); if (sc) { syncFade(pop); sc.onscroll = () => syncFade(pop); } }
        }
      }
      else if (k === 'total') { S.totalV = num(el.textContent); if (S.alertField === 'total' && S.totalV > 0) { S.alertField = null; el.classList.remove('txalert-text'); } }
      else if (k === 'obs') S.obs = el.value; else if (k === 'link') S.link = el.value; else if (k === 'texto') S.texto = el.value;
      else if (k === 'iso') { S.iso = el.value; render(); }
      else if (k === 'pv') { const kk = el.getAttribute('data-k'); if (kk != null) S.sel = +kk; const p = S.partes[S.sel]; if (p) { p.valor = num(el.value); S.partesDirty = true; } }
      else if (k === 'ptit') { const p = S.partes[S.sel]; if (p) { p.rotulo = el.value; S.partesDirty = true; const lbl = pn.querySelector('[data-drop="' + S.sel + '"] span:nth-of-type(1)'); if (lbl) lbl.textContent = p.rotulo || catName(p.catId); } }
    });
    pn.addEventListener('change', ev => { const el = ev.target; if (el.getAttribute('data-in') === 'pv') { if (S.pd) S.dirty = true; else render(); } if (el.getAttribute('data-in') === 'foto' && el.files && el.files[0]) lerImagem(el.files[0]); });
    pn.addEventListener('dragstart', ev => { const pd = ev.target.closest && ev.target.closest('[data-pdrag]'); if (pd && !ev.target.closest('[data-drag]')) { ev.dataTransfer.setData('application/x-kd-part', pd.getAttribute('data-pdrag')); ev.dataTransfer.effectAllowed = 'move'; return; } const d = ev.target.closest && ev.target.closest('[data-drag]'); if (d) { ev.dataTransfer.setData('text/plain', d.getAttribute('data-drag')); ev.dataTransfer.effectAllowed = 'move'; } });
    pn.addEventListener('dragover', ev => { if (ev.target.closest && (ev.target.closest('[data-drop]') || ev.target.closest('[data-up]'))) ev.preventDefault(); });
    pn.addEventListener('drop', ev => { const up = ev.target.closest && ev.target.closest('[data-up]'); if (up && ev.dataTransfer.files && ev.dataTransfer.files[0]) { ev.preventDefault(); lerImagem(ev.dataTransfer.files[0]); return; } const t = ev.target.closest && ev.target.closest('[data-drop]'); if (!t) return; ev.preventDefault(); const pf = ev.dataTransfer.getData('application/x-kd-part'); if (pf !== '') { const a = +pf, b = +t.getAttribute('data-drop'); if (a !== b) { S.merge = { from: a, to: b }; render(); } return; } assign(+ev.dataTransfer.getData('text/plain'), +t.getAttribute('data-drop')); });
  }
  function assign(i, pi) {
    if (!S.partes.length) { S.partes.push({ catId: S.catId, valor: 0, rotulo: '', itens: [] }); pi = 0; S.sel = 0; }
    const p = S.partes[pi]; if (!p || !S.itens[i]) return;
    S.partes.forEach(q => { q.itens = q.itens.filter(x => x !== i); });
    p.itens.push(i); recalc(); S.partesDirty = true; render();
  }
  window.addEventListener('keydown', e => { if (S && e.key === 'Escape') { if (S.askClose || S.askBack || S.askDel) { if (!S.busy) fecharModal(); } else TX.requestClose(); } });
})();

/* Kontar · detecção de duplicatas (usada pela leitura de nota e pelo importador de extrato)
   Nunca descarta nada sozinha: só aponta candidatas e o grau de confiança.
   provavel = valor + data + nome batem · possivel = valor + data batem. */
(function () {
  'use strict';
  const KD = window.KD, DUP = (KD.dup = {});
  const STOP = new Set(['pag', 'pagto', 'pagamento', 'pagamentos', 'compra', 'debito', 'credito', 'pix', 'transferencia', 'enviada', 'recebida', 'ltda', 'eireli', 'sa', 'me', 'epp', 'com', 'comercio', 'servicos', 'brasil', 'cartao', 'parc']);
  const cents = n => Math.round(Math.abs(Number(n) || 0) * 100);
  const toks = s => KD.norm(s).replace(/[^a-z0-9]+/g, ' ').split(' ').filter(w => w.length >= 3 && !STOP.has(w) && !/^\d+$/.test(w));
  const dayNum = iso => { const p = String(iso || '').slice(0, 10).split('-').map(Number); return p.length === 3 && p[0] ? Date.UTC(p[0], p[1] - 1, p[2]) / 864e5 : NaN; };
  /* 0..1, ou null quando um dos lados não tem nome utilizável */
  DUP.nameSim = (a, b) => {
    const A = toks(a), B = toks(b); if (!A.length || !B.length) return null;
    const hit = A.filter(x => B.some(y => x === y || (x.length >= 4 && y.length >= 4 && (x.startsWith(y) || y.startsWith(x))))).length;
    return hit / Math.min(A.length, B.length);
  };
  /* cand: { nome, valor, dir:'saida'|'entrada', iso, cardId, accId }. rows: transações já existentes.
     skip: Set de ids que já foram "usados" por outra linha (casamento um-pra-um no importador). */
  DUP.find = (cand, rows, o) => {
    o = o || {}; const win = o.days == null ? 2 : o.days, skip = o.skip, v = cents(cand.valor), d0 = dayNum(cand.iso), out = [];
    if (!v || isNaN(d0)) return out;
    (rows || KD.M.rows).forEach(r => {
      if (skip && skip.has(r.id)) return;
      if (cents(r.total) !== v) return;
      if ((cand.dir || 'saida') !== ((r.amt < 0 || r.out > 0) ? 'saida' : 'entrada')) return;
      const dd = Math.abs(dayNum(r.iso) - d0); if (!(dd <= win)) return;
      if ((cand.cardId && r.cardId && cand.cardId !== r.cardId) || (cand.accId && r.accId && cand.accId !== r.accId) || (cand.cardId && r.accId && !r.cardId) || (cand.accId && r.cardId && !r.accId)) return;
      const ns = DUP.nameSim(cand.nome, r.e);
      out.push({ row: r, days: dd, nameSim: ns, conf: ns != null && ns >= 0.5 ? 'provavel' : 'possivel' });
    });
    return out.sort((a, b) => (a.conf === b.conf ? 0 : a.conf === 'provavel' ? -1 : 1) || a.days - b.days);
  };
})();

/* Kontar · geometria do recorte (indent) de canto, HANDOFF §5.4
   O recorte é um arco concêntrico com o botão (raio R = raio do botão + folga) entre duas concordâncias de raio F; sem trechos retos.
   Tudo no canto superior direito. corner() = forma do corte (máscara), edge() = contorno de 1px que acompanha o corte, mask() = css. */
(function () {
  'use strict';
  const KD = window.KD, f2 = n => Math.round(n * 100) / 100;
  function geo(rb, g, F) { const R = rb + g, dd = Math.sqrt((R + F) ** 2 - (rb - F) ** 2), S = Math.ceil(rb + dd + F) + 2; return { R, dd, S, cx: S - rb, cy: rb, x1: S - rb - dd }; }
  // off = 0: borda do corte. off = .5: linha central de um contorno de 1px que fica dentro do material (raios ajustados).
  function path(rb, g, F, off) {
    const G = geo(rb, g, F), R2 = G.R + off, F2 = F - off, k = R2 / (R2 + F2), C1 = [G.x1, F], B = [G.cx, G.cy], C2 = [G.S - F, G.cy + G.dd];
    const P1 = [B[0] + (C1[0] - B[0]) * k, B[1] + (C1[1] - B[1]) * k], P2 = [B[0] + (C2[0] - B[0]) * k, B[1] + (C2[1] - B[1]) * k];
    return 'M' + f2(G.x1) + ',' + off + 'A' + F2 + ',' + F2 + ' 0 0 1 ' + f2(P1[0]) + ',' + f2(P1[1]) + 'A' + R2 + ',' + R2 + ' 0 0 0 ' + f2(P2[0]) + ',' + f2(P2[1]) + 'A' + F2 + ',' + F2 + ' 0 0 1 ' + f2(G.S - off) + ',' + f2(G.cy + G.dd);
  }
  KD.notch = {
    corner(rb, g, F) { const G = geo(rb, g, F); return { w: G.S, h: Math.ceil(G.cy + G.dd) + 2, vis: rb + G.dd, d: path(rb, g, F, 0) + 'L' + (G.S + 2) + ',' + f2(G.cy + G.dd) + 'L' + (G.S + 2) + ',-2L' + f2(G.x1) + ',-2Z' }; },
    edge(rb, g, F) { return path(rb, g, F, .5); },
    // coordenadas do corte relativas à borda direita do card (x negativo = pra dentro), pra montar o contorno inteiro de um card de qualquer largura
    rel(rb, g, F) { const G = geo(rb, g, F), k = G.R / (G.R + F), C1 = [G.x1, F], B = [G.cx, G.cy], C2 = [G.S - F, G.cy + G.dd]; const P1 = [B[0] + (C1[0] - B[0]) * k, B[1] + (C1[1] - B[1]) * k], P2 = [B[0] + (C2[0] - B[0]) * k, B[1] + (C2[1] - B[1]) * k]; return { x1: G.x1 - G.S, P1: [P1[0] - G.S, P1[1]], P2: [P2[0] - G.S, P2[1]], yEnd: G.cy + G.dd, R: G.R, F }; },
    mask(rb, g, F) { const n = KD.notch.corner(rb, g, F); return "url('data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + n.w + '" height="' + n.h + '" overflow="visible"><path d="' + n.d + '"/></svg>') + "') right top/" + n.w + 'px ' + n.h + 'px no-repeat'; }
  };
})();

/* Kontar · importador de extrato (OFX e CSV) + tela de revisão em lote (layout A: coluna lateral + cards)
   Fluxo: arquivo → linhas → duplicatas (KD.dup), transferências entre contas próprias e categorias conhecidas
   → quatro cards (Precisam de você · Entre suas contas · Confiantes · Descartadas) → importar.
   Cada importação vira um import_batches; as transações gravam batch_id e external_id (id do banco no arquivo).
   Transferência: as duas pernas ficam ligadas por transfers/transfer_id e saem dos totais de gasto e renda
   (os saldos das contas continuam se movendo). Uma perna sozinha fica pendente até o outro extrato entrar. */
(function () {
  'use strict';
  const KD = window.KD, IMP = (KD.imp = {});
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const brl = n => (Math.round(n * 100) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const brl0 = n => Math.round(n).toLocaleString('pt-BR');
  const ddmm = iso => iso.slice(8, 10) + '/' + iso.slice(5, 7);
  const AM = '#F0C24B', GR = '#6AFF2A', RD = '#FF5A4A', XF = '#78788A', INK = '#0A0A0A', FG = '#F2F0EB', MU = '#8A8A90';
  const E = 'cubic-bezier(.2,.7,.2,1)', EE = 'cubic-bezier(.65,0,.35,1)';
  const PREFIX = /^(compra no d[eé]bito|compra no cr[eé]dito|transfer[eê]ncia (enviada|recebida)( pelo pix)?|pagamento de boleto efetuado|pix (enviado|recebido))\s*[-–:]\s*/i;
  const FATURA = /pagamento (recebido|da fatura|de fatura)|desconto antecipa|estorno de/i;

  /* ---------- leitura de arquivo ---------- */
  async function lerTexto(file) {
    const buf = await file.arrayBuffer();
    let t = new TextDecoder('utf-8').decode(buf);
    if (t.indexOf('�') >= 0) t = new TextDecoder('windows-1252').decode(buf);
    return t.replace(/^﻿/, '');
  }
  const num = s => { let t = String(s == null ? '' : s).trim().replace(/[^\d.,-]/g, ''); if (!t) return NaN; const c = t.lastIndexOf(','), p = t.lastIndexOf('.'); if (c >= 0 && p >= 0) t = c > p ? t.replace(/\./g, '').replace(',', '.') : t.replace(/,/g, ''); else if (c >= 0) t = t.replace(',', '.'); return Number(t); };
  function parseOfx(t) {
    const out = [], blocks = t.split(/<STMTTRN>/i).slice(1);
    const tag = (b, k) => { const m = b.match(new RegExp('<' + k + '>\\s*([^<\\r\\n]*)', 'i')); return m ? m[1].trim() : ''; };
    blocks.forEach(b => {
      const d = tag(b, 'DTPOSTED').replace(/\D/g, '').slice(0, 8), v = num(tag(b, 'TRNAMT'));
      if (d.length !== 8 || isNaN(v)) return;
      out.push({ iso: d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8), raw: tag(b, 'MEMO') || tag(b, 'NAME'), amt: v, fitid: tag(b, 'FITID') });
    });
    return out;
  }
  function csvRows(t) {
    const first = t.split(/\r?\n/, 1)[0] || '', sep = (first.match(/;/g) || []).length > (first.match(/,/g) || []).length ? ';' : ',';
    const rows = []; let row = [], cell = '', q = false;
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      if (q) { if (c === '"') { if (t[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
      else if (c === '"') q = true;
      else if (c === sep) { row.push(cell); cell = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; row.push(cell); cell = ''; if (row.some(x => x.trim())) rows.push(row); row = []; }
      else cell += c;
    }
    row.push(cell); if (row.some(x => x.trim())) rows.push(row);
    return rows;
  }
  function parseCsv(t) {
    const rows = csvRows(t); if (rows.length < 2) return [];
    const H = rows[0].map(h => KD.norm(h).trim());
    const col = re => H.findIndex(h => re.test(h));
    const cD = col(/^(data|date)/), cV = col(/^(valor|amount|value)/), cT = col(/(descri|titulo|title|estabelecimento|historico|lancamento|memo|nome)/), cI = col(/^(identificador|id$|codigo)/), fatura = H.some(h => h === 'category') && H.some(h => h === 'title');
    if (cD < 0 || cV < 0 || cT < 0) return [];
    const out = [];
    rows.slice(1).forEach(r => {
      let d = (r[cD] || '').trim(), v = num(r[cV]); if (isNaN(v)) return;
      const m1 = d.match(/^(\d{4})-(\d{2})-(\d{2})/), m2 = d.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
      const iso = m1 ? m1[1] + '-' + m1[2] + '-' + m1[3] : m2 ? m2[3] + '-' + m2[2] + '-' + m2[1] : null; if (!iso) return;
      out.push({ iso, raw: (r[cT] || '').trim(), amt: fatura ? -v : v, fitid: cI >= 0 ? (r[cI] || '').trim() : '' });   // fatura de cartão: positivo = gasto
    });
    return out;
  }
  const limpo = s => { let n = String(s || '').replace(/\s+/g, ' ').trim(); const m = n.match(PREFIX); if (m) { n = n.slice(m[0].length); n = n.split(/\s+[-–]\s+/)[0]; } return n.replace(/^\*+/, '').trim() || String(s || '').trim(); };

  /* ---------- transferências entre contas próprias ---------- */
  const cents = n => Math.round(Math.abs(Number(n) || 0) * 100);
  const dayNum = iso => { const p = String(iso || '').slice(0, 10).split('-').map(Number); return Date.UTC(p[0], p[1] - 1, p[2]) / 864e5; };
  const toks = s => KD.norm(s).replace(/[^a-z0-9]+/g, ' ').split(' ').filter(w => w.length >= 3);
  // um nome bate quando todas as palavras dele (3+ letras) aparecem na descrição: "Jay Braga" acha "PIX ENVIADO JAY P BRAGA"
  const temNome = (raw, nomes) => { const T = new Set(toks(raw)); return nomes.find(n => { const N = toks(n); return N.length && N.every(w => T.has(w)); }) || null; };
  const accName = id => (KD.M.accs.find(a => a.id === id) || {}).nome || 'outra conta';
  const transfCat = () => (KD.M.catByName['Transferência'] || {}).id || null;

  /* ---------- classificação ---------- */
  function classificar(S) {
    const M = KD.M, hist = {};
    M.rows.forEach(r => { const k = KD.norm(r.e); if (r.catId && !KD.isTransf(r) && !(k in hist)) hist[k] = r.catId; });
    const usados = new Set(), pares = new Set();
    S.rows.forEach(r => {
      r.why = ''; r.grp = 'ok'; r.dup = null; r.par = null; r.porNome = null;
      if (!r.catUser) r.catId = hist[KD.norm(r.nome)] || null;
      if (!r.catId) { const k = Object.keys(hist).find(h => h.length >= 4 && (h.startsWith(KD.norm(r.nome)) || KD.norm(r.nome).startsWith(h))); if (k) r.catId = hist[k]; }
      const inc = v => { if (r.incUser == null) r.include = v; };
      if (!r.unskip && S.known.has(r.fitid) && r.fitid) { r.grp = 'skip'; r.why = 'Já importada antes'; return; }
      if (!r.unskip && FATURA.test(r.raw)) { r.grp = 'skip'; r.why = 'Pagamento de fatura · não conta como gasto'; return; }
      const f = KD.dup.find({ nome: r.nome, valor: r.amt, dir: r.dir, iso: r.iso, cardId: S.cardId, accId: S.accId }, M.rows, { skip: usados });
      if (f.length) { r.dup = f[0]; usados.add(f[0].row.id); r.grp = 'need'; inc(r.dupChoice === 'other'); r.why = (f[0].conf === 'provavel' ? 'Provável' : 'Possível') + ' duplicata'; return; }
      // transferência: só em extrato de conta. Par = mesmo valor, direção oposta, até 3 dias, em outra conta sua.
      if (S.accId && !r.xferOff) {
        const v = cents(r.amt), d0 = dayNum(r.iso), opp = r.dir === 'saida' ? 'entrada' : 'saida';
        // as duas pontas precisam ter cara de transferência (pix/TED/transf, ou já marcada), senão um boleto de mesmo valor vira par por coincidência
        const pareceT = /pix|transf|\bted\b|\bdoc\b/i.test(r.raw), outraT = x => x.xfer || KD.isTransf(x) || x.meio === 'pix' || x.meio === 'transferencia' || !!temNome(x.e, S.nomes);
        const par = !pareceT ? null : M.rows.filter(x => x.accId && !x.cardId && x.accId !== S.accId && !pares.has(x.id) && outraT(x) && cents(x.total) === v && (x.amt > 0 ? 'entrada' : 'saida') === opp && Math.abs(dayNum(x.iso) - d0) <= 3)
          .sort((a, b) => (b.xfer ? 1 : 0) - (a.xfer ? 1 : 0) || Math.abs(dayNum(a.iso) - d0) - Math.abs(dayNum(b.iso) - d0))[0];
        const nome = temNome(r.raw, S.nomes);
        if (par || nome) {
          r.grp = 'xfer'; r.par = par || null; r.porNome = nome; if (par) pares.add(par.id); inc(true);
          const de = r.dir === 'saida' ? S.tgLabel : (par ? accName(par.accId) : 'Sua outra conta'), para = r.dir === 'saida' ? (par ? accName(par.accId) : 'sua outra conta') : S.tgLabel;
          r.why = de + ' → ' + para; r.why2 = par ? 'par em ' + ddmm(par.iso) : 'seu nome na descrição';
          return;
        }
      }
      if (!r.catId) { r.grp = 'need'; inc(false); r.why = 'Sem categoria'; return; }
      if (r.amt >= 1000) { r.grp = 'need'; inc(true); r.why = 'Valor alto'; return; }
      inc(true);
    });
  }
  const ativa = r => r.grp !== 'skip' && r.dupChoice !== 'same';
  const vai = r => ativa(r) && r.include;

  /* ---------- peças visuais ---------- */
  let L = null, S = null, input = null;
  const comp = () => KD.comp;
  const catCor = n => comp().cor(n);
  const icDot = (n, sz) => '<span style="width:' + sz + 'px;height:' + sz + 'px;flex:none;border-radius:50%;background:' + catCor(n) + ';display:flex;align-items:center;justify-content:center"><span style="display:block;width:' + Math.round(sz * .55) + 'px;height:' + Math.round(sz * .55) + 'px;background-image:url(\'' + comp().constructor.uri(comp().icSvg(n), '#000') + '\');background-size:contain;background-repeat:no-repeat;background-position:center"></span></span>';
  const chev = (sz, col) => '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="none" stroke="' + (col || 'currentColor') + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="display:block;flex:none"><path d="m6 9 6 6 6-6"/></svg>';
  const checkSvg = col => '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="' + col + '" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  const LOGOKEY = { 'Itaú Azul': 'Itaú', 'Nubank PJ': 'Nubank', 'Nubank Pessoal': 'Nubank', 'CDB Mercado Pago': 'Mercado Pago' };
  const bankChip = (bank, cor) => {
    const key = bank ? (LOGOKEY[bank] || bank) : null, url = key ? comp().constructor.lgcUrl(key) : '';
    if (!url) return '<i style="width:10px;height:10px;border-radius:50%;background:' + cor + ';flex:none"></i>';
    return key === 'C6'
      ? '<span style="width:28px;height:28px;flex:none;display:flex;align-items:center;justify-content:center"><span style="display:block;width:100%;height:58%;background:' + FG + ';-webkit-mask:url(\'' + url + '\') center/contain no-repeat;mask:url(\'' + url + '\') center/contain no-repeat"></span></span>'
      : '<span style="width:28px;height:28px;flex:none;background-image:url(\'' + url + '\');background-size:contain;background-repeat:no-repeat;background-position:center"></span>';
  };
  const popShell = (inner, w) => '<div data-pop data-dd style="position:absolute;z-index:6;left:0;' + (w ? 'width:' + w + 'px' : 'right:0') + ';top:0;max-height:320px;overflow:hidden;background:#151518;border:1px solid #2A2A2F;border-radius:22px;box-shadow:0 24px 48px rgba(0,0,0,.6);display:flex;flex-direction:column">'
    + '<div class="kscroll" data-popscroll style="flex:1;min-height:0;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:6px">' + inner + '</div></div>';
  const optCss = on => 'display:flex;align-items:center;gap:12px;height:44px;flex:none;border-radius:14px;border:1px solid ' + (on ? FG : '#2A2A2F') + ';background:#0D0D10;padding:0 12px;font-size:14px;font-weight:700;color:' + FG + ';cursor:pointer;white-space:nowrap;overflow:hidden';
  function popCat(r) {
    const cur = r.catId ? (KD.M.catById[r.catId] || {}).nome : null;
    return popShell(comp().cats().filter(n => n !== 'Transferência').map(n => '<span data-pick="cat" data-v="' + esc(n) + '"' + (n === cur ? ' data-dd-on="1"' : '') + ' style="' + optCss(n === cur) + '">' + icDot(n, 24) + '<span style="flex:1;overflow:hidden;text-overflow:ellipsis">' + esc(n) + '</span>' + (n === cur ? checkSvg(FG) : '') + '</span>').join(''), 230);
  }
  function popTarget() {
    return popShell(S.targets.map(t => '<span data-pick="tg" data-v="' + t.k + '"' + (t.k === S.tk ? ' data-dd-on="1"' : '') + ' style="' + optCss(t.k === S.tk) + '">' + bankChip(t.bank, t.cor) + '<span style="flex:1;overflow:hidden;text-overflow:ellipsis">' + esc(t.label) + '</span><span style="font-size:10px;letter-spacing:.12em;color:' + MU + '">' + (t.card ? 'CARTÃO' : 'CONTA') + '</span></span>').join(''));
  }
  const meioTag = (r, dark, g) => '<span style="justify-self:start;font-size:10px;font-weight:800;letter-spacing:.12em;border:1.5px solid ' + (g === 'xfer' ? 'rgba(255,255,255,.42)' : dark ? '#3A3A40' : 'rgba(10,10,10,.55)') + ';border-radius:99px;padding:4px 10px;color:' + (g === 'xfer' ? '#E6E6EC' : dark ? '#B4B4BA' : INK) + ';white-space:nowrap' + (g === 'xfer' ? ';mix-blend-mode:screen' : '') + '">' + r.meioT + '</span>';
  const valor = (r, dark) => '<b style="text-align:right;font-size:19px;font-weight:800;letter-spacing:-.03em;white-space:nowrap;color:' + (r.dir === 'entrada' ? (dark ? GR : '#1E6B0C') : (dark ? RD : '#B3261E')) + '">' + (r.dir === 'entrada' ? '+ ' : '– ') + 'R$ ' + brl(r.amt) + '</b>';
  const ck = (on, dark, attr) => '<span ' + attr + ' style="width:20px;height:20px;border-radius:6px;box-sizing:border-box;flex:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease,border-color .2s ease;'
    + (on ? 'background:' + (dark ? FG : INK) + ';border:2px solid ' + (dark ? FG : INK) : 'border:2px solid ' + (dark ? '#55555C' : 'rgba(10,10,10,.55)')) + '">' + (on ? checkSvg(dark ? INK : AM) : '') + '</span>';
  const link = (attr, t, col) => '<span ' + attr + ' style="cursor:pointer;text-decoration:underline;text-underline-offset:3px;color:' + col + ';white-space:nowrap">' + t + '</span>';

  function catCell(r, dark) {
    const open = S.pop && S.pop.k === 'cat' && S.pop.i === r.i, n = r.catId ? (KD.M.catById[r.catId] || {}).nome : null;
    let pill;
    if (!n) pill = '<div data-a="pcat" data-i="' + r.i + '" style="height:38px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:99px;border:2px dashed ' + INK + ';background:transparent;color:' + INK + ';font-size:13px;font-weight:800;cursor:pointer">Escolher categoria ' + chev(13) + '</div>';
    else if (dark) { const c = catCor(n); pill = '<div data-a="pcat" data-i="' + r.i + '" style="height:38px;box-sizing:border-box;display:flex;align-items:center;gap:9px;border-radius:99px;padding:0 6px 0 5px;border:2px solid ' + c + '8C;background:color-mix(in srgb,' + c + ' 14%,#000);cursor:pointer">' + icDot(n, 24) + '<b style="font-size:13px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(n) + '</b><span style="width:22px;height:22px;border-radius:50%;background:' + INK + ';display:flex;align-items:center;justify-content:center;color:' + FG + '">' + chev(11) + '</span></div>'; }
    else pill = '<div data-a="pcat" data-i="' + r.i + '" style="height:38px;box-sizing:border-box;display:flex;align-items:center;gap:9px;border-radius:99px;padding:0 6px 0 5px;border:2px solid ' + INK + ';background:' + INK + ';color:' + FG + ';cursor:pointer">' + icDot(n, 24) + '<b style="font-size:13px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(n) + '</b><span style="width:22px;height:22px;border-radius:50%;background:#2A2A2F;display:flex;align-items:center;justify-content:center;color:' + FG + '">' + chev(11) + '</span></div>';
    return '<div style="position:relative;' + (open ? 'z-index:30' : '') + '">' + pill + (open ? popCat(r) : '') + '</div>';
  }
  const COLS = 'grid-template-columns:20px 78px minmax(0,1fr) auto 196px 150px';
  function rowHtml(r, g, first) {
    const dark = g !== 'need', line = dark ? '#232327' : 'rgba(10,10,10,.16)', off = r.dupChoice === 'same';
    let why = '', cat = '', box = '';
    if (g === 'skip') {
      box = '<span></span>';
      why = '<span style="color:' + MU + '">' + esc(r.why) + '</span>';
      cat = '<span data-a="incluir" data-i="' + r.i + '" style="justify-self:stretch;height:38px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-radius:99px;border:1.5px solid #55555C;font-size:11px;font-weight:800;letter-spacing:.12em;cursor:pointer">INCLUIR</span>';
    } else if (g === 'xfer') {
      box = ck(r.include, true, 'data-ck="' + r.i + '"');
      why = '<span style="color:' + FG + ';white-space:nowrap">' + esc(r.why) + '</span><br><span style="color:' + MU + '">' + esc(r.why2) + '</span> · ' + link('data-a="naoxfer" data-i="' + r.i + '"', 'Não é entre contas', MU);
      cat = '<div style="height:38px;box-sizing:border-box;display:flex;align-items:center;gap:9px;border-radius:99px;padding:0 12px 0 5px;border:2px solid ' + XF + '8C;background:color-mix(in srgb,' + XF + ' 14%,#000)">' + icDot('Transferência', 24) + '<b style="font-size:13px">Transferência</b></div>';
    } else {
      box = off ? '<span></span>' : ck(r.include, dark, 'data-ck="' + r.i + '"');
      if (r.dup) {
        const d = r.dup.row;
        why = off ? '<span>Marcada como a mesma de "' + esc(d.e) + '" · nada será criado</span> · ' + link('data-ch="' + r.i + ':"', 'desfazer', INK)
          : r.dupChoice === 'other' ? '<span>Marcada como outra · será criada</span> · ' + link('data-ch="' + r.i + ':"', 'desfazer', INK)
          : '<span title="' + esc('Igual a "' + d.e + '" de ' + ddmm(d.iso) + ' · ' + (d.origem === 'manual' ? 'lançada à mão' : 'já no extrato')) + '" style="white-space:nowrap">' + esc(r.why) + ' de ' + ddmm(d.iso) + '</span><br>' + link('data-ch="' + r.i + ':same"', 'É a mesma', INK) + ' · ' + link('data-ch="' + r.i + ':other"', 'É outra', INK);
      } else if (g === 'need' && r.why && r.why !== 'Sem categoria') why = '<span>' + esc(r.why) + '</span>';
      cat = off ? '<span></span>' : catCell(r, dark);
    }
    return '<div data-row="' + r.i + '" style="display:grid;' + COLS + ';gap:16px;align-items:center;min-height:58px;padding:8px 0;border-top:' + (g === 'skip' && first ? '0' : '1px solid ' + line) + ';opacity:' + (off ? .45 : 1) + ';transition:opacity .3s ease">'
      + box + meioTag(r, dark, g)
      + '<div style="min-width:0;display:flex;align-items:baseline;gap:10px"><b style="font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(r.nome) + '</b><span style="font-size:12px;color:' + (dark ? MU : 'rgba(10,10,10,.6)') + ';flex:none">' + ddmm(r.iso) + '</span></div>'
      + '<div style="font-size:12px;max-width:280px;text-align:right;line-height:1.35;color:' + (dark ? '#B4B4BA' : INK) + '">' + why + '</div>'
      + cat + valor(r, dark) + '</div>';
  }
  const GDEF = {
    need: { t: 'Precisam de você', sub: 'DUPLICATA, SEM CATEGORIA OU VALOR ALTO', bg: AM, fg: INK, rule: INK, bul: AM, bulFg: INK },
    xfer: { t: 'Entre suas contas', sub: 'NÃO ENTRA NOS TOTAIS DE GASTO NEM DE RENDA', bg: '#141416', fg: FG, rule: 'linear-gradient(90deg,#5B3DF5 0,#2E2E34 85%)', bul: '#5B3DF5', bulFg: '#fff' },
    ok: { t: 'Confiantes', sub: 'CATEGORIA E ESTABELECIMENTO RECONHECIDOS', bg: '#141416', fg: FG, rule: 'linear-gradient(90deg,#2E2E34 15%,' + GR + ' 100%)', bul: GR, bulFg: INK },
    skip: { t: 'Descartadas', sub: 'NADA É APAGADO · DÁ PARA INCLUIR DE VOLTA', bg: 'transparent', fg: '#B4B4BA', rule: '#2A2A2F', bul: 'transparent;box-shadow:inset 0 0 0 1.5px #3A3A40', bulFg: '#B4B4BA' }
  };
  const BCOL = { need: AM, xfer: '#C9BBFF', ok: GR, skip: MU };
  const bullet = (g, n, sz) => '<span style="width:' + sz + 'px;height:' + sz + 'px;border-radius:50%;background:' + GDEF[g].bul + ';color:' + GDEF[g].bulFg + ';display:flex;align-items:center;justify-content:center;flex:none;font-weight:800;font-size:' + Math.round(sz * .44) + 'px;letter-spacing:-.03em">' + n + '</span>';
  /* indent do card (HANDOFF §5.4): recorte côncavo no canto superior esquerdo, com concordâncias, onde mora a contagem.
     O fundo do card vira uma camada com máscara (retângulo menos o recorte), pra não prender os dropdowns; o contorno é redesenhado em SVG. */
  const NB = [20, 10, 14], NT = KD.notch.corner(...NB), EDGE = KD.notch.edge(...NB), NVIS = Math.round(NT.vis);   // círculo de 40px, folga 10, concordância 14
  const MASKURL = KD.notch.mask(...NB) + ', linear-gradient(#000 0 0)';
  const RULE = 1.5;   // espessura padrão das linhas de cabeçalho do app
  // mesh roxo da marca (mesma lógica do glow da Sobra: sólido no canto, some na diagonal), só no terço esquerdo
  const MESH = 'radial-gradient(120px 90px at 22% 88%,rgba(150,125,255,.38),rgba(150,125,255,0)),radial-gradient(130px 110px at 70% 62%,rgba(68,0,179,.4),rgba(68,0,179,0)),linear-gradient(45deg,rgba(118,88,255,.92) 40px,rgba(91,61,245,.62) 120px,rgba(68,0,179,0) 230px)';
  function card(g, rows) {
    const D = GDEF[g], dark = g !== 'need', open = !!S.open[g], lim = g === 'ok' ? 8 : 999;
    const show = g === 'skip' ? (open ? rows : []) : (open ? rows : rows.slice(0, lim)), more = rows.length - show.length;
    const sel = rows.filter(ativa), all = sel.length && sel.every(r => r.include);
    const head = '<div data-head style="display:flex;align-items:center;gap:14px;height:58px;padding-right:' + (NVIS - 28 + 4) + 'px"><b style="font-size:26px;letter-spacing:-.04em">' + D.t + '</b><span style="font-size:10px;font-weight:700;letter-spacing:.14em;color:' + (dark ? MU : 'rgba(10,10,10,.62)') + '">' + D.sub + '</span>'
      + (g === 'skip' ? '<span data-a="more" data-g="skip" style="margin-left:auto;display:flex;align-items:center;gap:6px;font-size:11px;font-weight:800;letter-spacing:.14em;cursor:pointer;color:' + FG + '">' + (open ? 'FECHAR' : 'VER') + '<span data-chev style="display:flex;transform:rotate(' + (open ? 180 : 0) + 'deg)">' + chev(14) + '</span></span>' : '') + '</div>'
      + (g === 'skip' && !open ? '' : '<div data-rule style="height:' + RULE + 'px;background:' + D.rule + ';margin:0 0 4px"></div>');
    const selAll = g === 'skip' || !sel.length ? '' : '<div style="display:grid;' + COLS + ';gap:16px;align-items:center;height:44px">' + ck(all, dark, 'data-all="' + g + '"') + '<span data-all="' + g + '" style="grid-column:2 / 4;font-size:11px;font-weight:800;letter-spacing:.14em;cursor:pointer">' + (all ? 'DESMARCAR TODAS' : 'SELECIONAR TODAS') + '</span></div>';
    const bd = g === 'skip' ? '#2A2A2F' : dark ? '#232327' : null;
    const layer = '<div aria-hidden="true" style="position:absolute;inset:0;z-index:-1;box-sizing:border-box;border-radius:28px;pointer-events:none;background-color:' + D.bg + ';' + (g === 'xfer' ? 'background-image:' + MESH + ';background-size:33.333% 100%;background-repeat:no-repeat;background-position:left top;' : '') + (bd ? 'border:1px solid ' + bd + ';' : '') + '-webkit-mask:' + MASKURL + ';-webkit-mask-composite:xor;mask:' + MASKURL + ';mask-composite:exclude"></div>'
      + (bd ? '<svg aria-hidden="true" width="' + NT.w + '" height="' + NT.h + '" style="position:absolute;right:0;top:0;z-index:-1;pointer-events:none;overflow:visible"><path d="' + EDGE + '" fill="none" stroke="' + bd + '" stroke-width="1"/></svg>' : '')
      + '<span style="position:absolute;right:0;top:0;width:40px;height:40px;border-radius:50%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:' + (String(rows.length).length > 2 ? 16 : 20) + 'px;font-weight:800;letter-spacing:-.04em;background:' + D.bul + ';color:' + D.bulFg + '">' + rows.length + '</span>';
    return '<section data-grp="' + g + '" style="position:relative;color:' + D.fg + ';box-sizing:border-box;border-radius:28px;padding:0 28px ' + (g === 'skip' && !open ? 22 : 14) + 'px;overflow:visible">'
      + layer + head + selAll + '<div data-rows>' + show.map((r, k) => rowHtml(r, g, k === 0)).join('') + '</div>'
      + (more > 0 && g !== 'skip' ? '<div data-a="more" data-g="' + g + '" style="border-top:1px solid #232327;padding:14px 0 4px;font-size:11px;font-weight:800;letter-spacing:.14em;color:' + MU + ';cursor:pointer">+ ' + more + (more === 1 ? ' LINHA' : ' LINHAS') + ' · MOSTRAR TODAS</div>' : '')
      + '</section>';
  }
  function side(G) {
    const t = S.targets.find(x => x.k === S.tk), inc = S.rows.filter(vai), entra = inc.filter(r => r.dir === 'entrada' && r.grp !== 'xfer').reduce((a, r) => a + r.amt, 0), sai = inc.filter(r => r.dir === 'saida' && r.grp !== 'xfer').reduce((a, r) => a + r.amt, 0);
    const tgOpen = S.pop && S.pop.k === 'tg';
    const lbl = t => '<div style="font-size:10px;font-weight:700;letter-spacing:.16em;color:' + MU + ';margin-bottom:10px">' + t + '</div>';
    const sum = ['need', 'xfer', 'ok', 'skip'].filter(g => G[g].length).map(g => '<div data-a="goto" data-g="' + g + '" style="display:flex;align-items:center;gap:12px;height:36px;cursor:pointer;font-size:15px;font-weight:700">' + bullet(g, G[g].length, 28, true) + GDEF[g].t + '</div>').join('');
    const nomes = S.nomes.map((n, k) => '<span style="display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 6px 0 12px;border-radius:99px;border:1.5px solid #3A3A40;font-size:12px;font-weight:700">' + esc(n) + '<span data-a="rmnome" data-k="' + k + '" title="Remover" style="width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:' + MU + ';font-size:14px">×</span></span>').join('')
      + (S.addNome ? '<input data-nome placeholder="Nome ou razão social" style="height:28px;box-sizing:border-box;border-radius:99px;border:1.5px solid ' + FG + ';background:#000;color:' + FG + ';padding:0 12px;font:700 12px Helvetica,Arial,sans-serif;outline:0;width:100%">'
        : '<span data-a="addnome" style="display:inline-flex;align-items:center;height:28px;padding:0 12px;border-radius:99px;border:1.5px dashed #55555C;font-size:12px;font-weight:700;color:' + MU + ';cursor:pointer">+ nome</span>');
    return '<aside data-side style="position:sticky;top:0;align-self:start;height:calc(100vh - 68px);box-sizing:border-box;padding:26px 28px 24px;display:flex;flex-direction:column;min-height:0">'
      + '<div data-s style="flex:none"><div style="font-size:10.5px;font-weight:700;letter-spacing:.14em;color:' + MU + '">↘ REVISAR IMPORTAÇÃO</div>'
      + '<div style="font-size:52px;font-weight:700;letter-spacing:-.06em;line-height:.95;margin:8px 0 10px">Revisar<br>extrato</div>'
      + '<div style="font-size:12px;color:' + MU + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="' + esc(S.file) + '">' + esc(S.file) + (S.per ? ' · ' + ddmm(S.per[0]) + ' – ' + ddmm(S.per[1]) : '') + ' · ' + S.rows.length + (S.rows.length === 1 ? ' linha' : ' linhas') + '</div></div>'
      + '<div data-s style="flex:none;margin-top:22px">' + lbl('IMPORTAR PARA') + '<div style="position:relative;' + (tgOpen ? 'z-index:30' : '') + '"><div data-a="ptg" style="height:54px;box-sizing:border-box;background:#000;border:2px solid #2A2A2F;border-radius:22px;padding:0 14px;display:flex;align-items:center;gap:12px;cursor:pointer">' + bankChip(t.bank, t.cor) + '<b style="flex:1;min-width:0;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(t.label) + '</b><span style="color:' + MU + '">' + chev(16) + '</span></div>' + (tgOpen ? popTarget() : '') + '</div></div>'
      + '<div data-s style="flex:none;margin-top:22px">' + sum + '</div>'
      + (S.accId ? '<div data-s style="flex:none;margin-top:20px">' + lbl('SEUS NOMES PF / PJ') + '<div style="display:flex;flex-wrap:wrap;gap:6px">' + nomes + '</div></div>' : '')
      + '<div data-s style="flex:none;margin-top:auto;padding-top:18px"><div style="height:' + RULE + 'px;background:' + FG + ';margin-bottom:14px"></div>' + lbl('SERÃO IMPORTADAS')
      + '<div style="font-size:64px;font-weight:700;letter-spacing:-.06em;line-height:.85">' + inc.length + '</div>'
      + '<div style="display:flex;gap:14px;margin-top:10px;font-size:13px;font-weight:800"><span style="color:' + GR + '">+ R$ ' + brl0(entra) + '</span><span style="color:' + RD + '">– R$ ' + brl0(sai) + '</span>' + (G.xfer.some(vai) ? '<span style="color:' + MU + '">⇄ ' + G.xfer.filter(vai).length + '</span>' : '') + '</div>'
      + (S.err ? '<div style="margin-top:12px;color:#FF8A7C;font-size:12px;line-height:1.4">' + esc(S.err) + '</div>' : '')
      + '<span data-a="go" style="margin-top:16px;height:54px;display:flex;align-items:center;justify-content:center;border-radius:99px;background:' + FG + ';color:' + INK + ';font-size:12px;font-weight:900;letter-spacing:.12em;cursor:' + (inc.length && !S.busy ? 'pointer' : 'default') + ';opacity:' + (inc.length && !S.busy ? 1 : .4) + ';transition:opacity .25s ease">' + (S.busy ? 'IMPORTANDO…' : 'IMPORTAR ' + inc.length) + '</span>'
      + '<span data-a="cancel" style="display:block;text-align:center;margin-top:12px;font-size:11px;font-weight:800;letter-spacing:.14em;color:' + MU + ';cursor:pointer">CANCELAR</span></div></aside>';
  }

  /* ---------- render (com altura animada dos cards e fade das linhas novas) ---------- */
  function render(first) {
    if (!L) return;
    const ee = !!S.ee, G = { need: [], xfer: [], ok: [], skip: [] }; S.rows.forEach(r => G[r.grp].push(r));
    const old = {}, oldRows = new Set();
    if (!first) { L.querySelectorAll('[data-grp]').forEach(c => { old[c.dataset.grp] = c.getBoundingClientRect().height; }); L.querySelectorAll('[data-row]').forEach(x => oldRows.add(x.closest('[data-grp]').dataset.grp + ':' + x.dataset.row)); }
    const keep = L.scrollTop;
    L.innerHTML = '<div style="display:grid;grid-template-columns:330px minmax(0,1fr);max-width:1680px;margin:0 auto;min-height:100%">' + side(G)
      + '<main style="padding:22px 32px 80px 4px;display:flex;flex-direction:column;gap:16px">' + ['need', 'xfer', 'ok', 'skip'].filter(g => G[g].length || old[g] != null).map(g => G[g].length ? card(g, G[g]) : card(g, []).replace('<section ', '<section data-gone ')).join('') + '</main></div>';
    L.scrollTop = keep;
    const inp = L.querySelector('[data-nome]'); if (inp) inp.focus();
    const sk = !!S.open.skip, chv = L.querySelector('[data-chev]');
    if (!first && S._sk != null && S._sk !== sk) {
      if (chv) { chv.style.transition = 'none'; chv.style.transform = 'rotate(' + (S._sk ? 180 : 0) + 'deg)'; void chv.offsetWidth; requestAnimationFrame(() => { chv.style.transition = 'transform .5s ' + EE; chv.style.transform = 'rotate(' + (sk ? 180 : 0) + 'deg)'; }); }
      const ru = sk ? L.querySelector('[data-grp="skip"] [data-rule]') : null;
      if (ru) { ru.style.transition = 'none'; ru.style.opacity = '0'; ru.style.transform = 'translateY(-8px)'; void ru.offsetWidth; requestAnimationFrame(() => { ru.style.transition = 'opacity .45s ease .12s, transform .55s ' + EE + ' .12s'; ru.style.opacity = '1'; ru.style.transform = 'none'; }); }
    }
    S._sk = sk;
    if (first) {
      const els = [...L.querySelectorAll('[data-s],[data-grp]')];
      els.forEach(g => { g.style.transition = 'none'; g.style.opacity = '0'; g.style.transform = 'translateY(14px)'; }); void L.offsetHeight;
      requestAnimationFrame(() => els.forEach((g, k) => { g.style.transition = 'opacity .5s ease ' + (0.1 + k * .07) + 's, transform .75s ' + E + ' ' + (0.1 + k * .07) + 's'; g.style.opacity = '1'; g.style.transform = 'none'; }));
      return;
    }
    // linhas que acabaram de chegar num card: fade + subida curta
    const novas = [...L.querySelectorAll('[data-row]')].filter(x => !oldRows.has(x.closest('[data-grp]').dataset.grp + ':' + x.dataset.row));
    novas.forEach(x => { x.style.transition = 'none'; x.style.opacity = '0'; x.style.transform = 'translateY(8px)'; });
    // cards que mudaram de altura: animam da altura velha pra nova; cards novos entram em fade
    const gone = [...L.querySelectorAll('[data-gone]')];
    gone.forEach(c => { c.style.transition = 'none'; c.style.height = old[c.dataset.grp] + 'px'; c.style.overflow = 'hidden'; c.style.boxSizing = 'border-box'; });
    const cards = [...L.querySelectorAll('[data-grp]:not([data-gone])')];
    cards.forEach(c => { const h0 = old[c.dataset.grp]; if (h0 == null) { c.style.transition = 'none'; c.style.opacity = '0'; c.style.transform = 'translateY(10px)'; } else { const h1 = c.getBoundingClientRect().height; if (Math.abs(h1 - h0) > 1) { c.dataset.h1 = h1; c.style.transition = 'none'; c.style.height = h0 + 'px'; c.style.overflow = 'hidden'; } } });
    void L.offsetHeight;
    requestAnimationFrame(() => {
      cards.forEach(c => {
        if (c.dataset.h1) { c.style.transition = 'height .5s ' + (ee ? EE : E); c.style.height = c.dataset.h1 + 'px'; const done = () => { c.style.height = ''; c.style.overflow = 'visible'; c.style.transition = ''; delete c.dataset.h1; }; c.addEventListener('transitionend', function f(e) { if (e.target === c) { c.removeEventListener('transitionend', f); done(); } }); setTimeout(done, 700); }
        else if (old[c.dataset.grp] == null) { c.style.transition = 'opacity .45s ease .1s, transform .6s ' + E + ' .1s'; c.style.opacity = '1'; c.style.transform = 'none'; }
      });
      gone.forEach(c => { c.style.transition = 'opacity .3s ease, height .5s ' + E + ' .1s, padding .5s ' + E + ' .1s, margin .5s ' + E + ' .1s'; c.style.opacity = '0'; c.style.height = '0px'; c.style.paddingTop = c.style.paddingBottom = '0px'; c.style.marginTop = '-16px'; c.style.borderWidth = '0px'; setTimeout(() => c.remove(), 650); });
      novas.forEach((x, k) => { const dl = Math.min(k, 12) * .03 + .12; x.style.transition = 'opacity .4s ease ' + dl + 's, transform .55s ' + (ee ? EE : E) + ' ' + dl + 's'; x.style.opacity = '1'; x.style.transform = 'none'; });
    });
  }
  // fecha o dropdown aberto com fade antes de redesenhar
  function closePop(then) {
    const p = L && L.querySelector('[data-pop]'); S.pop = null;
    if (!p) return then ? then() : render();
    p.style.transition = 'opacity .16s ease'; p.style.opacity = '0'; setTimeout(() => (then ? then() : render()), 160);
  }

  function recalc() {
    const t = S.targets.find(x => x.k === S.tk); S.cardId = t && t.card ? t.id : null; S.accId = t && !t.card ? t.id : null; S.tgLabel = t ? t.label : '';
    S.rows.forEach(r => { r.meioT = S.cardId ? (r.dir === 'entrada' ? 'ESTORNO' : 'CRÉD') : /pix/i.test(r.raw) ? 'PIX' : /boleto/i.test(r.raw) ? 'BOLETO' : /\b(ted|doc|transf)/i.test(r.raw) || r.dir === 'entrada' ? 'TRANSF' : 'DÉBITO'; });
    classificar(S);
  }
  async function conhecidos(ids) {
    const set = new Set(), list = ids.filter(Boolean);
    for (let i = 0; i < list.length; i += 150) { const q = await KD.sb.from('transactions').select('external_id').in('external_id', list.slice(i, i + 150)); (q.data || []).forEach(x => set.add(x.external_id)); }
    return set;
  }
  function close() {
    if (!L) return; const el = L; L = null; S = null; el.style.opacity = '0'; setTimeout(() => el.remove(), 320);
  }
  async function salvarNomes() {
    const p = KD.M.profile; if (p) p.nomes_titular = S.nomes.slice();
    if (KD.isDemo()) return;
    const q = await KD.sb.from('profiles').update({ nomes_titular: S.nomes }).eq('user_id', KD.user.id);
    if (q.error) console.error('[kontar] nomes', q.error);
  }
  const MEIO_DB = { 'CRÉD': 'cartao', 'ESTORNO': 'cartao', PIX: 'pix', BOLETO: 'boleto', 'DÉBITO': 'debito', TRANSF: 'transferencia' };
  async function importar() {
    if (!S || S.busy) return;
    const sel = S.rows.filter(vai); if (!sel.length) return;
    if (KD.isDemo()) { S.err = 'Esta é a conta de demonstração: importar fica travado para todo mundo poder testar.'; render(); return; }
    S.busy = true; S.err = ''; render();
    try {
      const uid = KD.user.id, tcat = transfCat();
      const b = await KD.sb.from('import_batches').insert({ user_id: uid, origem: 'extrato_' + S.ext, arquivo: S.file, status: 'aprovado', total_linhas: S.rows.length, duplicatas_detectadas: S.rows.filter(r => r.dup || r.grp === 'skip').length, periodo_ini: S.per ? S.per[0] : null, periodo_fim: S.per ? S.per[1] : null, destino: S.tgLabel, card_id: S.cardId || null, account_id: S.cardId ? null : (S.accId || null), n_transacoes: sel.length, entrou: sel.filter(r => r.dir === 'entrada' && r.grp !== 'xfer').reduce((a, r) => a + r.amt, 0), saiu: sel.filter(r => r.dir === 'saida' && r.grp !== 'xfer').reduce((a, r) => a + r.amt, 0), n_transf: sel.filter(r => r.grp === 'xfer').length }).select('id').single();
      if (b.error) throw b.error; const bid = b.data.id;
      // transferências: reaproveita o vínculo da perna que já estava esperando; senão cria um novo
      for (const r of sel.filter(x => x.grp === 'xfer')) {
        if (r.par && r.par.xfer) { r.tid = r.par.xfer; await KD.sb.from('transfers').update({ status: 'confirmada' }).eq('id', r.tid); continue; }
        const t = await KD.sb.from('transfers').insert({ user_id: uid, status: r.par ? 'confirmada' : 'pendente', origem: 'importador' }).select('id').single();
        if (t.error) throw t.error; r.tid = t.data.id;
        if (r.par) { const u = await KD.sb.from('transactions').update({ transfer_id: r.tid }).eq('id', r.par.id); if (u.error) throw u.error; }
      }
      const rows = sel.map(r => {
        const x = r.grp === 'xfer', cat = x ? tcat : r.catId || null;
        return { user_id: uid, estabelecimento: r.nome, valor_total: Math.round(r.amt * 100) / 100, direcao: r.dir, meio: MEIO_DB[r.meioT] || 'debito', data_compra: r.iso, card_id: S.cardId || null, account_id: S.cardId ? null : (S.accId || null), category_id: cat, parcelas_total: 1, origem: 'import', status: cat ? 'confirmado' : 'pendente_revisao', categoria_origem: cat ? 'usuario' : null, batch_id: bid, external_id: r.fitid || null, transfer_id: x ? r.tid : null };
      });
      for (let i = 0; i < rows.length; i += 100) { const q = await KD.sb.from('transactions').insert(rows.slice(i, i + 100)); if (q.error) throw q.error; }
      const info = { bid, n: sel.length, arquivo: S.file, destino: S.tgLabel };
      await KD.refresh(KD.comp); window.dispatchEvent(new Event('kd:batches')); close(); setTimeout(() => mostraToast(info), 350);
    } catch (e) { console.error('[kontar] importar', e); if (S) { S.busy = false; S.err = 'Não consegui importar: ' + ((e && e.message) || 'erro') + '. Se algo entrou pela metade, a importação inteira pode ser desfeita.'; render(); } }
  }
  let presetTk = null;
  async function abrir(file) {
    if (L) { L.remove(); L = null; S = null; }
    const ext = ((file.name || '').split('.').pop() || '').toLowerCase();
    let raw = [];
    if (ext === 'pdf' || ext === 'xlsx' || ext === 'xls') return alerta('Esse formato ainda não é lido. Exporte o extrato em OFX ou CSV no app do banco.');
    try { const t = await lerTexto(file); raw = /<STMTTRN>/i.test(t) ? parseOfx(t) : parseCsv(t); } catch (e) { raw = []; }
    if (!raw.length) return alerta('Não achei lançamentos nesse arquivo. Use o extrato em OFX ou CSV exportado pelo banco.');
    const targets = KD.M.accs.map(a => ({ k: 'a' + a.id, id: a.id, card: false, label: a.nome, bank: a.bank, cor: a.cor })).concat(KD.M.cards.map(c => ({ k: 'c' + c.id, id: c.id, card: true, label: c.nick || c.n, bank: c.bank, cor: c.cor })));
    if (!targets.length) return alerta('Cadastre um cartão ou conta antes de importar.');
    const fn = KD.norm(file.name), isCard = /fatura|cartao|card|credit/.test(fn);
    const pre = presetTk && targets.find(t => t.k === presetTk); let tk = (pre || targets.find(t => fn.indexOf(KD.norm(t.label).split(' ')[0]) >= 0 && t.card === isCard) || targets.find(t => fn.indexOf(KD.norm(t.label).split(' ')[0]) >= 0) || targets[0]).k; presetTk = null;
    const rows = raw.map((r, i) => ({ i, iso: r.iso, raw: r.raw, nome: limpo(r.raw), amt: Math.abs(r.amt), dir: r.amt < 0 ? 'saida' : 'entrada', fitid: r.fitid || '', include: false, incUser: null })).filter(r => r.amt > 0);
    rows.forEach((r, k) => { r.i = k; });
    const isos = rows.map(r => r.iso).sort(), prof = KD.M.profile || {};
    const nomes = (prof.nomes_titular && prof.nomes_titular.length) ? prof.nomes_titular.slice() : (prof.nome_exibicao && prof.nome_exibicao.trim().length >= 4 ? [prof.nome_exibicao.trim()] : []);
    S = { file: file.name, ext, rows, targets, tk, open: {}, known: await conhecidos(rows.map(r => r.fitid)), per: isos.length ? [isos[0], isos[isos.length - 1]] : null, busy: false, err: '', nomes, pop: null };
    recalc();
    L = document.createElement('div');
    L.setAttribute('data-imp', '1'); L.className = 'kscroll'; L.style.cssText = 'position:fixed;left:0;right:0;top:68px;bottom:0;background:#000;z-index:99990;font-family:Helvetica,Arial,sans-serif;color:' + FG + ';overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;opacity:0;transition:opacity .35s ease';
    document.body.appendChild(L); render(true); requestAnimationFrame(() => { if (L) L.style.opacity = '1'; });
    L.addEventListener('click', onClick);
    L.addEventListener('keydown', ev => {
      const el = ev.target.closest('[data-nome]'); if (!el || !S) return;
      if (ev.key === 'Enter') { const v = el.value.trim(); S.addNome = false; if (v.length >= 3 && !S.nomes.some(n => KD.norm(n) === KD.norm(v))) { S.nomes.push(v); salvarNomes(); recalc(); } render(); }
      if (ev.key === 'Escape') { ev.stopPropagation(); S.addNome = false; render(); }
    });
    L.addEventListener('focusout', ev => { if (ev.target.matches && ev.target.matches('[data-nome]') && S && S.addNome) setTimeout(() => { if (S && S.addNome && !L.contains(document.activeElement)) { S.addNome = false; render(); } }, 0); });
  }
  // fecha o Descartadas: linhas e régua saem em fade + slide enquanto o card encolhe (ease-in-out), e só então redesenha
  function fechaSkip() {
    const c = L.querySelector('[data-grp="skip"]'); if (!c || c._busy) return; c._busy = true;
    const h0 = c.getBoundingClientRect().height, h1 = c.querySelector('[data-head]').offsetHeight + 22;
    c.style.transition = 'none'; c.style.height = h0 + 'px'; c.style.overflow = 'hidden'; void c.offsetHeight;
    const chv = c.querySelector('[data-chev]'); if (chv) { chv.style.transition = 'transform .5s ' + EE; chv.style.transform = 'rotate(0deg)'; }
    c.querySelectorAll('[data-rule],[data-rows]').forEach(x => { x.style.transition = 'opacity .3s ease, transform .5s ' + EE; x.style.opacity = '0'; x.style.transform = 'translateY(-8px)'; });
    requestAnimationFrame(() => { c.style.transition = 'height .5s ' + EE + ', padding-bottom .5s ' + EE; c.style.height = h1 + 'px'; c.style.paddingBottom = '22px'; });
    S._sk = false;
    setTimeout(() => { if (!S) return; S.open.skip = false; render(); }, 540);
  }
  function onClick(ev) {
    if (!S) return;
    const pick = ev.target.closest('[data-pick]');
    if (pick) {
      const v = pick.dataset.v, P = S.pop;
      if (pick.dataset.pick === 'cat') { const r = S.rows[P.i], c = KD.M.catByName[v]; if (c) { r.catId = c.id; r.catUser = true; if (r.incUser == null) r.include = true; } }
      if (pick.dataset.pick === 'tg' && v !== S.tk) { S.tk = v; S.rows.forEach(r => { r.incUser = null; }); recalc(); }
      return closePop();
    }
    if (S.pop && !ev.target.closest('[data-pop]')) return closePop();
    const el = ev.target.closest('[data-a],[data-ck],[data-ch],[data-all]'); if (!el) return;
    const a = el.dataset.a, i = el.dataset.i != null ? +el.dataset.i : null;
    if (a === 'cancel') return close();
    if (a === 'go') return importar();
    if (a === 'pcat') { S.pop = { k: 'cat', i }; return render(); }
    if (a === 'ptg') { S.pop = { k: 'tg' }; return render(); }
    if (a === 'more') {
      if (el.dataset.g === 'skip') { if (S.open.skip) return fechaSkip(); S.ee = true; S.open.skip = true; render(); S.ee = false; return; }
      S.open[el.dataset.g] = !S.open[el.dataset.g]; return render();
    }
    if (a === 'goto') { const c = L.querySelector('[data-grp="' + el.dataset.g + '"]'); if (c) L.scrollTo({ top: Math.max(0, c.offsetTop - 22), behavior: 'smooth' }); return; }
    if (a === 'incluir') { const r = S.rows[i]; r.unskip = true; r.dupChoice = r.dupChoice === 'same' ? null : r.dupChoice; r.incUser = null; classificar(S); if (r.grp !== 'skip' && r.grp !== 'need') { r.include = true; r.incUser = true; } return render(); }
    if (a === 'naoxfer') { const r = S.rows[i]; r.xferOff = true; r.incUser = null; classificar(S); return render(); }
    if (a === 'addnome') { S.addNome = true; return render(); }
    if (a === 'rmnome') { S.nomes.splice(+el.dataset.k, 1); salvarNomes(); recalc(); return render(); }
    if (el.dataset.ck != null) { const r = S.rows[+el.dataset.ck]; r.include = !r.include; r.incUser = r.include; return render(); }
    if (el.dataset.all) { const rs = S.rows.filter(r => r.grp === el.dataset.all && ativa(r)), on = !rs.every(r => r.include); rs.forEach(r => { r.include = on; r.incUser = on; }); return render(); }
    if (el.dataset.ch != null) { const [k, v] = el.dataset.ch.split(':'), r = S.rows[+k]; r.dupChoice = v || null; r.include = v === 'other'; r.incUser = r.include; return render(); }
  }
  function alerta(msg) { const n = document.createElement('div'); n.textContent = msg; n.style.cssText = 'position:fixed;left:50%;top:84px;transform:translateX(-50%);background:#1b1b1d;color:' + FG + ';border:1px solid ' + AM + ';border-radius:16px;padding:14px 22px;font:14px Helvetica,Arial,sans-serif;z-index:99999;opacity:0;transition:opacity .3s ease'; document.body.appendChild(n); requestAnimationFrame(() => { n.style.opacity = '1'; }); setTimeout(() => { n.style.opacity = '0'; setTimeout(() => n.remove(), 320); }, 4200); }
  /* sair da revisão por outra página: os cliques na barra de cima passam por um aviso de um clique só
     ("Descartar e sair"); não precisa confirmar nem cancelar, ele some sozinho e ao clicar em qualquer outro lugar */
  const reclica = el => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));   // svg/path não têm .click()
  let warn = null;
  function fechaAviso() { if (!warn) return; const w = warn; warn = null; clearTimeout(w._t); w.style.opacity = '0'; w.style.transform = 'translate(-50%,8px)'; setTimeout(() => w.remove(), 300); }
  function avisaSaida(alvo) {
    if (warn) return;
    const n = S.rows.filter(vai).length;
    warn = document.createElement('div'); warn.setAttribute('data-imp-warn', '1');
    warn.style.cssText = 'position:fixed;left:50%;bottom:30px;transform:translate(-50%,8px);z-index:99995;font-family:Helvetica,Arial,sans-serif;color:' + FG + ';background:#1b1b1d;border:1px solid #2A2A2F;border-radius:30px;padding:10px 10px 10px 22px;display:flex;align-items:center;gap:18px;box-shadow:0 24px 48px rgba(0,0,0,.6);opacity:0;transition:opacity .3s ease,transform .45s ' + EE;
    warn.innerHTML = '<div><div style="font-size:15px;font-weight:800;letter-spacing:-.01em">Descartar a importação?</div><div style="font-size:11px;color:' + MU + ';margin-top:2px">' + n + (n === 1 ? ' transação marcada não foi importada' : ' transações marcadas não foram importadas') + '</div></div>'
      + '<span data-w="go" style="height:40px;display:flex;align-items:center;padding:0 20px;border-radius:99px;background:' + FG + ';color:' + INK + ';font-size:11px;font-weight:900;letter-spacing:.12em;cursor:pointer;white-space:nowrap">DESCARTAR E SAIR</span>'
      + '<span data-w="stay" style="height:40px;display:flex;align-items:center;padding:0 16px;border-radius:99px;border:1px solid #3A3A40;color:#9A9AA3;font-size:11px;font-weight:800;letter-spacing:.12em;cursor:pointer;white-space:nowrap">CONTINUAR</span>';
    warn.addEventListener('click', ev => { const b = ev.target.closest('[data-w]'); if (!b) return; if (b.dataset.w === 'go') { fechaAviso(); close(); setTimeout(() => reclica(alvo), 0); } else fechaAviso(); });
    document.body.appendChild(warn); requestAnimationFrame(() => { if (warn) { warn.style.opacity = '1'; warn.style.transform = 'translate(-50%,0)'; } });
    warn._t = setTimeout(fechaAviso, 9000);
  }
  document.addEventListener('click', ev => {
    if (H && !modal && ev.clientY < 68 && ev.target.closest && !ev.target.closest('[data-imp-hist],[data-imp-modal]')) fechaHist();
    if (!L || !S) return;
    const t = ev.target; if (!t || !t.closest || t.closest('[data-imp],[data-imp-warn],[data-kd-imp]')) { if (warn && t && t.closest && !t.closest('[data-imp-warn]')) fechaAviso(); return; }
    if (ev.clientY >= 68) return;
    ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation();
    if (S.busy) return;
    if (!S.rows.some(vai)) { close(); setTimeout(() => reclica(t), 0); return; }
    avisaSaida(t);
  }, true);

  /* ---------- desfazer importação: aviso (A), botão em Cartões (B), histórico de lotes (C), confirmação (D) ---------- */
  const IC_CLOCK = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;flex:none"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5M12 7v5l3 2"/></svg>';
  const IC_TRASH = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13M10 11v5M14 11v5"/></svg>';
  const pillHist = (h, label) => '<span style="display:inline-flex;align-items:center;gap:8px;height:' + h + 'px;padding:0 16px 0 12px;border-radius:9999px;border:1px solid #3A3A40;color:#9A9AA3;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:border-color .25s ease,color .25s ease" onmouseover="this.style.borderColor=\'#6A6A72\';this.style.color=\'#F2F0EB\'" onmouseout="this.style.borderColor=\'#3A3A40\';this.style.color=\'#9A9AA3\'">' + IC_CLOCK + (label || 'Histórico') + '</span>';
  let toastEl = null, H = null, modal = null;

  function fechaToast() { if (!toastEl) return; const t = toastEl; toastEl = null; clearTimeout(t._t); t.style.opacity = '0'; t.style.transform = 'translate(-50%,8px)'; setTimeout(() => t.remove(), 320); }
  function mostraToast(info) {
    fechaToast();
    const t = toastEl = document.createElement('div'); t.setAttribute('data-imp-toast', '1');
    t.style.cssText = 'position:fixed;left:50%;bottom:30px;transform:translate(-50%,10px);z-index:99995;font-family:Helvetica,Arial,sans-serif;color:' + FG + ';background:#1b1b1d;border:1px solid #2A2A2F;border-radius:30px;padding:10px 12px 10px 10px;display:flex;align-items:center;gap:16px;box-shadow:0 24px 48px rgba(0,0,0,.6);overflow:hidden;opacity:0;transition:opacity .3s ease,transform .5s ' + EE;
    t.innerHTML = '<span style="width:40px;height:40px;border-radius:50%;background:' + GR + ';color:' + INK + ';display:flex;align-items:center;justify-content:center;flex:none">' + checkSvg(INK).replace('width="13" height="13"', 'width="18" height="18"') + '</span>'
      + '<div><div style="font-size:15px;font-weight:800;letter-spacing:-.01em">' + info.n + (info.n === 1 ? ' transação importada' : ' transações importadas') + '</div><div style="font-size:11px;color:' + MU + ';margin-top:2px;max-width:260px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(info.arquivo) + ' · ' + esc(info.destino) + '</div></div>'
      + '<span data-t="undo" style="margin-left:14px;height:38px;display:flex;align-items:center;padding:0 20px;border-radius:99px;background:' + FG + ';color:' + INK + ';font-size:11px;font-weight:900;letter-spacing:.12em;cursor:pointer;white-space:nowrap">DESFAZER IMPORTAÇÃO</span>'
      + '<span data-t="hist">' + pillHist(38) + '</span>'
      + '<i style="position:absolute;left:0;bottom:0;height:1.5px;width:100%;background:' + GR + ';transform-origin:left;animation:kdToastBar 15s linear forwards"></i>';
    if (!document.getElementById('kd-toast-css')) { const st = document.createElement('style'); st.id = 'kd-toast-css'; st.textContent = '@keyframes kdToastBar{from{transform:scaleX(1)}to{transform:scaleX(0)}}'; document.head.appendChild(st); }
    t.addEventListener('click', ev => { const b = ev.target.closest('[data-t]'); if (!b) return; if (b.dataset.t === 'undo') { fechaToast(); confirmaDesfazer(info); } else { fechaToast(); historico(); } });
    document.body.appendChild(t); requestAnimationFrame(() => { if (toastEl === t) { t.style.opacity = '1'; t.style.transform = 'translate(-50%,0)'; } });
    t._t = setTimeout(() => { if (toastEl === t) fechaToast(); }, 15000);
  }

  function fechaModal(then) { if (!modal) return then && then(); const m = modal; modal = null; m.style.opacity = '0'; m.firstElementChild.style.transform = 'scale(.96)'; setTimeout(() => { m.remove(); then && then(); }, 260); }
  function confirmaDesfazer(info) {
    if (modal) return;
    const m = modal = document.createElement('div'); m.setAttribute('data-imp-modal', '1');
    m.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;font-family:Helvetica,Arial,sans-serif;color:' + FG + ';opacity:0;transition:opacity .26s ease';
    const draw = () => {
      m.innerHTML = '<div style="width:440px;max-width:calc(100vw - 32px);background:#1b1b1d;border:1px solid #2A2A2F;border-radius:28px;padding:28px;box-shadow:0 24px 48px rgba(0,0,0,.6);transform:scale(.96);transition:transform .45s ' + EE + '">'
        + '<div style="display:flex;align-items:center;justify-content:space-between"><span style="width:44px;height:44px;border-radius:50%;background:' + RD + ';color:' + INK + ';display:flex;align-items:center;justify-content:center">' + IC_TRASH + '</span><span style="font-size:10.5px;font-weight:700;letter-spacing:.14em;color:' + MU + '">↘ DESFAZER IMPORTAÇÃO</span></div>'
        + '<div style="font-size:34px;font-weight:700;letter-spacing:-.05em;line-height:1;margin:18px 0 12px">Apagar ' + info.n + (info.n === 1 ? ' transação?' : ' transações?') + '</div>'
        + '<div style="font-size:13px;line-height:1.45;color:#B4B4BA">Só as que vieram de <b style="color:' + FG + '">' + esc(info.arquivo) + '</b>. O que você lançou à mão não é tocado. As transferências entre contas dessa importação voltam a ficar sem par.<br><br>Não dá para refazer sem importar o arquivo de novo.</div>'
        + (info.err ? '<div style="margin-top:14px;color:#FF8A7C;font-size:12px;line-height:1.4">' + esc(info.err) + '</div>' : '')
        + '<div style="display:flex;gap:10px;margin-top:22px"><span data-m="go" style="flex:1;height:46px;display:flex;align-items:center;justify-content:center;border-radius:99px;background:' + RD + ';color:' + INK + ';font-size:11px;font-weight:900;letter-spacing:.12em;cursor:' + (info.busy ? 'default' : 'pointer') + ';opacity:' + (info.busy ? .6 : 1) + '">' + (info.busy ? 'APAGANDO…' : 'APAGAR ' + info.n) + '</span><span data-m="no" style="height:46px;display:flex;align-items:center;padding:0 22px;border-radius:99px;border:1px solid #3A3A40;color:#9A9AA3;font-size:11px;font-weight:800;letter-spacing:.12em;cursor:pointer">CANCELAR</span></div></div>';
      const card = m.firstElementChild; if (modal === m) card.style.transform = 'none';
    };
    draw();
    m.addEventListener('click', async ev => {
      const b = ev.target.closest('[data-m]');
      if (!b) { if (ev.target === m && !info.busy) fechaModal(); return; }
      if (b.dataset.m === 'no') { if (!info.busy) fechaModal(); return; }
      if (info.busy) return;
      if (KD.isDemo()) { info.err = 'Esta é a conta de demonstração: desfazer fica travado para todo mundo poder testar.'; draw(); return; }
      info.busy = true; info.err = ''; draw();
      try {
        const q = await KD.sb.rpc('kontar_desfazer_lote', { p_lote: info.bid }); if (q.error) throw q.error;
        await KD.refresh(KD.comp); window.dispatchEvent(new Event('kd:batches'));
        info.busy = false; fechaModal(() => { alerta((q.data || 0) + (q.data === 1 ? ' transação apagada' : ' transações apagadas')); if (H) carregaHist(); });
      } catch (e) { console.error('[kontar] desfazer', e); info.busy = false; info.err = 'Não consegui desfazer: ' + ((e && e.message) || 'erro'); draw(); }
    });
    document.body.appendChild(m); requestAnimationFrame(() => { if (modal === m) { m.style.opacity = '1'; m.firstElementChild.style.transform = 'none'; } });
  }

  /* histórico de lotes */
  const quando = iso => { const d = new Date(iso), hoje = new Date(), hh = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); return (d.toDateString() === hoje.toDateString() ? 'HOJE' : String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0')) + ', ' + hh; };
  const dm = iso => iso ? ddmm(String(iso).slice(0, 10)) : '';
  function histCard(b) {
    const off = b.status === 'descartado', bd = off ? '#2A2A2F' : '#232327', n = b.n_transacoes == null ? '' : b.n_transacoes;
    const sub = [String(b.destino || '').toUpperCase(), b.periodo_ini ? dm(b.periodo_ini) + ' – ' + dm(b.periodo_fim) : '', off ? 'DESFEITA EM ' + dm(b.desfeito_em) : quando(b.created_at)].filter(Boolean).join(' · ');
    const stats = off ? '<span style="font-size:12px;color:' + MU + '">Nenhuma transação restante</span>'
      : '<b style="color:' + GR + ';font-size:19px;font-weight:800;letter-spacing:-.03em;white-space:nowrap">+ R$ ' + brl0(b.entrou || 0) + '</b><b style="color:' + RD + ';font-size:19px;font-weight:800;letter-spacing:-.03em;white-space:nowrap">– R$ ' + brl0(b.saiu || 0) + '</b><span style="font-size:12px;color:' + MU + ';white-space:nowrap">⇄ ' + (b.n_transf || 0) + ' entre contas</span><span style="font-size:12px;color:' + MU + ';white-space:nowrap">' + (b.duplicatas_detectadas || 0) + ' duplicatas ignoradas</span>';
    const btn = off ? '' : '<span data-h="undo" data-id="' + b.id + '" style="position:absolute;right:20px;bottom:20px;height:40px;display:inline-flex;align-items:center;padding:0 20px;border-radius:8px;border:1.5px solid #55555C;font-size:11px;font-weight:800;letter-spacing:.12em;cursor:pointer;white-space:nowrap;transition:border-color .25s ease,background .25s ease" onmouseover="this.style.borderColor=\'#F2F0EB\'" onmouseout="this.style.borderColor=\'#55555C\'">DESFAZER IMPORTAÇÃO</span>';
    return '<section data-hc style="position:relative;box-sizing:border-box;border-radius:28px;padding:0 28px;color:' + (off ? '#B4B4BA' : FG) + '"><div aria-hidden="true" style="position:absolute;inset:0;z-index:-1;box-sizing:border-box;border-radius:28px;pointer-events:none;background-color:' + (off ? 'transparent' : '#141416') + ';border:1px solid ' + bd + ';-webkit-mask:' + MASKURL + ';-webkit-mask-composite:xor;mask:' + MASKURL + ';mask-composite:exclude"></div>'
      + '<svg aria-hidden="true" width="' + NT.w + '" height="' + NT.h + '" style="position:absolute;right:0;top:0;z-index:-1;pointer-events:none;overflow:visible"><path d="' + EDGE + '" fill="none" stroke="' + bd + '" stroke-width="1"/></svg>'
      + '<span style="position:absolute;right:0;top:0;width:40px;height:40px;border-radius:50%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:' + (String(n).length > 2 ? 16 : 20) + 'px;font-weight:800;letter-spacing:-.04em;' + (off ? 'box-shadow:inset 0 0 0 1.5px #3A3A40;color:#B4B4BA' : 'background:' + FG + ';color:' + INK) + '">' + n + '</span>'
      + '<div style="display:flex;align-items:center;height:58px;padding-right:' + (NVIS - 28 + 4) + 'px;min-width:0"><b style="font-size:26px;letter-spacing:-.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(b.arquivo || 'Importação') + '</b><span style="margin-left:14px;font-size:10px;font-weight:700;letter-spacing:.14em;color:' + MU + ';white-space:nowrap">' + esc(sub) + '</span></div>'
      + '<div style="height:' + RULE + 'px;background:#2E2E34"></div><div style="display:flex;align-items:center;gap:22px;height:80px;padding-right:230px">' + stats + '</div>' + btn + '</section>';
  }
  function histRender(list, first) {
    if (!H) return;
    const at = list.filter(b => b.status !== 'descartado').length, off = list.length - at, desde = list.length ? dm(list[list.length - 1].created_at) : '';
    const bl = (v, on) => '<div style="display:flex;align-items:center;gap:12px;height:36px"><span style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;' + (on ? 'background:' + FG + ';color:' + INK : 'box-shadow:inset 0 0 0 1.5px #3A3A40;color:#B4B4BA') + '">' + v + '</span>' + (on ? 'Ativas' : 'Desfeitas') + '</div>';
    H.innerHTML = '<div style="display:grid;grid-template-columns:330px minmax(0,1fr);max-width:1680px;margin:0 auto;min-height:100%"><aside style="position:sticky;top:0;align-self:start;height:calc(100vh - 68px);box-sizing:border-box;padding:26px 28px 24px;display:flex;flex-direction:column"><div data-s><div style="font-size:10.5px;font-weight:700;letter-spacing:.14em;color:' + MU + '">↘ IMPORTAÇÕES</div><div style="font-size:52px;font-weight:700;letter-spacing:-.06em;line-height:.95;margin:8px 0 10px">Histórico<br>de lotes</div><div style="font-size:12px;color:' + MU + '">' + list.length + (list.length === 1 ? ' importação' : ' importações') + (desde ? ' · desde ' + desde : '') + '</div></div>'
      + (list.length ? '<div data-s style="margin-top:26px;display:flex;flex-direction:column;gap:6px;font-size:15px;font-weight:700">' + bl(at, true) + bl(off, false) + '</div>' : '')
      + '<div data-s style="margin-top:auto"><span data-h="back" style="display:flex;align-items:center;justify-content:center;height:54px;border-radius:99px;background:' + FG + ';color:' + INK + ';font-size:12px;font-weight:900;letter-spacing:.12em;cursor:pointer">VOLTAR</span></div></aside>'
      + '<main style="padding:22px 32px 80px 4px;display:flex;flex-direction:column;gap:16px">' + (list.length ? list.map(histCard).join('') : '<div data-hc style="padding:40px 0;color:' + MU + ';font-size:15px">Nenhuma importação ainda. Use o botão Importar, na barra de cima, para ler um extrato.</div>') + '</main></div>';
    if (first) {
      const els = [...H.querySelectorAll('[data-s],[data-hc]')];
      els.forEach(g => { g.style.transition = 'none'; g.style.opacity = '0'; g.style.transform = 'translateY(14px)'; }); void H.offsetHeight;
      requestAnimationFrame(() => els.forEach((g, k) => { g.style.transition = 'opacity .5s ease ' + (0.1 + k * .07) + 's, transform .75s ' + EE + ' ' + (0.1 + k * .07) + 's'; g.style.opacity = '1'; g.style.transform = 'none'; }));
    }
  }
  let hList = [];
  async function carregaHist(first) {
    const q = await KD.sb.from('import_batches').select('*').order('created_at', { ascending: false }).limit(100);
    hList = q.error ? [] : (q.data || []); histRender(hList, first !== false);
  }
  function fechaHist() { if (!H) return; const el = H; H = null; el.style.opacity = '0'; setTimeout(() => el.remove(), 330); }
  async function historico() {
    if (H) return;
    H = document.createElement('div'); H.setAttribute('data-imp-hist', '1'); H.className = 'kscroll';
    H.style.cssText = 'position:fixed;left:0;right:0;top:68px;bottom:0;background:#000;z-index:99990;font-family:Helvetica,Arial,sans-serif;color:' + FG + ';overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;opacity:0;transition:opacity .35s ease';
    document.body.appendChild(H); requestAnimationFrame(() => { if (H) H.style.opacity = '1'; });
    H.addEventListener('click', ev => {
      const b = ev.target.closest('[data-h]'); if (!b) return;
      if (b.dataset.h === 'back') return fechaHist();
      if (b.dataset.h === 'undo') { const l = hList.find(x => x.id === b.dataset.id); if (l) confirmaDesfazer({ bid: l.id, n: l.n_transacoes || 0, arquivo: l.arquivo || 'a importação' }); }
    });
    await carregaHist(true);
  }
  IMP.history = historico; IMP.toast = mostraToast;
  IMP.pick = tk => { presetTk = tk; const inp = getInput(); inp.click(); };
  IMP.open = abrir;

  /* ---------- botão "Importar" na barra de cima, ao lado de "Nova" ---------- */
  function getInput() {
    if (!input) { input = document.createElement('input'); input.type = 'file'; input.accept = '.ofx,.csv,.qfx,text/csv'; input.style.display = 'none'; input.addEventListener('change', () => { const f = input.files && input.files[0]; input.value = ''; if (f) abrir(f); else presetTk = null; }); input.addEventListener('cancel', () => { presetTk = null; }); document.body.appendChild(input); }
    return input;
  }
  function mountButton() {
    const nova = document.querySelector('span[title="Nova transação"]'); if (!nova || nova.parentElement.querySelector('[data-kd-imp]')) return;
    getInput();
    const b = document.createElement('span'); b.setAttribute('data-kd-imp', '1'); b.title = 'Importar extrato (OFX ou CSV)';
    b.style.cssText = 'height:38px;display:flex;align-items:center;gap:7px;padding:0 16px 0 12px;border-radius:9999px;border:1px solid #3A3A40;color:#F2F0EB;font-size:13px;font-weight:800;cursor:pointer;white-space:nowrap;transition:background .25s';
    b.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>Importar';
    b.onmouseenter = () => { b.style.background = 'rgba(255,255,255,.1)'; }; b.onmouseleave = () => { b.style.background = ''; };
    b.onclick = () => { presetTk = null; getInput().click(); };
    nova.parentElement.insertBefore(b, nova);
  }
  function mountHist() {
    const p = [...document.querySelectorAll('p')].find(e => /O limite setado/.test(e.textContent)); if (!p) return;
    const col = p.parentElement; if (!col || col.querySelector('[data-kd-hist]')) return;
    const w = document.createElement('div'); w.setAttribute('data-kd-hist', '1'); w.style.cssText = 'margin-top:22px;align-self:flex-start'; w.innerHTML = pillHist(34, 'Histórico de importações');
    w.firstElementChild.addEventListener('click', () => historico()); col.appendChild(w);
  }
  new MutationObserver(() => { try { mountButton(); mountHist(); } catch (e) {} }).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') { if (modal) return fechaModal(); if (H) return fechaHist(); } if (e.key !== 'Escape' || !L || !S || S.busy) return; if (S.pop) return closePop(); close(); });
})();

/* Kontar · "Fechar o mês" na Home (mockup 10-fechar-mes-2-card-unico)
   A partir do dia 5, enquanto alguma fonte (conta ou cartão) estiver sem extrato/fatura do mês anterior, o card branco do mês
   ganha embaixo, depois de um divisor perfurado, o resumo do fechamento (barrinhas + "X de Y fontes em dia"). O indent do canto
   superior direito (tamanho M, botão cinza com seta ↙) expande o card na coluna onde ele estiver, cobrindo o que houver nela:
   lista completa de fontes com Importar onde falta. O X (recorte do mesmo canto) recolhe.
   Geometria do recorte: HANDOFF §5.4 (arco concêntrico com o botão, folga 10, concordância 18). "Em dia" = existe lote aprovado da
   fonte com período até o fim do mês anterior (tolerância de 3 dias). */
(function () {
  'use strict';
  const KD = window.KD, FM = (KD.fm = {});
  const EE = 'cubic-bezier(.65,0,.35,1)', W = '#F2F0EB', INK = '#0A0A0A', GRN = '#00A86B', AMB = '#F0A800', AMT = '#9A6A00';
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const dm = s => s.slice(8, 10) + '/' + s.slice(5, 7);
  const LOGOKEY = { 'Itaú Azul': 'Itaú', 'Nubank PJ': 'Nubank', 'Nubank Pessoal': 'Nubank', 'CDB Mercado Pago': 'Mercado Pago' };
  const DV = 112, PR = 10;   // y do divisor perfurado e raio das perfurações
  let batches = [], loaded = false, sig = '', open = false, anim = false, ov = null;

  /* ---------- dados ---------- */
  async function carregar() {
    try {
      const q = await KD.sb.from('import_batches').select('id,status,destino,card_id,account_id,periodo_fim,created_at').neq('status', 'descartado');
      let list = q.error ? [] : (q.data || []);
      const sem = list.filter(b => !b.periodo_fim).map(b => b.id);   // lotes antigos, sem período gravado: usa a data da última transação do lote
      if (sem.length) { const t = await KD.sb.from('transactions').select('batch_id,data_compra').in('batch_id', sem); const mx = {}; (t.data || []).forEach(x => { const d = String(x.data_compra).slice(0, 10); if (!mx[x.batch_id] || d > mx[x.batch_id]) mx[x.batch_id] = d; }); list = list.map(b => b.periodo_fim ? b : Object.assign({}, b, { periodo_fim: mx[b.id] || null })); }
      batches = list;
    } catch (e) { batches = []; }
    loaded = true; sync();
  }
  FM.data = () => {
    const T = KD.today, ref = new Date(T.getFullYear(), T.getMonth() - 1, 1), fimMes = new Date(T.getFullYear(), T.getMonth(), 0), lim = new Date(fimMes); lim.setDate(lim.getDate() - 3);
    const limIso = iso(lim), nome = MESES[ref.getMonth()], norm = KD.norm;
    const fontes = KD.M.accs.filter(a => a.tipo !== 'investimento').map(a => ({ k: 'a' + a.id, id: a.id, label: a.nome, tipo: 'EXTRATO', card: false, bank: a.bank }))
      .concat(KD.M.cards.map(c => ({ k: 'c' + c.id, id: c.id, label: c.nick || c.n, tipo: 'FATURA', card: true, bank: c.bank })));
    fontes.forEach(f => {
      const bs = batches.filter(b => (f.card ? b.card_id === f.id : b.account_id === f.id) || (!b.card_id && !b.account_id && b.destino && norm(b.destino) === norm(f.label)));
      const last = bs.map(b => b.periodo_fim).filter(Boolean).sort().pop() || null;
      f.last = last; f.ok = !!last && last >= limIso;
    });
    const ok = fontes.filter(f => f.ok).length, pend = fontes.length - ok;
    return { nome, fontes, ok, pend, total: fontes.length, show: loaded === true && fontes.length > 0 && T.getDate() >= 5 && pend > 0 };
  };

  /* ---------- recorte do canto (HANDOFF §5.4): arco concêntrico com o botão ---------- */
  const REL = KD.notch.rel(22, 10, 18);   // tamanho M: botão de 44px
  const f2 = n => Math.round(n * 100) / 100;
  // contorno do card (raio 30, recorte de canto, perfurações do divisor) desenhado em px reais da caixa, via clip-path
  function fmPath(w, h, pr) {
    const X = v => f2(w + v), r = 30, d = DV;
    return 'M' + r + ',0H' + X(REL.x1) + 'A' + REL.F + ',' + REL.F + ' 0 0 1 ' + X(REL.P1[0]) + ',' + f2(REL.P1[1]) + 'A' + REL.R + ',' + REL.R + ' 0 0 0 ' + X(REL.P2[0]) + ',' + f2(REL.P2[1]) + 'A' + REL.F + ',' + REL.F + ' 0 0 1 ' + f2(w) + ',' + f2(REL.yEnd)
      + 'V' + f2(d - pr) + 'A' + pr + ',' + pr + ' 0 0 0 ' + f2(w) + ',' + f2(d + pr) + 'V' + f2(h - r) + 'A' + r + ',' + r + ' 0 0 1 ' + f2(w - r) + ',' + f2(h) + 'H' + r + 'A' + r + ',' + r + ' 0 0 1 0,' + f2(h - r)
      + 'V' + f2(d + pr) + 'A' + pr + ',' + pr + ' 0 0 0 0,' + f2(d - pr) + 'V' + r + 'A' + r + ',' + r + ' 0 0 1 ' + r + ',0Z';
  }
  const shapeBg = el => { const w = el.offsetWidth ? el.getBoundingClientRect().width : 0, h = el.getBoundingClientRect().height; if (!w) return; const p = 'path("' + fmPath(w, h, +el.dataset.pr || PR) + '")'; el.style.clipPath = p; el.style.webkitClipPath = p; };
  const RO = new ResizeObserver(es => es.forEach(e => shapeBg(e.target)));
  const watchBg = el => { if (!el || el.__ro) return; el.__ro = 1; shapeBg(el); RO.observe(el); };
  function tweenPr(el, to, ms) {   // abre/fecha as perfurações com a mesma curva ease-in-out
    const from = +el.dataset.pr || PR, t0 = performance.now(), ease = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    (function step(now) { const t = Math.min(1, (now - t0) / ms); el.dataset.pr = String(from + (to - from) * ease(t)); shapeBg(el); if (t < 1) requestAnimationFrame(step); })(t0);
  }
  const bgLayer = pr => '<div aria-hidden="true" data-fm-bg data-pr="' + pr + '" style="position:absolute;inset:0;z-index:-1;background:' + W + ';pointer-events:none"></div>';

  /* ---------- peças visuais ---------- */
  const ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M17 7 7 17M7 9v8h8"/></svg>';
  const XMARK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" style="display:block"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  const CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  const btnHtml = () => '<span data-fm-btn style="position:absolute;right:0;top:0;width:44px;height:44px;border-radius:50%;background:#1C1C20;box-shadow:inset 0 0 0 1px #3A3A40;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .4s ease,box-shadow .4s ease,color .4s ease"><span data-fm-ar style="position:absolute;display:flex;transition:opacity .25s ease,transform .5s ' + EE + '">' + ARROW + '</span><span data-fm-xx style="position:absolute;display:flex;opacity:0;transform:rotate(-90deg);transition:opacity .25s ease,transform .5s ' + EE + '">' + XMARK + '</span></span>';
  const segs = (d, attr, hide) => '<div ' + attr + ' style="display:flex;gap:5px">' + d.fontes.map(f => '<i data-bar style="flex:1;height:8px;border-radius:4px;' + (hide ? 'opacity:0;' : '') + 'background:' + (f.ok ? GRN : AMB) + ';display:block"></i>').join('') + '</div>';
  const logo = f => { const key = f.bank ? (LOGOKEY[f.bank] || f.bank) : null; let u = ''; try { u = key ? KD.comp.constructor.lgcUrl(key) : ''; } catch (e) {} return u ? '<span style="width:30px;height:30px;flex:none;background:url(\'' + u + '\') center/contain no-repeat"></span>' : '<span style="width:30px;height:30px;flex:none;display:flex;align-items:center;justify-content:center"><i style="width:12px;height:12px;border-radius:50%;background:' + INK + ';display:block"></i></span>'; };
  const fecharHtml = d => '<div data-r="txt" style="display:flex;justify-content:space-between;font-size:10px;font-weight:800;letter-spacing:.12em"><span>FECHAR ' + d.nome.toUpperCase() + '</span><span style="color:' + AMT + '">' + d.pend + (d.pend === 1 ? ' PENDENTE' : ' PENDENTES') + '</span></div><div style="margin-top:12px">' + segs(d, '') + '</div><div data-r="txt" style="font-size:11px;margin-top:9px;color:rgba(10,10,10,.6)">' + d.ok + ' de ' + d.total + ' fontes em dia</div>';
  const rowHtml = (f, d) => '<div data-a="row" style="opacity:0;display:flex;align-items:center;gap:14px;height:62px;flex:none;border-top:1px solid rgba(10,10,10,.14)">' + logo(f) + '<div style="flex:1;min-width:0"><div style="font-size:17px;font-weight:700;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(f.label) + ' <span style="font-size:9px;font-weight:800;letter-spacing:.12em;border:1.5px solid rgba(10,10,10,.4);border-radius:99px;padding:2px 7px;margin-left:4px;vertical-align:2px">' + f.tipo + '</span></div><div style="font-size:11px;margin-top:3px;color:' + (f.ok ? 'rgba(10,10,10,.55)' : AMT) + ';font-weight:' + (f.ok ? 500 : 700) + '">'
    + (f.ok ? 'Em dia · ' + (f.card ? 'fatura' : 'extrato') + ' até ' + dm(f.last) : 'Falta ' + (f.card ? 'a fatura' : 'o extrato') + ' de ' + d.nome + (f.last ? ' · último até ' + dm(f.last) : '')) + '</div></div>'
    + (f.ok ? '<span style="width:26px;height:26px;border-radius:50%;background:' + GRN + ';color:#fff;display:flex;align-items:center;justify-content:center;flex:none">' + CHECK + '</span>'
      : '<span data-fm-imp="' + f.k + '" style="height:36px;display:flex;align-items:center;padding:0 18px;border-radius:99px;background:' + INK + ';color:' + W + ';font-size:11px;font-weight:900;letter-spacing:.12em;cursor:pointer;flex:none;transition:opacity .25s ease" onmouseover="this.style.opacity=.8" onmouseout="this.style.opacity=1">IMPORTAR</span>') + '</div>';
  const expandedHtml = (d, w, h) => '<div data-fm-ec style="position:absolute;left:0;top:0;width:' + w + 'px;height:' + h + 'px;pointer-events:none">'
    + '<div data-a="head" style="position:absolute;left:28px;top:22px;right:84px;opacity:0"><div style="font-size:10.5px;font-weight:700;letter-spacing:.14em;color:rgba(10,10,10,.6)">↘ FECHAR O MÊS</div><div style="font-size:60px;font-weight:700;letter-spacing:-.065em;line-height:.95;margin-top:8px">' + d.nome.charAt(0).toUpperCase() + d.nome.slice(1) + '</div></div>'
    + '<div style="position:absolute;left:28px;right:28px;top:122px;bottom:18px;display:flex;flex-direction:column">'
    + '<div data-a="count" style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:14px;flex:none;opacity:0"><span style="font-size:11px;font-weight:800;letter-spacing:.12em;padding-bottom:4px">' + d.ok + ' DE ' + d.total + ' FONTES EM DIA</span>'
    + (d.pend ? '<span style="display:flex;align-items:flex-end;gap:10px"><b style="font-size:88px;font-weight:700;letter-spacing:-.07em;line-height:.78">' + String(d.pend).padStart(2, '0') + '</b><span style="font-size:15px;font-weight:700;line-height:1.1;letter-spacing:-.01em;color:' + AMT + ';padding-bottom:2px">' + (d.pend === 1 ? 'fonte<br>falta' : 'fontes<br>faltam') + '</span></span>' : '<span style="font-size:30px;font-weight:700;letter-spacing:-.05em;color:' + GRN + '">Tudo em dia</span>') + '</div>'
    + '<div style="flex:none">' + segs(d, '', true) + '</div>'
    + '<div class="kscroll" data-fm-list style="flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;margin-top:16px;display:flex;flex-direction:column">' + d.fontes.map(f => rowHtml(f, d)).join('') + '</div>'
    + '<div data-a="note" style="flex:none;font-size:11px;color:rgba(10,10,10,.55);margin-top:12px;line-height:1.4;opacity:0">Importar abre a tela de revisão do extrato, já no banco escolhido.</div></div></div>';

  /* ---------- animação: fade + slide só na vertical, ease-in-out, entradas escalonadas ---------- */
  function play(els, opt) {   // opt: { from:[opacidade,y], to:[opacidade,y], delay, step, dur }
    els.forEach((el, i) => {
      if (!el) return;
      const a = el.animate([{ opacity: opt.from[0], transform: 'translateY(' + opt.from[1] + 'px)' }, { opacity: opt.to[0], transform: 'translateY(' + opt.to[1] + 'px)' }], { duration: opt.dur, delay: opt.delay + i * (opt.step || 0), easing: EE, fill: 'both' });
      a.onfinish = () => { el.style.opacity = String(opt.to[0]); el.style.transform = opt.to[1] ? 'translateY(' + opt.to[1] + 'px)' : ''; a.cancel(); };
    });
  }

  const reorg = () => !!(KD.comp && KD.comp.state && KD.comp.state.org);   // modo "reorganizar cards" da Home
  function forcaFecha() { if (ov) ov.remove(); ov = null; open = false; anim = false; const w = document.querySelector('[data-k="mes"]'); if (w) w.removeAttribute('data-fm-exp'); }

  /* ---------- montagem no card branco do mês ---------- */
  function css() {
    if (document.getElementById('kd-fm-css')) return;
    const s = document.createElement('style'); s.id = 'kd-fm-css';
    s.textContent = '[data-k="mes"][data-fm]{background:transparent!important;overflow:visible!important;flex-direction:column-reverse!important;justify-content:flex-end!important;gap:6px!important}'
      + '[data-k="mes"][data-fm] [data-mesn]{font-size:62px!important}'
      + '[data-k="mes"][data-fm] > div:nth-child(2){margin-right:64px}'
      + '[data-k="mes"][data-fm-exp] > *{visibility:hidden!important}';
    document.head.appendChild(s);
  }
  function sync() {
    if (!KD.M || !KD.today) return;
    const w = document.querySelector('[data-k="mes"]');
    if (!w) { if (open || anim) { open = false; anim = false; ov = null; } sig = ''; return; }
    const d = FM.data(), host = w.querySelector(':scope > [data-fm-host]');
    css();
    if ((open || anim) && reorg()) forcaFecha();
    if (!d.show) {
      if (open && ov) { refresh(d); return; }
      if (host && !anim) { host.remove(); w.removeAttribute('data-fm'); w.removeAttribute('data-fm-exp'); w.style.cursor = ''; sig = ''; }
      return;
    }
    const s = JSON.stringify([d.nome, d.fontes.map(f => [f.k, f.ok, f.last])]);
    if (!w.hasAttribute('data-fm')) w.setAttribute('data-fm', '1');
    if (host && s === sig) return;
    sig = s;
    const h = host || document.createElement('div');
    if (!host) {
      h.setAttribute('data-fm-host', '1'); h.style.cssText = 'position:absolute;inset:0;font-family:Helvetica,Arial,sans-serif;color:' + INK;
      w.appendChild(h);
      if (!w.__fm) { w.__fm = 1; w.addEventListener('click', ev => { if (reorg()) return; if (w.hasAttribute('data-fm') && !ev.target.closest('[data-fm-ov]')) abre(); }); }
      w.style.cursor = 'pointer';
    }
    h.innerHTML = bgLayer(PR) + '<div style="position:absolute;left:' + (PR + 8) + 'px;right:' + (PR + 8) + 'px;top:' + DV + 'px;border-top:1.5px dashed rgba(10,10,10,.28)"></div><div style="position:absolute;left:26px;right:26px;top:' + (DV + 20) + 'px">' + fecharHtml(d) + '</div>' + btnHtml();
    watchBg(h.querySelector('[data-fm-bg]'));
    if (open && ov) refresh(d);
  }
  function refresh(d) {   // dados novos com o card expandido: troca só o conteúdo, sem piscar o resto
    const ec = ov.querySelector('[data-fm-ec]'); if (!ec) return;
    const l = ec.querySelector('[data-fm-list]'), keep = l ? l.scrollTop : 0, w = ec.style.width, h = ec.style.height;
    ec.outerHTML = expandedHtml(d, parseFloat(w), parseFloat(h));
    const n = ov.querySelector('[data-fm-ec]'); n.style.pointerEvents = 'auto'; n.querySelectorAll('[data-a],[data-bar]').forEach(x => { x.style.opacity = '1'; }); const l2 = n.querySelector('[data-fm-list]'); if (l2) l2.scrollTop = keep;
  }

  /* ---------- expandir / recolher ---------- */
  function abre() {
    if (open || anim) return;
    const w = document.querySelector('[data-k="mes"]'), grid = w && w.closest('[data-org-grid]'), host = w && w.querySelector(':scope > [data-fm-host]'); if (!grid || !host) return;
    anim = true; open = true;
    const gr = grid.getBoundingClientRect(), wr = w.getBoundingClientRect(), d = FM.data();
    const L0 = wr.left - gr.left, T0 = wr.top - gr.top;
    ov = document.createElement('div'); ov.setAttribute('data-fm-ov', '1');
    ov.style.cssText = 'position:absolute;left:' + L0 + 'px;top:' + T0 + 'px;width:' + wr.width + 'px;height:' + wr.height + 'px;z-index:6;overflow:hidden;background:#000;font-family:Helvetica,Arial,sans-serif;color:' + INK + ';cursor:default';
    // cópia do estado reduzido: título e rodapé do mês vêm do próprio card, então o visual é idêntico
    const rc = document.createElement('div'); rc.setAttribute('data-fm-rc', '1');
    rc.style.cssText = 'position:absolute;left:0;top:0;width:' + wr.width + 'px;height:' + wr.height + 'px;box-sizing:border-box;padding:18px 22px;display:flex;flex-direction:column-reverse;justify-content:flex-end;gap:6px;pointer-events:none';
    [...w.children].filter(c => !c.hasAttribute('data-fm-host')).forEach(c => { const k = c.cloneNode(true); k.style.opacity = '1'; k.style.transform = 'none'; rc.appendChild(k); });
    const mn = rc.querySelector('[data-mesn]'); if (mn) mn.style.fontSize = '62px'; if (rc.children[1]) rc.children[1].style.marginRight = '64px';
    // a cópia precisa ter exatamente a altura dos filhos reais, senão o título dá um pulo de 1px quando o overlay sai
    [...w.children].filter(c => !c.hasAttribute('data-fm-host')).forEach((c, i) => { const k = rc.children[i]; if (k) { k.style.height = c.getBoundingClientRect().height + 'px'; k.style.flex = 'none'; } });
    ov.innerHTML = bgLayer(PR) + '<div data-fm-rcw style="position:absolute;inset:0"></div>' + expandedHtml(d, wr.width, gr.height) + btnHtml();
    const rcw = ov.querySelector('[data-fm-rcw]'); rcw.appendChild(rc);
    rcw.insertAdjacentHTML('beforeend', '<div data-r="txt" style="position:absolute;left:' + (PR + 8) + 'px;right:' + (PR + 8) + 'px;top:' + DV + 'px;border-top:1.5px dashed rgba(10,10,10,.28)"></div><div style="position:absolute;left:26px;right:26px;top:' + (DV + 20) + 'px">' + fecharHtml(d) + '</div>');
    ov.style.opacity = '0'; grid.appendChild(ov); watchBg(ov.querySelector('[data-fm-bg]'));
    requestAnimationFrame(() => { ov.style.transition = 'opacity .18s ease'; ov.style.opacity = '1'; });
    setTimeout(() => { w.setAttribute('data-fm-exp', '1'); ov.style.transition = ''; }, 200);
    ov.addEventListener('click', ev => {
      if (ev.target.closest('[data-fm-btn]')) return fecha();
      const b = ev.target.closest('[data-fm-imp]'); if (b && KD.imp && KD.imp.pick) KD.imp.pick(b.dataset.fmImp);
    });
    const bg = ov.querySelector('[data-fm-bg]'), btn = ov.querySelector('[data-fm-btn]'), ec = ov.querySelector('[data-fm-ec]');
    const bars0 = [...rcw.querySelectorAll('[data-bar]')], txt0 = [...rc.children].concat([...rcw.querySelectorAll('[data-r="txt"]')]);
    void ov.offsetHeight;
    // 1) o conteúdo reduzido sai (barrinhas primeiro) e as perfurações se fecham
    play(bars0, { from: [1, 0], to: [0, -8], delay: 0, step: 25, dur: 380 }); play(txt0, { from: [1, 0], to: [0, -8], delay: 40, step: 0, dur: 260 });
    tweenPr(bg, 0.01, 350);
    // 2) o card cresce até cobrir a coluna inteira; o botão vira X
    setTimeout(() => {
      ov.style.transition = 'left .7s ' + EE + ',top .7s ' + EE + ',width .7s ' + EE + ',height .7s ' + EE + ',opacity .18s ease';
      ov.style.top = '0px'; ov.style.height = gr.height + 'px';
    }, 200);
    setTimeout(() => {
      btn.style.background = W; btn.style.boxShadow = 'none'; btn.style.color = INK;
      const ar = btn.querySelector('[data-fm-ar]'), xx = btn.querySelector('[data-fm-xx]'); ar.style.opacity = '0'; ar.style.transform = 'rotate(90deg)'; xx.style.opacity = '1'; xx.style.transform = 'none';
    }, 300);
    // 3) o conteúdo expandido entra: barrinhas primeiro e por último
    setTimeout(() => {
      const bars = [...ec.querySelectorAll('[data-bar]')], rows = [...ec.querySelectorAll('[data-a="row"]')];
      bars.forEach(b => { b.style.opacity = '0'; }); rows.forEach(r => { r.style.opacity = '0'; });
      play(bars, { from: [0, 10], to: [1, 0], delay: 0, step: 45, dur: 900 });
      play([ec.querySelector('[data-a="head"]')], { from: [0, 10], to: [1, 0], delay: 80, dur: 550 });
      play([ec.querySelector('[data-a="count"]')], { from: [0, 10], to: [1, 0], delay: 140, dur: 550 });
      play(rows, { from: [0, 10], to: [1, 0], delay: 200, step: 50, dur: 450 });
      play([ec.querySelector('[data-a="note"]')], { from: [0, 10], to: [1, 0], delay: 200 + rows.length * 50, dur: 400 });
      ec.style.pointerEvents = 'auto';
    }, 450);
    setTimeout(() => { anim = false; }, 1800);
  }
  function fecha() {
    if (!open || anim || !ov) return;
    anim = true;
    const o = ov, w = document.querySelector('[data-k="mes"]'), grid = w && w.closest('[data-org-grid]');
    let L0 = parseFloat(o.style.left), T0 = 0, cw = o.getBoundingClientRect().width, ch = 201;
    if (w && grid) { const gr = grid.getBoundingClientRect(), wr = w.getBoundingClientRect(); L0 = wr.left - gr.left; T0 = wr.top - gr.top; cw = wr.width; ch = wr.height; }
    const ec = o.querySelector('[data-fm-ec]'), rcw = o.querySelector('[data-fm-rcw]'), bg = o.querySelector('[data-fm-bg]'), btn = o.querySelector('[data-fm-btn]');
    ec.style.pointerEvents = 'none';
    // 1) o conteúdo expandido sai (as barrinhas começam primeiro e terminam por último)
    play([...ec.querySelectorAll('[data-bar]')], { from: [1, 0], to: [0, -8], delay: 0, step: 30, dur: 600 });
    play([ec.querySelector('[data-a="head"]'), ec.querySelector('[data-a="count"]')].concat([...ec.querySelectorAll('[data-a="row"]')], [ec.querySelector('[data-a="note"]')]), { from: [1, 0], to: [0, -8], delay: 60, step: 25, dur: 350 });
    // 2) X vira seta e o card encolhe até o tamanho do card do mês
    setTimeout(() => {
      btn.style.background = '#1C1C20'; btn.style.boxShadow = 'inset 0 0 0 1px #3A3A40'; btn.style.color = '#fff';
      const ar = btn.querySelector('[data-fm-ar]'), xx = btn.querySelector('[data-fm-xx]'); xx.style.opacity = '0'; xx.style.transform = 'rotate(-90deg)'; ar.style.opacity = '1'; ar.style.transform = 'none';
    }, 550);
    setTimeout(() => { o.style.left = L0 + 'px'; o.style.top = T0 + 'px'; o.style.width = cw + 'px'; o.style.height = ch + 'px'; }, 600);
    // 3) as perfurações voltam e o conteúdo reduzido entra (barrinhas primeiro)
    setTimeout(() => {
      tweenPr(bg, PR, 350);
      const bars = [...rcw.querySelectorAll('[data-bar]')], txt = [...rcw.querySelector('[data-fm-rc]').children].concat([...rcw.querySelectorAll('[data-r="txt"]')]);
      bars.forEach(b => { b.style.opacity = '0'; }); txt.forEach(t => { t.style.opacity = '0'; });
      play(bars, { from: [0, 8], to: [1, 0], delay: 0, step: 25, dur: 420 }); play(txt, { from: [0, 8], to: [1, 0], delay: 40, dur: 300 });
    }, 1050);
    setTimeout(() => { const ww = document.querySelector('[data-k="mes"]'); if (ww) ww.removeAttribute('data-fm-exp'); o.style.transition = 'opacity .3s ease'; o.style.opacity = '0'; }, 1450);
    setTimeout(() => { o.remove(); if (ov === o) ov = null; open = false; anim = false; sync(); }, 1800);
  }
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && open && !document.querySelector('[data-imp],[data-imp-modal],[data-imp-hist]')) fecha(); });
  window.addEventListener('kd:batches', () => carregar());
  FM.refresh = carregar;

  let raf = 0;
  new MutationObserver(() => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; try { if (!loaded && KD.sb && KD.M && document.querySelector('[data-k="mes"]')) { loaded = 'pend'; carregar(); } else if (loaded === true) sync(); } catch (e) {} }); }).observe(document.documentElement, { childList: true, subtree: true });
})();
