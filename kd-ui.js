var KDMorph=(()=>{var Ot=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ne=Object.getOwnPropertyNames;var ee=Object.prototype.hasOwnProperty;var dt=(t,s,e)=>()=>{if(e)throw e[0];try{return t&&(s=t(t=0)),s}catch(o){throw e=[o],o}};var cn=(t,s)=>{for(var e in s)Ot(t,e,{get:s[e],enumerable:!0})},oe=(t,s,e,o)=>{if(s&&typeof s=="object"||typeof s=="function")for(let n of ne(s))!ee.call(t,n)&&n!==e&&Ot(t,n,{get:()=>s[n],enumerable:!(o=te(s,n))||o.enumerable});return t};var se=t=>oe(Ot({},"__esModule",{value:!0}),t);function fn(t){let s=[],e=t.length,o=0,n=0,c=0,r=0,i=0,l=null,a="",h=0,f=0,m="",u=!1,g=I=>{throw new Error(`morphicons: ${I} at d[${o}]`)},d=I=>I>=48&&I<=57,M=()=>{for(;o<e;){let I=t.charCodeAt(o);if(I===32||I===9||I===10||I===13||I===12||I===44)o++;else break}},y=()=>{M();let I=o;o<e&&(t[o]==="+"||t[o]==="-")&&o++;let A=!1;for(;o<e&&d(t.charCodeAt(o));)o++,A=!0;if(o<e&&t[o]===".")for(o++;o<e&&d(t.charCodeAt(o));)o++,A=!0;if(A||g("expected number"),o<e&&(t[o]==="e"||t[o]==="E")){let N=o;o++,o<e&&(t[o]==="+"||t[o]==="-")&&o++;let v=!1;for(;o<e&&d(t.charCodeAt(o));)o++,v=!0;v||(o=N)}return Number(t.slice(I,o))},x=()=>{M();let I=t[o];return I==="0"||I==="1"?(o++,I==="1"?1:0):g("expected arc flag (0|1)")},p=()=>(u||g("path must start with M/m"),l||(l={x0:n,y0:c,segs:[],closed:!1},s.push(l)),l),b=!1,k=()=>y()+(b?n:0),S=()=>y()+(b?c:0);for(;M(),!(o>=e);){let I=t[o];switch(re.includes(I)?(a=I,o++):a===""?g("path must start with M/m"):a==="M"?a="L":a==="m"?a="l":(a==="Z"||a==="z")&&g("stray data after Z"),b=a>="a",b?a.toUpperCase():a){case"M":{u=!0;let A=k(),N=S();n=A,c=N,r=A,i=N,l={x0:A,y0:N,segs:[],closed:!1},s.push(l),m="";break}case"L":{let A=k(),N=S();p().segs.push(["L",A,N]),n=A,c=N,m="";break}case"H":{let A=k();p().segs.push(["L",A,c]),n=A,m="";break}case"V":{let A=S();p().segs.push(["L",n,A]),c=A,m="";break}case"C":case"S":{let A,N;a==="C"||a==="c"?(A=k(),N=S()):(A=m==="C"?2*n-h:n,N=m==="C"?2*c-f:c);let v=k(),T=S(),R=k(),L=S();p().segs.push(["C",A,N,v,T,R,L]),h=v,f=T,n=R,c=L,m="C";break}case"Q":case"T":{let A,N;a==="Q"||a==="q"?(A=k(),N=S()):(A=m==="Q"?2*n-h:n,N=m==="Q"?2*c-f:c);let v=k(),T=S();p().segs.push(["Q",A,N,v,T]),h=A,f=N,n=v,c=T,m="Q";break}case"A":{let A=y(),N=y(),v=y(),T=x(),R=x(),L=k(),_=S();p().segs.push(["A",A,N,v,T,R,L,_]),n=L,c=_,m="";break}case"Z":l&&(l.closed=!0,l=null),n=r,c=i,m="";break;default:g(`unsupported command "${a}"`)}}return s.filter(I=>I.segs.length>0)}function Mt(t){return String(Math.round(t*100)/100)}function Ct(t,s){let e="";for(let o=0;o<t.length;o++){let n=t[o],c=n.length/2;e+=`M${Mt(n[0])} ${Mt(n[1])}`;for(let r=1;r<c;r++)e+=`L${Mt(n[2*r])} ${Mt(n[2*r+1])}`;s?.[o]&&(e+="Z")}return e}function V(t){return String(Math.round(t*1e4)/1e4)}function pn(t){let s="";for(let{pts:e,closed:o}of t){s+=`M${V(e[0])} ${V(e[1])}`;for(let n=2;n<e.length;n+=6)s+=`C${V(e[n])} ${V(e[n+1])} ${V(e[n+2])} ${V(e[n+3])} ${V(e[n+4])} ${V(e[n+5])}`;o&&(s+="Z")}return s}function it(t,s){let e=[t,s],o=t,n=s,c=(h,f,m,u,g,d)=>{e.push(h,f,m,u,g,d),o=g,n=d},r=(h,f)=>{Math.abs(h-o)<1e-12&&Math.abs(f-n)<1e-12||c(o+(h-o)/3,n+(f-n)/3,o+2*(h-o)/3,n+2*(f-n)/3,h,f)};return[c,r,(h,f,m,u)=>{c(o+2/3*(h-o),n+2/3*(f-n),m+2/3*(h-m),u+2/3*(f-u),m,u)},(h,f,m,u,g,d,M)=>{let y=o,x=n;if(Math.abs(d-y)<1e-12&&Math.abs(M-x)<1e-12)return;let p=Math.abs(h),b=Math.abs(f);if(p<1e-12||b<1e-12){r(d,M);return}let k=m*Math.PI/180,S=Math.cos(k),I=Math.sin(k),A=(y-d)/2,N=(x-M)/2,v=S*A+I*N,T=-I*A+S*N,R=v*v/(p*p)+T*T/(b*b);if(R>1){let O=Math.sqrt(R);p*=O,b*=O}let L=p*p,_=b*b,et=v*v,ot=T*T,X=(L*_-L*ot-_*et)/(L*ot+_*et);X<0&&(X=0);let st=(u===g?-1:1)*Math.sqrt(X),Z=st*p*T/b,W=-st*b*v/p,rt=S*Z-I*W+(y+d)/2,w=I*Z+S*W+(x+M)/2,P=Math.atan2((T-W)/b,(v-Z)/p),E=Math.atan2((-T-W)/b,(-v-Z)/p)-P;g===0&&E>0?E-=un:g===1&&E<0&&(E+=un);let F=Math.max(1,Math.ceil(Math.abs(E)/(Math.PI/2)-1e-9)),$=E/F,D=4/3*Math.tan($/4),pt=O=>rt+p*Math.cos(O)*S-b*Math.sin(O)*I,Jn=O=>w+p*Math.cos(O)*I+b*Math.sin(O)*S,en=O=>-p*Math.sin(O)*S-b*Math.cos(O)*I,on=O=>-p*Math.sin(O)*I+b*Math.cos(O)*S,Tt=P,sn=y,rn=x;for(let O=1;O<=F;O++){let ct=P+$*O,Pt=O===F?d:pt(ct),Et=O===F?M:Jn(ct);c(sn+D*en(Tt),rn+D*on(Tt),Pt-D*en(ct),Et-D*on(ct),Pt,Et),Tt=ct,sn=Pt,rn=Et}},h=>(h&&r(e[0],e[1]),e.length<8?null:{pts:Float64Array.from(e),closed:h})]}function hn(t){let[s,e,o,n,c]=it(t.x0,t.y0);for(let r of t.segs)switch(r[0]){case"L":e(r[1],r[2]);break;case"C":s(r[1],r[2],r[3],r[4],r[5],r[6]);break;case"Q":o(r[1],r[2],r[3],r[4]);break;case"A":n(r[1],r[2],r[3],r[4],r[5],r[6],r[7])}return c(t.closed)}function j(t,s,e=0){let o=t[s];if(o===void 0)return e;let n=typeof o=="number"?o:Number(o);return Number.isFinite(n)?n:e}function mn(t){let s=String(t??"").trim();if(!s)return[];let e=s.split(/[\s,]+/).map(Number);if(e.some(o=>!Number.isFinite(o)))throw new Error(`morphicons: invalid points: "${s}"`);return e}function Lt(t,s){if(t.length<4)return null;let[,e,,,o]=it(t[0],t[1]);for(let n=2;n+1<t.length;n+=2)e(t[n],t[n+1]);return o(s)}function gn(t,s,e,o){if(e<1e-12||o<1e-12)return null;let n=bt*e,c=bt*o,r=t+e,i=t-e,l=s+o,a=s-o,[h,,,,f]=it(r,s);return h(r,s+c,t+n,l,t,l),h(t-n,l,i,s+c,i,s),h(i,s-c,t-n,a,t,a),h(t+n,a,r,s-c,r,s),f(!0)}function ce(t){let s=j(t,"x"),e=j(t,"y"),o=j(t,"width"),n=j(t,"height");if(o<1e-12||n<1e-12)return null;let c=j(t,"rx",NaN),r=j(t,"ry",NaN);if(Number.isNaN(c)&&(c=Number.isNaN(r)?0:r),Number.isNaN(r)&&(r=c),c=Math.min(Math.max(c,0),o/2),r=Math.min(Math.max(r,0),n/2),c<1e-12||r<1e-12)return Lt([s,e,s+o,e,s+o,e+n,s,e+n],!0);let i=s+c,l=s+o-c,a=s+o,h=e+r,f=e+n-r,m=e+n,u=bt*c,g=bt*r,[d,M,,,y]=it(i,e);return M(l,e),d(l+u,e,a,h-g,a,h),M(a,f),d(a,f+g,l+u,m,l,m),M(i,m),d(i-u,m,s,f+g,s,f),M(s,h),d(s,h-g,i-u,e,i,e),y(!0)}function Y(t){let s=[],e=o=>{o&&s.push(o)};if(typeof t=="string"){for(let o of fn(t))e(hn(o));return s}for(let[o,n]of t)switch(o){case"path":for(let c of fn(String(n.d??"")))e(hn(c));break;case"line":{let[,c,,,r]=it(j(n,"x1"),j(n,"y1"));c(j(n,"x2"),j(n,"y2")),e(r(!1));break}case"circle":{let c=j(n,"r");e(gn(j(n,"cx"),j(n,"cy"),c,c));break}case"ellipse":e(gn(j(n,"cx"),j(n,"cy"),j(n,"rx"),j(n,"ry")));break;case"rect":e(ce(n));break;case"polyline":e(Lt(mn(n.points),!1));break;case"polygon":e(Lt(mn(n.points),!0));break;default:throw new Error(`morphicons: unsupported tag <${o}>`)}return s}var re,bt,un,yt=dt(()=>{re="MmLlHhVvCcSsQqTtAaZz";bt=4/3*Math.tan(Math.PI/8),un=2*Math.PI});function C(t){let s=t.length/2,e=0,o=0;for(let n=0;n<s;n++)e+=t[2*n],o+=t[2*n+1];return[e/s,o/s]}function dn(t){let s=t.length/2,e=0;for(let o=1;o<s;o++)e+=Math.hypot(t[2*o]-t[2*o-2],t[2*o+1]-t[2*o-1]);return e}function at(t){let s=t.length/2,e=new Float64Array(2*s);for(let o=0;o<s;o++)e[2*o]=t[2*(s-1-o)],e[2*o+1]=t[2*(s-1-o)+1];return e}function K(t,s){let e=t.length/2,o=new Float64Array(2*e);for(let n=0;n<e;n++){let c=(n+s)%e;o[2*n]=t[2*c],o[2*n+1]=t[2*c+1]}return o}function lt(t,s,e,o){let n=t.length/2,c=0,r=0,i=0,l=0,a=0,h=0;for(let M=0;M<n;M++){let y=t[2*M]-e[0],x=t[2*M+1]-e[1],p=s[2*M]-o[0],b=s[2*M+1]-o[1];c+=y*p,l+=x*b,r+=y*b,i+=x*p,a+=y*y+x*x,h+=p*p+b*b}let f=Math.atan2(r-i,c+l),m=Math.cos(f)*(c+l)+Math.sin(f)*(r-i),u=a>1e-12?m/a:1;u>1e-6||(u=1e-6);let g=Math.max(0,u*u*a-2*u*m+h),d=h>1e-12?Math.sqrt(g/h):0;return{theta:f,sigma:u,res:d}}function ue(t,s,e=!1,o=!1,n=!0,c=le){let r=C(t),i=C(s),l=e&&!o,a=l?t:s,h=e||o?a.length/2:1,f=Number.POSITIVE_INFINITY,m=a,u={theta:0,sigma:1,res:0};for(let g=0;g<(n?2:1);g++){let d=g?at(a):a;for(let M=0;M<h;M++){let y=M?K(d,M):d,x=l?lt(y,s,r,i):lt(t,y,r,i),p=x.res+c*Math.abs(x.theta)/Math.PI;p<f&&(f=p,m=y,u=x)}}return l?{ca:r,cb:i,a:m,b:s,...u}:{ca:r,cb:i,a:t,b:m,...u}}function H(t,s){let e=s.map(C),o=s.map(dn);return t.map(n=>{let c=C(n),r=dn(n);return e.map((i,l)=>Math.hypot(c[0]-i[0],c[1]-i[1])+ie*Math.abs(r-o[l]))})}function he(t){let s=t.length;if(s>fe){let r=[];for(let a=0;a<s;a++)for(let h=0;h<s;h++)r.push([t[a][h],a,h]);r.sort((a,h)=>a[0]-h[0]);let i=new Array(s).fill(-1),l=new Array(s).fill(!1);for(let[,a,h]of r)i[a]<0&&!l[h]&&(i[a]=h,l[h]=!0);return i}let e=Array.from({length:s},(r,i)=>i),o=e.slice(),n=Number.POSITIVE_INFINITY,c=(r,i,l)=>{if(!(l>=n)){if(i===s){n=l,o=r.slice();return}for(let a=i;a<s;a++)[r[i],r[a]]=[r[a],r[i]],c(r,i+1,l+t[i][r[i]]),[r[i],r[a]]=[r[a],r[i]]}};return c(e,0,0),o}function Mn(t){let s=t.length,e=t[0].length;if(e**s>1e5){let l=t.map(h=>{let f=0;for(let m=1;m<h.length;m++)h[m]<h[f]&&(f=m);return f}),a=new Array(e).fill(0);for(let h of l)a[h]++;for(let h=0;h<e;h++){if(a[h]>0)continue;let f=-1,m=Number.POSITIVE_INFINITY;for(let u=0;u<s;u++){if(a[l[u]]<2)continue;let g=t[u][h]-t[u][l[u]];g<m&&(m=g,f=u)}a[l[f]]--,l[f]=h,a[h]++}return l}let o=null,n=Number.POSITIVE_INFINITY,c=new Array(s),r=new Array(e).fill(0),i=(l,a,h)=>{if(!(a>=n||e-h>s-l)){if(l===s){n=a,o=c.slice();return}for(let f=0;f<e;f++)c[l]=f,r[f]++,i(l+1,a+t[l][f],h+(r[f]===1?1:0)),r[f]--}};if(i(0,0,0),!o)throw new Error("morphicons: no valid surjection (B < S)");return o}function _t(t,s){let e=t.length*s,o=new Float64Array(2*e),n=new Float64Array(2*e);t.forEach((f,m)=>{o.set(f.a,2*s*m),n.set(f.bO,2*s*m)});let c=C(o),r=lt(o,n,c,C(n));if(r.res>=ae)return;let i=Math.cos(-r.theta),l=Math.sin(-r.theta),a=Math.cos(r.theta),h=Math.sin(r.theta);for(let f of t){let m=0,u=0;for(let k=0;k<s;k++){let S=f.bO[2*k]-f.cb[0],I=f.bO[2*k+1]-f.cb[1];f.bT[2*k]=(S*i-I*l)/r.sigma,f.bT[2*k+1]=(S*l+I*i)/r.sigma;let A=r.sigma*(a*f.aC[2*k]-h*f.aC[2*k+1])-S,N=r.sigma*(h*f.aC[2*k]+a*f.aC[2*k+1])-I;m+=A*A+N*N,u+=S*S+I*I}f.theta=r.theta,f.lnSigma=Math.log(r.sigma),f.res=u>1e-12?Math.sqrt(m/u):0;let g=Math.exp(f.lnSigma),d=Math.cos(f.theta)*g,M=Math.sin(f.theta)*g,y=f.ca[0]-c[0],x=f.ca[1]-c[1],p=y*d-x*M-y,b=y*M+x*d-x;f.block={off:[y,x],drift:[f.cb[0]-f.ca[0]-p,f.cb[1]-f.ca[1]-b]}}}function $t(t,s){let e=t.length,o=s.length,n=[];if(e===o){let c=he(H(t,s));for(let r=0;r<e;r++)n.push([r,c[r]])}else if(e<o){let c=Mn(H(s,t));for(let r=0;r<o;r++)n.push([c[r],r])}else{let c=Mn(H(t,s));for(let r=0;r<e;r++)n.push([r,c[r]])}return n}function qt(t,s,e,o,n,c){let r=t.length/2,i=ue(t,s,e,o,n,c),l=i.a,a=new Float64Array(2*r),h=new Float64Array(2*r),f=new Float64Array(2*r),m=Math.cos(-i.theta),u=Math.sin(-i.theta);for(let g=0;g<r;g++){a[2*g]=l[2*g]-i.ca[0],a[2*g+1]=l[2*g+1]-i.ca[1];let d=i.b[2*g]-i.cb[0],M=i.b[2*g+1]-i.cb[1];h[2*g]=(d*m-M*u)/i.sigma,h[2*g+1]=(d*u+M*m)/i.sigma,f[2*g]=i.b[2*g],f[2*g+1]=i.b[2*g+1]}return{a:l,aC:a,bT:h,bO:f,ca:i.ca,cb:i.cb,theta:i.theta,lnSigma:Math.log(i.sigma),res:i.res,closed:e&&o,block:null}}function xt(t,s){let e=t.length,o=s.length;if(e===0||o===0)throw new Error("morphicons: icon has no subpaths");let n=t.map(i=>i.pts),c=s.map(i=>i.pts),r=$t(n,c).map(([i,l])=>qt(n[i],c[l],t[i].closed,s[l].closed,!0));return r.length>1&&_t(r,n[0].length/2),{items:r,n:n[0].length/2}}function Rt(t,s,e){let o=6*s,n=1-e,c=3*n*n,r=6*n*e,i=3*e*e,l=c*(t[o+2]-t[o])+r*(t[o+4]-t[o+2])+i*(t[o+6]-t[o+4]),a=c*(t[o+3]-t[o+1])+r*(t[o+5]-t[o+3])+i*(t[o+7]-t[o+5]);return Math.hypot(l,a)}function Dt(t,s,e=1){let o=e/2,n=0;for(let c=0;c<4;c++)n+=me[c]*(Rt(t,s,o+o*bn[c])+Rt(t,s,o-o*bn[c]));return n*o}function ge(t,s,e,o,n){let c=6*s,r=1-e,i=r*r*r,l=3*r*r*e,a=3*r*e*e,h=e*e*e;o[n]=i*t[c]+l*t[c+2]+a*t[c+4]+h*t[c+6],o[n+1]=i*t[c+1]+l*t[c+3]+a*t[c+5]+h*t[c+7]}function yn(t,s,e){let o=6*s,n=e?o+6:o,c=e?-1:1;for(let r of e?[4,2,0]:[2,4,6]){let i=c*(t[o+r]-t[n]),l=c*(t[o+r+1]-t[n+1]);if(i*i+l*l>1e-18)return[i,l]}return null}function pe(t,s=xn){let e=t.pts,o=(e.length/2-1)/3,n=[];for(let i=0;i<o;i++)Dt(e,i)>1e-9&&n.push(i);if(n.length===0)return[];let c=new Set,r=(i,l)=>{let a=yn(e,i,!0),h=yn(e,l,!1);!a||!h||Math.abs(Math.atan2(a[0]*h[1]-a[1]*h[0],a[0]*h[0]+a[1]*h[1]))>s&&c.add(l)};for(let i=0;i+1<n.length;i++)r(n[i],n[i+1]);return t.closed&&n.length>1&&r(n[n.length-1],n[0]),[...c].sort((i,l)=>i-l)}function de(t,s,e,o){if(e<=0)return 0;if(e>=o)return 1;let n=0,c=1,r=e/o;for(let i=0;i<12;i++){let l=Dt(t,s,r)-e;if(Math.abs(l)<1e-10*o+1e-14)break;l>0?c=r:n=r;let a=Rt(t,s,r),h=a>1e-12?r-l/a:(n+c)/2;h>n&&h<c||(h=(n+c)/2),r=h}return r}function ft(t,s=64,e=xn){let o=t.pts,n=(o.length/2-1)/3,c=new Float64Array(2*s),r=()=>{for(let p=0;p<s;p++)c[2*p]=o[0],c[2*p+1]=o[1];return c};if(n<1)return r();let i=new Array(n),l=0;for(let p=0;p<n;p++)i[p]=Dt(o,p),l+=i[p];if(l<1e-12)return r();let a=pe(t,e),h=t.closed?a.length>0?a:[0]:[...new Set([0,...a,n])].sort((p,b)=>p-b),f=[];if(t.closed)for(let p=0;p<h.length;p++){let b=h[p],k=p+1<h.length?h[p+1]:h[0]+n;f.push([b,k])}else for(let p=0;p+1<h.length;p++)f.push([h[p],h[p+1]]);let m=f.map(([p,b])=>{let k=0;for(let S=p;S<b;S++)k+=i[S%n];return k}),u=t.closed?s:s-1;if(f.length>u)throw new Error(`morphicons: N=${s} too small (${f.length} runs)`);let g=m.reduce((p,b)=>p+b,0)||1,d=m.map(p=>u*p/g),M=d.map(p=>Math.max(1,Math.floor(p))),y=u-M.reduce((p,b)=>p+b,0);if(y>0){let p=d.map((b,k)=>[Math.round((b-Math.floor(b))*1e9),k]).sort((b,k)=>k[0]-b[0]||b[1]-k[1]);for(let b=0;b<y;b++)M[p[b%M.length][1]]++}for(;y<0;){let p=0;for(let b=1;b<M.length;b++)M[b]>M[p]&&(p=b);if(M[p]<=1)break;M[p]--,y++}let x=0;for(let p=0;p<f.length;p++){let[b,k]=f[p],S=M[p],I=m[p],A=6*(b%n);c[2*x]=o[A],c[2*x+1]=o[A+1],x++;let N=b,v=0;for(let T=1;T<S;T++){let R=I*T/S;for(;N<k-1&&v+i[N%n]<R;)v+=i[N%n],N++;let L=N%n,_=i[L];ge(o,L,_>1e-12?de(o,L,R-v,_):0,c,2*x),x++}}if(!t.closed){let p=6*n;c[2*x]=o[p],c[2*x+1]=o[p+1]}return c}function wn(t,s=64){return Y(t).map(e=>({pts:ft(e,s),closed:e.closed}))}var ie,le,ae,fe,xn,bn,me,Gt=dt(()=>{yt();ie=.35,le=.05,ae=.005,fe=8;xn=Math.PI/8,bn=[.18343464249564978,.525532409916329,.7966664774136267,.9602898564975363],me=[.362683783378362,.31370664587788727,.22238103445337448,.10122853629037626]});function q(t){if(typeof t=="string")return"stroke";for(let[,s]of t)if(wt(s.fill))return"fill";return"stroke"}function Yt(t){return typeof t=="string"||q(t)==="stroke"?t:t.filter(([,s])=>!Wt(s))}function kt(t){return typeof t!="string"&&t.length===1&&"data-region"in t[0][1]}function U(t,s,e){let o=e.length/2,n=!1;for(let c=0,r=o-1;c<o;r=c++){let i=e[2*c+1],l=e[2*r+1];i>s!=l>s&&t<(e[2*r]-e[2*c])*(s-i)/(l-i)+e[2*c]&&(n=!n)}return n}function ut(t,s,e,o,n,c){let r=n-e,i=c-o,l=r*r+i*i,a=l>0?((t-e)*r+(s-o)*i)/l:0;a=a<0?0:a>1?1:a;let h=t-e-a*r,f=s-o-a*i;return Math.sqrt(h*h+f*f)}function z(t){let s=t.length/2,e=0;for(let o=0,n=s-1;o<s;n=o++)e+=t[2*n]*t[2*o+1]-t[2*o]*t[2*n+1];return e/2}var kn,wt,Wt,zt=dt(()=>{kn="data-region",wt=t=>t!==void 0&&String(t).trim().toLowerCase()!=="none";Wt=t=>Number.parseFloat(String(t.opacity))<.5||Number.parseFloat(String(t["fill-opacity"]))<.5});var Dn={};cn(Dn,{buildRegionPlan:()=>Xt,isRegion:()=>kt,paintOf:()=>q,regionContours:()=>Rn,regionOf:()=>tt,regionPlan:()=>$n,regionPlanFrom:()=>qn,resampleRegion:()=>Bt,toRegion:()=>_n});function ye(t,s){let e=s.length/2,o=0;for(let n=0;n<t.length;n+=6)for(let c=0;;c++){if(c===e)return!0;let r=(o+c)%e,i=(r+1)%e;if(ut(t[n],t[n+1],s[2*r],s[2*r+1],s[2*i],s[2*i+1])<=be){o=r;break}}return!1}function Bt(t,s){let e=Y(t),o=c=>e.map(r=>{let i;for(let a of Me)try{i=ft({pts:r.pts,closed:!0},c,a);break}catch{}let l=i;return{pts:l,closed:!0,hole:z(l)<0}}),n=o(s??64);return s||!e.some((c,r)=>ye(c.pts,n[r].pts))?n:o(128)}function ke(t,s){let e=t.length,o=new Float64Array(e);for(let n=0;n<e;n++)o[n]=(t[n]+s[n])/2;for(let n=0;n<e;n+=2){let c=o[n],r=o[n+1],i=o[(n+2)%e]-c,l=o[(n+3)%e]-r;for(let a=n+4;a<e-(n?0:2);a+=2){let h=o[a],f=o[a+1],m=o[(a+2)%e]-h,u=o[(a+3)%e]-f;if(!((i*(f-r)-l*(h-c))*(i*(f+u-r)-l*(h+m-c))>=0)&&(m*(r-f)-u*(c-h))*(m*(r+l-f)-u*(c+i-h))<0)return!0}}return!1}function Ie(t,s){let e=t.length/2,o=e>64?2:1,n=(f,m)=>o>1?f.filter((u,g)=>(g>>1)%2===m):f,c=n(t,0),r=C(c),i=[n(s,0),n(s,1)],l=i.map(C),a=[];for(let f=0;f<e;f++){let m=f%o,u=lt(c,K(i[m],(f-m)/o),r,l[m]);a.push([f,u.res+In*Math.abs(u.theta)/Math.PI])}a.sort((f,m)=>f[1]-m[1]);let h;for(let[f,m]of a.slice(0,we)){if(m>a[0][1]+xe)break;let u=qt(t,K(s,f),!1,!1,!1,In);if(u.closed=!0,h??=u,!ke(n(u.aC,0),n(u.bT,0)))return u}return h}function Ae(t,s){let e=t.length/2,o=-1,n=1/0;return s.forEach((c,r)=>{if(c.hole)return;let i=0;for(let a of[0,Math.floor(e/3),Math.floor(2*e/3)])U(t[2*a],t[2*a+1],c.pts)&&i++;if(i<2)return;let l=Math.abs(z(c.pts));l<n&&(n=l,o=r)}),o}function An(t,s,e,o){let n=t.length,c=e.length,r=new Array(n).fill(-1),i=new Array(c).fill(0);if((c+1)**n>1e5){let f=[];for(let m=0;m<n;m++)for(let u=0;u<c;u++)t[m][u]<1/0&&f.push([t[m][u],m,u]);f.sort((m,u)=>m[0]-u[0]);for(let[,m,u]of f)r[m]<0&&!i[u]&&(r[m]=u,i[u]=1);for(let m=0;m<n;m++)if(!(r[m]>=0))for(let u=0;u<c;u++)!e[u]&&(r[m]<0||t[m][u]<t[m][r[m]])&&(r[m]=u);return r}let l=r.slice(),a=1/0,h=(f,m,u)=>{if(!(m>=a||o&&c-u>n-f)){if(f===n){a=m,l=r.slice();return}for(let g=0;g<c;g++)e[g]&&i[g]||!(t[f][g]<1/0)||(r[f]=g,i[g]++,h(f+1,m+t[f][g],u+(i[g]===1?1:0)),i[g]--);r[f]=-1,h(f+1,m+s[f],u)}};return h(0,0,0),l}function Nt(t,s,e,o,n,c){let r=Math.cos(n)*c,i=Math.sin(n)*c,l=t-e[0],a=s-e[1];return[o[0]+l*r-a*i,o[1]+l*i+a*r]}function Qt(t,s){let e=new Float64Array(2*s);for(let o=0;o<2*s;o+=2)e[o]=t[0],e[o+1]=t[1];return e}function ht(t,s,e,o,n){let c=t.length/2,r=Math.exp(e.lnSigma),i=new Float64Array(2*c),l=new Float64Array(2*c),a=0;for(let m=0;m<2*c;m+=2)i[m]=t[m]-e.ca[0],i[m+1]=t[m+1]-e.ca[1],[l[m],l[m+1]]=Nt(s[m],s[m+1],e.cb,[0,0],-e.theta,1/r),a+=(s[m]-e.cb[0])**2+(s[m+1]-e.cb[1])**2;let h=0,f=1/0;for(let m=0;m<c&&f>0;m++){let u=0;for(let g=0;g<c&&u<f;g++){let d=(g+m)%c;u+=(i[2*g]-l[2*d])**2+(i[2*g+1]-l[2*d+1])**2}u<f&&(f=u,h=m)}return{a:t,aC:i,bT:K(l,h),bO:K(s,h),ca:e.ca,cb:e.cb,theta:e.theta,lnSigma:e.lnSigma,res:a>1e-12?Math.sqrt(r*r*f/a):0,closed:!0,hole:o,half:n,block:e.block}}function It(t,s,e){let o=Math.exp(s.lnSigma),[n,c]=C(t),{aC:r,bT:i}=s,l=e?s.bO:s.a,a=0,h=0,f=0;for(let u=0;u<r.length;u+=2){let g=1/((l[u]-n)**2+(l[u+1]-c)**2+1e-9);a+=g,h+=g*(i[u]-r[u]),f+=g*(i[u+1]-r[u+1])}a=(e?-.5:.5)/a,e&&([n,c]=Nt(n,c,s.cb,s.ca,-s.theta,1/o)),n+=a*h,c+=a*f;let m=Qt(e?[n,c]:Nt(n,c,s.ca,s.cb,s.theta,o),t.length/2);return e?ht(m,t,s,!0,1):ht(t,m,s,!0,0)}function Vt(t,s,e){let o=0;for(let n of[.25,.5,.75]){if(!(Nn(t,n)%1))continue;let[c,r,...i]=[t,s,...e.filter(l=>l!==t)].map(l=>l.aC.map((a,h)=>a+Nn(l,n)*(l.bT[h]-a)));for(let l=0;l<c.length;l+=2)(!U(c[l],c[l+1],r)||i.some(a=>U(c[l],c[l+1],a)))&&o++}return o}function vn(t,s,e){let o=C(t),n={ca:o,cb:o,theta:0,lnSigma:0,block:null},c=Qt(o,t.length/2);return[t,...s].map((r,i)=>e?ht(c,r,n,i>0):ht(r,c,n,i>0))}function Tn(t){let s=[t[0],t[1],t[0],t[1]];for(let e=2;e<t.length;e+=2)s[0]=Math.min(s[0],t[e]),s[1]=Math.min(s[1],t[e+1]),s[2]=Math.max(s[2],t[e]),s[3]=Math.max(s[3],t[e+1]);return s}function ve(t,s,e){let o=Math.exp(e.lnSigma),n=H(t,s),c=s.map(r=>{let i=new Float64Array(r.length);for(let l=0;l<r.length;l+=2)[i[l],i[l+1]]=Nt(r[l],r[l+1],e.cb,e.ca,-e.theta,1/o);return Tn(i)});return t.forEach((r,i)=>{let l=Tn(r);c.forEach((a,h)=>{let f=Math.min(l[2],a[2])-Math.max(l[0],a[0]),m=Math.min(l[3],a[3])-Math.max(l[1],a[1]),u=f>0&&m>0?f*m:0,g=(l[2]-l[0])*(l[3]-l[1])+(a[2]-a[0])*(a[3]-a[1])-u;u>=Ne*g||(n[i][h]=1/0)})}),n}function Pn(t){let s=[];t.forEach((o,n)=>{o.hole||s.push(n)});let e=s.map(()=>[]);return t.forEach(o=>{if(!o.hole)return;let n=s.indexOf(Ae(o.pts,t));if(n<0){let[c,r]=C(o.pts),i=1/0;s.forEach((l,a)=>{let[h,f]=C(t[l].pts),m=Math.hypot(h-c,f-r);m<i&&(i=m,n=a)})}e[n].push(o.pts)}),{outers:s.map(o=>t[o].pts),holes:e}}function Te(t){let s=t.length,e=new Float64Array(2*s);for(let o=0;o<s;o+=2){let n=(o+2)%s;e[2*o]=t[o],e[2*o+1]=t[o+1],e[2*o+2]=(t[o]+t[n])/2,e[2*o+3]=(t[o+1]+t[n+1])/2}return e}function Xt(t,s){let e=Math.max(t[0].pts.length,s[0].pts.length)/2,o=u=>u[0].pts.length/2<e?u.map(g=>({...g,pts:Te(g.pts)})):u,n=Pn(o(t)),c=Pn(o(s));if(n.outers.length===0||c.outers.length===0)throw new Error("morphicons: region has no outer contour");let r,i=n.outers.length,l=c.outers.length,[a,h]=i<l?[c,n]:[n,c];i===l||h.holes.every(u=>u.length===0)?r=$t(n.outers,c.outers):r=An(H(a.outers,h.outers),a.outers.map(u=>Sn+Se(u)),h.holes.map(u=>u.length>0),!0).map((u,g)=>i<l?[u,g]:[g,u]);let f=[],m=!1;for(let[u,g]of r){if(u<0||g<0){m=!0,f.push(...u<0?vn(c.outers[g],c.holes[g],!0):vn(n.outers[u],n.holes[u],!1));continue}let d=Ie(n.outers[u],c.outers[g]);d.hole=!1,f.push(d);let M=n.holes[u],y=c.holes[g],x=An(ve(M,y,d),M.map(()=>Sn),y.map(()=>!0),!1),p=M.map((b,k)=>x[k]<0?It(b,d,!1):ht(b,y[x[k]],d,!0));y.forEach((b,k)=>{x.includes(k)||p.push(It(b,d,!0))});for(let b=0;b<p.length;b++){let k=p[b];if(k.half!==void 0){m=!0;continue}let S=Vt(k,d,p);S&&(p.splice(b,1,It(k.a,d,!1),It(k.bO,d,!0)),Vt(p[b],d,p)+Vt(p[b+1],d,p)>=S&&p.splice(b,2,k))}f.push(...p)}return f.length>1&&!m&&_t(f,e),{items:f,n:e}}function On(t,s){let e=[],o=[];for(let{pts:n,closed:c}of Y(t)){let r=[n[0],n[1]];for(let i=0;i+7<n.length;i+=6){let l=n[i],a=n[i+1],h=n[i+2],f=n[i+3],m=n[i+4],u=n[i+5],g=n[i+6],d=n[i+7],M=Math.max(Math.hypot(l-2*h+m,a-2*f+u),Math.hypot(h-2*m+g,f-2*u+d)),y=Math.min(128,Math.max(1,Math.ceil(Math.sqrt(6*M/(8*s)))));for(let x=1;x<=y;x++){let p=x/y,b=1-p;r.push(b*b*b*l+3*b*b*p*h+3*b*p*p*m+p*p*p*g,b*b*b*a+3*b*b*p*f+3*b*p*p*u+p*p*p*d)}}e.push(Float64Array.from(r)),o.push(c)}return{lines:e,closed:o}}function Ee(t,s,e){if(typeof t=="string")return[{...On(t,e),half:s/2,fill:0}];let o=q(t)==="fill",n=[];for(let c of t){let r=c[1];if(Wt(r))continue;let i=o?St(r.stroke):r.stroke===void 0||St(r.stroke),l=o&&(St(r.fill)||r.fill===void 0&&!i);!i&&!l||n.push({...On([c],e),half:i?Pe(r["stroke-width"],s)/2:0,fill:l?String(r["fill-rule"]??"").trim()==="evenodd"?2:1:0})}return n}function Fn(t,s,e,o,n,c,r){let i=Math.max(0,Math.floor((Math.min(s,o)-c-t.x0)/t.h)),l=Math.min(t.nx-1,Math.ceil((Math.max(s,o)+c-t.x0)/t.h)),a=Math.max(0,Math.floor((Math.min(e,n)-c-t.y0)/t.h)),h=Math.min(t.ny-1,Math.ceil((Math.max(e,n)+c-t.y0)/t.h));for(let f=a;f<=h;f++){let m=t.y0+f*t.h;for(let u=i;u<=l;u++)r(f*t.nx+u,t.x0+u*t.h,m)}}function Ht(t,s,e){let o=t.length/2;o===1&&e(t[0],t[1],t[0],t[1]);for(let n=0;n+1<o;n++)e(t[2*n],t[2*n+1],t[2*n+2],t[2*n+3]);s&&o>2&&e(t[2*o-2],t[2*o-1],t[0],t[1])}function Oe(t,s){let e=new Float32Array(s.nx*s.ny).fill(En),o=2*s.h,n=null;for(let c of t){if(c.half>0){let r=c.half+o;c.lines.forEach((i,l)=>{Ht(i,c.closed[l],(a,h,f,m)=>Fn(s,a,h,f,m,r,(u,g,d)=>{let M=ut(g,d,a,h,f,m)-c.half;M<e[u]&&(e[u]=M)}))})}if(c.fill){n??=new Float32Array(s.nx*s.ny);let r=n;r.fill(En);for(let a of c.lines)Ht(a,!0,(h,f,m,u)=>Fn(s,h,f,m,u,o,(g,d,M)=>{let y=ut(d,M,h,f,m,u);y<r[g]&&(r[g]=y)}));let i=[],l=[];for(let a=0;a<s.ny;a++){let h=s.y0+a*s.h,f=[];for(let g of c.lines)Ht(g,!0,(d,M,y,x)=>{M<=h!=x<=h&&f.push([d+(h-M)*(y-d)/(x-M),x>M?1:-1])});f.sort((g,d)=>g[0]-d[0]),i.length=0,l.length=0;for(let[g,d]of f)i.push(g),l.push(d);let m=0,u=0;for(let g=0;g<s.nx;g++){let d=s.x0+g*s.h;for(;m<i.length&&i[m]<d;)u+=l[m++];let M=c.fill===1?u!==0:(u&1)===1,y=a*s.nx+g,x=M?-r[y]:r[y];x<e[y]&&(e[y]=x)}}}}return e}function Fe(t,s){let{nx:e,ny:o,h:n,x0:c,y0:r}=s,i=new Map,l=u=>{if(i.has(u))return u;let g=u>>1,d=g%e,M=(g-d)/e,y=u&1?g+e:g+1,x=t[g],p=Math.min(Math.max(x/(x-t[y]),1e-5),.99999);return i.set(u,u&1?[c+d*n,r+(M+p)*n]:[c+(d+p)*n,r+M*n]),u},a=new Map,h=(u,g)=>{let d=l(u),M=l(g),y=a.get(d);y?y.push(M):a.set(d,[M]);let x=a.get(M);x?x.push(d):a.set(M,[d])};for(let u=0;u+1<o;u++)for(let g=0;g+1<e;g++){let d=u*e+g,M=d+1,y=d+e+1,x=d+e,p=t[d]<0,b=t[M]<0,k=t[y]<0,S=t[x]<0,I=2*d,A=2*M+1,N=2*x,v=2*d+1,T=[];p!==b&&T.push(I),b!==k&&T.push(A),S!==k&&T.push(N),p!==S&&T.push(v),T.length===2?h(T[0],T[1]):T.length===4&&((t[d]+t[M]+t[y]+t[x])/4<0===p?(h(I,A),h(N,v)):(h(v,I),h(A,N)))}let f=[],m=new Set;for(let u of a.keys()){if(m.has(u))continue;let g=[],d=-1,M=u;for(;!m.has(M);){m.add(M);let y=i.get(M);g.push(y[0],y[1]);let x=a.get(M),p=x[0]!==d?x[0]:x[1];d=M,M=p}g.length>=6&&f.push(Float64Array.from(g))}return f}function vt(t,s,e,o,n){let c=t.length/2,r=t[2*(s%c)],i=t[2*(s%c)+1],l=t[2*(e%c)],a=t[2*(e%c)+1],h=-1,f=o;for(let m=s+1;m<e;m++){let u=ut(t[2*(m%c)],t[2*(m%c)+1],r,i,l,a);u>f&&(f=u,h=m)}h<0||(n[h%c]=1,vt(t,s,h,o,n),vt(t,h,e,o,n))}function je(t,s){let e=t.length/2;if(e<4)return t;let o=0,n=-1;for(let i=1;i<e;i++){let l=Math.hypot(t[2*i]-t[0],t[2*i+1]-t[1]);l>n&&(n=l,o=i)}let c=new Uint8Array(e);c[0]=1,c[o]=1,vt(t,0,o,s,c),vt(t,o,e,s,c);let r=[];for(let i=0;i<e;i++)c[i]&&r.push(t[2*i],t[2*i+1]);return Float64Array.from(r)}function Le(t,s){let e=t.length/2;if(e<4)return t;let o=l=>{let a=l%e,h=(l+1)%e;return Math.hypot(t[2*h]-t[2*a],t[2*h+1]-t[2*a+1])},n=[];for(let l=0;l<e;l++)o(l)>=2.5*s&&n.push(l);if(n.length<2)return t;let c=new Uint8Array(e),r=new Map;for(let l=0;l<n.length;l++){let a=n[l],h=n[(l+1)%n.length],f=(h-a-1+e)%e;if(f<1||f>3)continue;let m=0;for(let v=1;v<=f;v++)m+=o(a+v);if(m>3*s)continue;let u=a%e,g=(a+1)%e,d=h%e,M=(h+1)%e,y=t[2*g]-t[2*u],x=t[2*g+1]-t[2*u+1],p=t[2*M]-t[2*d],b=t[2*M+1]-t[2*d+1],k=y*b-x*p;if(Math.abs(Math.atan2(k,y*p+x*b))<Math.PI/12)continue;let S=((t[2*d]-t[2*u])*b-(t[2*d+1]-t[2*u+1])*p)/k,I=[t[2*u]+S*y,t[2*u+1]+S*x],A=(t[2*g]+t[2*d])/2,N=(t[2*g+1]+t[2*d+1])/2;if(!(Math.hypot(I[0]-A,I[1]-N)>2*s)){r.set(g,I);for(let v=2;v<=f+1;v++)c[(a+v)%e]=1}}if(r.size===0)return t;let i=[];for(let l=0;l<e;l++){if(c[l])continue;let a=r.get(l);a?i.push(a[0],a[1]):i.push(t[2*l],t[2*l+1])}return Float64Array.from(i)}function Rn(t,s){let e=s?.cell??.125,o=Ee(t,s?.strokeWidth??2,.004),n=Number.POSITIVE_INFINITY,c=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,i=Number.NEGATIVE_INFINITY,l=0;for(let f of o){l=Math.max(l,f.half);for(let m of f.lines)for(let u=0;u<m.length;u+=2)n=Math.min(n,m[u]),r=Math.max(r,m[u]),c=Math.min(c,m[u+1]),i=Math.max(i,m[u+1])}if(!(r>=n))return[];l+=3*e;let a={x0:n-l,y0:c-l,h:e,nx:Math.ceil((r-n+2*l)/e)+1,ny:Math.ceil((i-c+2*l)/e)+1},h=Fe(Oe(o,a),a).filter(f=>Math.abs(z(f))>.01);return h.map(f=>{let m=0;for(let g of h)g!==f&&U(f[0],f[1],g)&&m++;let u=m%2===1;return Le(je(z(f)>0==!u?f:at(f),e*.08),e)})}function _n(t,s){if(kt(t))return t;let e="";for(let o of Rn(t,s)){e+=`M${At(o[0])} ${At(o[1])}`;for(let n=2;n<o.length;n+=2)e+=`L${At(o[n])} ${At(o[n+1])}`;e+="Z"}if(!e)throw new Error("morphicons: icon has no visible surface");return[["path",{d:e,fill:"currentColor",stroke:"none","fill-rule":"nonzero",[kn]:"1"}]]}function tt(t,s){if(kt(t))return t;let e=q(t)==="fill"&&!t.some(([,r])=>St(r.stroke)&&r["stroke-width"]===void 0)?0:s,o=typeof t=="string"?void 0:jn.get(t),n=o?.get(e);if(n)return n;let c=`${e}|${typeof t=="string"?t:JSON.stringify(t)}`;return n=J.get(c),n?J.delete(c):n=_n(t,{strokeWidth:s}),J.set(c,n),J.size>64&&J.delete(J.keys().next().value),typeof t!="string"&&(o||(o=new Map,jn.set(t,o)),o.set(e,n)),n}function Ut(t){let s=Ln.get(t);return s||(s=Bt(t),Ln.set(t,s)),s}function $n(t,s,e){let o=tt(t,e),n=tt(s,e),c=Cn.get(o);c||(c=new WeakMap,Cn.set(o,c));let r=c.get(n);return r||(r=Xt(Ut(o),Ut(n)),c.set(n,r)),r}function qn(t,s,e){return Xt(typeof t=="string"?Bt(tt(t,e)):t,Ut(tt(s,e)))}var Me,be,In,xe,we,Sn,Nn,Se,Ne,En,St,Pe,At,jn,J,Ln,Cn,Gn=dt(()=>{yt();Gt();zt();Me=[Math.PI/4,Math.PI/3,Math.PI/2,Math.PI],be=.3;In=.3,xe=.1,we=16;Sn=1e6;Nn=(t,s)=>Math.min(1,Math.max(0,2*s-(t.half??s)));Se=t=>H([t],[Qt(C(t),t.length/2)])[0][0];Ne=.25;En=1e9,St=t=>t!==void 0&&String(t).trim().toLowerCase()!=="none",Pe=(t,s)=>{let e=typeof t=="number"?t:Number.parseFloat(String(t??""));return Number.isFinite(e)?e:s};At=t=>String(Math.round(t*1e3)/1e3);jn=new WeakMap,J=new Map,Ln=new WeakMap,Cn=new WeakMap;globalThis[Symbol.for("morphicons.region")]={regionOf:tt,regionPlan:$n,regionPlanFrom:qn}});var Ve={};cn(Ve,{_c:()=>nn,createMorph:()=>nn});function ln(t){return t.items.map(()=>new Float64Array(2*t.n))}function Ft(t,s,e){for(let o=0;o<t.items.length;o++){let n=t.items[o],c=e[o],r=t.n,i=Math.exp(n.lnSigma*s),l=n.theta*s,a=Math.cos(l)*i,h=Math.sin(l)*i,f,m;if(n.block){let[g,d]=n.block.off,[M,y]=n.block.drift;f=n.ca[0]+M*s+(g*a-d*h-g),m=n.ca[1]+y*s+(g*h+d*a-d)}else f=n.ca[0]+(n.cb[0]-n.ca[0])*s,m=n.ca[1]+(n.cb[1]-n.ca[1])*s;let u=n.half===void 0?s:Math.min(1,Math.max(0,2*s-n.half));for(let g=0;g<r;g++){let d=n.aC[2*g]+(n.bT[2*g]-n.aC[2*g])*u,M=n.aC[2*g+1]+(n.bT[2*g+1]-n.aC[2*g+1])*u;c[2*g]=f+d*a-M*h,c[2*g+1]=m+d*h+M*a}}}var an=class{x=1;v=0;k=250;c=24;config(t,s){this.k=t,this.c=s}start(){this.x=0,this.v>14&&(this.v=14),this.v<-14&&(this.v=-14)}step(t){let s=Math.max(1,Math.min(16,Math.ceil(t/.004166666666666667))),e=t/s;for(let o=0;o<s;o++){let n=this.k*(1-this.x)-this.c*this.v;this.v+=n*e,this.x+=this.v*e}return Math.abs(1-this.x)<.001&&Math.abs(this.v)<.02}},jt={smooth:{k:170,c:26},snappy:{k:420,c:30},bouncy:{k:300,c:14}};yt();Gt();zt();var gt=new Set,Q=0,nt=-1;function Xn(t){let s=nt<0?0:Math.min(Math.max((t-nt)/1e3,0),.1);nt=t;for(let e of[...gt])e(s);gt.size>0?Q=requestAnimationFrame(Xn):(Q=0,nt=-1)}function Ce(t){gt.add(t),Q===0&&(nt=-1,Q=requestAnimationFrame(Xn))}function Re(t){gt.delete(t),gt.size===0&&Q!==0&&(cancelAnimationFrame(Q),Q=0,nt=-1)}var Wn=new WeakMap,Yn=new WeakMap,zn=new WeakMap;function Zn(t){return typeof t=="string"||q(t)==="stroke"?Y(t):Yt(t).flatMap(s=>{let e=Y([s]),o=String(s[1]["fill-rule"]).trim()==="evenodd",n=0;for(let c of e)n+=z(c.pts);for(let c of e){let r=n<0;if(o){let i=!0;for(let l of e)l!==c&&U(c.pts[0],c.pts[1],l.pts)&&(i=!i);r=z(c.pts)>0!==i}r&&(c.pts=at(c.pts))}return e})}function B(t){if(typeof t=="string")return wn(t);let s=Wn.get(t);return s||(s=Zn(t).map(e=>({pts:ft(e,64),closed:e.closed})),Wn.set(t,s)),s}function _e(t){if(typeof t=="string")return t;let s=Yn.get(t);return s||(s=pn(Zn(t)),Yn.set(t,s)),s}function $e(t,s){if(typeof t=="string"||typeof s=="string")return xt(B(t),B(s));let e=zn.get(t);e||(e=new WeakMap,zn.set(t,e));let o=e.get(s);return o||(o=xt(B(t),B(s)),e.set(s,o)),o}var G=null,mt=null,Kt=0,tn=!1,Vn,Zt=0,Kn=()=>Promise.resolve().then(()=>(Gn(),Dn));var qe=t=>new Promise((s,e)=>{let o=document.createElement("script");o.type="module",o.onload=o.onerror=()=>{o.remove();let n=globalThis[Symbol.for("morphicons.region")];n?s(n):e(new Error(t))},o.src=`${t}#${Date.now()}`,document.head.append(o)}),De=()=>{let t=/import\(\s*["'`]([^"'`]+)/.exec(String(Kn))?.[1],s=/\w+:\/\/[^\s)]+?(?=:\d+:\d+)/.exec(String(new Error().stack))?.[0];try{return t&&new URL(t,s).href}catch{}};function Jt(){if(G)return Promise.resolve(G);if(!mt){Kt=Date.now();let t=Vn,s=Zt;mt=Kn().catch(e=>t?qe(t):Promise.reject(e)).then(e=>(s===Zt&&(G=e),e),e=>{throw s!==Zt||(mt=null,tn=!0,Vn??=/dynamically imported module:?\s*(\S+)/i.exec(String(e?.message))?.[1]??De()),e})}return mt}var Ge=()=>new Promise((t,s)=>{if(!(typeof navigator>"u")&&navigator.connection?.saveData)return;let e=()=>{tn?s():Jt().then(t,s)};typeof requestIdleCallback=="function"?requestIdleCallback(e,{timeout:2e3}):setTimeout(e,200)}),Hn=100,We=t=>t==="stroke"?{fill:"none",stroke:"inherit"}:{fill:"currentColor",stroke:t==="fill"?"none":"inherit","fill-rule":"nonzero"},Un=new WeakMap,Bn=new WeakSet;function Qn(t){if(typeof t=="string"||q(t)==="stroke")return"stroke";let s=Un.get(t);if(s)return s;let e=0,o=-1;s="fill";for(let n of Yt(t)){let c=wt(n[1].stroke),r=wt(n[1].fill)||n[1].fill===void 0&&!c;c&&(s="both");let i=0;for(let l of Y([n]))i+=Math.abs(z(l.pts));r?e+=i:c&&(o=Math.max(o,0)+i)}return o>1.5*e&&(s="stroke"),Un.set(t,s),s}function Ye(t,s){let o=({pts:n,closed:c},r)=>{n.length>128&&(n=n.filter((h,f)=>f%4<2));let i=C(n),l=n.map((h,f)=>h-i[f&1]),a=new Float64Array(128);return{aC:r?a:l,bT:r?l:a,ca:i,cb:i,theta:0,lnSigma:0,closed:c,half:r,block:null}};return{n:64,items:[...t.map(n=>o(n,0)),...s.map(n=>o(n,1))]}}function ze(t){if(typeof t=="string")return jt[t];let s=jt.snappy;return{k:t?.stiffness??s.k,c:t?.damping??s.c}}function nn(t,s,e){let o=new an,n=e?.reducedMotion??"never",c=e?.strokeWidth??2,r=s,i=!0,l=null,a=null,h=null,f=1,m=!1,u=!1,g=!1,d=!1,M=null,y="stroke",x=!Bn.has(t),p=0,b="stroke",k=null,S=w=>{if(!(w===y&&x)){for(let[P,E]of Object.entries(We(w)))t.setAttribute(P,E);y=w,x=!0,Bn.add(t)}},I=w=>{let P=G&&q(w)==="fill"?G.regionOf(w,c):w;t.setAttribute("d",_e(P)),S(Qn(P))},A=w=>{let P=r;w.then(()=>{!u&&i&&r===P&&M===null&&I(P)},()=>{})};I(s),q(s)==="fill"&&!G&&A(Ge());let N=w=>p?w<.5?[0,p]:[p,l?.items.length??0]:[0,l?.items.length??0],v=w=>{let P=l,E=a,F=h;if(!P||!E||!F)return;f=w,Ft(P,w,E),d=!0;let[$,D]=N(w);p&&S(w<.5?b:Qn(r)),t.setAttribute("d",Ct(E.slice($,D),F.slice($,D)))},T=()=>{m&&(m=!1,Re(R))},R=w=>{let P=o.step(w);v(o.x),P&&(T(),L())},L=()=>{i=!0,l=null,a=null,h=null,f=1,o.x=1,o.v=0,g=!1,p=0,I(r),q(r)==="fill"&&!G&&(mt||!tn)&&A(Jt())},_=()=>{let w=l,P=a;if(i||!w||!P)return B(r);let[E,F]=N(f);return P.slice(E,F).map(($,D)=>({pts:Float64Array.from($),closed:w.items[E+D].closed,hole:w.items[E+D].hole}))},et=w=>!i&&g||q(w)==="fill"||q(r)==="fill",ot=(w,P)=>{if(!i&&l&&a&&!d&&(f=0,Ft(l,0,a)),P||!i&&p){let E=_();k=i?r:null,b=y,l=Ye(E,B(w)),p=E.length,g=!1}else if(et(w)){let E=G;l=i||!a?E.regionPlan(r,w,c):E.regionPlanFrom(g?_():Ct(a,h??void 0),w,c),g=!0,p=0,S("fill")}else l=i?$e(r,w):xt(_(),B(w)),g=!1;a=ln(l),d=!1,h=l.items.map(E=>E.closed),r=w,i=!1},X=(w,P,E)=>{if(G||!i&&p||!et(w))return!1;let F={};M=F;let $=()=>{u||M!==F||(M=null,E())},D=Jt();if(Date.now()-Kt>Hn)return $(),!0;let pt=setTimeout($,Hn-(Date.now()-Kt));return D.then(()=>{clearTimeout(pt),!(u||M!==F)&&(M=null,P())},()=>{clearTimeout(pt),$()}),!0},st=w=>{T(),M=null,r=w,L()},Z=()=>n==="always"?!0:n!=="user"||typeof matchMedia>"u"?!1:matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,W=(w,P,E=!1)=>{if(u||!E&&X(w,()=>W(w,P),()=>W(w,P,!0)))return;M=null;let F=!i&&l!==null&&w===r;F&&p&&G&&k!==null&&(r=k,i=!0,F=!1),T(),o.v=0,F||ot(w,E),v(P)},rt=(w,P,E)=>{if(u)return;if(w===r&&(i||m)){M=null;return}if(Z()){st(w);return}if(!E&&X(w,()=>rt(w,P,!1),()=>rt(w,P,!0)))return;M=null;let{k:F,c:$}=ze(P);o.config(F,$),ot(w,E),o.start(),m||(m=!0,Ce(R))};return{morphTo:(w,P)=>rt(w,P,!1),set(w){u||st(w)},seek:W,get progress(){return i?1:f},set progress(w){u||W(r,w)},get reducedMotion(){return n},set reducedMotion(w){n=w},get strokeWidth(){return c},set strokeWidth(w){c=w},destroy(){T(),u=!0,M=null,l=null,a=null,h=null}}}return se(Ve);})();

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
  KD.txSave = async (comp, d) => {
    const c = sb(), id = d.id, r = KD.M.rowById[id];
    const p = {};
    const nm = (d.nome || '').trim(); if (nm && nm !== r.e) p.apelido = nm;
    if ((d.obs || '') !== (r.obs || '')) p.observacao = d.obs || null;
    if (d.iso && d.iso !== r.iso) p.data_compra = d.iso;
    if (d.cardId !== (r.cardId || null) || d.accId !== (r.accId || null)) { p.card_id = d.cardId || null; p.account_id = d.cardId ? null : (d.accId || null); }
    if (d.catId && d.catId !== r.catId) { p.category_id = d.catId; p.status = 'confirmado'; p.categoria_origem = 'usuario'; }
    if (Object.keys(p).length) ck(await c.from('transactions').update(p).eq('id', id));
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
    plus: '<path d="M12 5v14M5 12h14"/>'
  };
  const svg = (k, w, sw, col) => '<svg width="' + w + '" height="' + w + '" viewBox="0 0 24 24" fill="none" stroke="' + (col || 'currentColor') + '" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" style="flex:none;display:block">' + I[k] + '</svg>';
  let S = null, host = null, comp = null;

  const cats = () => comp.cats().filter(n => n !== 'Transferência');
  const catId = n => (KD.M.catByName[n] || {}).id || null;
  const catName = id => (KD.M.catById[id] || {}).nome || 'Outros';
  const catCor = n => comp.cor(n);
  const catIc = (n, col) => 'url("' + comp.constructor.uri(comp.icSvg(n), col || '#000') + '")';
  const icDot = (n, sz, bg) => '<span style="width:' + sz + 'px;height:' + sz + 'px;flex:none;border-radius:50%;background:' + (bg || catCor(n)) + ';display:flex;align-items:center;justify-content:center"><span style="display:block;width:' + Math.round(sz * .55) + 'px;height:' + Math.round(sz * .55) + 'px;background-image:' + catIc(n) + ';background-size:contain;background-repeat:no-repeat;background-position:center"></span></span>';
  const total = () => S.row.total;
  const somaPartes = () => S.partes.reduce((a, p) => a + p.valor, 0);
  const catAtual = () => catName(S.catId);

  TX.open = function (c, row) {
    comp = c; TX.close(true);
    S = { row, mode: 'dados', nome: row.e, obs: row.obs || '', iso: row.iso, cardId: row.cardId, accId: row.accId, catId: row.catId || catId(row.c), pop: null,
      link: row.nota && row.nota.url || '', texto: '', nota: row.nota ? { url: row.nota.url, chave_acesso: row.nota.chave_acesso, emitente: row.nota.emitente, cnpj: row.nota.cnpj, emitida_em: row.nota.emitida_em, total: row.nota.total } : null,
      itens: row.items.map(i => Object.assign({}, i)), partes: [], notaDirty: false, partesDirty: false, msg: '', busy: false, sel: 0 };
    const idx = {}; row.items.forEach((i, k) => { idx[i.id] = k; });
    S.partes = row.parts.filter(p => !p.auto).map(p => ({ catId: p.catId, valor: p.valor, rotulo: p.rotulo, itens: row.items.filter(i => i.partId === p.id).map(i => idx[i.id]) }));
    const ab = document.querySelector('[data-tx-host]'); if (!ab) return;
    host = ab; host.style.pointerEvents = 'auto'; render(true);
  };
  TX.close = function (quick) {
    if (!host) { S = null; return; }
    const pn = host.querySelector('[data-pn]'), bd = host.querySelector('[data-bd]');
    const done = () => { host.innerHTML = ''; host.style.pointerEvents = 'none'; };
    S = null;
    if (quick || !pn) { done(); return; }
    pn.style.transition = 'opacity .22s ease, transform .3s ' + E; pn.style.opacity = '0'; pn.style.transform = pn.style.transform.replace(/translateY\([^)]*\)/, '') + ' translateY(14px)';
    if (bd) { bd.style.transition = 'opacity .25s ease'; bd.style.opacity = '0'; }
    setTimeout(done, 300);
  };

  /* ---------------- peças ---------------- */
  const lb = (ic, t) => '<div style="display:flex;align-items:center;gap:10px;font-size:20px;font-weight:700;white-space:nowrap;color:#F2F0EB"><span style="color:#9A9AA3;display:flex">' + svg(ic, 22, 2) + '</span>' + t + '</div>';
  const fieldCss = 'background:#000;border:2px solid #2A2A2F;border-radius:28px;padding:15px 20px;font-size:16px;font-weight:500;color:#F2F0EB;font-family:inherit;outline:0;width:100%;box-sizing:border-box;';
  const pill = (t, extra) => '<div style="' + fieldCss + 'border-radius:9999px;text-align:center;font-weight:700;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' + (extra || '') + '">' + t + '</div>';

  function header(eyebrow) {
    const cor = catCor(catAtual());
    return '<div style="display:flex;justify-content:space-between;align-items:flex-end"><div style="min-width:0"><div style="font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9A9AA3">' + eyebrow + '</div><div style="font-size:64px;font-weight:700;letter-spacing:-.06em;line-height:.84;margin-top:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:820px">' + esc(S.nome || '—') + '</div></div>'
      + '<div style="text-align:right;padding-right:' + (S.mode === 'dados' ? 0 : 54) + 'px"><div style="font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9A9AA3">' + (S.row.inn ? 'Total da entrada' : 'Total da compra') + '</div><div style="font-size:76px;font-weight:700;letter-spacing:-.065em;line-height:.8;margin-top:12px;color:' + cor + ';transition:color .3s ease">' + brl(total()) + '<small style="font-size:20px;color:#F2F0EB;letter-spacing:0;margin-left:8px">R$</small></div></div></div>';
  }

  function popCat() {
    return '<div data-pop style="position:absolute;z-index:6;left:0;bottom:calc(100% + 8px);background:#151518;border:1px solid #2A2A2F;border-radius:20px;padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px;width:300px;box-shadow:0 24px 48px rgba(0,0,0,.6);animation:txin .22s ' + E + '">'
      + cats().map(n => { const on = catAtual() === n; return '<span data-a="cat" data-v="' + esc(n) + '" style="display:flex;align-items:center;gap:10px;height:38px;border-radius:12px;border:1px solid ' + (on ? '#F2F0EB' : '#2A2A2F') + ';background:#0D0D10;padding:0 10px;font-size:13.5px;font-weight:700;cursor:pointer;white-space:nowrap;overflow:hidden">' + icDot(n, 22) + '<span style="flex:1;overflow:hidden;text-overflow:ellipsis">' + esc(n) + '</span>' + (on ? '<span style="color:#F2F0EB;display:flex">' + svg('check', 14, 2.6) + '</span>' : '') + '</span>'; }).join('') + '</div>';
  }
  function popCard() {
    const opts = KD.M.cards.map(c => ({ k: 'c:' + c.id, n: c.nick || c.n, cor: c.cor })).concat(KD.M.accs.map(a => ({ k: 'a:' + a.id, n: a.nome, cor: a.cor })));
    const cur = S.cardId ? 'c:' + S.cardId : S.accId ? 'a:' + S.accId : '';
    return '<div data-pop style="position:absolute;z-index:6;left:0;bottom:calc(100% + 8px);background:#151518;border:1px solid #2A2A2F;border-radius:20px;padding:10px;display:flex;flex-direction:column;gap:6px;width:260px;box-shadow:0 24px 48px rgba(0,0,0,.6);animation:txin .22s ' + E + '">'
      + opts.map(o => '<span data-a="meio" data-v="' + o.k + '" style="display:flex;align-items:center;gap:10px;height:38px;border-radius:12px;border:1px solid ' + (o.k === cur ? '#F2F0EB' : '#2A2A2F') + ';background:#0D0D10;padding:0 12px;font-size:13.5px;font-weight:700;cursor:pointer"><i style="width:10px;height:10px;border-radius:50%;background:' + o.cor + '"></i>' + esc(o.n) + '</span>').join('') + '</div>';
  }

  function viewDados() {
    const cn = catAtual(), cor = catCor(cn);
    const meio = S.cardId ? ((KD.M.cardById[S.cardId] || {}).nick || (KD.M.cardById[S.cardId] || {}).n) : S.accId ? ((KD.M.accs.find(a => a.id === S.accId) || {}).nome) : '—';
    const left = '<div style="display:flex;flex-direction:column;gap:10px"><div>' + lb('home', 'Estabelecimento') + '</div><input data-in="nome" value="' + esc(S.nome) + '" style="' + fieldCss + '"></div>'
      + '<div style="display:flex;flex-direction:column;gap:10px;flex:1;min-height:0">' + lb('lines', 'Observação') + '<textarea data-in="obs" placeholder="Adicionar observação" style="' + fieldCss + 'flex:1;resize:none;font-family:inherit"></textarea></div>';
    const mid = '<div style="display:flex;flex-direction:column;gap:10px">' + lb('cal', 'Data') + '<label style="position:relative;display:block">' + pill(dfmt(S.iso), 'pointer-events:none') + '<input data-in="iso" type="date" value="' + esc(S.iso) + '" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%"></label></div>'
      + '<div style="display:flex;flex-direction:column;gap:10px;position:relative">' + lb('card', 'Cartão / Conta') + '<div data-a="pop" data-v="card">' + pill(esc(meio)) + '</div>' + (S.pop === 'card' ? popCard() : '') + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:10px;position:relative">' + lb('tag', 'Categoria') + '<div data-a="pop" data-v="cat" style="display:flex;align-items:center;gap:12px;border-radius:28px;padding:9px 12px 9px 10px;border:2px solid ' + cor + '8C;background:color-mix(in srgb,' + cor + ' 14%,#000);cursor:pointer">' + icDot(cn, 30) + '<b style="font-size:16px;flex:1">' + esc(cn) + '</b><span style="width:28px;height:28px;border-radius:50%;background:#0A0A0A;display:flex;align-items:center;justify-content:center;color:#F2F0EB">' + svg('chev', 14, 2.6) + '</span></div>' + (S.pop === 'cat' ? popCat() : '') + '</div>';
    const nf = S.itens.length ? S.itens.length + (S.itens.length === 1 ? ' item lido' : ' itens lidos') : 'Escaneie ou cole o link<br>pra ver os itens da compra';
    const rail = '<div style="width:331px;flex:none;background:#1C1C20;border-left:1px solid #3A3A40;border-radius:0 30px 30px 0;padding:78px 24px 24px 26px;display:flex;flex-direction:column;gap:14px;box-sizing:border-box">'
      + '<div data-a="mode" data-v="dividir" style="height:54px;flex:none;display:flex;align-items:center;justify-content:center;gap:14px;padding:0 20px;white-space:nowrap;border:2px solid #2A2A2F;border-radius:28px;background:#000;cursor:pointer;transition:border-color .25s ease" onmouseover="this.style.borderColor=\'#51515C\'" onmouseout="this.style.borderColor=\'#2A2A2F\'"><span style="color:#F2F0EB;display:flex">' + svg('split', 30, 1.7) + '</span><div style="display:flex;flex-direction:column;line-height:1.15;align-items:flex-start"><span style="font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase">Dividir transação</span><span style="font-size:12.5px;color:#9A9AA3">' + (S.partes.length ? S.partes.length + ' partes' : 'Separe em categorias') + '</span></div></div>'
      + '<div style="flex:1;min-height:0;position:relative"><svg data-tk style="position:absolute;inset:0;overflow:visible" width="280" height="308"></svg>'
      + '<div data-a="mode" data-v="ler" style="position:absolute;left:0;right:0;top:0;height:244px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase;cursor:pointer;color:#0A0A0A"><span style="display:flex">' + svg('qr', 60, 1.5, '#0A0A0A') + '</span><span>Nota fiscal</span><small style="font-size:12.5px;font-weight:500;letter-spacing:0;text-transform:none;color:#51515C;text-align:center;line-height:1.4;margin-top:-6px">' + nf + '</small></div>'
      + '<div data-a="save" style="position:absolute;left:0;top:244px;width:140px;height:64px;display:flex;align-items:center;justify-content:center;font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase;color:#111114;cursor:pointer;opacity:' + (S.busy ? .5 : 1) + '">' + (S.busy ? 'Salvando…' : 'Salvar') + '</div>'
      + '<div data-a="close" style="position:absolute;left:140px;top:244px;width:140px;height:64px;display:flex;align-items:center;justify-content:center;font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase;color:#6A6A72;cursor:pointer">Cancelar</div></div></div>';
    return '<div style="flex:1;min-width:0;padding:26px 34px 24px 30px;display:flex;flex-direction:column;gap:22px;box-sizing:border-box">' + header('Editando // ' + (S.row.origem === 'open_finance' ? 'Open Finance' : 'Transação'))
      + '<div style="border-top:1px solid #3A3A40;display:grid;grid-template-columns:1fr 304px;flex:1;min-height:0"><div style="padding:24px 28px 0 0;display:flex;flex-direction:column;gap:24px;min-width:0">' + left + '</div><div style="border-left:1px solid #3A3A40;padding:24px 0 0 28px;display:flex;flex-direction:column;gap:20px">' + mid + '</div></div></div>' + rail
      + (S.msg ? '<div style="position:absolute;left:30px;bottom:14px;font-size:12.5px;color:#FFC24A">' + esc(S.msg) + '</div>' : '');
  }

  const footer = (primary, dis) => '<div style="display:flex;justify-content:space-between;align-items:center;flex:none"><span data-a="mode" data-v="dados" style="height:46px;display:flex;align-items:center;gap:8px;padding:0 22px 0 14px;border-radius:9999px;border:2px solid #2A2A2F;font-weight:900;letter-spacing:.06em;font-size:13px;text-transform:uppercase;cursor:pointer">' + svg('left', 18, 2.4) + 'Voltar</span>' + (S.msg ? '<span style="font-size:12.5px;color:#FFC24A;flex:1;padding:0 20px;text-align:center">' + esc(S.msg) + '</span>' : '<span></span>') + primary + '</div>';
  const primaryBtn = (a, t, dis) => '<span data-a="' + a + '" style="height:46px;display:flex;align-items:center;padding:0 28px;border-radius:9999px;background:#F2F0EB;color:#0A0A0A;font-weight:900;letter-spacing:.06em;font-size:13px;text-transform:uppercase;cursor:' + (dis ? 'default' : 'pointer') + ';opacity:' + (dis ? .35 : 1) + '">' + t + '</span>';

  function viewLer() {
    const body = '<div style="border-top:1px solid #3A3A40;display:grid;grid-template-columns:1fr 1fr;gap:34px;flex:1;min-height:0;padding:24px 0 0">'
      + '<div style="display:flex;flex-direction:column;gap:10px;min-height:0"><div style="display:flex;align-items:center;justify-content:space-between">' + lb('link', 'Link da nota') + '<span style="font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:9999px;background:#1C1C20;color:#6AFF2A">Mais rápido</span></div>'
      + '<div style="display:flex;gap:10px"><input data-in="link" value="' + esc(S.link) + '" placeholder="Cole o link do QR da nota" style="' + fieldCss + 'flex:1"><span data-a="lerlink" style="height:56px;display:flex;align-items:center;padding:0 24px;border-radius:9999px;background:#F2F0EB;color:#0A0A0A;font-weight:900;letter-spacing:.06em;font-size:13px;text-transform:uppercase;cursor:pointer;flex:none">Ler</span></div>'
      + '<div style="font-size:12.5px;color:#9A9AA3;line-height:1.4">O QR Code da nota abre uma página com os itens. Copie o endereço dela e cole aqui.</div>'
      + '<div style="margin-top:6px;font-size:16px;font-weight:700;color:#F2F0EB">Ou cole o texto da página</div><textarea data-in="texto" placeholder="Abra o link, selecione tudo, copie e cole aqui" style="' + fieldCss + 'flex:1;min-height:0;resize:none"></textarea></div>'
      + '<label style="display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px dashed #3A3A40;border-radius:28px;cursor:pointer;margin-bottom:4px"><input data-in="foto" type="file" accept="image/*,application/pdf" style="display:none"><div style="display:flex;align-items:center;gap:22px"><span style="color:#F2F0EB;display:flex">' + svg('qr', 64, 1.4) + '</span><div style="display:flex;flex-direction:column;gap:6px"><span style="font-weight:900;letter-spacing:.06em;font-size:14px;text-transform:uppercase">Enviar foto ou print</span><span style="font-size:12.5px;color:#9A9AA3">Arraste a imagem aqui ou clique pra escolher</span><span style="font-size:11px;color:#51515C;font-weight:700;letter-spacing:.08em">PNG · JPG · PDF</span></div></div></label></div>';
    return '<div style="flex:1;min-width:0;padding:26px 34px 24px 30px;display:flex;flex-direction:column;gap:22px;box-sizing:border-box">' + header('Ler nota fiscal') + body + footer(primaryBtn('lertexto', 'Ler nota', false)) + '</div>';
  }

  function viewDividir() {
    const t = total(), soma = somaPartes(), resto = Math.max(0, t - soma), over = soma > t + 0.005;
    const bar = S.partes.map(p => '<i style="flex:' + Math.max(p.valor, 0.01) + ';background:' + catCor(catName(p.catId)) + '"></i>').join('') + (resto > 0.004 ? '<i style="flex:' + resto + ';background:repeating-linear-gradient(135deg,#2A2A2F 0 6px,#1C1C20 6px 12px)"></i>' : '');
    const rows = S.partes.map((p, k) => { const cn = catName(p.catId), cor = catCor(cn), on = S.sel === k;
      return '<div data-a="sel" data-v="' + k + '" data-drop="' + k + '" style="display:flex;align-items:center;gap:12px;padding:8px 10px 8px 12px;border-radius:9999px;border:2px solid ' + (on ? cor : '#2A2A2F') + ';background:#000;cursor:pointer;transition:border-color .25s ease"><i style="width:12px;height:12px;border-radius:50%;background:' + cor + ';flex:none"></i><span data-a="pcat" data-v="' + k + '" style="font-size:15px;font-weight:700;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(cn) + '</span><span style="font-size:12px;color:#9A9AA3;white-space:nowrap">' + p.itens.length + (p.itens.length === 1 ? ' item' : ' itens') + '</span><span style="display:flex;align-items:center;gap:4px;padding:5px 12px;border-radius:9999px;background:#1C1C20;font-size:11px;color:#9A9AA3;font-weight:700">R$<input data-in="pv" data-k="' + k + '" value="' + brl(p.valor) + '" style="width:78px;background:transparent;border:0;outline:0;color:#F2F0EB;font-family:inherit;font-size:15px;font-weight:700;text-align:right"></span><span data-a="pdel" data-v="' + k + '" style="width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#9A9AA3">' + svg('x', 14, 2.4) + '</span></div>'
        + (S.pop === 'p' + k ? '<div style="position:relative"><div data-pop style="position:absolute;z-index:6;left:0;top:6px;background:#151518;border:1px solid #2A2A2F;border-radius:20px;padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px;width:300px;box-shadow:0 24px 48px rgba(0,0,0,.6)">' + cats().map(n => '<span data-a="pset" data-k="' + k + '" data-v="' + esc(n) + '" style="display:flex;align-items:center;gap:10px;height:38px;border-radius:12px;border:1px solid ' + (n === cn ? '#F2F0EB' : '#2A2A2F') + ';background:#0D0D10;padding:0 10px;font-size:13.5px;font-weight:700;cursor:pointer;white-space:nowrap">' + icDot(n, 22) + esc(n) + '</span>').join('') + '</div></div>' : ''); }).join('');
    const its = S.itens.map((it, k) => { const pi = S.partes.findIndex(p => p.itens.includes(k)), cor = pi >= 0 ? catCor(catName(S.partes[pi].catId)) : '#3A3A40';
      return '<div draggable="true" data-a="item" data-v="' + k + '" data-drag="' + k + '" style="display:flex;align-items:center;gap:10px;padding:9px 4px;border-bottom:1px dashed #2B2B30;cursor:grab"><i style="width:10px;height:10px;border-radius:50%;background:' + cor + ';flex:none"></i><span style="flex:1;min-width:0;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(it.nome) + '</span><span style="font-size:11px;color:#9A9AA3">R$</span><span style="font-size:14px;font-weight:700;font-variant-numeric:tabular-nums">' + brl(it.valor) + '</span></div>'; }).join('');
    const left = '<div style="display:flex;flex-direction:column;gap:14px;min-height:0;padding-right:34px"><div style="display:flex;height:14px;border-radius:9999px;overflow:hidden;gap:2px;flex:none">' + bar + '</div><div style="display:flex;flex-direction:column;gap:8px;overflow:auto;min-height:0;flex:1" class="kscroll">' + rows
      + '<div data-a="padd" style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:9999px;border:2px dashed #3A3A40;cursor:pointer;color:#9A9AA3;font-size:14px;font-weight:700"><span style="display:flex">' + svg('plus', 18, 2.4) + '</span>Adicionar parte<span style="font-weight:500;font-size:12.5px;margin-left:6px">o que sobrar vira parte “Outros” sozinho</span></div></div>'
      + '<div style="font-size:12.5px;color:' + (over ? '#FF6B5A' : '#9A9AA3') + ';flex:none">' + (over ? 'As partes passam do total em R$ ' + brl(soma - t) : 'A transação original continua intacta · R$ ' + brl(resto) + ' sem parte') + '</div></div>';
    const right = '<div style="border-left:1px solid #3A3A40;padding-left:34px;display:flex;flex-direction:column;gap:10px;min-height:0"><div style="font-size:16px;font-weight:700">' + (S.itens.length ? 'Itens da nota <span style="color:#9A9AA3;font-weight:500;font-size:13px">(' + S.itens.length + ' · arraste pra uma parte)</span>' : 'Itens da nota') + '</div>'
      + (S.itens.length ? '<div class="kscroll" style="overflow:auto;min-height:0;flex:1;-webkit-mask-image:linear-gradient(#0000,#000 14px,#000 calc(100% - 22px),#0000);mask-image:linear-gradient(#0000,#000 14px,#000 calc(100% - 22px),#0000)">' + its + '</div>' : '<div style="font-size:13px;color:#9A9AA3;line-height:1.5">Sem itens ainda. Leia a nota fiscal pra distribuir os itens, ou crie as partes só pelo valor.</div><span data-a="mode" data-v="ler" style="align-self:flex-start;margin-top:6px;display:flex;align-items:center;gap:10px;padding:10px 18px;border-radius:9999px;border:2px solid #2A2A2F;font-weight:900;letter-spacing:.06em;font-size:12px;text-transform:uppercase;cursor:pointer">' + svg('qr', 20, 1.7) + 'Ler nota fiscal</span>') + '</div>';
    return '<div style="flex:1;min-width:0;padding:26px 34px 24px 30px;display:flex;flex-direction:column;gap:22px;box-sizing:border-box">' + header('Dividir transação') + '<div style="border-top:1px solid #3A3A40;display:grid;grid-template-columns:1fr 1fr;flex:1;min-height:0;padding:22px 0 0">' + left + right + '</div>' + footer(primaryBtn('confirm', S.busy ? 'Salvando…' : 'Confirmar divisão', over)) + '</div>';
  }

  /* bilhete (SVG): cantos, entalhes e perfuração */
  function ticket() {
    const sv = host.querySelector('[data-tk]'); if (!sv) return;
    const W = 280, H = 308, hB = 64, n = 13, R = 28, seam = H - hB;
    const P = 'M0,' + R + 'A' + R + ',' + R + ' 0 0 1 ' + R + ',0H' + (W - R) + 'A' + R + ',' + R + ' 0 0 1 ' + W + ',' + R + 'V' + (seam - n) + 'A' + n + ',' + n + ' 0 0 0 ' + W + ',' + (seam + n) + 'V' + (H - R) + 'A' + R + ',' + R + ' 0 0 1 ' + (W - R) + ',' + H + 'H' + R + 'A' + R + ',' + R + ' 0 0 1 0,' + (H - R) + 'V' + (seam + n) + 'A' + n + ',' + n + ' 0 0 0 0,' + (seam - n) + 'Z';
    sv.innerHTML = '<path d="' + P + '" fill="#F2F0EB"/><line x1="' + (W / 2) + '" x2="' + (W / 2) + '" y1="' + (seam + 12) + '" y2="' + (H - 12) + '" stroke="#9A9AA3" stroke-width="1.5" stroke-dasharray="4 5"/><line x1="' + (n + 8) + '" x2="' + (W - n - 8) + '" y1="' + seam + '" y2="' + seam + '" stroke="#9A9AA3" stroke-width="1.6" stroke-dasharray="5 5"/>';
  }

  /* ---------------- render ---------------- */
  function render(first) {
    if (!S || !host) return;
    const keep = {}; host.querySelectorAll('[data-in]').forEach(i => { if (document.activeElement === i) keep.k = i.getAttribute('data-in') + (i.getAttribute('data-k') || ''); });
    const hw = host.clientWidth || 1358, k = Math.min(1, (hw - 32) / 1358);
    const bodyHtml = S.mode === 'dados' ? viewDados() : S.mode === 'ler' ? viewLer() : viewDividir();
    const x = '<span data-a="close" style="position:absolute;right:0;top:0;width:44px;height:44px;border-radius:50%;background:#F2F0EB;color:#0A0A0A;display:flex;align-items:center;justify-content:center;z-index:3;cursor:pointer;box-shadow:0 0 0 9px ' + (S.mode === 'dados' ? '#1C1C20' : '#111114') + '"><span data-xi style="display:flex;transition:transform .5s cubic-bezier(.65,0,.2,1)">' + svg('x', 18, 2.4) + '</span></span>';
    const prevPn = host.querySelector('[data-pn]');
    host.innerHTML = '<div data-bd style="position:absolute;inset:0;background:rgba(0,0,0,.72);' + (first ? 'animation:txfade .25s ease' : '') + '"></div>'
      + '<style>@keyframes txfade{from{opacity:0}to{opacity:1}}@keyframes txin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@keyframes txup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}[data-pn] input::placeholder,[data-pn] textarea::placeholder{color:#51515C}</style>'
      + '<div data-pn style="position:absolute;left:50%;top:50%;width:1358px;height:480px;margin:-240px 0 0 -679px;transform:scale(' + k + ');transform-origin:center;background:#111114;border:1px solid #2A2A2F;border-radius:30px;display:flex;font-family:Helvetica,Arial,sans-serif;color:#F2F0EB;' + (first ? 'animation:txup .4s ' + E : '') + '">' + bodyHtml + x + '</div>';
    const pn = host.querySelector('[data-pn]');
    if (S.mode === 'dados') ticket();
    const ta = pn.querySelector('[data-in="obs"]'); if (ta) ta.value = S.obs;
    const tt = pn.querySelector('[data-in="texto"]'); if (tt) tt.value = S.texto;
    if (keep.k) { const el = [...pn.querySelectorAll('[data-in]')].find(i => i.getAttribute('data-in') + (i.getAttribute('data-k') || '') === keep.k); if (el) { el.focus(); try { const l = el.value.length; el.setSelectionRange(l, l); } catch (e) { } } }
    wire(pn);
    const xi = pn.querySelector('[data-xi]'); if (xi && first) { xi.style.transform = 'rotate(-180deg)'; requestAnimationFrame(() => requestAnimationFrame(() => { xi.style.transform = 'rotate(0deg)'; })); }
    void prevPn;
  }

  /* ---------------- ações ---------------- */
  function parseTexto(t) {
    const out = [], re = /([^\n(]+?)\s*\(C[óo]digo:\s*[\w-]+\)\s*Qtde\.?:?\s*([\d.,]+)\s*UN:?\s*(\w+)\s*Vl\.?\s*Unit\.?:?\s*([\d.,]+)\s*Vl\.?\s*Total\s*([\d.,]+)/gi; let m;
    while ((m = re.exec(t.replace(/\s+/g, ' ')))) out.push({ nome: m[1].trim().replace(/^[\d\s-]+(?=[A-Za-zÀ-ú])/, '').trim() || m[1].trim(), qtd: num(m[2]) || 1, un: m[3], valor: num(m[5]), catId: null });
    return out;
  }
  function aceitarItens(its, url) {
    if (!its.length) { S.msg = 'Não achei itens nesse texto. Confira se copiou a página inteira.'; render(); return; }
    S.itens = its; S.nota = Object.assign({}, S.nota || {}, { url: url || (S.nota && S.nota.url) || null, total: its.reduce((a, i) => a + i.valor, 0) }); S.notaDirty = true; S.partes = []; S.partesDirty = true; S.msg = ''; S.mode = 'dividir'; render();
  }
  async function lerLink() {
    const url = (S.link || '').trim(); if (!/^https?:\/\//i.test(url)) { S.msg = 'Cole o endereço completo do link da nota.'; render(); return; }
    S.msg = 'Lendo a nota…'; render();
    try {
      const r = await KD.sb.functions.invoke('ler-nota', { body: { url } });
      if (r.error || !r.data || !r.data.itens) throw r.error || new Error('sem dados');
      S.nota = { url, chave_acesso: r.data.chave_acesso || null, emitente: r.data.emitente || null, cnpj: r.data.cnpj || null, emitida_em: r.data.emitida_em || null, total: r.data.total || null };
      aceitarItens(r.data.itens.map(i => ({ nome: i.nome, qtd: i.quantidade || 1, un: i.unidade || '', valor: i.valor, catId: null })), url);
    } catch (e) { S.msg = 'Ainda não leio o link direto. Abra o link, copie o texto da página e cole abaixo.'; render(); }
  }
  async function salvar() {
    if (S.busy) return; S.busy = true; S.msg = ''; render();
    S.partes = S.partes.filter(p => p.valor > 0);
    const d = { id: S.row.id, nome: S.nome, obs: S.obs, iso: S.iso, cardId: S.cardId, accId: S.accId, catId: S.catId, notaDirty: S.notaDirty, partesDirty: S.partesDirty, nota: S.nota, itens: S.itens, partes: S.partes };
    try { await KD.txSave(comp, d); TX.close(); }
    catch (e) { console.error('[kontar] salvar transação', e); S.busy = false; S.msg = 'Não consegui salvar: ' + ((e && e.message) || 'erro'); render(); }
  }

  function wire(pn) {
    pn.addEventListener('click', ev => {
      const el = ev.target.closest('[data-a]'); if (!el || !S) { if (S && S.pop && !ev.target.closest('[data-pop]')) { S.pop = null; render(); } return; }
      const a = el.getAttribute('data-a'), v = el.getAttribute('data-v');
      if (a === 'close') TX.close();
      else if (a === 'mode') { S.pop = null; S.msg = ''; S.mode = v; render(); }
      else if (a === 'pop') { ev.stopPropagation(); S.pop = S.pop === v ? null : v; render(); }
      else if (a === 'cat') { S.catId = catId(v); S.pop = null; render(); }
      else if (a === 'meio') { const [t, id] = v.split(':'); S.cardId = t === 'c' ? id : null; S.accId = t === 'a' ? id : null; S.pop = null; render(); }
      else if (a === 'save') salvar();
      else if (a === 'confirm') { if (somaPartes() <= total() + 0.005) { S.partesDirty = true; salvar(); } }
      else if (a === 'lerlink') lerLink();
      else if (a === 'lertexto') aceitarItens(parseTexto(S.texto || ''), S.link);
      else if (a === 'padd') { const used = new Set(S.partes.map(p => p.catId)), n = cats().find(c => !used.has(catId(c))) || 'Outros'; S.partes.push({ catId: catId(n), valor: Math.max(0, Math.round((total() - somaPartes()) * 100) / 100) || 0.01, rotulo: '', itens: [] }); S.sel = S.partes.length - 1; S.partesDirty = true; render(); }
      else if (a === 'pdel') { ev.stopPropagation(); S.partes.splice(+v, 1); S.sel = 0; S.partesDirty = true; render(); }
      else if (a === 'pcat') { ev.stopPropagation(); S.sel = +v; S.pop = S.pop === 'p' + v ? null : 'p' + v; render(); }
      else if (a === 'pset') { S.partes[+el.getAttribute('data-k')].catId = catId(v); S.pop = null; S.partesDirty = true; render(); }
      else if (a === 'sel') { if (!ev.target.closest('input')) { S.sel = +v; render(); } }
      else if (a === 'item') assign(+v, S.sel);
    });
    pn.addEventListener('input', ev => {
      const el = ev.target, k = el.getAttribute && el.getAttribute('data-in'); if (!k) return;
      if (k === 'nome') { S.nome = el.value; const b = pn.querySelector('div[style*="font-size:64px"]'); if (b) b.textContent = S.nome || '—'; }
      else if (k === 'obs') S.obs = el.value; else if (k === 'link') S.link = el.value; else if (k === 'texto') S.texto = el.value;
      else if (k === 'iso') { S.iso = el.value; render(); }
      else if (k === 'pv') { const p = S.partes[+el.getAttribute('data-k')]; if (p) { p.valor = num(el.value); S.partesDirty = true; } }
    });
    pn.addEventListener('change', ev => { const el = ev.target; if (el.getAttribute('data-in') === 'pv') render(); if (el.getAttribute('data-in') === 'foto') { S.msg = 'Leitura de foto chega na próxima etapa. Por enquanto use o link ou o texto da página.'; render(); } });
    pn.addEventListener('dragstart', ev => { const d = ev.target.closest && ev.target.closest('[data-drag]'); if (d) { ev.dataTransfer.setData('text/plain', d.getAttribute('data-drag')); ev.dataTransfer.effectAllowed = 'move'; } });
    pn.addEventListener('dragover', ev => { if (ev.target.closest && ev.target.closest('[data-drop]')) ev.preventDefault(); });
    pn.addEventListener('drop', ev => { const t = ev.target.closest && ev.target.closest('[data-drop]'); if (!t) return; ev.preventDefault(); assign(+ev.dataTransfer.getData('text/plain'), +t.getAttribute('data-drop')); });
  }
  function assign(i, pi) {
    if (!S.partes.length) { S.partes.push({ catId: S.catId, valor: 0, rotulo: '', itens: [] }); pi = 0; S.sel = 0; }
    const p = S.partes[pi]; if (!p || !S.itens[i]) return;
    S.partes.forEach(q => { q.itens = q.itens.filter(x => x !== i); });
    p.itens.push(i); S.partes.forEach(q => { if (q.itens.length) q.valor = Math.round(q.itens.reduce((a, x) => a + S.itens[x].valor, 0) * 100) / 100; });
    S.partesDirty = true; render();
  }
  window.addEventListener('keydown', e => { if (S && e.key === 'Escape') TX.close(); });
})();
