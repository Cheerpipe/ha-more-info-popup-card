var v8=Object.create;var L5=Object.defineProperty;var u8=Object.getOwnPropertyDescriptor;var h0=(L,V)=>(V=Symbol[L])?V:Symbol.for("Symbol."+L),O1=L=>{throw TypeError(L)};var S0=(L,V,C)=>V in L?L5(L,V,{enumerable:!0,configurable:!0,writable:!0,value:C}):L[V]=C;var u0=(L,V)=>L5(L,"name",{value:V,configurable:!0});var I=L=>[,,,v8(L?.[h0("metadata")]??null)],f0=["class","method","getter","setter","accessor","field","value","get","set"],D1=L=>L!==void 0&&typeof L!="function"?O1("Function expected"):L,x8=(L,V,C,H,e)=>({kind:f0[L],name:V,metadata:H,addInitializer:r=>C._?O1("Already initialized"):e.push(D1(r||null))}),F=(L,V)=>S0(V,h0("metadata"),L[3]),a=(L,V,C,H)=>{for(var e=0,r=L[V>>1],t=r&&r.length;e<t;e++)V&1?r[e].call(C):H=r[e].call(C,H);return H},l=(L,V,C,H,e,r)=>{var t,M,o,A,d,p=V&7,u=!!(V&8),c=!!(V&16),h=p>3?L.length+1:p?u?1:2:0,R=f0[p+5],N=p>3&&(L[h-1]=[]),K=L[h]||(L[h]=[]),z=p&&(!c&&!u&&(e=e.prototype),p<5&&(p>3||!c)&&u8(p<4?e:{get[C](){return x0(this,r)},set[C](E){return Z0(this,r,E)}},C));p?c&&p<4&&u0(r,(p>2?"set ":p>1?"get ":"")+C):u0(e,C);for(var L1=H.length-1;L1>=0;L1--)A=x8(p,C,o={},L[3],K),p&&(A.static=u,A.private=c,d=A.access={has:c?E=>Z8(e,E):E=>C in E},p^3&&(d.get=c?E=>(p^1?x0:h8)(E,e,p^4?r:z.get):E=>E[C]),p>2&&(d.set=c?(E,$1)=>Z0(E,e,$1,p^4?r:z.set):(E,$1)=>E[C]=$1)),M=(0,H[L1])(p?p<4?c?r:z[R]:p>4?void 0:{get:z.get,set:z.set}:e,A),o._=1,p^4||M===void 0?D1(M)&&(p>4?N.unshift(M):p?c?r=M:z[R]=M:e=M):typeof M!="object"||M===null?O1("Object expected"):(D1(t=M.get)&&(z.get=t),D1(t=M.set)&&(z.set=t),D1(t=M.init)&&N.unshift(t));return p||F(L,e),z&&L5(e,C,z),c?p^4?r:z:e},m=(L,V,C)=>S0(L,typeof V!="symbol"?V+"":V,C),e5=(L,V,C)=>V.has(L)||O1("Cannot "+C),Z8=(L,V)=>Object(V)!==V?O1('Cannot use the "in" operator on this value'):L.has(V),x0=(L,V,C)=>(e5(L,V,"read from private field"),C?C.call(L):V.get(L)),s=(L,V,C)=>V.has(L)?O1("Cannot add the same private member more than once"):V instanceof WeakSet?V.add(L):V.set(L,C),Z0=(L,V,C,H)=>(e5(L,V,"write to private field"),H?H.call(L,C):V.set(L,C),C),h8=(L,V,C)=>(e5(L,V,"access private method"),C);var g0="M17 18H21V16H17V14L14 17L17 20V18M11 4C8.8 4 7 5.8 7 8S8.8 12 11 12 15 10.2 15 8 13.2 4 11 4M11 14C6.6 14 3 15.8 3 18V20H12.5C12.2 19.2 12 18.4 12 17.5C12 16.3 12.3 15.2 12.9 14.1C12.3 14.1 11.7 14 11 14";var r5="M18 16H14V18H18V20L21 17L18 14V16M11 4C8.8 4 7 5.8 7 8S8.8 12 11 12 15 10.2 15 8 13.2 4 11 4M11 14C6.6 14 3 15.8 3 18V20H12.5C12.2 19.2 12 18.4 12 17.5C12 16.3 12.3 15.2 12.9 14.1C12.3 14.1 11.7 14 11 14";var _0="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";var d2="M6 14H9L5 18L1 14H4C4 11.3 5.7 6.6 11 6.1V8.1C7.6 8.6 6 11.9 6 14M20 14C20 11.3 18.3 6.6 13 6.1V8.1C16.4 8.7 18 11.9 18 14H15L19 18L23 14H20Z",O0="M13 8.1V6.1C18.3 6.6 20 11.4 20 14H23L20.1 16.9L17.2 14H18C18 11.9 16.4 8.6 13 8.1M7.8 7.1L2.4 1.7L1.1 3L6.3 8.2C4.7 10 4 12.4 4 14H1L5 18L9 14H6C6 12.7 6.6 11 7.9 9.7L20.9 22.7L22.2 21.4L9.3 8.7L7.8 7.1M11 6.1L9.5 6.4L11 7.8V6.1Z";var b0="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";var y0="M9 17H7V10H9V17M13 17H11V7H13V17M17 17H15V13H17V17M19 19H5V5H19V19.1M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z";var p2="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";var w0="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";var l2="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";var s2="M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z";var m2="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z";var k0="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z",T0="M19,3L13,9L15,11L22,4V3M12,12.5A0.5,0.5 0 0,1 11.5,12A0.5,0.5 0 0,1 12,11.5A0.5,0.5 0 0,1 12.5,12A0.5,0.5 0 0,1 12,12.5M6,20A2,2 0 0,1 4,18C4,16.89 4.9,16 6,16A2,2 0 0,1 8,18C8,19.11 7.1,20 6,20M6,8A2,2 0 0,1 4,6C4,4.89 4.9,4 6,4A2,2 0 0,1 8,6C8,7.11 7.1,8 6,8M9.64,7.64C9.87,7.14 10,6.59 10,6A4,4 0 0,0 6,2A4,4 0 0,0 2,6A4,4 0 0,0 6,10C6.59,10 7.14,9.87 7.64,9.64L10,12L7.64,14.36C7.14,14.13 6.59,14 6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22A4,4 0 0,0 10,18C10,17.41 9.87,16.86 9.64,16.36L12,14L19,21H22V20L9.64,7.64Z",P0="M11,17H4A2,2 0 0,1 2,15V3A2,2 0 0,1 4,1H16V3H4V15H11V13L15,16L11,19V17M19,21V7H8V13H6V7A2,2 0 0,1 8,5H19A2,2 0 0,1 21,7V21A2,2 0 0,1 19,23H8A2,2 0 0,1 6,21V19H8V21H19Z";var E0="M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74";var c2="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var B0="M3 6H21V4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H7V18H3V6M13 12H9V13.78C8.39 14.33 8 15.11 8 16C8 16.89 8.39 17.67 9 18.22V20H13V18.22C13.61 17.67 14 16.88 14 16S13.61 14.33 13 13.78V12M11 17.5C10.17 17.5 9.5 16.83 9.5 16S10.17 14.5 11 14.5 12.5 15.17 12.5 16 11.83 17.5 11 17.5M22 8H16C15.5 8 15 8.5 15 9V19C15 19.5 15.5 20 16 20H22C22.5 20 23 19.5 23 19V9C23 8.5 22.5 8 22 8M21 18H17V10H21V18Z";var v2="M18 18V20H4A2 2 0 0 1 2 18V8H4V18M22 6V14A2 2 0 0 1 20 16H8A2 2 0 0 1 6 14V6A2 2 0 0 1 8 4H20A2 2 0 0 1 22 6M20 6H8V14H20Z";var R0="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";var F0="M21 11H3V9H21V11M21 13H3V15H21V13Z";var $0="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z";var N1="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z";var D0="M12.5,2C9.64,2 8.57,4.55 9.29,7.47L15,13.16C15.87,13.37 16.81,13.81 17.28,14.73C18.46,17.1 22.03,17 22.03,12.5C22.03,8.92 18.05,8.13 14.35,10.13C14.03,9.73 13.61,9.42 13.13,9.22C13.32,8.29 13.76,7.24 14.75,6.75C17.11,5.57 17,2 12.5,2M3.28,4L2,5.27L4.47,7.73C3.22,7.74 2,8.87 2,11.5C2,15.07 5.96,15.85 9.65,13.87C9.97,14.27 10.4,14.59 10.89,14.79C10.69,15.71 10.25,16.75 9.27,17.24C6.91,18.42 7,22 11.5,22C13.8,22 14.94,20.36 14.94,18.21L18.73,22L20,20.72L3.28,4Z";var N0="M15.5,17H14L12,9.5L10,17H8.5L6.1,7H7.8L9.34,14.5L11.3,7H12.7L14.67,14.5L16.2,7H17.9M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z";var I0="M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z";var z0="M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z";var t5="M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z";var W0="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";var U0="M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z";var G0="M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z";var Q0="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z";var K0="M11 15H17V17H11V15M9 7H7V9H9V7M11 13H17V11H11V13M11 9H17V7H11V9M9 11H7V13H9V11M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5M19 5H5V19H19V5M9 15H7V17H9V15Z";var q0="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z";var Y0="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";var j0="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";var X0="M19,13H5V11H19V13Z";var J0="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z";var C7="M2.5 19.6L3.8 20.2V11.2L1.4 17C1 18.1 1.5 19.2 2.5 19.6M15.2 4.8L20.2 16.8L12.9 19.8L7.9 7.9V7.8L15.2 4.8M15.3 2.8C15 2.8 14.8 2.8 14.5 2.9L7.1 6C6.4 6.3 5.9 7 5.9 7.8C5.9 8 5.9 8.3 6 8.6L11 20.5C11.3 21.3 12 21.7 12.8 21.7C13.1 21.7 13.3 21.7 13.6 21.6L21 18.5C22 18.1 22.5 16.9 22.1 15.9L17.1 4C16.8 3.2 16 2.8 15.3 2.8M10.5 9.9C9.9 9.9 9.5 9.5 9.5 8.9S9.9 7.9 10.5 7.9C11.1 7.9 11.5 8.4 11.5 8.9S11.1 9.9 10.5 9.9M5.9 19.8C5.9 20.9 6.8 21.8 7.9 21.8H9.3L5.9 13.5V19.8Z";var M5="M14,19H18V5H14M6,19H10V5H6V19Z";var H7="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var V7="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z";var u2="M8,5.14V19.14L19,12.14L8,5.14Z";var L7="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z";var e7="M3,5V19L11,12M13,19H16V5H13M18,5V19H21V5";var r7="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";var o5="M18 11H15V14H13V11H10V9H13V6H15V9H18M20 4V16H8V4H20M20 2H8C6.9 2 6 2.9 6 4V16C6 17.11 6.9 18 8 18H20C21.11 18 22 17.11 22 16V4C22 2.9 21.11 2 20 2M4 6H2V20C2 21.11 2.9 22 4 22H18V20H4V6Z";var v1="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var t7="M9,2C7.89,2 7,2.89 7,4V20C7,21.11 7.89,22 9,22H15C16.11,22 17,21.11 17,20V4C17,2.89 16.11,2 15,2H13V4H11V2H9M11,6H13V8H15V10H13V12H11V10H9V8H11V6M9,14H11V16H9V14M13,14H15V16H13V14M9,18H11V20H9V18M13,18H15V20H13V18Z";var M7="M16.89,15.5L18.31,16.89C19.21,15.73 19.76,14.39 19.93,13H17.91C17.77,13.87 17.43,14.72 16.89,15.5M13,17.9V19.92C14.39,19.75 15.74,19.21 16.9,18.31L15.46,16.87C14.71,17.41 13.87,17.76 13,17.9M19.93,11C19.76,9.61 19.21,8.27 18.31,7.11L16.89,8.53C17.43,9.28 17.77,10.13 17.91,11M15.55,5.55L11,1V4.07C7.06,4.56 4,7.92 4,12C4,16.08 7.05,19.44 11,19.93V17.91C8.16,17.43 6,14.97 6,12C6,9.03 8.16,6.57 11,6.09V10L15.55,5.55Z";var b1="M18,18H6V6H18V18Z";var o7="M9,3L5,7H8V14H10V7H13M16,17V10H14V17H11L15,21L19,17H16Z";var i7="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z";var a7="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V4C22 2.9 21.11 2 20 2M4 6L6 4H10.9L4 10.9V6M4 13.7L13.7 4H18.6L4 18.6V13.7M20 18L18 20H13.1L20 13.1V18M20 10.3L10.3 20H5.4L20 5.4V10.3Z";var n7="M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z";var A7="M18,11H14.82C14.4,9.84 13.3,9 12,9C10.7,9 9.6,9.84 9.18,11H6C5.67,11 4,10.9 4,9V8C4,6.17 5.54,6 6,6H16.18C16.6,7.16 17.7,8 19,8A3,3 0 0,0 22,5A3,3 0 0,0 19,2C17.7,2 16.6,2.84 16.18,4H6C4.39,4 2,5.06 2,8V9C2,11.94 4.39,13 6,13H9.18C9.6,14.16 10.7,15 12,15C13.3,15 14.4,14.16 14.82,13H18C18.33,13 20,13.1 20,15V16C20,17.83 18.46,18 18,18H7.82C7.4,16.84 6.3,16 5,16A3,3 0 0,0 2,19A3,3 0 0,0 5,22C6.3,22 7.4,21.16 7.82,20H18C19.61,20 22,18.93 22,16V15C22,12.07 19.61,11 18,11M19,4A1,1 0 0,1 20,5A1,1 0 0,1 19,6A1,1 0 0,1 18,5A1,1 0 0,1 19,4M5,20A1,1 0 0,1 4,19A1,1 0 0,1 5,18A1,1 0 0,1 6,19A1,1 0 0,1 5,20Z";var y1="M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z";var d7="M3,5H21V7H3V5M3,11V9H21V11H3M3,19V13H21V19H3Z";var p7="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z";var l7="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z";var s7="M8 2C6.89 2 6 2.89 6 4V16C6 17.11 6.89 18 8 18H9V20H6V22H9C10.11 22 11 21.11 11 20V18H13V20C13 21.11 13.89 22 15 22H18V20H15V18H16C17.11 18 18 17.11 18 16V4C18 2.89 17.11 2 16 2H8M12 4.97A2 2 0 0 1 14 6.97A2 2 0 0 1 12 8.97A2 2 0 0 1 10 6.97A2 2 0 0 1 12 4.97M10 14.5H14V16H10V14.5Z";var x2=globalThis,Z2=x2.ShadowRoot&&(x2.ShadyCSS===void 0||x2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i5=Symbol(),m7=new WeakMap,I1=class{constructor(V,C,H){if(this._$cssResult$=!0,H!==i5)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=V,this.t=C}get styleSheet(){let V=this.o,C=this.t;if(Z2&&V===void 0){let H=C!==void 0&&C.length===1;H&&(V=m7.get(C)),V===void 0&&((this.o=V=new CSSStyleSheet).replaceSync(this.cssText),H&&m7.set(C,V))}return V}toString(){return this.cssText}},c7=L=>new I1(typeof L=="string"?L:L+"",void 0,i5),O=(L,...V)=>{let C=L.length===1?L[0]:V.reduce((H,e,r)=>H+(t=>{if(t._$cssResult$===!0)return t.cssText;if(typeof t=="number")return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+L[r+1],L[0]);return new I1(C,L,i5)},v7=(L,V)=>{if(Z2)L.adoptedStyleSheets=V.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of V){let H=document.createElement("style"),e=x2.litNonce;e!==void 0&&H.setAttribute("nonce",e),H.textContent=C.cssText,L.appendChild(H)}},a5=Z2?L=>L:L=>L instanceof CSSStyleSheet?(V=>{let C="";for(let H of V.cssRules)C+=H.cssText;return c7(C)})(L):L;var{is:S8,defineProperty:f8,getOwnPropertyDescriptor:g8,getOwnPropertyNames:_8,getOwnPropertySymbols:O8,getPrototypeOf:b8}=Object,h2=globalThis,u7=h2.trustedTypes,y8=u7?u7.emptyScript:"",w8=h2.reactiveElementPolyfillSupport,z1=(L,V)=>L,W1={toAttribute(L,V){switch(V){case Boolean:L=L?y8:null;break;case Object:case Array:L=L==null?L:JSON.stringify(L)}return L},fromAttribute(L,V){let C=L;switch(V){case Boolean:C=L!==null;break;case Number:C=L===null?null:Number(L);break;case Object:case Array:try{C=JSON.parse(L)}catch{C=null}}return C}},S2=(L,V)=>!S8(L,V),x7={attribute:!0,type:String,converter:W1,reflect:!1,useDefault:!1,hasChanged:S2};Symbol.metadata??=Symbol("metadata"),h2.litPropertyMetadata??=new WeakMap;var t1=class extends HTMLElement{static addInitializer(V){this._$Ei(),(this.l??=[]).push(V)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(V,C=x7){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(V)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(V,C),!C.noAccessor){let H=Symbol(),e=this.getPropertyDescriptor(V,H,C);e!==void 0&&f8(this.prototype,V,e)}}static getPropertyDescriptor(V,C,H){let{get:e,set:r}=g8(this.prototype,V)??{get(){return this[C]},set(t){this[C]=t}};return{get:e,set(t){let M=e?.call(this);r?.call(this,t),this.requestUpdate(V,M,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(V){return this.elementProperties.get(V)??x7}static _$Ei(){if(this.hasOwnProperty(z1("elementProperties")))return;let V=b8(this);V.finalize(),V.l!==void 0&&(this.l=[...V.l]),this.elementProperties=new Map(V.elementProperties)}static finalize(){if(this.hasOwnProperty(z1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(z1("properties"))){let C=this.properties,H=[..._8(C),...O8(C)];for(let e of H)this.createProperty(e,C[e])}let V=this[Symbol.metadata];if(V!==null){let C=litPropertyMetadata.get(V);if(C!==void 0)for(let[H,e]of C)this.elementProperties.set(H,e)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let e=this._$Eu(C,H);e!==void 0&&this._$Eh.set(e,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(V){let C=[];if(Array.isArray(V)){let H=new Set(V.flat(1/0).reverse());for(let e of H)C.unshift(a5(e))}else V!==void 0&&C.push(a5(V));return C}static _$Eu(V,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof V=="string"?V.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(V=>this.enableUpdating=V),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(V=>V(this))}addController(V){(this._$EO??=new Set).add(V),this.renderRoot!==void 0&&this.isConnected&&V.hostConnected?.()}removeController(V){this._$EO?.delete(V)}_$E_(){let V=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(V.set(H,this[H]),delete this[H]);V.size>0&&(this._$Ep=V)}createRenderRoot(){let V=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return v7(V,this.constructor.elementStyles),V}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(V=>V.hostConnected?.())}enableUpdating(V){}disconnectedCallback(){this._$EO?.forEach(V=>V.hostDisconnected?.())}attributeChangedCallback(V,C,H){this._$AK(V,H)}_$ET(V,C){let H=this.constructor.elementProperties.get(V),e=this.constructor._$Eu(V,H);if(e!==void 0&&H.reflect===!0){let r=(H.converter?.toAttribute!==void 0?H.converter:W1).toAttribute(C,H.type);this._$Em=V,r==null?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null}}_$AK(V,C){let H=this.constructor,e=H._$Eh.get(V);if(e!==void 0&&this._$Em!==e){let r=H.getPropertyOptions(e),t=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:W1;this._$Em=e;let M=t.fromAttribute(C,r.type);this[e]=M??this._$Ej?.get(e)??M,this._$Em=null}}requestUpdate(V,C,H,e=!1,r){if(V!==void 0){let t=this.constructor;if(e===!1&&(r=this[V]),H??=t.getPropertyOptions(V),!((H.hasChanged??S2)(r,C)||H.useDefault&&H.reflect&&r===this._$Ej?.get(V)&&!this.hasAttribute(t._$Eu(V,H))))return;this.C(V,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(V,C,{useDefault:H,reflect:e,wrapped:r},t){H&&!(this._$Ej??=new Map).has(V)&&(this._$Ej.set(V,t??C??this[V]),r!==!0||t!==void 0)||(this._$AL.has(V)||(this.hasUpdated||H||(C=void 0),this._$AL.set(V,C)),e===!0&&this._$Em!==V&&(this._$Eq??=new Set).add(V))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let V=this.scheduleUpdate();return V!=null&&await V,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,r]of this._$Ep)this[e]=r;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[e,r]of H){let{wrapped:t}=r,M=this[e];t!==!0||this._$AL.has(e)||M===void 0||this.C(e,void 0,r,M)}}let V=!1,C=this._$AL;try{V=this.shouldUpdate(C),V?(this.willUpdate(C),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(C)):this._$EM()}catch(H){throw V=!1,this._$EM(),H}V&&this._$AE(C)}willUpdate(V){}_$AE(V){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(V)),this.updated(V)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(V){return!0}update(V){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(V){}firstUpdated(V){}};t1.elementStyles=[],t1.shadowRootOptions={mode:"open"},t1[z1("elementProperties")]=new Map,t1[z1("finalized")]=new Map,w8?.({ReactiveElement:t1}),(h2.reactiveElementVersions??=[]).push("2.1.2");var A5=globalThis,Z7=L=>L,f2=A5.trustedTypes,h7=f2?f2.createPolicy("lit-html",{createHTML:L=>L}):void 0,d5="$lit$",M1=`lit$${Math.random().toFixed(9).slice(2)}$`,p5="?"+M1,k8=`<${p5}>`,Z1=document,G1=()=>Z1.createComment(""),Q1=L=>L===null||typeof L!="object"&&typeof L!="function",l5=Array.isArray,b7=L=>l5(L)||typeof L?.[Symbol.iterator]=="function",n5=`[ 	
\f\r]`,U1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S7=/-->/g,f7=/>/g,u1=RegExp(`>|${n5}(?:([^\\s"'>=/]+)(${n5}*=${n5}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),g7=/'/g,_7=/"/g,y7=/^(?:script|style|textarea|title)$/i,s5=L=>(V,...C)=>({_$litType$:L,strings:V,values:C}),i=s5(1),p1=s5(2),gH=s5(3),C1=Symbol.for("lit-noChange"),n=Symbol.for("lit-nothing"),O7=new WeakMap,x1=Z1.createTreeWalker(Z1,129);function w7(L,V){if(!l5(L)||!L.hasOwnProperty("raw"))throw Error("invalid template strings array");return h7!==void 0?h7.createHTML(V):V}var k7=(L,V)=>{let C=L.length-1,H=[],e,r=V===2?"<svg>":V===3?"<math>":"",t=U1;for(let M=0;M<C;M++){let o=L[M],A,d,p=-1,u=0;for(;u<o.length&&(t.lastIndex=u,d=t.exec(o),d!==null);)u=t.lastIndex,t===U1?d[1]==="!--"?t=S7:d[1]!==void 0?t=f7:d[2]!==void 0?(y7.test(d[2])&&(e=RegExp("</"+d[2],"g")),t=u1):d[3]!==void 0&&(t=u1):t===u1?d[0]===">"?(t=e??U1,p=-1):d[1]===void 0?p=-2:(p=t.lastIndex-d[2].length,A=d[1],t=d[3]===void 0?u1:d[3]==='"'?_7:g7):t===_7||t===g7?t=u1:t===S7||t===f7?t=U1:(t=u1,e=void 0);let c=t===u1&&L[M+1].startsWith("/>")?" ":"";r+=t===U1?o+k8:p>=0?(H.push(A),o.slice(0,p)+d5+o.slice(p)+M1+c):o+M1+(p===-2?M:c)}return[w7(L,r+(L[C]||"<?>")+(V===2?"</svg>":V===3?"</math>":"")),H]},K1=class L{constructor({strings:V,_$litType$:C},H){let e;this.parts=[];let r=0,t=0,M=V.length-1,o=this.parts,[A,d]=k7(V,C);if(this.el=L.createElement(A,H),x1.currentNode=this.el.content,C===2||C===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(e=x1.nextNode())!==null&&o.length<M;){if(e.nodeType===1){if(e.hasAttributes())for(let p of e.getAttributeNames())if(p.endsWith(d5)){let u=d[t++],c=e.getAttribute(p).split(M1),h=/([.?@])?(.*)/.exec(u);o.push({type:1,index:r,name:h[2],strings:c,ctor:h[1]==="."?_2:h[1]==="?"?O2:h[1]==="@"?b2:S1}),e.removeAttribute(p)}else p.startsWith(M1)&&(o.push({type:6,index:r}),e.removeAttribute(p));if(y7.test(e.tagName)){let p=e.textContent.split(M1),u=p.length-1;if(u>0){e.textContent=f2?f2.emptyScript:"";for(let c=0;c<u;c++)e.append(p[c],G1()),x1.nextNode(),o.push({type:2,index:++r});e.append(p[u],G1())}}}else if(e.nodeType===8)if(e.data===p5)o.push({type:2,index:r});else{let p=-1;for(;(p=e.data.indexOf(M1,p+1))!==-1;)o.push({type:7,index:r}),p+=M1.length-1}r++}}static createElement(V,C){let H=Z1.createElement("template");return H.innerHTML=V,H}};function h1(L,V,C=L,H){if(V===C1)return V;let e=H!==void 0?C._$Co?.[H]:C._$Cl,r=Q1(V)?void 0:V._$litDirective$;return e?.constructor!==r&&(e?._$AO?.(!1),r===void 0?e=void 0:(e=new r(L),e._$AT(L,C,H)),H!==void 0?(C._$Co??=[])[H]=e:C._$Cl=e),e!==void 0&&(V=h1(L,e._$AS(L,V.values),e,H)),V}var g2=class{constructor(V,C){this._$AV=[],this._$AN=void 0,this._$AD=V,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(V){let{el:{content:C},parts:H}=this._$AD,e=(V?.creationScope??Z1).importNode(C,!0);x1.currentNode=e;let r=x1.nextNode(),t=0,M=0,o=H[0];for(;o!==void 0;){if(t===o.index){let A;o.type===2?A=new w1(r,r.nextSibling,this,V):o.type===1?A=new o.ctor(r,o.name,o.strings,this,V):o.type===6&&(A=new y2(r,this,V)),this._$AV.push(A),o=H[++M]}t!==o?.index&&(r=x1.nextNode(),t++)}return x1.currentNode=Z1,e}p(V){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(V,H,C),C+=H.strings.length-2):H._$AI(V[C])),C++}},w1=class L{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(V,C,H,e){this.type=2,this._$AH=n,this._$AN=void 0,this._$AA=V,this._$AB=C,this._$AM=H,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let V=this._$AA.parentNode,C=this._$AM;return C!==void 0&&V?.nodeType===11&&(V=C.parentNode),V}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(V,C=this){V=h1(this,V,C),Q1(V)?V===n||V==null||V===""?(this._$AH!==n&&this._$AR(),this._$AH=n):V!==this._$AH&&V!==C1&&this._(V):V._$litType$!==void 0?this.$(V):V.nodeType!==void 0?this.T(V):b7(V)?this.k(V):this._(V)}O(V){return this._$AA.parentNode.insertBefore(V,this._$AB)}T(V){this._$AH!==V&&(this._$AR(),this._$AH=this.O(V))}_(V){this._$AH!==n&&Q1(this._$AH)?this._$AA.nextSibling.data=V:this.T(Z1.createTextNode(V)),this._$AH=V}$(V){let{values:C,_$litType$:H}=V,e=typeof H=="number"?this._$AC(V):(H.el===void 0&&(H.el=K1.createElement(w7(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===e)this._$AH.p(C);else{let r=new g2(e,this),t=r.u(this.options);r.p(C),this.T(t),this._$AH=r}}_$AC(V){let C=O7.get(V.strings);return C===void 0&&O7.set(V.strings,C=new K1(V)),C}k(V){l5(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,e=0;for(let r of V)e===C.length?C.push(H=new L(this.O(G1()),this.O(G1()),this,this.options)):H=C[e],H._$AI(r),e++;e<C.length&&(this._$AR(H&&H._$AB.nextSibling,e),C.length=e)}_$AR(V=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);V!==this._$AB;){let H=Z7(V).nextSibling;Z7(V).remove(),V=H}}setConnected(V){this._$AM===void 0&&(this._$Cv=V,this._$AP?.(V))}},S1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(V,C,H,e,r){this.type=1,this._$AH=n,this._$AN=void 0,this.element=V,this.name=C,this._$AM=e,this.options=r,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=n}_$AI(V,C=this,H,e){let r=this.strings,t=!1;if(r===void 0)V=h1(this,V,C,0),t=!Q1(V)||V!==this._$AH&&V!==C1,t&&(this._$AH=V);else{let M=V,o,A;for(V=r[0],o=0;o<r.length-1;o++)A=h1(this,M[H+o],C,o),A===C1&&(A=this._$AH[o]),t||=!Q1(A)||A!==this._$AH[o],A===n?V=n:V!==n&&(V+=(A??"")+r[o+1]),this._$AH[o]=A}t&&!e&&this.j(V)}j(V){V===n?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,V??"")}},_2=class extends S1{constructor(){super(...arguments),this.type=3}j(V){this.element[this.name]=V===n?void 0:V}},O2=class extends S1{constructor(){super(...arguments),this.type=4}j(V){this.element.toggleAttribute(this.name,!!V&&V!==n)}},b2=class extends S1{constructor(V,C,H,e,r){super(V,C,H,e,r),this.type=5}_$AI(V,C=this){if((V=h1(this,V,C,0)??n)===C1)return;let H=this._$AH,e=V===n&&H!==n||V.capture!==H.capture||V.once!==H.once||V.passive!==H.passive,r=V!==n&&(H===n||e);e&&this.element.removeEventListener(this.name,this,H),r&&this.element.addEventListener(this.name,this,V),this._$AH=V}handleEvent(V){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,V):this._$AH.handleEvent(V)}},y2=class{constructor(V,C,H){this.element=V,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(V){h1(this,V)}},T7={M:d5,P:M1,A:p5,C:1,L:k7,R:g2,D:b7,V:h1,I:w1,H:S1,N:O2,U:b2,B:_2,F:y2},T8=A5.litHtmlPolyfillSupport;T8?.(K1,w1),(A5.litHtmlVersions??=[]).push("3.3.3");var P7=(L,V,C)=>{let H=C?.renderBefore??V,e=H._$litPart$;if(e===void 0){let r=C?.renderBefore??null;H._$litPart$=e=new w1(V.insertBefore(G1(),r),r,void 0,C??{})}return e._$AI(L),e};var m5=globalThis,P=class extends t1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let V=super.createRenderRoot();return this.renderOptions.renderBefore??=V.firstChild,V}update(V){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(V),this._$Do=P7(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C1}};P._$litElement$=!0,P.finalized=!0,m5.litElementHydrateSupport?.({LitElement:P});var P8=m5.litElementPolyfillSupport;P8?.({LitElement:P});(m5.litElementVersions??=[]).push("4.2.2");var E8={attribute:!0,type:String,converter:W1,reflect:!1,hasChanged:S2},B8=(L=E8,V,C)=>{let{kind:H,metadata:e}=C,r=globalThis.litPropertyMetadata.get(e);if(r===void 0&&globalThis.litPropertyMetadata.set(e,r=new Map),H==="setter"&&((L=Object.create(L)).wrapped=!0),r.set(C.name,L),H==="accessor"){let{name:t}=C;return{set(M){let o=V.get.call(this);V.set.call(this,M),this.requestUpdate(t,o,L,!0,M)},init(M){return M!==void 0&&this.C(t,void 0,L,M),M}}}if(H==="setter"){let{name:t}=C;return function(M){let o=this[t];V.call(this,M),this.requestUpdate(t,o,L,!0,M)}}throw Error("Unsupported decorator location: "+H)};function g(L){return(V,C)=>typeof C=="object"?B8(L,V,C):((H,e,r)=>{let t=e.hasOwnProperty(r);return e.constructor.createProperty(r,H),t?Object.getOwnPropertyDescriptor(e,r):void 0})(L,V,C)}function Z(L){return g({...L,state:!0,attribute:!1})}var v5="more-info-popup-card",u5="more-info-popup-card",i1="more-info-popup-dialog",Y1="more-info-popup-card-editor",a1={breadcrumb:"auto",mode:"auto",width:"medium",height:"native",column_span:1,layout:"single",vertical_align:"top",horizontal_align:"left",card_borders:!0,show_header_actions:!0,replace_more_info:!1,nested_more_info:"inline",dismissable:!0,auto_close:0,keep_alive:!1},R8=["auto","dialog","bottom_sheet","top_sheet"],F8=["small","medium","large","full","custom"],$8=["native","auto","custom"],D8=["inline","dialog"],R7=["top","center","bottom"],F7=["left","center","right"],N8=["single","zones"],I8=/^[a-z0-9][a-z0-9_-]*$/,z8=/^\d+(\.\d+)?(px|%|vw|vh|dvh|svh|lvh|em|rem)$/,$7=L=>L.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9_-]+/g,"_").replace(/^[_-]+|[_-]+$/g,"").slice(0,48),o1=(L,V,C)=>{if(V!==void 0&&!C.includes(V))throw new Error(`"${L}" must be one of: ${C.join(", ")}`)},k2=(L,V)=>{if(V!==void 0&&V!==""&&!z8.test(String(V)))throw new Error(`"${L}" must be a CSS length such as 720px or 80vh`)},c5=["cards","vertical_align","horizontal_align","min_height"],E7=(L,V)=>{if(V===void 0)return;if(!V||typeof V!="object"||Array.isArray(V))throw new Error(`"${L}" must be an object with: ${c5.join(", ")}`);let C=V,H=Object.keys(C).find(e=>!c5.includes(e));if(H)throw new Error(`Unknown "${L}.${H}"; use: ${c5.join(", ")}`);if(C.cards!==void 0&&!Array.isArray(C.cards))throw new Error(`"${L}.cards" must be a list`);o1(`${L}.vertical_align`,C.vertical_align,R7),o1(`${L}.horizontal_align`,C.horizontal_align,F7),k2(`${L}.min_height`,C.min_height)},q1=["integration","domain","entities","entity_glob"],W8=L=>{if(L===void 0)return;if(!L||typeof L!="object"||Array.isArray(L))throw new Error(`"match" must be an object with: ${q1.join(", ")}`);let V=L,C=Object.keys(V).find(H=>!q1.includes(H));if(C)throw new Error(`Unknown "match.${C}"; use: ${q1.join(", ")}`);if(!q1.some(H=>V[H]!==void 0))throw new Error(`"match" needs one of: ${q1.join(", ")}`);for(let H of["integration","domain","entity_glob"])if(V[H]!==void 0&&(typeof V[H]!="string"||!V[H]))throw new Error(`"match.${H}" must be a text`);if(V.domain!==void 0&&!/^[a-z0-9_]+$/.test(V.domain))throw new Error('"match.domain" must be a domain such as light');if(V.entities!==void 0&&(!Array.isArray(V.entities)||V.entities.some(H=>typeof H!="string"||!H.includes("."))))throw new Error('"match.entities" must be a list of entity IDs')},j1=L=>{if(!L||typeof L!="object")throw new Error("Invalid configuration");let V=L;if(!V.popup_id||typeof V.popup_id!="string")throw new Error('"popup_id" is required');if(!I8.test(V.popup_id))throw new Error('"popup_id" may only contain lowercase letters, digits, "_" and "-"');if(V.entity!==void 0&&(typeof V.entity!="string"||!V.entity.includes(".")))throw new Error('"entity" must be an entity ID');if(W8(V.match),V.cards!==void 0&&!Array.isArray(V.cards))throw new Error('"cards" must be a list');if(o1("mode",V.mode,R8),o1("width",V.width,F8),o1("height",V.height,$8),o1("nested_more_info",V.nested_more_info,D8),o1("layout",V.layout,N8),E7("header",V.header),E7("footer",V.footer),o1("vertical_align",V.vertical_align,R7),o1("horizontal_align",V.horizontal_align,F7),V.card_borders!==void 0&&typeof V.card_borders!="boolean")throw new Error('"card_borders" must be true or false');if(k2("custom_width",V.custom_width),k2("min_height",V.min_height),k2("max_height",V.max_height),V.column_span!==void 0&&(!Number.isInteger(V.column_span)||V.column_span<1||V.column_span>4))throw new Error('"column_span" must be an integer between 1 and 4');if(V.auto_close!==void 0&&(typeof V.auto_close!="number"||V.auto_close<0))throw new Error('"auto_close" must be a positive number of seconds');return V},T2=L=>({...a1,...L,cards:L.cards??[]}),x5=L=>L.width==="custom"?"medium":L.width==="medium"&&L.column_span>1?"large":L.width,U8={small:"var(--ha-dialog-width-sm, 320px)",medium:"var(--ha-dialog-width-md, 580px)",large:"var(--ha-dialog-width-lg, 1024px)"},B7="calc(100dvh - max(var(--safe-area-inset-top), 48px))",D7=L=>{let V={};if(L.width==="custom"&&L.custom_width)V["--ha-dialog-width-md"]=L.custom_width,V["--ha-bottom-sheet-max-width"]=L.custom_width;else{let C=U8[x5(L)];C&&(V["--ha-bottom-sheet-max-width"]=C)}return L.height==="native"&&(V["--ha-bottom-sheet-height"]=B7,V["--ha-bottom-sheet-max-height"]=B7),L.height==="custom"&&(L.min_height&&(V["--ha-dialog-min-height"]=L.min_height,V["--ha-bottom-sheet-height"]=L.min_height),L.max_height&&(V["--ha-dialog-max-height"]=L.max_height,V["--ha-bottom-sheet-max-height"]=L.max_height)),V};var v=L=>L.substring(0,L.indexOf(".")),P2=L=>L.substring(L.indexOf(".")+1),I7=["scene","automation"],z7=["script"],W7=["camera","configurator"],G8=["counter","input_number","number","proximity","sensor"],Q8=["alarm_control_panel","automation","camera","climate","configurator","conversation","counter","cover","date","datetime","fan","group","humidifier","image","input_boolean","input_datetime","lawn_mower","light","lock","media_player","person","remote","script","scene","siren","sun","switch","time","timer","update","vacuum","valve","water_heater","weather"],X1=L=>!!L.user?.is_admin,U7=(L,V)=>L.config.components.includes(V),K8=(L,V)=>U7(L,"history")&&!W7.includes(v(V)),q8=(L,V)=>{if(!U7(L,"logbook")||!L.states[V])return!1;let H=v(V);return!(W7.includes(H)||G8.includes(H))},G7=(L,V,C)=>(!C||Q8.includes(v(V)))&&(K8(L,V)||q8(L,V)),Z5=L=>X1(L)||!!L.auth.external?.config.hasEntityAddTo,h5=(L,V)=>L.entities[V]?.device_id??null,Q7=(L,V)=>(V&&L.devices[V]?.entry_type)==="service"?"service":"device",K7=L=>{if(!L)return!1;let V=v(L.entity_id);return I7.includes(V)&&L.attributes.id||z7.includes(V)?!0:V==="person"&&L.attributes.editable!=="false"},q7=(L,V)=>{let C=v(L.entity_id),H=L.entity_id;return(I7.includes(C)||C==="person")&&(H=L.attributes.id),z7.includes(C)&&(H=V),H?`/config/${C}/edit/${H}`:void 0},G=L=>L.attributes.friendly_name??L.entity_id.substring(L.entity_id.indexOf(".")+1),N7=(L,V)=>{let C=V?L.devices[V]:void 0;return C&&(C.name_by_user||C.name)?.trim()||void 0},S5=(L,V)=>{let C=L.states[V],H=L.entities[V];if(!H)return[C?G(C):V];let e=H.device_id?L.devices[H.device_id]:void 0,r=H.area_id||e?.area_id,t=r?L.areas[r]?.name:void 0,M=u=>C&&L.formatEntityName&&L.formatEntityName(C,{type:u})||void 0,o=N7(L,H.device_id),A=M("entity")??(C?G(C):void 0);A&&o&&A===o&&(A=void 0);let d=H.next_name_part==="device"||!A,p=d&&e?.next_name_part==="parent_device"?N7(L,e.parent_device_id):void 0;return[t,p,d?o:void 0,A].filter(u=>!!u)},Y7=L=>!!L.translationMetadata?.translations?.[L.language]?.isRTL;var b=(L,V,C,H={})=>{let e=new CustomEvent(V,{bubbles:H.bubbles??!0,cancelable:H.cancelable??!1,composed:H.composed??!0,detail:C??{}});return L.dispatchEvent(e),e};var Y8=["ha-adaptive-dialog","ha-dialog","ha-bottom-sheet","ha-dialog-header","ha-icon-button","ha-icon-button-prev","ha-dropdown","ha-dropdown-item","hui-section"],C4={info:"ha-more-info-info",history:"ha-more-info-history-and-logbook",settings:"ha-more-info-settings",related:"ha-more-info-related",details:"ha-more-info-details",add_to:"ha-more-info-add-to"},C2=L=>customElements.get(L)!==void 0,H1=async(L,V=5e3)=>{if(C2(L))return!0;let C,H=await Promise.race([customElements.whenDefined(L).then(()=>!0),new Promise(e=>{C=setTimeout(()=>e(!1),V)})]);return clearTimeout(C),H},j7,H4=()=>(j7??=(async()=>{await H1("ha-more-info-dialog");let L=[];for(let V of Y8)await H1(V,2e3)||L.push(V);return L.length&&console.warn("[more-info-popup-card] Missing Home Assistant elements:",L.join(", ")),L})(),j7),X7=async L=>{let V=customElements.get(L);try{await V?.getConfigElement?.()}catch{}},J7,V4=()=>(J7??=(async()=>{await Promise.all([H1("hui-tile-card"),H1("hui-grid-card")]),await Promise.all([X7("hui-tile-card"),X7("hui-grid-card")]),await Promise.all([H1("ha-form"),H1("hui-card-picker"),H1("hui-card-element-editor")])})(),J7),j8=L=>{let V=L?.match(/^(\d{4})\.(\d{1,2})/);return V?[Number(V[1]),Number(V[2])]:void 0},J1=[2026,10],L4=L=>{let V=j8(L);if(!V)return!0;let[C,H]=V;return C>J1[0]||C===J1[0]&&H>=J1[1]},f5=(L,V,C,H)=>{let e=customElements.get(V)?.prototype?.[C];if(typeof e!="function")return console.warn("[more-info-popup-card] Missing",`${V}.${C}`),!1;let r=Object.assign(document.createElement("span"),H);r.hidden=!0,L.appendChild(r);try{e.call(r)}finally{r.remove()}return!0};var E2={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},k1=L=>(...V)=>({_$litDirective$:L,values:V}),l1=class{constructor(V){}get _$AU(){return this._$AM._$AU}_$AT(V,C,H){this._$Ct=V,this._$AM=C,this._$Ci=H}_$AS(V,C){return this.update(V,C)}update(V,C){return this.render(...C)}};var w=k1(class extends l1{constructor(L){if(super(L),L.type!==E2.ATTRIBUTE||L.name!=="class"||L.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(L){return" "+Object.keys(L).filter(V=>L[V]).join(" ")+" "}update(L,[V]){if(this.st===void 0){this.st=new Set,L.strings!==void 0&&(this.nt=new Set(L.strings.join(" ").split(/\s/).filter(H=>H!=="")));for(let H in V)V[H]&&!this.nt?.has(H)&&this.st.add(H);return this.render(V)}let C=L.element.classList;for(let H of this.st)H in V||(C.remove(H),this.st.delete(H));for(let H in V){let e=!!V[H];e===this.st.has(H)||this.nt?.has(H)||(e?(C.add(H),this.st.add(H)):(C.remove(H),this.st.delete(H)))}return C1}});var e4="important",X8=" !"+e4,B=k1(class extends l1{constructor(L){if(super(L),L.type!==E2.ATTRIBUTE||L.name!=="style"||L.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(L){return Object.keys(L).reduce((V,C)=>{let H=L[C];return H==null?V:V+`${C=C.includes("-")?C:C.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${H};`},"")}update(L,[V]){let{style:C}=L.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(V)),this.render(V);for(let H of this.ft)V[H]==null&&(this.ft.delete(H),H.includes("-")?C.removeProperty(H):C[H]=null);for(let H in V){let e=V[H];if(e!=null){this.ft.add(H);let r=typeof e=="string"&&e.endsWith(X8);H.includes("-")||r?C.setProperty(H,r?e.slice(0,-11):e,r?e4:""):C[H]=e}}return C1}});var s1="popup-align",J8=`
  :host([${s1}]) .container {
    display: flex;
    flex-wrap: wrap;
  }
  :host([${s1}="center"]) .container {
    justify-content: center;
  }
  :host([${s1}="right"]) .container {
    justify-content: flex-end;
  }
  :host([${s1}]) .card {
    flex: 0 0 auto;
    box-sizing: border-box;
    width: calc(
      (100% + var(--column-gap)) *
        min(var(--column-size, 1), var(--grid-column-count)) /
        var(--grid-column-count) - var(--column-gap)
    );
  }
  :host([${s1}]) .card.full-width {
    width: 100%;
  }
  /* "Add card" button of the editor preview (3 columns wide) */
  :host([${s1}]) .add {
    flex: 0 0 auto;
    width: calc(
      (100% + var(--column-gap)) * 3 / var(--grid-column-count) -
        var(--column-gap)
    );
  }
`,H2,r4=(L,V)=>{let C=L.shadowRoot;return C?(H2??=new CSSStyleSheet,H2.cssRules.length||H2.replaceSync(J8),C.adoptedStyleSheets.includes(H2)||(C.adoptedStyleSheets=[...C.adoptedStyleSheets,H2]),V==="left"?L.removeAttribute(s1):L.setAttribute(s1,V),!0):!1},t4=new WeakMap,g5=new WeakMap,B2=(L,V)=>{g5.set(L,V);let C=()=>{let H=L.querySelector("hui-grid-section");H&&(r4(H,g5.get(L))||H.updateComplete?.then(()=>r4(H,g5.get(L))))};if(!t4.has(L)){let H=new MutationObserver(C);H.observe(L,{childList:!0}),t4.set(L,H)}C()};var V2=L=>{let V={id:"main",cards:L.cards??[],vertical_align:L.vertical_align??a1.vertical_align,horizontal_align:L.horizontal_align??a1.horizontal_align};if(L.layout!=="zones")return[V];let C=H=>({id:H,cards:L[H]?.cards??[],vertical_align:L[H]?.vertical_align??"top",horizontal_align:L[H]?.horizontal_align??"left",min_height:L[H]?.min_height});return[C("header"),V,C("footer")]},o4=(L,V)=>(V==="main"?L.cards:L[V]?.cards)??[],i4=(L,V,C)=>{if(V==="main")return{...L,cards:C};let H={...L[V],cards:C};C.length||delete H.cards;let e={...L,[V]:H};return Object.keys(H).length||delete e[V],e},a4=L=>V2(L).flatMap(V=>V.cards),_5=(L,V)=>({type:"grid",column_span:L.column_span??a1.column_span,cards:V}),T1=class{_sections=new Map;_keys=new Map;update(V,C){let H=new Map;for(let e of V2(V)){let r=this._sections.get(e.id);r||(r=document.createElement("hui-section"),this._sections.set(e.id,r)),r.hass=C;let t=_5(V,e.cards),M=JSON.stringify(t);this._keys.get(e.id)!==M&&(this._keys.set(e.id,M),r.config=t),B2(r,e.horizontal_align),H.set(e.id,r)}return H}set hass(V){for(let C of this._sections.values())C.hass=V}},CC=L=>L.id==="main"||L.cards.length>0,M4=(L,V,C)=>i`
  <div
    class="zone zone-${L.id} align-${L.vertical_align} ${C?"ha-scrollbar":""}"
    style=${B({"min-height":L.min_height||void 0})}
    @scroll=${C}
  >
    ${V}
  </div>
`,R2=(L,V,C={})=>{let H=V2(L),e=B({"--column-span":String(L.column_span??a1.column_span)}),r=L.card_borders===!1;if(L.layout!=="zones"){let[t]=H;return i`
      <div
        class=${w({body:!0,[`align-${t.vertical_align}`]:!0,borderless:r})}
        ?hidden=${C.hidden??!1}
        style=${e}
      >
        ${V.get("main")}
      </div>
    `}return i`
    <div
      class=${w({body:!0,zones:!0,borderless:r})}
      ?hidden=${C.hidden??!1}
      style=${e}
    >
      ${H.filter(CC).map(t=>t.id!=="main"?M4(t,V.get(t.id)):i`
              <div class="zone-main-frame">
                ${M4(t,V.get(t.id),C.onScroll)}
                ${C.onScroll?i`
                        <div
                          class=${w({"fade-top":!0,visible:!!C.fadeTop})}
                        ></div>
                        <div
                          class=${w({"fade-bottom":!0,visible:!!C.fadeBottom})}
                        ></div>
                      `:""}
              </div>
            `)}
    </div>
  `},F2=O`
  .body.zones {
    padding: 0;
  }
  .zone {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: var(--ha-space-3) var(--ha-space-6);
  }
  .zone-header {
    flex: none;
    padding-top: var(--ha-space-6);
  }
  .zone-footer {
    flex: none;
    padding-bottom: max(var(--safe-area-inset-bottom), var(--ha-space-6));
  }
  .zone-main-frame {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
  .zone-main {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
  }
  .zone-main-frame:first-child .zone-main {
    padding-top: var(--ha-space-6);
  }
  .zone-main-frame:last-child .zone-main {
    padding-bottom: max(var(--safe-area-inset-bottom), var(--ha-space-6));
  }
  /* Auto margins (not justify-content) keep the top of a main zone taller
     than the popup reachable by scrolling. */
  .zone.align-center > hui-section {
    margin-block: auto;
  }
  .zone.align-bottom > hui-section {
    margin-top: auto;
  }
  .zone hui-section {
    display: block;
    width: 100%;
  }
`;var n4=O`
  ha-dialog,
  ha-adaptive-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-max-width: min(600px, 95vw);
    --justify-action-buttons: space-between;
    --dialog-container-padding: var(--safe-area-inset-top, 0)
      var(--safe-area-inset-right, 0) var(--safe-area-inset-bottom, 0)
      var(--safe-area-inset-left, 0);
    --dialog-surface-padding: 0px;
    --dialog-content-padding: 0;
  }

  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog,
    ha-adaptive-dialog {
      --mdc-dialog-min-width: 100vw;
      --mdc-dialog-max-width: 100vw;
      --mdc-dialog-min-height: 100vh;
      --mdc-dialog-min-height: 100svh;
      --mdc-dialog-max-height: 100vh;
      --mdc-dialog-max-height: 100svh;
      --dialog-container-padding: 0px;
      --dialog-surface-padding: var(--safe-area-inset-top, 0)
        var(--safe-area-inset-right, 0) var(--safe-area-inset-bottom, 0)
        var(--safe-area-inset-left, 0);
      --vertical-align-dialog: flex-end;
    }
    ha-dialog {
      --ha-dialog-border-radius: var(--ha-border-radius-square);
    }
  }

  /* haStyleDialogFixedTop: pin to top so it doesn't jump when content changes */
  :host([fixed-top]) ha-dialog,
  :host([fixed-top]) ha-adaptive-dialog {
    --vertical-align-dialog: flex-start;
    --dialog-surface-margin-top: var(--ha-space-10);
    --mdc-dialog-max-height: calc(
      100vh - var(--dialog-surface-margin-top) - var(--ha-space-2) - var(
          --safe-area-inset-y,
          0px
        )
    );
    --mdc-dialog-max-height: calc(
      100svh - var(--dialog-surface-margin-top) - var(--ha-space-2) - var(
          --safe-area-inset-y,
          0px
        )
    );
  }
`,A4=O`
  ha-bottom-sheet {
    --ha-bottom-sheet-border-radius: var(--ha-border-radius-2xl);
    --ha-bottom-sheet-surface-background: var(
      --ha-dialog-surface-background,
      var(--card-background-color, var(--ha-color-surface-default))
    );
    --ha-bottom-sheet-padding: 0 var(--safe-area-inset-right)
      var(--safe-area-inset-bottom) var(--safe-area-inset-left);
    --ha-bottom-sheet-content-padding: 0;
  }
`,d4=O`
  .ha-scrollbar::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }
  .ha-scrollbar::-webkit-scrollbar-thumb {
    border-radius: var(--ha-border-radius-sm);
    background: var(--scrollbar-thumb-color);
  }
  .ha-scrollbar {
    overflow-y: auto;
    scrollbar-color: var(--scrollbar-thumb-color) transparent;
    scrollbar-width: thin;
  }
`,p4=O`
  .fade-top,
  .fade-bottom {
    position: absolute;
    left: 0;
    right: 0;
    height: var(--ha-space-2);
    pointer-events: none;
    transition: opacity 180ms ease-in-out;
    border-radius: var(--ha-border-radius-square);
    opacity: 0;
    background: linear-gradient(
      to bottom,
      var(--ha-color-shadow-scrollable-fade),
      transparent
    );
  }
  .fade-top {
    top: 0;
  }
  .fade-bottom {
    bottom: 0;
    transform: rotate(180deg);
  }
  .fade-top.visible,
  .fade-bottom.visible {
    opacity: 1;
  }
`,$2=O`
  .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 0 calc(var(--ha-space-2) * -1) 0;
  }
  .title p {
    margin: 0;
    min-width: 0;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .title .main {
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-xl);
    line-height: var(--ha-line-height-condensed);
  }
  .title .breadcrumb {
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-m);
    font-family: var(--ha-font-family-heading, inherit);
    line-height: 16px;
    --mdc-icon-size: 16px;
    padding: var(--ha-space-1);
    margin: calc(var(--ha-space-1) * -1);
    margin-top: calc(var(--ha-space-2) * -1);
    background: none;
    border: none;
    outline: none;
    display: inline;
    border-radius: var(--ha-border-radius-md);
    transition: background-color 180ms ease-in-out;
    min-width: 0;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
  }
  .title button.breadcrumb {
    cursor: pointer;
  }
  .title button.breadcrumb:focus-visible,
  .title button.breadcrumb:hover {
    background-color: rgba(var(--rgb-secondary-text-color), 0.08);
  }
`,D2=O`
  .content-wrapper {
    flex: 1 1 auto;
    min-height: 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .content {
    outline: none;
    flex: 1;
    overflow: auto;
    scrollbar-gutter: stable;
  }
  .content-wrapper.settings-view .fade-bottom {
    bottom: calc(
      var(--ha-space-14) + max(var(--safe-area-inset-bottom), var(--ha-space-4))
    );
  }
  /* ha-more-info-info .content */
  .body {
    display: flex;
    flex-direction: column;
    padding: var(--ha-space-6);
    padding-bottom: max(var(--safe-area-inset-bottom), var(--ha-space-6));
  }
  .body hui-section {
    display: block;
    width: 100%;
  }
  /* card_borders: false */
  .body.borderless {
    --ha-card-border-width: 0;
    --ha-card-box-shadow: none;
  }
  ha-more-info-history-and-logbook {
    padding: var(--ha-space-2) 0 var(--ha-space-6) 0;
    display: block;
  }
`;var O5={"card.name":"More-info popup","card.description":"A container shown as a native more-info popup, with a sections-style grid of cards inside.","card.cards_count":"{count} cards","card.cards_count_one":"1 card","card.hidden_hint":"Hidden on the dashboard \xB7 opens with #{id}","card.missing_elements":"This Home Assistant version is missing elements the popup needs. Check the browser console.","card.unsupported_version":"More-info popup card requires Home Assistant {version} or newer.","dialog.entity_controls":"Entity controls","editor.tab.cards":"Cards","editor.tab.popup":"Popup","editor.section.general":"General","editor.section.appearance":"Appearance","editor.section.zones":"Zones","editor.section.behavior":"Behavior","editor.popup_id":"Popup ID","editor.popup_id_helper":"Open it with a Navigate action to #{id}","editor.entity":"Entity","editor.entity_helper":"Optional. Enables the history, settings and menu buttons of the native header.","editor.name":"Title","editor.icon":"Icon","editor.breadcrumb":"Breadcrumb","editor.breadcrumb_helper":"Text above the title. Type your own text or pick an option.","editor.breadcrumb.auto":"Area and device (automatic)","editor.breadcrumb.none":"None","editor.mode":"Presentation","editor.mode.auto":"Automatic (like Home Assistant)","editor.mode.dialog":"Centered dialog","editor.mode.bottom_sheet":"Bottom sheet","editor.mode.top_sheet":"Top sheet (drops from the top)","editor.width":"Width","editor.width.small":"Small","editor.width.medium":"Medium (default)","editor.width.large":"Large","editor.width.full":"Full width","editor.width.custom":"Custom","editor.custom_width":"Custom width","editor.height":"Height","editor.height.native":"Like the native more-info","editor.height.auto":"Fit content","editor.height.custom":"Custom","editor.min_height":"Minimum height","editor.max_height":"Maximum height","editor.length_helper":"CSS length, for example 720px, 80vh or 90%","editor.column_span":"Grid width (sections)","editor.column_span_helper":"1 = 12 columns like a dashboard section; 2 = 24 columns.","editor.layout":"Layout","editor.layout.single":"One zone","editor.layout.zones":"Header, main and footer","editor.layout_helper":"With three zones the header and footer stay pinned and the main zone takes the free height (and scrolls).","editor.zone.header":"Header","editor.zone.header_hint":"Pinned at the top","editor.zone.main":"Main","editor.zone.main_hint":"Takes the free height and scrolls","editor.zone.footer":"Footer","editor.zone.footer_hint":"Pinned at the bottom","editor.vertical_align":"Vertical alignment","editor.vertical_align.top":"Top","editor.vertical_align.center":"Center","editor.vertical_align.bottom":"Bottom","editor.horizontal_align":"Horizontal alignment","editor.horizontal_align.left":"Left","editor.horizontal_align.center":"Center","editor.horizontal_align.right":"Right","editor.horizontal_align_helper":"For rows narrower than the grid (cards with fewer columns in Layout).","editor.card_borders":"Show card borders","editor.show_header_actions":"Show history, settings and menu","editor.replace_more_info":"Replace the entity's more-info","editor.replace_more_info_helper":"Opening the entity, or any entity matched below, from any card on this view shows this popup instead.","editor.match":"Also for these entities (template popup)","editor.match_integration":"Integration","editor.match_domain":"Domain","editor.entity_glob":"Entity ID pattern","editor.entity_glob_helper":"For example light.wled_*. * matches any text. Integration, domain and pattern must all match.","editor.match_entities":"Entities","editor.match_entities_helper":"Always included. Use entity: this in the cards for the entity that was opened.","editor.nested_more_info":"Entities opened from inside the popup","editor.nested_more_info.inline":"Navigate inside the popup (like Home Assistant)","editor.nested_more_info.dialog":"Open a separate dialog","editor.dismissable":"Close with Esc, outside click or swipe","editor.auto_close":"Close automatically after inactivity","editor.keep_alive":"Keep cards loaded while closed (faster reopen)","editor.test_popup":"Test popup","editor.add_card":"Add card","editor.edit_card":"Edit card","editor.back":"Back","editor.empty":"This popup has no cards yet.","editor.undo":"Undo","editor.card_deleted":"Card deleted","editor.popup_id_invalid":'Use lowercase letters, digits, "_" and "-" only.',"state_card.name":"More-info state","state_card.description":"State header and the big control of a native more-info dialog.","controls_card.name":"More-info controls","controls_card.description":"Row of more-info chips: selects, toggles, numbers and actions.","controls.empty":"Add controls in the editor.","controls.entity":"Entity","controls.control":"Main control","controls.control.auto":"Automatic (like Home Assistant)","controls.control.none":"None","controls.control.toggle":"Toggle","controls.control.brightness":"Brightness slider","controls.control.fan_speed":"Fan speed","controls.control.position":"Cover position","controls.control.tilt":"Cover tilt","controls.control.cover_toggle":"Cover toggle","controls.control.cover_buttons":"Cover buttons","controls.control.valve_position":"Valve position","controls.control.valve_toggle":"Valve toggle","controls.control.valve_buttons":"Valve buttons","controls.control.lock":"Lock","controls.control.alarm_modes":"Alarm modes","controls.control.temperature":"Thermostat","controls.control.climate_humidity":"Climate humidity","controls.control.humidity":"Humidifier","controls.control.water_heater":"Water heater","controls.control.vacuum_status":"Vacuum status","controls.control.lawn_mower_status":"Lawn mower status","controls.control.media_player":"Media player","controls.control.remote":"Remote (clickpad and buttons)","controls.control.more_info":"Native more-info content","controls.control.script":"Script (run / cancel)","controls.control.press":"Press button","controls.control.trigger":"Trigger (momentary switch)","controls.control.push":"Push button (stateless)","controls.show_state":"Show state","controls.show_cancel":"Show Cancel","controls.show_cancel_helper":"Cancel button under a running script (trigger and push controls).","controls.show_last_changed":"Show last changed","controls.state_override":"State text","controls.state_override_helper":"Replaces the state text, and the button text of the trigger, push, press and script controls.","controls.appearance":"Appearance","controls.appearance.plain":"Plain (like more-info)","controls.appearance.card":"Card","controls.controls":"Controls","controls.type":"Type","controls.type_helper":"Automatic if empty: select for select entities or attributes, toggle, number or action.","controls.type.select":"Select","controls.type.toggle":"Toggle","controls.type.number":"Number","controls.type.button":"Button (icon)","controls.type.action":"Action","controls.attribute":"Attribute","controls.attribute_helper":"Options shown in the select (effect, preset mode, fan speed\u2026).","controls.attribute.state":"State (on / off)","controls.attribute.effect":"Effect","controls.attribute.preset_mode":"Preset mode","controls.attribute.fan_mode":"Fan mode","controls.attribute.swing_mode":"Swing mode","controls.attribute.swing_horizontal_mode":"Horizontal swing mode","controls.attribute.hvac_mode":"HVAC mode","controls.attribute.fan_speed":"Fan speed (vacuum)","controls.attribute.mode":"Mode","controls.attribute.direction":"Direction","controls.attribute.oscillating":"Oscillating","controls.attribute.operation_mode":"Operation mode","controls.attribute.away_mode":"Away mode","controls.attribute.source":"Source","controls.attribute.sound_mode":"Sound mode","controls.name":"Name","controls.icon":"Icon","controls.icon_off":"Icon when off","controls.icon_helper":"Replaces the entity icon of the toggle, trigger and push button (for the toggle, the on icon).","controls.color":"Color","controls.color_helper":"Color of the control while active (any CSS color or a theme color).","controls.color_off":"Color when off","controls.button_layout":"Push button shape","controls.button_layout_helper":"Only for the push button control.","controls.button_layout.vertical":"Vertical (like the toggle)","controls.button_layout.horizontal":"Horizontal","controls.button_layout.square":"Square","controls.button_layout.circle":"Circle","controls.remote":"Remote","controls.remote_helper":"Media players: automatic finds the remote of the device (Apple TV), none hides it. Pick a remote, or the Apple TV media player whose remote to use (for universal or group media players).","controls.remote.auto":"Automatic","controls.remote.none":"None","controls.audio_entity":"Audio entity","controls.audio_entity_helper":"Remote view: media player that takes the volume and mute (an AVR or sound system). Empty: the remote sends them.","controls.remote_view":"Media player opens on","controls.remote_view.now_playing":"Now playing","controls.remote_view.remote":"Remote","controls.haptics":"Haptic feedback","controls.haptics_helper":"Vibration of the remote keys and gestures.","controls.seek_color":"Seek slider color","controls.seek_color_helper":"Remote view: the theme color, the dominant color of the cover, or type a color.","controls.seek_color.theme":"Theme","controls.seek_color.art":"Cover art","controls.options":"Options","controls.options_helper":"Optional: which options to show and in which order.","controls.value":"Secondary text","controls.value_helper":"Defaults to the entity state.","controls.tap_action":"Tap action","controls.show_arrow":"Show arrow","controls.show_arrow_helper":"The \u203A chevron of chips that open another view.","controls.perform_action":"Custom action","controls.perform_action_helper":"domain.action that receives the value instead of the entity's own action, e.g. script.turn_on.","controls.data_key":"Value field","controls.data_key_helper":"Field of the custom action that receives the value, e.g. effect.","controls.min":"Minimum","controls.min_helper":"Replaces the minimum of the entity.","controls.max":"Maximum","controls.max_helper":"Replaces the maximum of the entity.","controls.step":"Step","controls.visibility":"Visibility","controls.visibility_helper":"Shown only when these conditions are met: the same list as a card's Visibility tab (state, numeric_state, screen, user, time, location, and / or / not), in YAML.","controls.step_helper":"Replaces the step of the entity.","controls.item_color_helper":"Icon color (any CSS color or a theme color); for a toggle, only while it is on.","controls.item_icon_helper":"Replaces the icon of the entity or attribute.","controls.wrap":"Wrap on phones","controls.wrap_helper":"Chips go to new rows instead of scrolling sideways (Home Assistant scrolls).","remote.view.now_playing":"Now playing","remote.view.remote":"Remote","remote.clickpad":"Clickpad","remote.home":"TV","remote.not_found":"No remote found for this entity."};var l4={"card.name":"Popup more-info","card.description":"Un contenedor que se muestra como el popup more-info nativo, con una rejilla de tarjetas como una secci\xF3n.","card.cards_count":"{count} tarjetas","card.cards_count_one":"1 tarjeta","card.hidden_hint":"Oculta en el dashboard \xB7 se abre con #{id}","card.missing_elements":"A esta versi\xF3n de Home Assistant le faltan elementos que el popup necesita. Revisa la consola del navegador.","card.unsupported_version":"More-info popup card requiere Home Assistant {version} o superior.","dialog.entity_controls":"Controles de la entidad","editor.tab.cards":"Tarjetas","editor.tab.popup":"Popup","editor.section.general":"General","editor.section.appearance":"Apariencia","editor.section.zones":"Zonas","editor.section.behavior":"Comportamiento","editor.popup_id":"ID del popup","editor.popup_id_helper":"\xC1brelo con una acci\xF3n Navegar a #{id}","editor.entity":"Entidad","editor.entity_helper":"Opcional. Habilita los botones de historial, ajustes y men\xFA de la cabecera nativa.","editor.name":"T\xEDtulo","editor.icon":"Icono","editor.breadcrumb":"Ruta","editor.breadcrumb_helper":"Texto sobre el t\xEDtulo. Escribe el tuyo o elige una opci\xF3n.","editor.breadcrumb.auto":"\xC1rea y dispositivo (autom\xE1tico)","editor.breadcrumb.none":"Ninguna","editor.mode":"Presentaci\xF3n","editor.mode.auto":"Autom\xE1tica (como Home Assistant)","editor.mode.dialog":"Di\xE1logo centrado","editor.mode.bottom_sheet":"Hoja inferior deslizante","editor.mode.top_sheet":"Hoja superior (cae desde arriba)","editor.width":"Ancho","editor.width.small":"Peque\xF1o","editor.width.medium":"Mediano (por defecto)","editor.width.large":"Grande","editor.width.full":"Ancho completo","editor.width.custom":"Personalizado","editor.custom_width":"Ancho personalizado","editor.height":"Alto","editor.height.native":"Como el more-info nativo","editor.height.auto":"Ajustar al contenido","editor.height.custom":"Personalizado","editor.min_height":"Alto m\xEDnimo","editor.max_height":"Alto m\xE1ximo","editor.length_helper":"Longitud CSS, por ejemplo 720px, 80vh o 90%","editor.column_span":"Ancho de la rejilla (secciones)","editor.column_span_helper":"1 = 12 columnas como una secci\xF3n del dashboard; 2 = 24 columnas.","editor.layout":"Distribuci\xF3n","editor.layout.single":"Una zona","editor.layout.zones":"Cabecera, centro y pie","editor.layout_helper":"Con tres zonas la cabecera y el pie quedan fijos y el centro ocupa el alto libre (y hace scroll).","editor.zone.header":"Cabecera","editor.zone.header_hint":"Fija arriba","editor.zone.main":"Centro","editor.zone.main_hint":"Ocupa el alto libre y hace scroll","editor.zone.footer":"Pie","editor.zone.footer_hint":"Fijo abajo","editor.vertical_align":"Alineaci\xF3n vertical","editor.vertical_align.top":"Arriba","editor.vertical_align.center":"Centro","editor.vertical_align.bottom":"Abajo","editor.horizontal_align":"Alineaci\xF3n horizontal","editor.horizontal_align.left":"Izquierda","editor.horizontal_align.center":"Centro","editor.horizontal_align.right":"Derecha","editor.horizontal_align_helper":"Para filas m\xE1s estrechas que la rejilla (tarjetas con menos columnas en Dise\xF1o).","editor.card_borders":"Mostrar bordes de las tarjetas","editor.show_header_actions":"Mostrar historial, ajustes y men\xFA","editor.replace_more_info":"Reemplazar el more-info de la entidad","editor.replace_more_info_helper":"Al abrir la entidad, o cualquier entidad que coincida abajo, desde cualquier tarjeta de esta vista se muestra este popup.","editor.match":"Tambi\xE9n para estas entidades (popup plantilla)","editor.match_integration":"Integraci\xF3n","editor.match_domain":"Dominio","editor.entity_glob":"Patr\xF3n de ID de entidad","editor.entity_glob_helper":"Por ejemplo light.wled_*. * coincide con cualquier texto. Integraci\xF3n, dominio y patr\xF3n deben coincidir todos.","editor.match_entities":"Entidades","editor.match_entities_helper":"Siempre incluidas. Usa entity: this en las tarjetas para la entidad que se abri\xF3.","editor.nested_more_info":"Entidades abiertas desde dentro del popup","editor.nested_more_info.inline":"Navegar dentro del popup (como Home Assistant)","editor.nested_more_info.dialog":"Abrir un di\xE1logo aparte","editor.dismissable":"Cerrar con Esc, clic fuera o deslizando","editor.auto_close":"Cerrar autom\xE1ticamente tras inactividad","editor.keep_alive":"Mantener las tarjetas cargadas al cerrar (reapertura m\xE1s r\xE1pida)","editor.test_popup":"Probar popup","editor.add_card":"A\xF1adir tarjeta","editor.edit_card":"Editar tarjeta","editor.back":"Volver","editor.empty":"Este popup a\xFAn no tiene tarjetas.","editor.undo":"Deshacer","editor.card_deleted":"Tarjeta eliminada","editor.popup_id_invalid":'Usa solo min\xFAsculas, n\xFAmeros, "_" y "-".',"state_card.name":"Estado more-info","state_card.description":"Cabecera de estado y control grande de un more-info nativo.","controls_card.name":"Controles more-info","controls_card.description":"Fila de chips del more-info: selectores, interruptores, n\xFAmeros y acciones.","controls.empty":"A\xF1ade controles en el editor.","controls.entity":"Entidad","controls.control":"Control principal","controls.control.auto":"Autom\xE1tico (como Home Assistant)","controls.control.none":"Ninguno","controls.control.toggle":"Interruptor","controls.control.brightness":"Control de brillo","controls.control.fan_speed":"Velocidad del ventilador","controls.control.position":"Posici\xF3n de la persiana","controls.control.tilt":"Inclinaci\xF3n de la persiana","controls.control.cover_toggle":"Interruptor de persiana","controls.control.cover_buttons":"Botones de persiana","controls.control.valve_position":"Posici\xF3n de la v\xE1lvula","controls.control.valve_toggle":"Interruptor de v\xE1lvula","controls.control.valve_buttons":"Botones de v\xE1lvula","controls.control.lock":"Cerradura","controls.control.alarm_modes":"Modos de alarma","controls.control.temperature":"Termostato","controls.control.climate_humidity":"Humedad del clima","controls.control.humidity":"Humidificador","controls.control.water_heater":"Calentador de agua","controls.control.vacuum_status":"Estado de la aspiradora","controls.control.lawn_mower_status":"Estado del cortac\xE9sped","controls.control.media_player":"Reproductor multimedia","controls.control.remote":"Control remoto (clickpad y botones)","controls.control.more_info":"Contenido nativo de more-info","controls.control.script":"Script (ejecutar / cancelar)","controls.control.press":"Bot\xF3n de pulsar","controls.control.trigger":"Disparador (interruptor moment\xE1neo)","controls.control.push":"Pulsador (sin estado)","controls.show_state":"Mostrar estado","controls.show_cancel":"Mostrar Cancelar","controls.show_cancel_helper":"Bot\xF3n Cancelar bajo un script en ejecuci\xF3n (controles disparador y pulsador).","controls.show_last_changed":"Mostrar \xFAltimo cambio","controls.state_override":"Texto del estado","controls.state_override_helper":"Reemplaza el texto del estado y el texto del bot\xF3n de los controles trigger, push, press y script.","controls.appearance":"Apariencia","controls.appearance.plain":"Sin marco (como more-info)","controls.appearance.card":"Tarjeta","controls.controls":"Controles","controls.type":"Tipo","controls.type_helper":"Autom\xE1tico si se deja vac\xEDo: selector para entidades select o atributos, interruptor, n\xFAmero o acci\xF3n.","controls.type.select":"Selector","controls.type.toggle":"Interruptor","controls.type.number":"N\xFAmero","controls.type.button":"Bot\xF3n (icono)","controls.type.action":"Acci\xF3n","controls.attribute":"Atributo","controls.attribute_helper":"Opciones del selector (efecto, modo predefinido, velocidad\u2026).","controls.attribute.state":"Estado (encendido / apagado)","controls.attribute.effect":"Efecto","controls.attribute.preset_mode":"Modo predefinido","controls.attribute.fan_mode":"Modo del ventilador","controls.attribute.swing_mode":"Oscilaci\xF3n","controls.attribute.swing_horizontal_mode":"Oscilaci\xF3n horizontal","controls.attribute.hvac_mode":"Modo HVAC","controls.attribute.fan_speed":"Potencia de succi\xF3n (aspiradora)","controls.attribute.mode":"Modo","controls.attribute.direction":"Direcci\xF3n","controls.attribute.oscillating":"Oscilaci\xF3n (s\xED / no)","controls.attribute.operation_mode":"Modo de funcionamiento","controls.attribute.away_mode":"Modo ausente","controls.attribute.source":"Fuente","controls.attribute.sound_mode":"Modo de sonido","controls.name":"Nombre","controls.icon":"Icono","controls.icon_off":"Icono apagado","controls.icon_helper":"Reemplaza el icono de la entidad en el interruptor, el disparador y el pulsador (en el interruptor, el icono de encendido).","controls.color":"Color","controls.color_helper":"Color del control mientras est\xE1 activo (cualquier color CSS o del tema).","controls.color_off":"Color apagado","controls.button_layout":"Forma del pulsador","controls.button_layout_helper":"Solo para el control de pulsador.","controls.button_layout.vertical":"Vertical (como el interruptor)","controls.button_layout.horizontal":"Horizontal","controls.button_layout.square":"Cuadrado","controls.button_layout.circle":"Circular","controls.remote":"Control remoto","controls.remote_helper":"Reproductores: autom\xE1tico busca el control remoto del dispositivo (Apple TV), ninguno lo oculta. Elige un remote, o el reproductor Apple TV cuyo control remoto usar (para reproductores universal o de grupo).","controls.remote.auto":"Autom\xE1tico","controls.remote.none":"Ninguno","controls.audio_entity":"Entidad de audio","controls.audio_entity_helper":"Vista Remoto: reproductor que recibe el volumen y el silencio (un AVR o sistema de sonido). Vac\xEDo: los env\xEDa el control remoto.","controls.remote_view":"El reproductor abre en","controls.remote_view.now_playing":"Reproduciendo","controls.remote_view.remote":"Remoto","controls.haptics":"Respuesta h\xE1ptica","controls.haptics_helper":"Vibraci\xF3n de las teclas y gestos del remoto.","controls.seek_color":"Color del slider de avance","controls.seek_color_helper":"Vista Remoto: el color del tema, el color dominante de la car\xE1tula, o escribe un color.","controls.seek_color.theme":"Tema","controls.seek_color.art":"Car\xE1tula","controls.options":"Opciones","controls.options_helper":"Opcional: qu\xE9 opciones mostrar y en qu\xE9 orden.","controls.value":"Texto secundario","controls.value_helper":"Por defecto, el estado de la entidad.","controls.tap_action":"Acci\xF3n al pulsar","controls.show_arrow":"Mostrar flecha","controls.show_arrow_helper":"La flecha \u203A de los chips que abren otra vista.","controls.perform_action":"Acci\xF3n personalizada","controls.perform_action_helper":"domain.action que recibe el valor en lugar de la acci\xF3n propia de la entidad, p. ej. script.turn_on.","controls.data_key":"Campo del valor","controls.data_key_helper":"Campo de la acci\xF3n personalizada que recibe el valor, p. ej. effect.","controls.min":"M\xEDnimo","controls.min_helper":"Reemplaza el m\xEDnimo de la entidad.","controls.max":"M\xE1ximo","controls.max_helper":"Reemplaza el m\xE1ximo de la entidad.","controls.step":"Paso","controls.visibility":"Visibilidad","controls.visibility_helper":"Se muestra solo cuando se cumplen estas condiciones: la misma lista que la pesta\xF1a Visibilidad de una tarjeta (state, numeric_state, screen, user, time, location, y and / or / not), en YAML.","controls.step_helper":"Reemplaza el paso de la entidad.","controls.item_color_helper":"Color del \xEDcono (cualquier color CSS o del tema); en un toggle, solo mientras est\xE1 encendido.","controls.item_icon_helper":"Reemplaza el \xEDcono de la entidad o del atributo.","controls.wrap":"Saltar de l\xEDnea en m\xF3vil","controls.wrap_helper":"Los chips bajan de l\xEDnea en lugar de desplazarse de lado (Home Assistant los desplaza).","remote.view.now_playing":"Reproduciendo","remote.view.remote":"Remoto","remote.clickpad":"Clickpad","remote.home":"TV","remote.not_found":"No se encontr\xF3 un control remoto para esta entidad."};var s4={en:O5,es:l4},x=(L,V,C)=>{let H=L?.language??(typeof document<"u"&&document.documentElement.lang||"en"),e=H.split("-")[0],r=s4[H]?.[V]??s4[e]?.[V]??O5[V];if(C)for(let[t,M]of Object.entries(C))r=r.replace(`{${t}}`,String(M));return r};var{I:WV}=T7;var HC={},m4=(L,V=HC)=>L._$AH=V;var b5=k1(class extends l1{constructor(){super(...arguments),this.key=n}render(L,V){return this.key=L,V}update(L,[V,C]){return V!==this.key&&(m4(L),this.key=V),C}});var y5=(L,V)=>{b(L,"hass-action",{config:{tap_action:{action:"navigate",navigation_path:V}},action:"tap"})};var VC=(L,V)=>{let C=V.entity?S5(L,V.entity):[],H=V.name??C[C.length-1]??"",e=[];return V.breadcrumb==="auto"?e=C.slice(0,-1):V.breadcrumb!=="none"&&V.breadcrumb&&(e=[V.breadcrumb]),[...e,H]},LC=(L,V)=>{let C=V.children[V.children.length-1];switch(V.view){case"details":return L.localize("ui.dialogs.more_info_control.details");case"related":return L.localize("ui.dialogs.more_info_control.related");case"add_to":return L.localize("ui.dialogs.more_info_control.add_to.item");case"settings":return C?.viewTitle||L.localize("ui.dialogs.more_info_control.settings");default:return C?.viewTitle}},N2=(L,V,C)=>{let H=C.entityId&&C.entityId!==V.entity?S5(L,C.entityId):VC(L,V),e=C.view==="root"&&!C.children.length?void 0:LC(L,C),r=e?H:H.slice(0,-1);return{title:e??H[H.length-1]??"",breadcrumb:r.filter(Boolean),breadcrumbClickable:!!C.entityId&&X1(L)&&(C.view!=="root"||V.breadcrumb==="auto")}},I2=(L,V,C,H,e)=>{let r=Y7(L)?" \u25C2 ":" \u25B8 ",t=V.breadcrumb.join(r);return i`
    <span slot=${C} class="title" @click=${H}>
      ${V.breadcrumb.length?V.breadcrumbClickable&&e?i`<button class="breadcrumb" @click=${e}>
                ${t}
              </button>`:i`<p class="breadcrumb">${t}</p>`:n}
      <p class="main">${V.title}</p>
    </span>
  `};var c4,w5=()=>c4,k5=L=>{c4=L};var P1=async(L,V)=>{if(V.every(C2))return!0;try{(await window.loadCardHelpers?.())?.importMoreInfoControl?.(L)}catch(H){console.warn("[more-info-popup-card] Could not load",L,H)}return(await Promise.all(V.map(H=>H1(H,8e3)))).every(Boolean)};var eC=new Set(["primary","accent","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white","disabled"]),L2=L=>eC.has(L)?`var(--${L}-color)`:L,rC=["off","unavailable","unknown","idle","standby","closed","locked","disarmed","docked","not_home"],tC=L=>!rC.includes(L.state),v4=(L,V,C)=>{let H={},e=v(L.entity_id),r=L.state.toLowerCase().replace(/[^a-z0-9]+/g,"_"),t=L.attributes.device_class,M=(o,A)=>{if(!o)return;let d=L2(o),[p,u]=A?["on","active"]:["off","inactive"];H[`--state-${u}-color`]=d,H[`--state-${e}-${u}-color`]=d,H[`--state-${e}-${p}-color`]=d,tC(L)===A&&(H[`--state-${e}-${r}-color`]=d,t&&(H[`--state-${e}-${t}-${r}-color`]=d))};return M(V,!0),M(C,!1),H};var u4=new Map,MC=L=>new Promise(V=>setTimeout(V,L)),oC=async L=>{if(!await H1("ha-icon"))return;let V=document.createElement("ha-icon");V.style.cssText="position:fixed;visibility:hidden;pointer-events:none",V.icon=L,document.body.append(V);try{for(let C=0;C<50;C++){await V.updateComplete;let H=V.shadowRoot?.querySelector("ha-svg-icon");if(H?.path)return H.path;await MC(100)}return}finally{V.remove()}},T5=L=>{let V=u4.get(L);return V||(V=oC(L),u4.set(L,V)),V};var x4="more-info-popup-trigger-control",iC=["automation","script"],P5=(L,V)=>{let[C,H]=V?["on","active"]:["off","inactive"],e=iC.includes(L)?`var(--state-${H}-color)`:V?"var(--primary-color)":"var(--disabled-color)";return`var(--state-${L}-${C}-color, var(--state-${L}-${H}-color, ${e}))`},T4=["queued","parallel"],aC=L=>L.state==="off"||L.attributes.mode==="restart"||L.state==="on"&&T4.includes(L.attributes.mode)&&L.attributes.current<L.attributes.max,nC=1100,AC=350,dC=1500,Z4=L=>new Promise(V=>setTimeout(V,L)),h4,S4,f4,g4,_4,O4,b4,y4,w4,k4,y,E5,B5,R5,F5,$5,D5,N5,I5,z5,q=class extends(k4=P,w4=[g({attribute:!1})],y4=[g({attribute:!1})],b4=[g({attribute:!1})],O4=[g({attribute:!1})],_4=[g({attribute:!1})],g4=[g({attribute:!1})],f4=[g({attribute:!1})],S4=[Z()],h4=[Z()],k4){constructor(){super(...arguments);s(this,E5,a(y,8,this)),a(y,11,this);s(this,B5,a(y,12,this)),a(y,15,this);s(this,R5,a(y,16,this)),a(y,19,this);s(this,F5,a(y,20,this)),a(y,23,this);s(this,$5,a(y,24,this,"switch")),a(y,27,this);s(this,D5,a(y,28,this,"vertical")),a(y,31,this);s(this,N5,a(y,32,this,!0)),a(y,35,this);s(this,I5,a(y,36,this,"idle")),a(y,39,this);s(this,z5,a(y,40,this,{})),a(y,43,this);m(this,"_timer")}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._timer),this._phase="idle"}get _domain(){return v(this.stateObj.entity_id)}get _scriptFields(){let C=P2(this.stateObj.entity_id);return this.hass.services?.script?.[C]}_requiredFilled(){let C=this._scriptFields?.fields??{},H=this._scriptData.data;return Object.entries(C).every(([e,r])=>!r.required||H?.[e]!==void 0)}_call(){let C=this.hass,H=this.stateObj.entity_id;switch(this._domain){case"script":return C.callService("script","turn_on",{entity_id:H,...this._scriptData.data?{variables:this._scriptData.data}:{}});case"automation":return C.callService("automation","trigger",{entity_id:H,skip_condition:!0});default:return C.callService(this._domain==="input_button"?"input_button":"button","press",{entity_id:H})}}async _fire(C){if(C.stopPropagation(),!this._canFire)return;clearTimeout(this._timer),b(window,"haptic","light"),this._phase="firing";let H=Promise.race([this._call(),Z4(dC)]),e=!0;try{await Promise.all([H,Z4(AC)])}catch{e=!1,b(window,"haptic","failure")}this._phase=e?"done":"error",this._timer=setTimeout(()=>{this._phase="idle"},nC)}_keyDown(C){(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),this._fire(C))}get _unavailable(){return this.stateObj.state==="unavailable"}get _running(){return this._domain==="script"&&this.stateObj.state==="on"}get _canFire(){return this._unavailable||this._phase==="firing"?!1:this._domain!=="script"?!0:aC(this.stateObj)&&this._requiredFilled()}get _label(){if(this.label)return this.label;let C=this.hass;switch(this._domain){case"script":return C.localize("ui.card.script.run");case"automation":return C.localize("ui.card.automation.trigger");default:return C.localize("ui.card.button.press")}}_handleIcon(){let C=this._phase==="done"?p2:this._phase==="error"?_0:void 0;return i`
      <ha-state-icon
        class=${w({hidden:!!C})}
        .hass=${this.hass}
        .stateObj=${this.stateObj}
        .icon=${this.icon}
      ></ha-state-icon>
      ${C?i`<ha-svg-icon class="feedback" .path=${C}></ha-svg-icon>`:n}
    `}get _caption(){return this._running&&this._phase==="idle"?this.hass.localize("ui.card.script.running_single"):this._label}render(){if(!this.hass||!this.stateObj)return n;let C=this._domain,H=this._phase!=="idle"||this._running,e=this.variant==="button";return i`
      <div
        class=${w({pad:!0,push:e,[this.layout]:e,up:H,running:this._running&&this._phase==="idle",error:this._phase==="error",disabled:this._unavailable||!H&&!this._canFire})}
        role="button"
        tabindex=${this._unavailable?-1:0}
        aria-label=${this._label}
        aria-disabled=${!this._canFire}
        style=${B({"--on-color":P5(C,!0),"--off-color":P5(C,!1)})}
        @click=${this._fire}
        @keydown=${this._keyDown}
      >
        <div class="track"></div>
        ${e?i`<div class="fill"></div>
                <div class="face">
                  <div class="icon">${this._handleIcon()}</div>
                  <span class="caption">${this._caption}</span>
                </div>`:i`<div class="handle">${this._handleIcon()}</div>`}
      </div>
      ${C==="script"?this._scriptExtras():n}
      ${C==="automation"?this._automationBar():n}
    `}_automationBar(){let C=this.stateObj,H=C.state==="on",e=r=>{r.stopPropagation(),this.hass.callService("automation",H?"turn_off":"turn_on",{entity_id:C.entity_id})};return i`
      <ha-control-button-group class="bar">
        <ha-control-button
          class=${w({active:H})}
          style=${B({"--color":P5("automation",!0)})}
          .label=${this.hass.localize(H?"ui.card.common.turn_off":"ui.card.common.turn_on")}
          .disabled=${this._unavailable}
          @click=${e}
        >
          <ha-svg-icon .path=${v1}></ha-svg-icon>
          <span class="label">${this.hass.formatEntityState(C)}</span>
        </ha-control-button>
      </ha-control-button-group>
    `}_scriptExtras(){let C=this.hass,H=this.stateObj,e=this._scriptFields,r=e?.fields??{},t=H.attributes.current||0,M=T4.includes(H.attributes.mode)&&t>1,o=d=>{d.stopPropagation(),C.callService("script","turn_off",{entity_id:H.entity_id})},A=d=>{this._scriptData={...this._scriptData,...d.detail.value}};return i`
      ${this.showCancel?i`<ha-control-button-group class="bar">
              <ha-control-button .disabled=${!t} @click=${o}>
                <ha-svg-icon .path=${b1}></ha-svg-icon>
                ${C.localize(M?"ui.card.script.cancel_all":"ui.card.script.cancel")}
              </ha-control-button>
            </ha-control-button-group>`:n}
      ${e?.description?i`<ha-markdown
              breaks
              .content=${e.description}
            ></ha-markdown>`:n}
      ${Object.keys(r).length?i`
              <div class="fields">
                <ha-service-control
                  hide-picker
                  hide-description
                  .hass=${C}
                  .value=${{action:H.entity_id,...this._scriptData}}
                  .narrow=${window.matchMedia("(max-width: 870px)").matches}
                  @value-changed=${A}
                ></ha-service-control>
              </div>
            `:n}
    `}};y=I(k4),E5=new WeakMap,B5=new WeakMap,R5=new WeakMap,F5=new WeakMap,$5=new WeakMap,D5=new WeakMap,N5=new WeakMap,I5=new WeakMap,z5=new WeakMap,l(y,4,"hass",w4,q,E5),l(y,4,"stateObj",y4,q,B5),l(y,4,"icon",b4,q,R5),l(y,4,"label",O4,q,F5),l(y,4,"variant",_4,q,$5),l(y,4,"layout",g4,q,D5),l(y,4,"showCancel",f4,q,N5),l(y,4,"_phase",S4,q,I5),l(y,4,"_scriptData",h4,q,z5),F(y,q),m(q,"styles",O`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: stretch;
      gap: var(--ha-space-6);
    }
    /* Same box as ha-control-switch in state-control-styles.ts. */
    .pad {
      --pad-padding: 6px;
      --pad-radius: var(--ha-border-radius-6xl, 36px);
      position: relative;
      box-sizing: border-box;
      width: 130px;
      height: 45vh;
      max-height: 320px;
      min-height: 200px;
      padding: var(--pad-padding);
      border-radius: var(--pad-radius);
      display: flex;
      flex-direction: column-reverse;
      cursor: pointer;
      outline: none;
      user-select: none;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      --mdc-icon-size: 24px;
    }
    .pad:focus-visible {
      box-shadow: 0 0 0 2px var(--off-color);
    }
    .pad.up:focus-visible {
      box-shadow: 0 0 0 2px var(--on-color);
    }
    .pad.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .track {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: var(--off-color);
      opacity: 0.2;
      transition:
        background-color 180ms ease-in-out,
        opacity 180ms ease-in-out;
    }
    .pad:not(.disabled):hover .track {
      opacity: 0.4;
    }
    .handle {
      position: relative;
      height: 50%;
      width: 100%;
      border-radius: calc(var(--pad-radius) - var(--pad-padding));
      background-color: var(--off-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        transform 320ms cubic-bezier(0.2, 0.9, 0.3, 1.15),
        scale 120ms ease-out,
        background-color 180ms ease-in-out;
    }
    /* scale, not transform: pressing must not cancel the trip up. */
    .pad:not(.disabled):active .handle {
      scale: 0.97;
    }
    .handle ha-state-icon {
      transition: opacity 120ms ease-in-out;
    }
    .handle ha-state-icon.hidden {
      opacity: 0;
    }
    .handle .feedback {
      position: absolute;
    }
    .pad.up .track {
      background-color: var(--on-color);
    }
    .pad.up .handle {
      transform: translateY(-100%);
      background-color: var(--on-color);
    }
    /* Push button: one surface, filled from the middle while it acts. */
    .pad.push {
      flex-direction: column;
      overflow: hidden;
      transition: scale 120ms ease-out;
    }
    .pad.push:not(.disabled):active {
      scale: 0.98;
    }
    .pad.push.horizontal {
      width: 100%;
      max-width: 320px;
      height: 130px;
      min-height: 0;
      max-height: none;
    }
    .pad.push.horizontal .face {
      flex-direction: row;
      gap: var(--ha-space-3);
    }
    .pad.push.square,
    .pad.push.circle {
      width: 200px;
      height: 200px;
      min-height: 0;
      max-height: none;
    }
    .pad.push.circle {
      border-radius: 50%;
    }
    .fill {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: var(--on-color);
      opacity: 0;
      transform: scale(0.4);
      transition:
        transform 320ms cubic-bezier(0.2, 0.9, 0.3, 1),
        opacity 200ms ease-in-out,
        background-color 180ms ease-in-out;
    }
    .pad.push.up .fill {
      opacity: 1;
      transform: none;
    }
    .face {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ha-space-2);
      color: var(--primary-text-color);
      transition: color 180ms ease-in-out;
      --mdc-icon-size: 32px;
    }
    .face .icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pad.push.up .face {
      color: white;
    }
    .caption {
      font-size: var(--ha-font-size-m);
      font-weight: var(--ha-font-weight-medium);
      line-height: 1.4;
      text-align: center;
      padding: 0 var(--ha-space-2);
    }
    .pad.push.error .fill {
      background-color: var(--error-color);
    }
    .pad.push.error .face {
      animation: shake-x 400ms ease-in-out;
    }
    .pad.push.running .fill {
      animation: breathe-fill 1.6s ease-in-out infinite;
    }
    .pad.push.running .face ha-state-icon {
      animation: pulse 1.6s ease-in-out infinite;
    }
    @keyframes breathe-fill {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }
    @keyframes shake-x {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-6px);
      }
      75% {
        transform: translateX(6px);
      }
    }
    .pad.error .track,
    .pad.error .handle {
      background-color: var(--error-color);
    }
    .pad.error .handle {
      animation: shake 400ms ease-in-out;
    }
    .pad.running .track {
      animation: breathe 1.6s ease-in-out infinite;
    }
    .pad.running .handle ha-state-icon {
      animation: pulse 1.6s ease-in-out infinite;
    }
    .feedback {
      animation: pop 260ms cubic-bezier(0.2, 0.9, 0.3, 1.4);
    }
    @keyframes breathe {
      0%,
      100% {
        opacity: 0.2;
      }
      50% {
        opacity: 0.45;
      }
    }
    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
    @keyframes pop {
      from {
        transform: scale(0.4);
        opacity: 0;
      }
    }
    @keyframes shake {
      0%,
      100% {
        transform: translateY(-100%) translateX(0);
      }
      25% {
        transform: translateY(-100%) translateX(-6px);
      }
      75% {
        transform: translateY(-100%) translateX(6px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .handle,
      .track,
      .fill,
      .face {
        transition: none;
      }
      .pad.running .track,
      .pad.running .handle ha-state-icon,
      .pad.push.running .fill,
      .pad.push.running .face ha-state-icon,
      .pad.push.error .face,
      .pad.error .handle,
      .feedback {
        animation: none;
      }
    }
    /* Button bar under the control, as in more-info-vacuum / -lock. */
    .bar {
      width: 100%;
      max-width: 264px;
      --control-button-group-thickness: 48px;
    }
    .bar ha-control-button {
      --control-button-border-radius: var(--ha-border-radius-xl, 18px);
    }
    .bar ha-control-button.active {
      --control-button-icon-color: white;
      --control-button-background-color: var(--color);
      --control-button-focus-color: var(--color);
      --control-button-background-opacity: 1;
    }
    .bar ha-svg-icon {
      margin-inline-end: var(--ha-space-1);
    }
    /* Above the button background, which is opaque when active. */
    .bar .label {
      position: relative;
    }
    ha-markdown {
      align-self: stretch;
      text-align: center;
      padding: 0 var(--ha-space-4);
    }
    .fields {
      align-self: stretch;
      padding: var(--ha-space-4);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md);
    }
    ha-service-control {
      --service-control-padding: 0;
      --service-control-items-border-top: none;
    }
  `);customElements.get(x4)||customElements.define(x4,q);var pC=([L,V,C])=>(Math.max(L,V,C)+Math.min(L,V,C))/510,lC=([L,V,C])=>(Math.max(L,V,C)-Math.min(L,V,C))/255,sC=L=>{let V=new Map;for(let e=0;e+3<L.length;e+=4){if(L[e+3]<128)continue;let r=[L[e],L[e+1],L[e+2]],t=pC(r);if(t<.12||t>.9)continue;let M=r[0]>>5<<6|r[1]>>5<<3|r[2]>>5,o=V.get(M)??{count:0,r:0,g:0,b:0,s:0};o.count+=1,o.r+=r[0],o.g+=r[1],o.b+=r[2],o.s+=lC(r),V.set(M,o)}let C,H=0;for(let e of V.values()){let r=e.count*(.15+e.s/e.count);r>H&&(H=r,C=[Math.round(e.r/e.count),Math.round(e.g/e.count),Math.round(e.b/e.count)])}return C},P4=(L,V)=>{let[C,H,e]=mC(L),[r,t]=V?[.5,.75]:[.3,.55];return e>=r&&e<=t?L:cC([C,H,Math.min(t,Math.max(r,e))])},mC=([L,V,C])=>{let[H,e,r]=[L/255,V/255,C/255],t=Math.max(H,e,r),M=Math.min(H,e,r),o=(t+M)/2;if(t===M)return[0,0,o];let A=t-M,d=A/(1-Math.abs(2*o-1));return[t===H?((e-r)/A+(e<r?6:0))/6:t===e?((r-H)/A+2)/6:((H-e)/A+4)/6,d,o]},cC=([L,V,C])=>{let H=(1-Math.abs(2*C-1))*V,e=r=>{let t=(r+L*12)%12;return Math.round((C-H/2*Math.max(-1,Math.min(t-3,9-t,1)))*255)};return[e(0),e(8),e(4)]},E4=([L,V,C])=>`rgb(${L}, ${V}, ${C})`,e2=new Map,B4=L=>{let V=e2.get(L);return V||(V=new Promise(C=>{let H=new Image;H.decoding="async",H.onload=()=>{try{let e=document.createElement("canvas");e.width=24,e.height=24;let r=e.getContext("2d",{willReadFrequently:!0});if(!r)return C(void 0);r.drawImage(H,0,0,24,24),C(sC(r.getImageData(0,0,24,24).data))}catch{C(void 0)}},H.onerror=()=>C(void 0),H.src=L}),e2.size>20&&e2.delete(e2.keys().next().value),e2.set(L,V)),V};var U2={step:36,slop:10,holdMs:500,repeatMs:160,ringRatio:.62,flickSpeed:.7,flickSpeedStep:.5,flickMax:5},R4=100,F4=(L,V)=>Math.abs(L)>Math.abs(V)?L>0?"right":"left":V>0?"down":"up",z2=class{constructor(V,C={}){this._emit=V;this._opts={...U2,...C}}_emit;_opts;_start;_anchor;_still;_samples=[];_ring=!1;_moved=!1;_held=!1;_repeating=!1;_last;_holdTimer;_repeatTimer;get active(){return this._start!==void 0}get repeating(){return this._repeating}down(V,C,H,e){if(this.cancel(),this._start={x:V,y:C,t:e},this._anchor={x:V,y:C},this._samples=[{x:V,y:C,t:e}],Math.hypot(V,C)>H*this._opts.ringRatio){this._ring=!0,this._last=F4(V,C),this._emit({type:"step",direction:this._last,source:"ring"}),this._repeatTimer=setTimeout(()=>this._repeat(),this._opts.holdMs);return}this._holdTimer=setTimeout(()=>{this._held=!0,this._emit({type:"hold"})},this._opts.holdMs)}move(V,C,H){if(!this._start||this._ring||this._held)return;for(this._samples.push({x:V,y:C,t:H});this._samples.length>2&&H-this._samples[0].t>R4;)this._samples.shift();let{step:e,slop:r}=this._opts;if(!this._moved){if(Math.hypot(V-this._start.x,C-this._start.y)<r)return;this._moved=!0,clearTimeout(this._holdTimer)}let t=this._anchor;for(;;){let M=V-t.x,o=C-t.y;if(Math.max(Math.abs(M),Math.abs(o))<e)break;let A=F4(M,o);A==="left"||A==="right"?t.x+=Math.sign(M)*e:t.y+=Math.sign(o)*e,this._last=A,this._emit({type:"step",direction:A,source:"drag"})}this._last&&(!this._still||Math.hypot(V-this._still.x,C-this._still.y)>r)&&(this._still={x:V,y:C},this._stopRepeat(),this._repeatTimer=setTimeout(()=>this._repeat(),this._opts.holdMs))}up(V){if(!this._start)return;let{_moved:C,_held:H,_ring:e}=this,r=this._repeating,t=this._last,M=this._samples;if(this.cancel(),e||H)return;if(!C){this._emit({type:"tap"});return}if(r||!t)return;let o=M.find(L1=>V-L1.t<=R4),A=M[M.length-1];if(!o||o===A)return;let d=Math.max(A.t-o.t,1),p=t==="left"||t==="right",u=p?A.x-o.x:A.y-o.y,c=Math.abs(u)/d,{flickSpeed:h,flickSpeedStep:R,flickMax:N}=this._opts;if(c<h)return;let K=Math.min(N,1+Math.floor((c-h)/R)),z=p?u>0?"right":"left":u>0?"down":"up";this._emit({type:"flick",direction:z,count:K})}cancel(){clearTimeout(this._holdTimer),this._stopRepeat(),this._start=void 0,this._anchor=void 0,this._still=void 0,this._samples=[],this._ring=!1,this._moved=!1,this._held=!1,this._last=void 0}_repeat(){this._last&&(this._repeating=!0,this._emit({type:"step",direction:this._last,source:"repeat"}),this._repeatTimer=setTimeout(()=>this._repeat(),this._opts.repeatMs))}_stopRepeat(){clearTimeout(this._repeatTimer),this._repeating=!1}},r2=class{constructor(V,C=()=>{},H=8){this._send=V;this._onError=C;this._max=H}_send;_onError;_max;_queue=[];_busy=!1;get pending(){return this._queue.reduce((V,C)=>V+C.repeats,0)}push(V,{repeats:C=1,hold:H=!1,transient:e=!1}={}){let r=this._max-this.pending;if(r<=0)return;let t=Math.min(C,r),M=this._queue[this._queue.length-1];M&&M.command===V&&!M.hold&&!H&&M.transient===e?M.repeats+=t:this._queue.push({command:V,repeats:t,hold:H,transient:e}),this._next()}dropTransient(){this._queue=this._queue.filter(V=>!V.transient)}clear(){this._queue=[]}async _next(){if(this._busy)return;let V=this._queue.shift();if(V){this._busy=!0;try{await this._send(V)}catch(C){this._queue=[],this._onError(C)}finally{this._busy=!1}this._next()}}},vC={step:18,slop:10,holdMs:500,repeatMs:180},W2=class{constructor(V,C={}){this._emit=V;this._opts={...vC,...C}}_emit;_opts;_half;_startY=0;_anchorY=0;_stillY=0;_swiping=!1;_repeated=!1;_moving=null;_last;_timer;get active(){return this._half!==void 0}down(V,C){this.cancel(),this._half=V,this._startY=C,this._anchorY=C,this._timer=setTimeout(()=>this._repeat(V),this._opts.holdMs)}move(V){if(!this._half)return;let{step:C,slop:H,holdMs:e}=this._opts;if(!this._swiping){if(Math.abs(V-this._startY)<H)return;this._swiping=!0,this._anchorY=V,this._stillY=V,this._stop()}for(;Math.abs(V-this._anchorY)>=C;){let r=V<this._anchorY?"up":"down";this._anchorY+=r==="up"?-C:C,this._last=r,this._setMoving(r),this._emit({type:"step",direction:r,source:"swipe"})}if(this._last&&Math.abs(V-this._stillY)>H/2){this._stillY=V,this._stop();let r=this._last;this._setMoving(r),this._timer=setTimeout(()=>this._repeat(r),e)}}up(){if(!this._half)return;let V=!this._swiping&&!this._repeated?this._half:void 0;this.cancel(),V&&this._emit({type:"step",direction:V,source:"tap"})}cancel(){this._stop(),this._half=void 0,this._swiping=!1,this._repeated=!1,this._last=void 0,this._setMoving(null)}_repeat(V){this._repeated=!0,this._setMoving(V),this._emit({type:"step",direction:V,source:"repeat"}),this._timer=setTimeout(()=>this._repeat(V),this._opts.repeatMs)}_stop(){clearTimeout(this._timer),this._timer=void 0}_setMoving(V){V!==this._moving&&(this._moving=V,this._emit({type:"moving",direction:V}))}};var $4=(L,V,C)=>{let H=Number(L.media_position??0),e=L.media_position_updated_at;return!V||!e?H:H+(C-new Date(e).getTime())/1e3},t2=(L,V)=>{let C=Math.max(0,Math.floor(L)),H=M=>String(M).padStart(2,"0"),e=Math.floor(C/3600),r=Math.floor(C%3600/60),t=C%60;return V?`${H(e)}:${H(r)}:${H(t)}`:`${r}:${H(t)}`};var D4={commands:{up:"up",down:"down",left:"left",right:"right",select:"select",back:"menu",home:"home",play_pause:"play_pause",volume_up:"volume_up",volume_down:"volume_down",power_on:"turn_on",power_off:"turn_off"},holdable:["up","down","left","right","select","back","home"]},N4={apple_tv:D4},W5=(L,V)=>N4[L.entities?.[V]?.platform??""]??D4,U5=(L,V,C)=>{let H=L.entities?.[V];if(H?.device_id)return Object.values(L.entities).find(e=>e.device_id===H.device_id&&e.platform===H.platform&&v(e.entity_id)===C&&L.states[e.entity_id]!==void 0)?.entity_id},I4=(L,V)=>{let C=L.entities?.[V]?.platform;if(!(!C||!N4[C]))return U5(L,V,"remote")},z4=L=>Object.keys(L.states).filter(V=>{let C=v(V);return C==="remote"?!0:C==="media_player"&&!!I4(L,V)}).sort(),W4=(L,V)=>U5(L,V,"media_player"),M2=(L,V,C)=>{if(!(!L||C==="none"))return C&&C!=="auto"?v(C)==="media_player"?U5(L,C,"remote"):C:I4(L,V)};var U4="more-info-popup-remote-control",uC=2,xC=8,G4=10,G5=["off","standby","unavailable","unknown"],ZC=.05,hC={selection:6,light:10,medium:20,failure:[20,40,20]},SC={back:p1`<path d="M17 6 9 14l8 8" />`,tv:p1`<rect x="5" y="6" width="18" height="12.5" rx="1.5" /><path d="M11 22h6" />`,play_pause:p1`<path d="M6 9.5v9l7-4.5z" /><path d="M17 9.5v9M21 9.5v9" />`,plus:p1`<path d="M14 8v12M8 14h12" />`,minus:p1`<path d="M8 14h12" />`,mute:p1`<path d="M8 11h3.5L16 7v14l-4.5-4H8z" /><path d="M6 7l16 15" />`,power:p1`<path d="M14 5v8" /><path d="M9 8.2a8 8 0 1 0 10 0" />`},G2=L=>i`<svg class="icon" viewBox="0 0 28 28" aria-hidden="true">
    ${SC[L]}
  </svg>`,fC={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right"},Q2=L=>{try{L.currentTarget.setPointerCapture(L.pointerId)}catch{}},Q4=1.06,gC=1.1,K4,q4,Y4,j4,X4,J4,C9,H9,V9,L9,e9,r9,t9,M9,o9,S,Q5,K5,q5,Y5,j5,X5,J5,C3,H3,V3,L3,e3,r3,t3,$=class extends(o9=P,M9=[g({attribute:!1})],t9=[g({attribute:!1})],r9=[g({attribute:!1})],e9=[g({attribute:!1})],L9=[g({attribute:!1})],V9=[g({attribute:!1})],H9=[g({attribute:!1})],C9=[Z()],J4=[Z()],X4=[Z()],j4=[Z()],Y4=[Z()],q4=[Z()],K4=[Z()],o9){constructor(){super(...arguments);s(this,Q5,a(S,8,this)),a(S,11,this);s(this,K5,a(S,12,this)),a(S,15,this);s(this,q5,a(S,16,this)),a(S,19,this);s(this,Y5,a(S,20,this)),a(S,23,this);s(this,j5,a(S,24,this,!0)),a(S,27,this);s(this,X5,a(S,28,this,!0)),a(S,31,this);s(this,J5,a(S,32,this,"theme")),a(S,35,this);s(this,C3,a(S,36,this)),a(S,39,this);s(this,H3,a(S,40,this)),a(S,43,this);m(this,"_artUrl");m(this,"_ticker");s(this,V3,a(S,44,this)),a(S,47,this);s(this,L3,a(S,48,this)),a(S,51,this);s(this,e3,a(S,52,this,!1)),a(S,55,this);m(this,"_flashTimer");m(this,"_tapTimer");m(this,"_queue",new r2(C=>this._call(C),()=>this._haptic("failure")));m(this,"_audioQueue",new r2(C=>this._callAudio(C),()=>this._haptic("failure")));m(this,"_tracker",new z2(C=>this._padEvent(C)));m(this,"_volume",new W2(C=>this._volumeEvent(C)));s(this,r3,a(S,56,this,null)),a(S,59,this);m(this,"_button");s(this,t3,a(S,60,this)),a(S,63,this)}disconnectedCallback(){super.disconnectedCallback(),this._stopTicker(),this._tracker.cancel(),this._volume.cancel(),this._queue.clear(),this._audioQueue.clear(),this._releaseButton(),clearTimeout(this._flashTimer),clearTimeout(this._tapTimer)}willUpdate(){let C=this._mediaObj,H=this.seekColor==="art"&&C&&!this._off(C)?C.attributes.entity_picture:void 0;H!==this._artUrl&&(this._artUrl=H,this._artRgb=void 0,H&&B4(H).then(e=>{this._artUrl===H&&(this._artRgb=e)}))}updated(){let C=this._mediaObj,H=this.isConnected&&C?.state==="playing"&&this._seekable(C)&&this._seekDrag===void 0;H&&!this._ticker?this._ticker=setInterval(()=>this.requestUpdate(),1e3):H||this._stopTicker()}_stopTicker(){clearInterval(this._ticker),this._ticker=void 0}_off(C){return G5.includes(C.state)}_seekable(C){return((C.attributes.supported_features??0)&uC)!==0&&Number(C.attributes.media_duration)>0&&!this._off(C)}get _remoteObj(){return this.remote?this.hass?.states[this.remote]:void 0}get _audioObj(){return this.audioEntity?this.hass?.states[this.audioEntity]:void 0}get _soundObj(){return this._audioObj??this._mediaObj}get _volumeDisabled(){let C=this._audioObj;return this.audioEntity?!C||C.state==="unavailable":this._disabled}_dropTransient(){this._queue.dropTransient(),this._audioQueue.dropTransient()}async _callAudio({command:C,repeats:H}){for(let e=0;e<H;e+=1)await this.hass.callService("media_player",C,{entity_id:this.audioEntity})}get _mediaObj(){return this.mediaPlayer?this.hass?.states[this.mediaPlayer]:void 0}get _disabled(){let C=this._remoteObj?.state;return!C||C==="unavailable"}_haptic(C){if(!this.haptics)return;b(window,"haptic",C);let H=navigator.userActivation?.hasBeenActive??!0;if(!this.hass?.auth?.external&&H)try{navigator.vibrate?.(hC[C])}catch{}}_call({command:C,repeats:H,hold:e}){return this.hass.callService("remote","send_command",{entity_id:this.remote,command:C,num_repeats:H,delay_secs:H>1?ZC:0,...e?{hold_secs:1}:{}})}_press(C,H={}){if(this.audioEntity&&(C==="volume_up"||C==="volume_down")){if(this._volumeDisabled)return;this._audioQueue.push(C,{...H,hold:!1});return}if(this._disabled)return;let e=W5(this.hass,this.remote),r=H.hold&&e.holdable.includes(C);this._queue.push(e.commands[C],{...H,hold:r})}_padEvent(C){switch(C.type){case"step":this._press(C.direction,{transient:C.source==="repeat"}),this._haptic(C.source==="ring"?"light":"selection"),C.source!=="drag"&&this._flashRing(C.direction);return;case"flick":this._press(C.direction,{repeats:C.count}),this._haptic("selection");return;case"tap":this._press("select"),this._haptic("light"),this._tap();return;case"hold":this._press("select",{hold:!0}),this._haptic("medium"),this._tap();return}}_flashRing(C){clearTimeout(this._flashTimer),this._flash=C,this._flashTimer=setTimeout(()=>{this._flash=void 0},180)}_tap(){clearTimeout(this._tapTimer),this._tapped=!0,this._tapTimer=setTimeout(()=>{this._tapped=!1},160)}_padPoint(C){let H=C.currentTarget.getBoundingClientRect();return{x:C.clientX-H.left-H.width/2,y:C.clientY-H.top-H.height/2,radius:H.width/2}}_padDown(C){if(this._disabled||C.pointerType==="mouse"&&C.button!==0)return;C.preventDefault(),Q2(C);let{x:H,y:e,radius:r}=this._padPoint(C);this._tracker.down(H,e,r,C.timeStamp),Math.hypot(H,e)<=r*U2.ringRatio&&(this._touch={x:H,y:e})}_padMove(C){if(!this._tracker.active)return;let{x:H,y:e}=this._padPoint(C);this._tracker.move(H,e,C.timeStamp),this._touch&&(this._touch={x:H,y:e})}_padUp(C){this._tracker.active&&(this._tracker.up(C.timeStamp),this._dropTransient(),this._touch=void 0)}_padCancel(){this._tracker.cancel(),this._dropTransient(),this._touch=void 0}_padKey(C){let H=fC[C.key];if(H){C.preventDefault(),this._press(H),this._flashRing(H);return}(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),this._press("select"),this._tap())}_buttonDown(C,H){if(this._disabled||C.pointerType==="mouse"&&C.button!==0)return;Q2(C),this._releaseButton();let e={spec:H,fired:!1};this._button=e,W5(this.hass,this.remote).holdable.includes(H.key)&&(e.timer=setTimeout(()=>{e.fired=!0,this._press(H.key,{hold:!0}),this._haptic("medium")},U2.holdMs))}_buttonUp(){let C=this._button;C&&(this._releaseButton(),C.fired||(this._press(C.spec.key),this._haptic("light")))}_releaseButton(){this._button&&clearTimeout(this._button.timer),this._button=void 0,this._dropTransient()}_buttonClick(C,H){C.detail===0&&this._press(H)}_remoteButton(C,H,e,r=""){return i`
      <button
        class="key ${r}"
        aria-label=${e}
        title=${e}
        .disabled=${this._disabled}
        @pointerdown=${t=>this._buttonDown(t,C)}
        @pointerup=${this._buttonUp}
        @pointercancel=${this._releaseButton}
        @lostpointercapture=${this._releaseButton}
        @click=${t=>this._buttonClick(t,C.key)}
        @contextmenu=${t=>t.preventDefault()}
      >
        ${G2(H)}
      </button>
    `}_volumeEvent(C){if(C.type==="moving"){this._volumeMoving=C.direction;return}this._press(`volume_${C.direction}`,{transient:C.source==="repeat"}),this._haptic(C.source==="tap"?"light":"selection"),this._pulseVolume(C.direction)}_pulseVolume(C){if(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return;let H=this.renderRoot.querySelector(".volume");H?.querySelector(`.key.${C} .icon`)?.animate?.([{scale:"1"},{scale:"1.28"},{scale:"1"}],{duration:170,easing:"ease-out"}),this._volumeMoving&&H?.animate?.([{scale:`1 ${Q4}`},{scale:`1 ${gC}`},{scale:`1 ${Q4}`}],{duration:160,easing:"ease-out"})}_volumeDown(C){if(this._volumeDisabled||C.pointerType==="mouse"&&C.button!==0)return;Q2(C);let H=C.currentTarget.getBoundingClientRect(),e=C.clientY-H.top<H.height/2?"up":"down";this._volume.down(e,C.clientY),this._volumePressed=e}_volumeMove(C){this._volume.active&&(this._volume.move(C.clientY),this._volumeMoving&&(this._volumePressed=void 0))}_volumeUp(){this._volume.active&&(this._volume.up(),this._dropTransient(),this._volumePressed=void 0)}_volumeCancel(){this._volume.cancel(),this._dropTransient(),this._volumePressed=void 0}_volumePill(){let C=this.hass,H=this._volumeMoving,e=r=>{let t=C.localize(`ui.card.media_player.volume_${r}`);return i`
        <button
          class=${w({key:!0,[r]:!0,pressed:this._volumePressed===r,dim:H!==null&&H!==r})}
          aria-label=${t}
          title=${t}
          .disabled=${this._volumeDisabled}
          @click=${M=>this._buttonClick(M,`volume_${r}`)}
        >
          ${G2(r==="up"?"plus":"minus")}
        </button>
      `};return i`
      <div
        class=${w({volume:!0,[`moving-${H}`]:H!==null})}
        @pointerdown=${this._volumeDown}
        @pointermove=${this._volumeMove}
        @pointerup=${this._volumeUp}
        @pointercancel=${this._volumeCancel}
        @lostpointercapture=${this._volumeUp}
        @contextmenu=${r=>r.preventDefault()}
      >
        ${e("up")} ${e("down")}
      </div>
    `}_toggleMute(){let C=this._soundObj;C&&(this._haptic("light"),this.hass.callService("media_player","volume_mute",{entity_id:C.entity_id,is_volume_muted:!C.attributes.is_volume_muted}).catch(()=>this._haptic("failure")))}_power(){let C=this._mediaObj;C&&(this._press(G5.includes(C.state)?"power_on":"power_off"),this._haptic("light"))}_nowPlaying(){let C=this._mediaObj;if(!this.showNowPlaying||!C)return n;let H=this.hass,e=C.attributes,r=G5.includes(C.state),t=r?G(C):e.media_title??H.localize("ui.card.media_player.nothing_playing"),M=r?H.formatEntityState(C):e.media_artist??e.media_series_name??e.app_name??H.formatEntityState(C),o=!r&&e.entity_picture,A=H.localize("ui.card.media_player.power");return i`
      <div class="now-playing">
        <div class="row">
          <div class="art">
            ${o?i`<img src=${o} alt="" />`:i`<ha-state-icon
                    .hass=${H}
                    .stateObj=${C}
                  ></ha-state-icon>`}
          </div>
          <div class="info">
            <div class="title">${t}</div>
            <div class="secondary">${M}</div>
          </div>
          <button
            class="key small"
            aria-label=${A}
            title=${A}
            .disabled=${this._disabled}
            @click=${this._power}
          >
            ${G2("power")}
          </button>
        </div>
        ${this._seek(C)}
      </div>
    `}get _seekColorCss(){let C=this.seekColor||"theme";return C==="theme"?"var(--primary-color)":C==="art"?this._artRgb?E4(P4(this._artRgb,!!this.hass?.themes?.darkMode)):"var(--primary-color)":L2(C)}_seekAt(C,H){let e=C.currentTarget.getBoundingClientRect(),r=(C.clientX-e.left)/e.width;return Math.min(1,Math.max(0,r))*H}_seekTo(C,H){this._haptic("light"),this.hass.callService("media_player","media_seek",{entity_id:C.entity_id,seek_position:Math.round(H)}).catch(()=>this._haptic("failure"))}_seek(C){if(!this._seekable(C))return n;let H=Number(C.attributes.media_duration),e=this._seekDrag??Math.min(H,$4(C.attributes,C.state==="playing",Date.now())),r=H>=3600,t=e/H*100,M=this.hass.localize("ui.card.media_player.track_position"),o=c=>{c.pointerType==="mouse"&&c.button!==0||(Q2(c),this._seekDrag=this._seekAt(c,H))},A=c=>{this._seekDrag!==void 0&&(this._seekDrag=this._seekAt(c,H))},d=()=>{if(this._seekDrag===void 0)return;let c=this._seekDrag;this._seekDrag=void 0,this._seekTo(C,c)},p=()=>{this._seekDrag=void 0},u=c=>{let h=c.key==="ArrowRight"||c.key==="ArrowUp"?G4:c.key==="ArrowLeft"||c.key==="ArrowDown"?-G4:void 0;h!==void 0&&(c.preventDefault(),c.stopPropagation(),this._seekTo(C,Math.min(H,Math.max(0,e+h))))};return i`
      <div
        class=${w({seek:!0,dragging:this._seekDrag!==void 0})}
        style=${B({"--seek-color":this._seekColorCss})}
      >
        <div
          class="seek-track"
          role="slider"
          tabindex="0"
          aria-label=${M}
          aria-valuemin="0"
          aria-valuemax=${Math.round(H)}
          aria-valuenow=${Math.round(e)}
          aria-valuetext=${t2(e,r)}
          @pointerdown=${o}
          @pointermove=${A}
          @pointerup=${d}
          @pointercancel=${p}
          @lostpointercapture=${d}
          @keydown=${u}
        >
          <div class="seek-bar"></div>
          <div
            class="seek-fill"
            style=${B({width:`${t}%`})}
          ></div>
          <div class="seek-thumb" style=${B({left:`${t}%`})}>
            <span class="seek-bubble">${t2(e,r)}</span>
          </div>
        </div>
        <div class="seek-times">
          <span>${t2(e,r)}</span>
          <span>${t2(H,r)}</span>
        </div>
      </div>
    `}render(){if(!this.hass||!this.remote)return n;let C=this.hass,H=o=>x(C,o),e=this._soundObj,r=e?((e.attributes.supported_features??0)&xC)!==0:!1,t=!!e?.attributes.is_volume_muted,M=C.localize("ui.card.media_player.volume_mute");return i`
      ${this._nowPlaying()}
      <div
        class=${w({pad:!0,disabled:this._disabled,[`flash-${this._flash}`]:!!this._flash,tapped:this._tapped})}
        role="button"
        tabindex=${this._disabled?-1:0}
        aria-label=${H("remote.clickpad")}
        aria-disabled=${this._disabled}
        @pointerdown=${this._padDown}
        @pointermove=${this._padMove}
        @pointerup=${this._padUp}
        @pointercancel=${this._padCancel}
        @lostpointercapture=${this._padCancel}
        @keydown=${this._padKey}
        @contextmenu=${o=>o.preventDefault()}
      >
        <div class="glow"></div>
        <span class="tick up"></span>
        <span class="tick down"></span>
        <span class="tick left"></span>
        <span class="tick right"></span>
        <div class="center"></div>
        ${this._touch?i`<div
                class="touch"
                style=${B({transform:`translate(${this._touch.x}px, ${this._touch.y}px)`})}
              ></div>`:n}
      </div>
      <div class="keys">
        ${this._remoteButton({key:"back"},"back",C.localize("ui.common.back"),"back")}
        ${this._remoteButton({key:"home"},"tv",H("remote.home"),"home")}
        ${this._remoteButton({key:"play_pause"},"play_pause",C.localize("ui.card.media_player.media_play_pause"),"play")}
        ${this._volumePill()}
        <button
          class=${w({key:!0,mute:!0,hidden:!r,on:t})}
          aria-label=${M}
          aria-pressed=${t}
          title=${M}
          .disabled=${!r||(this.audioEntity?this._volumeDisabled:this._disabled)}
          @click=${this._toggleMute}
        >
          ${G2("mute")}
        </button>
      </div>
    `}};S=I(o9),Q5=new WeakMap,K5=new WeakMap,q5=new WeakMap,Y5=new WeakMap,j5=new WeakMap,X5=new WeakMap,J5=new WeakMap,C3=new WeakMap,H3=new WeakMap,V3=new WeakMap,L3=new WeakMap,e3=new WeakMap,r3=new WeakMap,t3=new WeakMap,l(S,4,"hass",M9,$,Q5),l(S,4,"remote",t9,$,K5),l(S,4,"mediaPlayer",r9,$,q5),l(S,4,"audioEntity",e9,$,Y5),l(S,4,"showNowPlaying",L9,$,j5),l(S,4,"haptics",V9,$,X5),l(S,4,"seekColor",H9,$,J5),l(S,4,"_seekDrag",C9,$,C3),l(S,4,"_artRgb",J4,$,H3),l(S,4,"_flash",X4,$,V3),l(S,4,"_touch",j4,$,L3),l(S,4,"_tapped",Y4,$,e3),l(S,4,"_volumeMoving",q4,$,r3),l(S,4,"_volumePressed",K4,$,t3),F(S,$),m($,"styles",O`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: stretch;
      gap: var(--remote-gap);
      --remote-gap: var(--ha-space-6, 24px);
      --remote-key-size: 64px;
      --remote-pad-size: 260px;
      --remote-surface: var(--disabled-color);
      --remote-surface-opacity: 0.2;
      -webkit-tap-highlight-color: transparent;
    }
    /*
     * Phones: the whole remote fits in the bottom sheet without scrolling
     * (the clickpad and keys follow the screen height).
     */
    @media (max-height: 900px) {
      :host {
        --remote-gap: var(--ha-space-4, 16px);
        --remote-key-size: clamp(48px, 6.8vh, 64px);
        --remote-pad-size: clamp(180px, 27vh, 260px);
      }
    }
    .icon {
      width: 28px;
      height: 28px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Now playing */
    .now-playing {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      gap: var(--ha-space-1, 4px);
      padding: var(--ha-space-2, 8px);
      border-radius: var(--ha-border-radius-xl, 18px);
      position: relative;
      isolation: isolate;
    }
    .now-playing::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: inherit;
      background: var(--remote-surface);
      opacity: calc(var(--remote-surface-opacity) * 0.6);
    }
    .now-playing .row {
      display: flex;
      align-items: center;
      gap: var(--ha-space-3, 12px);
    }
    .art {
      flex: none;
      width: 44px;
      height: 44px;
      border-radius: var(--ha-border-radius-md, 8px);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
    }
    .art img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .info {
      flex: 1;
      min-width: 0;
    }
    .title,
    .secondary {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .title {
      font-weight: var(--ha-font-weight-medium, 500);
    }
    .secondary {
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-s, 12px);
    }

    /* Seek slider: thin track and round thumb like the native media player. */
    .seek {
      padding: 0 var(--ha-space-1, 4px);
    }
    .seek-track {
      position: relative;
      height: 24px;
      cursor: pointer;
      outline: none;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    .seek-bar,
    .seek-fill {
      position: absolute;
      left: 0;
      top: 10px;
      height: 4px;
      border-radius: 2px;
    }
    .seek-bar {
      right: 0;
      background: var(--seek-color);
      opacity: 0.24;
    }
    .seek-fill {
      background: var(--seek-color);
    }
    .seek-thumb {
      position: absolute;
      top: 4px;
      width: 16px;
      height: 16px;
      margin-left: -8px;
      border-radius: 50%;
      background: var(--seek-color);
      transition: scale 120ms ease-out;
    }
    .seek-track:focus-visible .seek-thumb {
      box-shadow:
        0 0 0 3px var(--card-background-color, #fff),
        0 0 0 5px var(--seek-color);
    }
    .seek.dragging .seek-thumb {
      scale: 1.25;
    }
    .seek-bubble {
      position: absolute;
      bottom: 22px;
      left: 50%;
      translate: -50% 0;
      padding: 2px 8px;
      border-radius: var(--ha-border-radius-pill, 9999px);
      background: var(--seek-color);
      color: var(--text-primary-color, #fff);
      font-size: var(--ha-font-size-s, 12px);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 120ms ease-out;
    }
    .seek.dragging .seek-bubble {
      opacity: 1;
    }
    .seek-times {
      display: flex;
      justify-content: space-between;
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-xs, 11px);
      font-variant-numeric: tabular-nums;
    }

    /* Clickpad */
    .pad {
      position: relative;
      box-sizing: border-box;
      width: min(100%, var(--remote-pad-size));
      aspect-ratio: 1;
      border-radius: 50%;
      cursor: pointer;
      outline: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
      isolation: isolate;
      overflow: hidden;
    }
    .pad::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -2;
      border-radius: inherit;
      background: var(--remote-surface);
      opacity: var(--remote-surface-opacity);
      transition: opacity 180ms ease-in-out;
    }
    .pad:not(.disabled):hover::before {
      opacity: calc(var(--remote-surface-opacity) * 1.5);
    }
    .pad:focus-visible {
      box-shadow: 0 0 0 2px var(--primary-color);
    }
    .pad.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .center {
      position: absolute;
      inset: 23%;
      border-radius: 50%;
      background: var(--card-background-color, var(--ha-color-surface-default));
      box-shadow: inset 0 0 0 1px var(--divider-color);
      transition:
        scale 120ms ease-out,
        background-color 120ms ease-out;
    }
    .pad.tapped .center {
      scale: 0.97;
    }
    .tick {
      position: absolute;
      width: 6px;
      height: 6px;
      margin: -3px;
      border-radius: 50%;
      background: var(--secondary-text-color);
      opacity: 0.6;
      transition:
        opacity 120ms ease-out,
        scale 120ms ease-out;
    }
    .tick.up {
      left: 50%;
      top: 11.5%;
    }
    .tick.down {
      left: 50%;
      top: 88.5%;
    }
    .tick.left {
      top: 50%;
      left: 11.5%;
    }
    .tick.right {
      top: 50%;
      left: 88.5%;
    }
    .pad.flash-up .tick.up,
    .pad.flash-down .tick.down,
    .pad.flash-left .tick.left,
    .pad.flash-right .tick.right {
      opacity: 1;
      scale: 1.6;
    }
    /* Ring pressed: light toward the pressed side. */
    .glow {
      position: absolute;
      z-index: -1;
      width: 46%;
      height: 46%;
      left: 27%;
      top: 27%;
      border-radius: 50%;
      background: var(--primary-color);
      opacity: 0;
      filter: blur(18px);
      transition: opacity 180ms ease-out;
      pointer-events: none;
    }
    .pad.flash-up .glow {
      opacity: 0.35;
      transform: translateY(-62%);
    }
    .pad.flash-down .glow {
      opacity: 0.35;
      transform: translateY(62%);
    }
    .pad.flash-left .glow {
      opacity: 0.35;
      transform: translateX(-62%);
    }
    .pad.flash-right .glow {
      opacity: 0.35;
      transform: translateX(62%);
    }
    /* Finger on the center. */
    .touch {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 44px;
      height: 44px;
      margin: -22px;
      border-radius: 50%;
      background: var(--primary-color);
      opacity: 0.25;
      pointer-events: none;
    }

    /* Buttons, laid out like the Siri Remote. */
    .keys {
      display: grid;
      grid-template-columns: var(--remote-key-size) var(--remote-key-size);
      grid-template-rows: repeat(3, var(--remote-key-size));
      gap: var(--ha-space-4, 16px) var(--ha-space-10, 40px);
      justify-content: center;
      color: var(--primary-text-color);
    }
    .key {
      position: relative;
      isolation: isolate;
      width: var(--remote-key-size);
      height: var(--remote-key-size);
      padding: 0;
      border: none;
      border-radius: 50%;
      background: none;
      color: inherit;
      font: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      outline: none;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      transition: scale 120ms ease-out;
    }
    .key::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: inherit;
      background: var(--remote-surface);
      opacity: var(--remote-surface-opacity);
      transition: opacity 120ms ease-out;
    }
    .key:not(:disabled):hover::before {
      opacity: calc(var(--remote-surface-opacity) * 1.5);
    }
    .key:not(:disabled):active::before {
      opacity: calc(var(--remote-surface-opacity) * 2.5);
    }
    .key:not(:disabled):active {
      scale: 0.94;
    }
    .key:focus-visible {
      box-shadow: 0 0 0 2px var(--primary-color);
    }
    .key:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .key.hidden {
      visibility: hidden;
    }
    .key.on {
      color: var(--primary-color);
    }
    .key.small {
      flex: none;
      width: 40px;
      height: 40px;
    }
    .key.small .icon {
      width: 22px;
      height: 22px;
    }
    .back {
      grid-area: 1 / 1;
    }
    .home {
      grid-area: 1 / 2;
    }
    .play {
      grid-area: 2 / 1;
    }
    .mute {
      grid-area: 3 / 1;
    }
    /*
     * One pill for both volume keys, each half rounded on its own side. A
     * swipe stretches it toward where the volume goes (elastic).
     */
    .volume {
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      transition: scale 220ms cubic-bezier(0.2, 0.9, 0.3, 1.3);
      grid-area: 2 / 2 / 4 / 3;
      display: flex;
      flex-direction: column;
    }
    .volume .key {
      flex: 1;
      height: auto;
    }
    /* Halves of one pill: shrinking one would open a gap. */
    .volume .key:not(:disabled):active {
      scale: none;
    }
    /* Pressed look follows the gesture: gone as soon as a swipe starts. */
    .volume .key:not(:disabled):active::before {
      opacity: var(--remote-surface-opacity);
    }
    .volume .key.pressed::before {
      opacity: calc(var(--remote-surface-opacity) * 2.5);
    }
    .volume .icon {
      transition: opacity 150ms ease-out;
    }
    .volume .key.dim .icon {
      opacity: 0.35;
    }
    .volume.moving-up {
      transform-origin: bottom;
      scale: 1 1.06;
    }
    .volume.moving-down {
      transform-origin: top;
      scale: 1 1.06;
    }
    @media (prefers-reduced-motion: reduce) {
      .volume,
      .volume.moving-up,
      .volume.moving-down {
        scale: none;
        transition: none;
      }
    }
    .volume .key:first-child {
      border-radius: calc(var(--remote-key-size) / 2)
        calc(var(--remote-key-size) / 2) 0 0;
    }
    .volume .key:last-child {
      border-radius: 0 0 calc(var(--remote-key-size) / 2)
        calc(var(--remote-key-size) / 2);
    }
  `);customElements.get(U4)||customElements.define(U4,$);var M3=["ha-icon-button-group","ha-icon-button-toggle","light-color-rgb-picker","light-color-temp-picker","ha-more-info-light-favorite-colors"],n9={cover:["ha-icon-button-group","ha-icon-button-toggle","ha-state-control-cover-position","ha-state-control-cover-tilt-position","ha-state-control-cover-toggle","ha-state-control-cover-buttons","ha-more-info-cover-favorite-positions"],valve:["ha-icon-button-group","ha-icon-button-toggle","ha-state-control-valve-position","ha-state-control-valve-toggle","ha-state-control-valve-buttons","ha-more-info-valve-favorite-positions"],lock:["ha-control-button","ha-control-button-group","ha-state-icon"],alarm_control_panel:["ha-control-button","ha-state-icon"],siren:["ha-button","more-info-siren"],vacuum:["ha-control-button","ha-control-button-group","ha-battery-icon","ha-icon-next","ha-more-info-control-select-container","more-info-vacuum"],lawn_mower:["ha-control-button","ha-control-button-group","ha-battery-icon"]},E1={toggle:{tag:"ha-state-control-toggle",load:"switch"},brightness:{tag:"ha-state-control-light-brightness",load:"light",extraTags:M3},fan_speed:{tag:"ha-state-control-fan-speed",load:"fan",extraTags:["ha-outlined-icon-button"]},position:{tag:"ha-state-control-cover-position",load:"cover"},tilt:{tag:"ha-state-control-cover-tilt-position",load:"cover"},cover_toggle:{tag:"ha-state-control-cover-toggle",load:"cover"},cover_buttons:{tag:"ha-state-control-cover-buttons",load:"cover"},valve_position:{tag:"ha-state-control-valve-position",load:"valve"},valve_toggle:{tag:"ha-state-control-valve-toggle",load:"valve"},valve_buttons:{tag:"ha-state-control-valve-buttons",load:"valve"},lock:{tag:"ha-state-control-lock-toggle",load:"lock"},alarm_modes:{tag:"ha-state-control-alarm_control_panel-modes",load:"alarm_control_panel"},temperature:{tag:"ha-state-control-climate-temperature",load:"climate"},climate_humidity:{tag:"ha-state-control-climate-humidity",load:"climate"},humidity:{tag:"ha-state-control-humidifier-humidity",load:"humidifier"},water_heater:{tag:"ha-state-control-water_heater-temperature",load:"water_heater"},vacuum_status:{tag:"ha-state-control-vacuum-status",load:"vacuum"},lawn_mower_status:{tag:"ha-state-control-lawn_mower-status",load:"lawn_mower"},media_player:{tag:"more-info-media_player",load:"media_player"},remote:{tag:"more-info-popup-remote-control",load:"media_player",extraTags:["ha-state-icon"],inline:!0},script:{tag:"ha-control-button-group",load:"script",extraTags:["ha-control-button","ha-markdown","ha-service-control"],inline:!0},more_info:{tag:"more-info-content",load:"",extraTags:["state-card-content"]},press:{tag:"ha-control-button-group",load:"script",extraTags:["ha-control-button"],inline:!0},trigger:{tag:"ha-control-button-group",load:"script",extraTags:["ha-control-button","ha-markdown","ha-service-control"],inline:!0},push:{tag:"ha-control-button-group",load:"script",extraTags:["ha-control-button","ha-markdown","ha-service-control"],inline:!0}},i9=["alarm_control_panel","cover","climate","conversation","fan","humidifier","input_boolean","lawn_mower","light","lock","siren","script","switch","timer","vacuum","valve","water_heater","weather","media_player"],_C=["camera","configurator"],OC=["camera","conversation","counter","date","datetime","group","image","input_datetime","input_number","input_select","input_text","number","person","remote","scene","select","sun","text","time","timer","update","weather"],bC=L=>{let V=v(L.entity_id);if(V==="group"){let C=new Set((L.attributes.entity_id??[]).map(v)),[H]=C;return C.size===1&&H!=="group"&&i9.includes(H)}return i9.includes(V)},A9=L=>!bC(L)&&!_C.includes(v(L.entity_id)),d9=["hs","xy","rgb","rgbw","rgbww"],yC=[...d9,"color_temp","brightness","white"],K2=(L,V)=>L.attributes.supported_color_modes?.some(C=>V.includes(C))??!1,o3=L=>K2(L,yC),p9=L=>K2(L,d9),l9=L=>K2(L,["color_temp"]),s9=L=>K2(L,["white"]),k=(L,V)=>((L.attributes.supported_features??0)&V)!==0,a9=(L,V)=>((L.attributes.supported_features??0)&3)===3&&!k(L,V),i3=L=>{let V=v(L.entity_id);switch(V){case"light":return o3(L)?"brightness":"toggle";case"switch":case"input_boolean":case"siren":return"toggle";case"fan":return k(L,1)?"fan_speed":"toggle";case"cover":return k(L,4)?"position":k(L,128)?"tilt":a9(L,120)?"cover_toggle":"cover_buttons";case"valve":return k(L,4)?"valve_position":a9(L,8)?"valve_toggle":"valve_buttons";case"lock":return"lock";case"alarm_control_panel":return"alarm_modes";case"climate":return"temperature";case"humidifier":return"humidity";case"water_heater":return"water_heater";case"vacuum":return"vacuum_status";case"lawn_mower":return"lawn_mower_status";case"media_player":return"media_player";case"script":case"button":case"input_button":case"automation":return"trigger";default:return OC.includes(V)?"more_info":void 0}},wC=["climate","humidifier","water_heater","media_player"],B1=(L,V)=>{let C=L??"auto";if(C!=="none")return C!=="auto"?C:V?i3(V):void 0},R1=(L,V)=>!wC.includes(v(L))&&V!=="more_info"&&V!=="remote",kC=["entity","control","remote","remote_view","show_state","show_last_changed"],m9=(L,V)=>!L||kC.some(C=>L[C]!==V[C]);var Y={OPEN:1,CLOSE:2,SET_POSITION:4,STOP:8,OPEN_TILT:16,CLOSE_TILT:32,STOP_TILT:64,SET_TILT_POSITION:128},m1={OPEN:1,CLOSE:2,SET_POSITION:4,STOP:8},c9=1,q2={TONES:4,VOLUME_SET:8,DURATION:16},j={PAUSE:4,STOP:8,RETURN_HOME:16,STATUS:128,LOCATE:512,CLEAN_SPOT:1024,STATE:4096,START:8192,CLEAN_AREA:16384},f1={START_MOWING:1,PAUSE:2,DOCK:4,STOP:8},v9=(L,...V)=>V.every(C=>k(L,C)),u9=L=>{let V=k(L,Y.SET_POSITION),C=k(L,Y.SET_TILT_POSITION),H=k(L,Y.OPEN|Y.CLOSE|Y.STOP),e=k(L,Y.OPEN_TILT|Y.CLOSE_TILT|Y.STOP_TILT),r=v9(L,Y.OPEN,Y.CLOSE)&&!k(L,Y.STOP)&&!e&&!V&&!C;return{position:V,tilt:C,buttons:r?"toggle":H||e?"buttons":void 0,switchMode:(V||C)&&(H||e)}},x9=L=>{let V=k(L,m1.SET_POSITION),C=k(L,m1.OPEN|m1.CLOSE|m1.STOP),H=v9(L,m1.OPEN,m1.CLOSE)&&!k(L,m1.STOP)&&!V;return{position:V,tilt:!1,buttons:H?"toggle":C?"buttons":void 0,switchMode:V&&C}},a3=L=>L==null||Array.isArray(L)&&L.length>0,Z9=(L,V)=>{if(!V)return!1;let C=v(L.entity_id),H=V.options?.[C];return C==="valve"?k(L,m1.SET_POSITION)&&a3(H?.favorite_positions):k(L,Y.SET_POSITION)&&a3(H?.favorite_positions)||k(L,Y.SET_TILT_POSITION)&&a3(H?.favorite_tilt_positions)},h9=L=>{let V=L.state;if(V==="unavailable"||V==="unknown"||V==="off")return!1;switch(v(L.entity_id)){case"alarm_control_panel":return V!=="disarmed";case"cover":case"valve":return V!=="closed";case"lawn_mower":return!["docked","paused","idle"].includes(V);case"lock":return V!=="locked";case"vacuum":return!["idle","docked","paused"].includes(V);default:return!0}},n3=L=>{if(L.state==="unavailable")return"var(--state-unavailable-color)";let V=v(L.entity_id),C=L.attributes.device_class,H=L.state.toLowerCase().replace(/[^a-z0-9]+/g,"_"),e=h9(L)?"active":"inactive";return[...C?[`--state-${V}-${C}-${H}-color`]:[],`--state-${V}-${H}-color`,`--state-${V}-${e}-color`,`--state-${e}-color`].reduceRight((t,M)=>`var(${M}${t?`, ${t}`:""})`,"")},S9=(L,V)=>{let C=V.attributes,H=h9(V)?C.current_position??(v(V.entity_id)==="cover"?C.current_tilt_position:void 0):void 0;return H&&H!==100?L.formatEntityAttributeValue(V,"current_position",Math.round(H)):""},TC=L=>["opening","unlocking","locking"].includes(L.state),f9=L=>L.state!=="unavailable"&&(L.attributes.assumed_state===!0||L.state!=="open"&&!TC(L)),A3=["triggered","arming","pending"],g9=L=>["cleaning","on"].includes(L.state),_9=L=>!["docked","off","idle"].includes(L.state),O9=L=>L.state!=="unavailable"&&L.state!=="returning",b9=L=>L.state!=="unavailable"&&!["docked","idle"].includes(L.state),y9=L=>L.state!=="unavailable"&&L.state!=="docked",w9=(L,V)=>{let C=L.entities[V]?.device_id;if(!C)return;let H=Object.values(L.entities).filter(M=>M.device_id===C),e=["sensor","binary_sensor"],r=H.map(M=>L.states[M.entity_id]).filter(M=>M?.attributes.device_class==="battery"&&e.includes(v(M.entity_id))).sort((M,o)=>e.indexOf(v(M.entity_id))-e.indexOf(v(o.entity_id)))[0];if(!r||v(r.entity_id)!=="binary_sensor"&&isNaN(Number(r.state)))return;let t=H.map(M=>L.states[M.entity_id]).find(M=>M?.attributes.device_class==="battery_charging");return{battery:r,charging:t}},k9=L=>["cs","de","fi","fr","sk","sv"].includes(L.locale?.language??L.language)?" ":"",T9=async(L,V)=>{let C=await window.loadCardHelpers?.();if(!C?.showEnterCodeDialog)throw new Error("The code dialog is not available");return C.showEnterCodeDialog(L,V)},d3=async(L,V,C,H,e)=>{let r;if(C.attributes.code_format&&!H?.options?.lock?.default_code){let t=await T9(L,{codeFormat:"text",codePattern:C.attributes.code_format,title:V.localize(`ui.card.lock.${e}`),submitText:V.localize(`ui.card.lock.${e}`)});if(t==null)throw new Error("Code dialog closed");r=t}await V.callService("lock",e,{entity_id:C.entity_id,code:r})},P9=async(L,V,C,H)=>{let e;if(C.attributes.code_format&&!H?.options?.alarm_control_panel?.default_code){let r=await T9(L,{codeFormat:C.attributes.code_format,title:V.localize("ui.card.alarm_control_panel.disarm"),submitText:V.localize("ui.card.alarm_control_panel.disarm")});if(r==null)throw new Error("Code dialog closed");e=r}await V.callService("alarm_control_panel","alarm_disarm",{entity_id:C.entity_id,code:e})};var l3=L=>V=>(V.attributes[L]??[]).map(String),p3=L=>V=>{let C=V.attributes[L];return C==null?void 0:String(C)},e1=(L,V,C,H)=>({options:l3(L),value:p3(V),service:e=>[v(e.entity_id),C],data:e=>({[V]:e}),icon:H}),PC=(L,V,C,H)=>({optionIcons:{true:C,false:H},options:()=>["true","false"],value:e=>e.attributes[L]==null?void 0:String(!!e.attributes[L]),service:e=>[v(e.entity_id),V],data:e=>({[L]:e==="true"}),icon:C}),o2={effect:{...e1("effect_list","effect","turn_on",E0)},preset_mode:e1("preset_modes","preset_mode","set_preset_mode",y1),fan_mode:e1("fan_modes","fan_mode","set_fan_mode",N1),swing_mode:e1("swing_modes","swing_mode","set_swing_mode",d2),swing_horizontal_mode:e1("swing_horizontal_modes","swing_horizontal_mode","set_swing_horizontal_mode",d2),hvac_mode:{options:l3("hvac_modes"),value:L=>L.state,service:()=>["climate","set_hvac_mode"],data:L=>({hvac_mode:L}),icon:n7,formatAsState:!0},fan_speed:{...e1("fan_speed_list","fan_speed","set_fan_speed",N1),attributeIcons:!1},mode:e1("available_modes","mode","set_mode",y1),direction:{options:()=>["forward","reverse"],value:p3("direction"),service:()=>["fan","set_direction"],data:L=>({direction:L}),icon:M7},oscillating:PC("oscillating","oscillate",d2,O0),operation_mode:e1("operation_list","operation_mode","set_operation_mode",s7),away_mode:{options:()=>["on","off"],value:p3("away_mode"),service:()=>["water_heater","set_away_mode"],data:L=>({away_mode:L==="on"}),icon:r5,optionIcons:{on:r5,off:g0}},source:{...e1("source_list","source","select_source",q0),attributeIcons:!1},sound_mode:{...e1("sound_mode_list","sound_mode","select_sound_mode",J0),attributeIcons:!1}},Y2={options:l3("options"),value:L=>L.state,service:L=>[v(L.entity_id),"select_option"],data:L=>({option:L}),icon:y1,formatAsState:!0},E9={options:()=>["off","on"],value:L=>L.state,service:L=>[v(L.entity_id),"toggle"],data:()=>({}),icon:v1,formatAsState:!0},F1=["select","input_select"],B9=["number","input_number"],R9=["switch","input_boolean","light","fan","siren","automation","script","group","media_player","humidifier","climate","water_heater","remote","valve","cover","lock"];var j2=(L,V)=>["navigate","more-info"].includes((L.tap_action??{action:V?"more-info":"none"}).action),F9={button:"button.press",input_button:"input_button.press",scene:"scene.turn_on",script:"script.turn_on"},$9=["off","closed","locked","unavailable","unknown","idle","standby","paused","docked"],D9=600,n1=L=>{if(L.type)return L.type;if(L.attribute)return"select";let V=L.entity?v(L.entity):"";return F1.includes(V)?"select":B9.includes(V)?"number":R9.includes(V)?"toggle":"action"},N9=L=>L?.map(V=>typeof V=="string"?{value:V}:{...V,value:String(V.value)}),s3=L=>{let[V,C]=L.split(".",2);return[V,C]};var W9=(L,V)=>{let C={...L};for(let[H,e]of Object.entries(V))C[H]===e&&delete C[H];return C},I9=(L,V)=>({...L.entity?{show_state:R1(L.entity,B1(L.control,V?.states[L.entity]))}:{},show_last_changed:!0,show_cancel:!0,remote:"auto",remote_view:"now_playing",haptics:!0,seek_color:"theme"}),U9={fill:(L,V)=>({...I9(L,V),...L}),strip:(L,V)=>W9(L,I9(L,V))},z9=(L,V,C)=>({...L,controls:(L.controls??[]).map(H=>C(H,{show_arrow:j2(H,!!(H.entity&&V?.states[H.entity]))}))}),m3={fill:(L,V)=>z9(L,V,(C,H)=>({...H,...C})),strip:(L,V)=>z9(L,V,W9)};var _1=()=>{},c3=L=>x(_1(),`controls.${L}`),g1=(L,V,C=!1)=>({select:{mode:"dropdown",custom_value:C,options:L.map(H=>({value:H,label:x(_1(),`${V}.${H}`)||H}))}}),Q9={name:"appearance",selector:g1(["plain","card"],"controls.appearance")},EC=L=>c3(L.name)||L.name,BC=L=>({select:{mode:"dropdown",custom_value:!0,options:[...["auto","none"].map(V=>({value:V,label:x(_1(),`controls.remote.${V}`)})),...(L?z4(L):[]).map(V=>({value:V,label:`${G(L.states[V])} (${V})`}))]}}),RC=["toggle","trigger","push"],G9=[void 0,"media_player","remote","more_info"],FC=["trigger","push","press","script"],$C=(L,V)=>{let C=L.entity,H=C?V?.states[C]:void 0;if(!C||!H)return;let e=B1(L.control,H),r=v(C),t=L.show_state??R1(C,e),M=r==="media_player",o=e==="remote"||e==="media_player"&&!!M2(V,C,L.remote),A=[["show_last_changed",t],["show_cancel",r==="script"&&(e==="trigger"||e==="push")],["state_override",t||FC.includes(e)],["icon",RC.includes(e)],["icon_off",e==="toggle"],["color",!G9.includes(e)],["color_off",!G9.includes(e)],["button_layout",e==="push"],["remote",M&&(e==="media_player"||e==="remote")],["remote_view",e==="media_player"&&o],["audio_entity",o],["haptics",o],["seek_color",o]];return new Set(["entity","control","show_state","appearance",...A.filter(([,d])=>d).map(([d])=>d)])},K9=(L,V)=>V?L.flatMap(C=>{if(C.type==="grid"&&C.schema){let H=K9(C.schema,V);return H.length?[{...C,schema:H}]:[]}return V.has(C.name)?[C]:[]}):L,q9=()=>({schema:(L,V={})=>K9(DC(L),$C(V,L)),computeLabel:EC,computeHelper:L=>x(_1(),`controls.${L.name}_helper`)||void 0}),DC=L=>[{name:"entity",required:!0,selector:{entity:{}}},{name:"control",selector:g1(["auto","none",...Object.keys(E1)],"controls.control")},{name:"",type:"grid",schema:[{name:"show_state",selector:{boolean:{}}},{name:"show_last_changed",selector:{boolean:{}}},{name:"show_cancel",selector:{boolean:{}}}]},{name:"state_override",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"icon",selector:{icon:{}}},{name:"icon_off",selector:{icon:{}}},{name:"color",selector:{ui_color:{}}},{name:"color_off",selector:{ui_color:{}}}]},{name:"button_layout",selector:g1(["vertical","horizontal","square","circle"],"controls.button_layout")},{name:"remote",selector:BC(L)},{name:"audio_entity",selector:{entity:{domain:"media_player"}}},{name:"",type:"grid",schema:[{name:"remote_view",selector:g1(["now_playing","remote"],"controls.remote_view")},{name:"haptics",selector:{boolean:{}}}]},{name:"seek_color",selector:g1(["theme","art"],"controls.seek_color",!0)},Q9],U=(L,V,C=!1)=>({label:c3(L),description:x(_1(),`controls.${L}_helper`)||void 0,required:C,selector:V}),Y9=()=>({type:U("type",g1(["select","toggle","number","action","button"],"controls.type")),entity:U("entity",{entity:{}}),attribute:U("attribute",g1(["state",...Object.keys(o2)],"controls.attribute",!0)),name:U("name",{text:{}}),icon:U("icon",{icon:{}}),color:U("color",{ui_color:{}}),options:U("options",{select:{multiple:!0,custom_value:!0,options:[]}}),value:U("value",{text:{}}),tap_action:U("tap_action",{ui_action:{}}),show_arrow:U("show_arrow",{boolean:{}}),perform_action:U("perform_action",{text:{}}),data_key:U("data_key",{text:{}}),min:U("min",{number:{mode:"box",step:"any"}}),max:U("max",{number:{mode:"box",step:"any"}}),step:U("step",{number:{mode:"box",step:"any"}}),visibility:U("visibility",{object:{}})}),NC={select:["attribute","options","perform_action","data_key"],toggle:["perform_action"],number:["attribute","min","max","step","perform_action","data_key"],action:["value","tap_action","show_arrow"],button:["tap_action","perform_action"]},IC=L=>{let V=NC[n1(L)].filter(C=>C!=="data_key"||!!L.perform_action);return[...Object.keys(Y9()).filter(C=>["type","entity","name","icon","color","visibility"].includes(C)||V.includes(C))]},j9=L=>{let V=Y9();return IC(L).map(C=>{let H=V[C];return{name:C,required:H.required,selector:H.selector}})},v3=L=>c3(L)||L,u3=L=>x(_1(),`controls.item_${L}_helper`)||x(_1(),`controls.${L}_helper`)||void 0,X9=()=>[{name:"",type:"grid",schema:[Q9,{name:"wrap",selector:{boolean:{}}}]}],J9=L=>{if(L.controls?.some(V=>V.options?.some(C=>typeof C!="string")))throw new Error("Options with names or icons can only be edited in YAML")};var C6,H6,V6,L6,r1,x3,Z3,h3,A1=class extends(L6=P,V6=[g({attribute:!1})],H6=[Z()],C6=[Z()],L6){constructor(){super(...arguments);s(this,x3,a(r1,8,this)),a(r1,11,this);s(this,Z3,a(r1,12,this)),a(r1,15,this);s(this,h3,a(r1,16,this)),a(r1,19,this)}setConfig(C){J9(C),this._config=C,this._editing!==void 0&&this._editing>=(C.controls?.length??0)&&(this._editing=void 0)}get _filled(){return m3.fill({...this._config,controls:this._config.controls??[]},this.hass)}_save(C){this._config=C,b(this,"config-changed",{config:m3.strip(C,this.hass)})}_setItems(C){this._save({...this._config,controls:C})}_title(C){let H=C.entity?this.hass?.states[C.entity]:void 0;return C.name||(H?G(H):C.entity)||this._typeLabel(C)}_typeLabel(C){let H=n1(C);return x(this.hass,`controls.type.${H}`)||H}_description(C){let H=[this._typeLabel(C)];return C.attribute&&C.attribute!=="state"&&H.push(x(this.hass,`controls.attribute.${C.attribute}`)||C.attribute),C.visibility?.length&&H.push(x(this.hass,"controls.visibility")),H.join(" \xB7 ")}_moved(C){C.stopPropagation();let{oldIndex:H,newIndex:e}=C.detail,r=[...this._config.controls],[t]=r.splice(H,1);r.splice(e,0,t),this._setItems(r)}_add(){let C=[...this._config.controls??[],{}];this._setItems(C),this._editing=C.length-1}_delete(C){let H=[...this._config.controls];H.splice(C,1),this._setItems(H)}_optionsChanged(C){C.stopPropagation(),this._save({...this._filled,...C.detail.value})}_renderList(){let C=this.hass,H=this._filled;return i`
      <label>${x(C,"controls.controls")}</label>
      <div class="items-container">
        <ha-sortable
          handle-selector=".handle"
          draggable-selector=".item"
          @item-moved=${this._moved}
        >
          <ha-list-base>
            ${H.controls.map((e,r)=>i`
                <ha-list-item-base class="item">
                  <ha-svg-icon
                    class="handle"
                    .path=${F0}
                    slot="start"
                  ></ha-svg-icon>
                  <div slot="headline" class="label">${this._title(e)}</div>
                  <div slot="supporting-text" class="description">
                    ${this._description(e)}
                  </div>
                  <ha-icon-button
                    slot="end"
                    .label=${C.localize("ui.common.edit")}
                    .path=${H7}
                    @click=${()=>{this._editing=r}}
                  ></ha-icon-button>
                  <ha-icon-button
                    slot="end"
                    .label=${C.localize("ui.common.delete")}
                    .path=${c2}
                    @click=${()=>this._delete(r)}
                  ></ha-icon-button>
                </ha-list-item-base>
              `)}
          </ha-list-base>
        </ha-sortable>
        <ha-button appearance="filled" @click=${this._add}>
          ${C.localize("ui.common.add")}
        </ha-button>
      </div>
      <ha-form
        .hass=${C}
        .data=${H}
        .schema=${X9()}
        .computeLabel=${e=>v3(e.name)}
        .computeHelper=${e=>u3(e.name)}
        @value-changed=${this._optionsChanged}
      ></ha-form>
    `}_itemChanged(C){C.stopPropagation();let H=this._editing,e=[...this._filled.controls];e[H]=C.detail.value,this._setItems(e)}_renderItem(C){let H=this.hass,e=this._filled.controls[C]??{},r=H.localize("ui.common.back");return i`
      <div class="header">
        <ha-icon-button-prev
          .label=${r}
          @click=${()=>{this._editing=void 0}}
        ></ha-icon-button-prev>
        <span class="title">${this._title(e)}</span>
      </div>
      <ha-form
        .hass=${H}
        .data=${e}
        .schema=${j9(e)}
        .computeLabel=${t=>v3(t.name)}
        .computeHelper=${t=>u3(t.name)}
        @value-changed=${this._itemChanged}
      ></ha-form>
    `}render(){return!this._config||!this.hass?n:this._editing!==void 0?this._renderItem(this._editing):this._renderList()}};r1=I(L6),x3=new WeakMap,Z3=new WeakMap,h3=new WeakMap,l(r1,4,"hass",V6,A1,x3),l(r1,4,"_config",H6,A1,Z3),l(r1,4,"_editing",C6,A1,h3),F(r1,A1),m(A1,"styles",O`
    label {
      margin-bottom: 8px;
      display: block;
    }
    .items-container {
      margin-bottom: var(--ha-space-6, 24px);
    }
    ha-list-base {
      --ha-list-gap: var(--ha-space-2);
      --ha-list-padding: var(--ha-space-2) 0;
    }
    ha-list-item-base {
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md);
      --ha-row-item-gap: 0;
      --ha-row-item-padding-block: 0;
      --ha-row-item-padding-inline: var(--ha-space-3) var(--ha-space-1);
    }
    ha-list-item-base::part(start),
    ha-list-item-base::part(end) {
      color: var(--ha-color-text-secondary);
    }
    .handle {
      cursor: move;
      padding: 8px;
      margin-inline-start: -8px;
    }
    ha-list-item-base .label,
    ha-list-item-base .description {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .header {
      display: flex;
      align-items: center;
      gap: var(--ha-space-1, 4px);
      margin-bottom: var(--ha-space-2, 8px);
    }
    .header .title {
      font-size: var(--ha-font-size-l, 18px);
      font-weight: var(--ha-font-weight-medium, 500);
    }
  `);var e6=(L,V,C)=>{var e,r,t,M,o,A;class H extends(t=P,r=[g({attribute:!1})],e=[Z()],t){constructor(){super(...arguments);s(this,o,a(M,8,this)),a(M,11,this);s(this,A,a(M,12,this)),a(M,15,this);m(this,"_form",V());m(this,"_schema")}get _currentSchema(){let{schema:u}=this._form;if(typeof u!="function")return u;let c=u(this.hass,this._config),h=JSON.stringify(c);return this._schema?.key!==h&&(this._schema={key:h,value:c}),this._schema.value}setConfig(u){this._form.assertConfig?.(u),this._config=u}render(){return this._config?i`
        <ha-form
          .hass=${this.hass}
          .data=${C.fill(this._config,this.hass)}
          .schema=${this._currentSchema}
          .computeLabel=${this._form.computeLabel}
          .computeHelper=${this._form.computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      `:n}_valueChanged(u){u.stopPropagation(),b(this,"config-changed",{config:C.strip(u.detail.value,this.hass)})}}M=I(t),o=new WeakMap,A=new WeakMap,l(M,4,"hass",r,H,o),l(M,4,"_config",e,H,A),F(M,H),customElements.get(L)||customElements.define(L,H)};var S3="more-info-state-card-editor",X2="more-info-controls-card-editor";e6(S3,q9,U9);customElements.get(X2)||customElements.define(X2,A1);var J2=O`
  ha-card.plain {
    background: none;
    border: none;
    box-shadow: none;
    border-radius: 0;
    --ha-card-background: transparent;
  }
`,r6=O`
  .chip {
    --mdc-icon-size: 20px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    /* No width rules: the native container sizes its slotted chips. */
    height: var(--control-select-menu-height, 48px);
    padding: var(--control-select-menu-padding, 6px 10px);
    border: none;
    border-radius: var(
      --control-select-menu-border-radius,
      var(--ha-border-radius-lg)
    );
    background: none;
    color: var(--control-select-menu-text-color, var(--primary-text-color));
    font-family: inherit;
    font-size: var(--ha-font-size-m);
    font-weight: var(--ha-font-weight-normal);
    line-height: 1.4;
    letter-spacing: 0.25px;
    text-align: start;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    z-index: 0;
    transition: box-shadow 180ms ease-in-out;
  }
  .chip::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: var(
      --control-select-menu-background-color,
      var(--disabled-color)
    );
    opacity: var(--control-select-menu-background-opacity, 0.2);
    transition:
      background-color 180ms ease-in-out,
      opacity 180ms ease-in-out;
  }
  button.chip:hover::before {
    background-color: var(--ha-color-on-neutral-quiet);
  }
  .chip:focus-visible,
  .chip:focus-within:has(:focus-visible) {
    outline: none;
    box-shadow: 0 0 0 2px
      var(--control-select-menu-focus-color, var(--secondary-text-color));
  }
  .chip[disabled] {
    cursor: not-allowed;
    color: var(--disabled-color);
  }
  .chip .icon {
    display: flex;
    flex: none;
    --mdc-icon-size: 20px;
  }
  .chip .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }
  .chip .content p {
    margin: 0;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .chip .label {
    font-size: var(--ha-font-size-s);
    letter-spacing: 0.4px;
  }
  .chip .value {
    font-size: var(--ha-font-size-m);
  }
`;var i2="more-info-state-card",C5="more-info-popup-fill",zC={temperature:["show-secondary","prevent-interaction-on-scroll"],climate_humidity:["show-current","prevent-interaction-on-scroll"],humidity:["show-secondary","prevent-interaction-on-scroll"],water_heater:["show-current","prevent-interaction-on-scroll"]},WC=16,UC=32,GC=6,QC=L=>Math.round(100/(L.attributes.percentage_step??1))+1,KC=["position","tilt","cover_toggle","cover_buttons","valve_position","valve_toggle","valve_buttons"],qC=5,YC=2,f3=()=>{},jC=["queued","parallel"],XC=L=>L.state==="off"||L.state==="on"&&jC.includes(L.attributes.mode)&&L.attributes.current<L.attributes.max,JC=(L,V)=>{let C=v(V.entity_id),H=V.attributes;if(C==="light"&&V.state==="on"&&H.brightness!=null)return L.formatEntityAttributeValue(V,"brightness");if(C==="fan"&&V.state==="on"&&H.percentage)return L.formatEntityAttributeValue(V,"percentage");if(C==="script"){let e=H.current||0;return e?H.mode==="parallel"&&e>1?L.localize("ui.card.script.running_parallel",{active:e}):L.localize("ui.card.script.running_single"):L.localize("ui.card.script.idle")}if((C==="button"||C==="input_button")&&V.state!=="unavailable")return L.localize("ui.card.button.press");if(C==="cover"||C==="valve"){let e=S9(L,V);return e?`${L.formatEntityState(V)} \xB7 ${e}`:void 0}if(C==="vacuum"&&k(V,j.STATUS)&&H.status)return L.formatEntityAttributeValue(V,"status")},t6,M6,o6,i6,a6,n6,A6,d6,p6,l6,s6,_,g3,_3,O3,b3,y3,w3,k3,T3,P3,E3,Q=class extends(s6=P,l6=[g({attribute:!1})],p6=[Z()],d6=[Z()],A6=[Z()],n6=[Z()],a6=[Z()],i6=[Z()],o6=[Z()],M6=[Z()],t6=[Z()],s6){constructor(){super(...arguments);s(this,g3,a(_,8,this)),a(_,11,this);s(this,_3,a(_,12,this)),a(_,15,this);s(this,O3,a(_,16,this,!1)),a(_,19,this);s(this,b3,a(_,20,this,{})),a(_,23,this);s(this,y3,a(_,24,this,"brightness")),a(_,27,this);s(this,w3,a(_,28,this)),a(_,31,this);s(this,k3,a(_,32,this)),a(_,35,this);s(this,T3,a(_,36,this,"normal")),a(_,39,this);s(this,P3,a(_,40,this,"now_playing")),a(_,43,this);m(this,"_openTimeout");m(this,"_controlElement");m(this,"_controlTag");s(this,E3,a(_,44,this,{})),a(_,47,this);m(this,"_loadingKey");m(this,"_entryLoaded")}static getConfigElement(){return document.createElement(S3)}static getStubConfig(C,H){let e=H.find(r=>r.startsWith("light."))??H.find(r=>i3(C.states[r]))??H[0];return{type:`custom:${i2}`,entity:e}}setConfig(C){if(!C?.entity)throw new Error('"entity" is required');if(C.control&&C.control!=="auto"&&C.control!=="none"&&!(C.control in E1))throw new Error(`Unknown control "${C.control}"`);let H=this._config;this._config=C,(H?.icon!==C.icon||H?.icon_off!==C.icon_off)&&this._loadIconPaths(C),m9(H,C)&&(this._ready=!1,this._loadingKey=void 0,this._scriptData={action:C.entity},this._lightControl="brightness",this._positionMode=void 0,this._setOpenState("normal"),this._entry=void 0,this._entryLoaded=void 0,this._remoteView=C.remote_view??"now_playing")}_loadIconPaths(C){let{icon:H,icon_off:e}=C;this._iconPaths={},!(!H&&!e)&&Promise.all([H?T5(H):void 0,e?T5(e):void 0]).then(([r,t])=>{this._config?.icon!==H||this._config?.icon_off!==e||(this._iconPaths={on:r,off:t})})}connectedCallback(){super.connectedCallback(),b(this,C5)}disconnectedCallback(){super.disconnectedCallback(),this._setOpenState("normal")}set popupFill(C){if(this.style.removeProperty("--popup-min-height"),C<=0)return;let H=this.getBoundingClientRect().height;this.style.setProperty("--popup-min-height",`${H+C}px`)}getCardSize(){return 7}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}get _stateObj(){return this._config&&this.hass?.states[this._config.entity]}get _controlName(){return B1(this._config?.control,this._stateObj)}willUpdate(){if(this._ready||!this._config||!this._stateObj)return;let C=this._controlName,H=C?E1[C]:void 0,e=this._showState&&this._config.show_last_changed!==!1,r=`${this._config.entity}:${C}:${e}`;if(r===this._loadingKey)return;this._loadingKey=r;let t=[];if(H){let A="extraTags"in H?H.extraTags:[],d=H.load||v(this._config.entity);t.push(P1(d,[H.tag,...A]))}let M=v(this._config.entity),o=M==="light"?M3:n9[M];H&&o&&t.push(P1(M,[...o])),e&&t.push(P1("switch",["ha-more-info-state-header"])),Promise.all(t).then(()=>{this._loadingKey===r&&(this._ready=!0)})}get _showState(){return this._config.show_state??R1(this._config.entity,this._controlName)}_control(C){let H=this._controlName;if(!H)return n;if(H==="script")return this._script(C);if(H==="press")return this._press(C);if(H==="trigger"||H==="push")return i`<more-info-popup-trigger-control
        .hass=${this.hass}
        .stateObj=${C}
        .variant=${H==="push"?"button":"switch"}
        .icon=${this._config.icon}
        .label=${this._config.state_override}
        .layout=${this._config.button_layout??"vertical"}
        .showCancel=${this._config.show_cancel!==!1}
      ></more-info-popup-trigger-control>`;if(H==="more_info")return this._moreInfo(C);if(H==="remote")return this._remote(C);let e=v(C.entity_id);if(this._positionComposite(C))return this._positionControls(C);let{tag:r}=E1[H];if(this._controlTag!==r){this._controlTag=r,this._controlElement=document.createElement(r);for(let o of zC[H]??[])this._controlElement.setAttribute(o,"");H==="lock"&&this._controlElement.addEventListener("lock-service-called",()=>this._setOpenState("normal"))}let t=this._controlElement;if(t.stateObj=C,t.hass=this.hass,H==="media_player")return this._mediaPlayer(C,t);let M=e==="fan";return H==="toggle"&&(this._iconPaths.on||this._iconPaths.off)?(t.iconPathOn=this._iconPaths.on??this._iconPaths.off,t.iconPathOff=this._iconPaths.off??this._iconPaths.on):H==="toggle"&&(t.iconPathOn=M?N1:e==="light"?G0:e==="siren"?p7:void 0,t.iconPathOff=M?D0:e==="light"?U0:e==="siren"?l7:void 0),e==="light"&&(H==="toggle"||H==="brightness")?this._light(C,t):e==="siren"&&H==="toggle"?this._siren(C,t):e==="lock"&&H==="lock"?this._lock(C,t):e==="alarm_control_panel"&&H==="alarm_modes"?A3.includes(C.state)?this._statusIcon(C,"alarm"):t:e==="vacuum"&&H==="vacuum_status"?i`${t}${this._vacuumCommands(C)}`:e==="lawn_mower"&&H==="lawn_mower_status"?i`${t}${this._mowerCommands(C)}`:H==="fan_speed"&&M&&QC(C)>GC&&k(C,UC|WC)?i`${t}${this._fanPowerButton(C)}`:t}_light(C,H){let e=this.hass,r=o3(C),t=p9(C),M=l9(C),o=s9(C);if(!r&&!t&&!M)return H;let A=C.state==="unavailable",d=this._lightControl,p=N=>K=>{K.stopPropagation(),this._lightControl=N},u=(N,K={})=>e.callService("light",N,{entity_id:C.entity_id,...K});(t||M)&&this._loadEntry();let c=this._entry,h=c?.options?.light?.favorite_colors,R=!!(c&&(h==null||h.length>0));return i`
      ${r?n:H}
      ${r&&d==="brightness"?H:t&&d==="color"?i`<light-color-rgb-picker
                .hass=${e}
                .stateObj=${C}
              ></light-color-rgb-picker>`:M&&d==="color_temp"?i`<light-color-temp-picker
                  .hass=${e}
                  .stateObj=${C}
                ></light-color-temp-picker>`:n}
      <ha-icon-button-group>
        ${r?i`<ha-icon-button
                .disabled=${A}
                .label=${e.localize("ui.dialogs.more_info_control.light.toggle")}
                @click=${N=>{N.stopPropagation(),u(C.state==="on"?"turn_off":"turn_on")}}
              >
                <ha-svg-icon .path=${v1}></ha-svg-icon>
              </ha-icon-button>`:n}
        ${t||M?i`<div class="separator"></div>
                <ha-icon-button-toggle
                  .selected=${d==="brightness"}
                  .disabled=${A}
                  .label=${e.formatEntityAttributeName(C,"brightness")}
                  @click=${p("brightness")}
                >
                  <ha-svg-icon .path=${b0}></ha-svg-icon>
                </ha-icon-button-toggle>`:n}
        ${t?i`<ha-icon-button-toggle
                border-only
                .selected=${d==="color"}
                .disabled=${A}
                .label=${e.localize("ui.dialogs.more_info_control.light.color")}
                @click=${p("color")}
              >
                <span class="wheel color"></span>
              </ha-icon-button-toggle>`:n}
        ${M?i`<ha-icon-button-toggle
                border-only
                .selected=${d==="color_temp"}
                .disabled=${A}
                .label=${e.localize("ui.dialogs.more_info_control.light.color_temp")}
                @click=${p("color_temp")}
              >
                <span class="wheel color-temp"></span>
              </ha-icon-button-toggle>`:n}
        ${o?i`<div class="separator"></div>
                <ha-icon-button
                  .disabled=${A}
                  .label=${e.localize("ui.dialogs.more_info_control.light.set_white")}
                  @click=${N=>{N.stopPropagation(),u("turn_on",{white:!0})}}
                >
                  <ha-svg-icon .path=${N0}></ha-svg-icon>
                </ha-icon-button>`:n}
      </ha-icon-button-group>
      ${R?i`<ha-more-info-light-favorite-colors
              .hass=${e}
              .stateObj=${C}
              .entry=${c}
            ></ha-more-info-light-favorite-colors>`:n}
    `}_positionComposite(C){let H=v(C.entity_id);return(H==="cover"||H==="valve")&&(this._config.control??"auto")==="auto"&&KC.includes(this._controlName)}_positionControls(C){let H=this.hass,e=v(C.entity_id),r=e==="cover"?u9(C):x9(C),t=this._positionMode??(r.position||r.tilt?"position":"button"),M=d=>p=>{p.stopPropagation(),this._positionMode=d},o=e==="cover",A=n;return t==="position"?A=i`
        ${r.position?o?i`<ha-state-control-cover-position
                  .hass=${H}
                  .stateObj=${C}
                ></ha-state-control-cover-position>`:i`<ha-state-control-valve-position
                  .hass=${H}
                  .stateObj=${C}
                ></ha-state-control-valve-position>`:n}
        ${r.tilt?i`<ha-state-control-cover-tilt-position
                .hass=${H}
                .stateObj=${C}
              ></ha-state-control-cover-tilt-position>`:n}
      `:r.buttons==="toggle"?A=o?i`<ha-state-control-cover-toggle
            .hass=${H}
            .stateObj=${C}
          ></ha-state-control-cover-toggle>`:i`<ha-state-control-valve-toggle
            .hass=${H}
            .stateObj=${C}
          ></ha-state-control-valve-toggle>`:r.buttons==="buttons"&&(A=o?i`<ha-state-control-cover-buttons
            .hass=${H}
            .stateObj=${C}
          ></ha-state-control-cover-buttons>`:i`<ha-state-control-valve-buttons
            .hass=${H}
            .stateObj=${C}
          ></ha-state-control-valve-buttons>`),i`
      <div class="main-control">${A}</div>
      ${r.switchMode?i`<ha-icon-button-group>
              <ha-icon-button-toggle
                .label=${H.localize(`ui.dialogs.more_info_control.${e}.switch_mode.position`)}
                .selected=${t==="position"}
                .path=${j0}
                @click=${M("position")}
              ></ha-icon-button-toggle>
              <ha-icon-button-toggle
                .label=${H.localize(`ui.dialogs.more_info_control.${e}.switch_mode.button`)}
                .selected=${t==="button"}
                .path=${o7}
                @click=${M("button")}
              ></ha-icon-button-toggle>
            </ha-icon-button-group>`:n}
    `}_favoritePositions(C){return this._loadEntry(),Z9(C,this._entry)?v(C.entity_id)==="cover"?i`<ha-more-info-cover-favorite-positions
          .hass=${this.hass}
          .stateObj=${C}
          .entry=${this._entry}
          .editMode=${!1}
        ></ha-more-info-cover-favorite-positions>`:i`<ha-more-info-valve-favorite-positions
          .hass=${this.hass}
          .stateObj=${C}
          .entry=${this._entry}
          .editMode=${!1}
        ></ha-more-info-valve-favorite-positions>`:n}_statusIcon(C,H){return i`
      <div
        class="status ${H}"
        style=${B({"--state-color":n3(C)})}
      >
        <div class="icon">
          <ha-state-icon
            .hass=${this.hass}
            .stateObj=${C}
          ></ha-state-icon>
        </div>
      </div>
    `}_setOpenState(C,H){clearTimeout(this._openTimeout),this._openState=C,H&&(this._openTimeout=setTimeout(()=>{this._openState="normal"},H*1e3))}_lock(C,H){let e=this.hass;this._loadEntry();let r=t=>{if(t.stopPropagation(),this._openState!=="confirm"){this._setOpenState("confirm",qC);return}d3(this,e,C,this._entry,"open").catch(f3),this._setOpenState("done",YC)};return i`
      ${C.state==="jammed"?this._statusIcon(C,"lock"):H}
      ${k(C,c9)?i`<div class="buttons">
              ${this._openState==="done"?i`<p class="open-done">
                      <ha-svg-icon .path=${p2}></ha-svg-icon>
                      ${e.localize("ui.card.lock.open_door_done")}
                    </p>`:i`<ha-control-button
                      .disabled=${!f9(C)}
                      class="open-button ${this._openState}"
                      style=${B({"--state-color":n3(C)})}
                      @click=${r}
                    >
                      ${this._openState==="confirm"?e.localize("ui.card.lock.open_door_confirm"):e.localize("ui.card.lock.open_door")}
                    </ha-control-button>`}
            </div>`:n}
    `}_siren(C,H){let e=k(C,q2.TONES)&&C.attributes.available_tones||k(C,q2.VOLUME_SET|q2.DURATION);return i`
      ${H}
      ${e?i`<ha-button appearance="plain" size="s" @click=${t=>{t.stopPropagation(),f5(this.shadowRoot,"more-info-siren","_showAdvancedControlsDialog",{stateObj:C})}}>
              ${this.hass.localize("ui.components.siren.more_controls")}
            </ha-button>`:n}
    `}_commandButton(C,H,e,r){return i`<ha-control-button
      .label=${C}
      .disabled=${e}
      @click=${t=>{t.stopPropagation(),r()}}
    >
      <ha-svg-icon .path=${H}></ha-svg-icon>
    </ha-control-button>`}_commands(C){return C.length?i`<div class="buttons">
          <ha-control-button-group class="commands">
            ${C}
          </ha-control-button-group>
        </div>`:n}_vacuumCommands(C){let H=this.hass,e=C.state==="unavailable",r=u=>k(C,u),t=u=>()=>H.callService("vacuum",u,{entity_id:C.entity_id}),M=u=>H.localize(`ui.dialogs.more_info_control.vacuum.${u}`),o=g9(C),A=!r(j.STATE)&&!r(j.START),d=o&&r(j.PAUSE),p=[];return(r(j.START)||r(j.PAUSE))&&p.push(this._commandButton(M(A?"start_pause":d?"pause":"start"),A?e7:d?M5:u2,e,A&&r(j.PAUSE)?t("start_pause"):t(o?"pause":"start"))),r(j.STOP)&&p.push(this._commandButton(M("stop"),b1,e||!_9(C),t("stop"))),r(j.RETURN_HOME)&&p.push(this._commandButton(M("return_home"),t5,e||!O9(C),t("return_to_base"))),r(j.LOCATE)&&p.push(this._commandButton(M("locate"),Y0,e,t("locate"))),r(j.CLEAN_SPOT)&&p.push(this._commandButton(M("clean_spot"),i7,e,t("clean_spot"))),this._commands(p)}_mowerCommands(C){let H=this.hass,e=C.state==="unavailable",r=d=>k(C,d),t=d=>()=>H.callService("lawn_mower",d,{entity_id:C.entity_id}),M=d=>H.localize(`ui.dialogs.more_info_control.lawn_mower.${d}`),o=C.state==="mowing"&&r(f1.PAUSE),A=[];return(r(f1.START_MOWING)||r(f1.PAUSE))&&A.push(this._commandButton(M(o?"pause":"start_mowing"),o?M5:u2,e||!o&&(!r(f1.START_MOWING)||C.state==="mowing"),t(o?"pause":"start_mowing"))),r(f1.STOP)&&A.push(this._commandButton(M("stop"),b1,e||!b9(C),t("stop"))),r(f1.DOCK)&&A.push(this._commandButton(M("dock"),t5,e||!y9(C),t("dock"))),this._commands(A)}_cleanAreas(C){let H=this.hass,e=r=>{r.stopPropagation();let t=!1,M=()=>{t=!0};window.addEventListener("show-child-view",M);let o=f5(this.shadowRoot,"more-info-vacuum","_handleCleanAreas",{stateObj:C,_i18n:{localize:H.localize}});window.removeEventListener("show-child-view",M),(t||!o)&&b(this,"hass-more-info",{entityId:C.entity_id})};return i`
      <ha-more-info-control-select-container>
        <button
          class="clean-areas-button"
          ?disabled=${C.state==="unavailable"}
          @click=${e}
        >
          <div class="icon">
            <ha-svg-icon .path=${a7}></ha-svg-icon>
          </div>
          <div class="content">
            <p class="label">
              ${H.localize("ui.dialogs.more_info_control.vacuum.cleaning")}
            </p>
            <p class="value">
              ${H.localize("ui.dialogs.more_info_control.vacuum.by_area")}
            </p>
          </div>
          <div class="icon"><ha-icon-next></ha-icon-next></div>
        </button>
      </ha-more-info-control-select-container>
    `}_afterControls(C){let H=this._controlName;if(!H)return n;let e=this.hass,r=v(C.entity_id);if(this._positionComposite(C))return this._favoritePositions(C);if(r==="lock"&&H==="lock"&&C.state==="jammed"){let t=M=>o=>{o.stopPropagation(),d3(this,e,C,this._entry,M).catch(f3)};return i`
        <ha-control-button-group class="jammed">
          <ha-control-button @click=${t("unlock")}>
            ${e.localize("ui.card.lock.unlock")}
          </ha-control-button>
          <ha-control-button @click=${t("lock")}>
            ${e.localize("ui.card.lock.lock")}
          </ha-control-button>
        </ha-control-button-group>
      `}return r==="alarm_control_panel"&&H==="alarm_modes"&&A3.includes(C.state)?(this._loadEntry(),i`
        <ha-control-button class="disarm" @click=${M=>{M.stopPropagation(),P9(this,e,C,this._entry).catch(f3)}}>
          ${e.localize("ui.card.alarm_control_panel.disarm")}
        </ha-control-button>
      `):r==="vacuum"&&H==="vacuum_status"&&k(C,j.CLEAN_AREA)?this._cleanAreas(C):n}_battery(C){let H=v(C.entity_id);if(H!=="vacuum"&&H!=="lawn_mower")return n;let e=this.hass,r=w9(e,C.entity_id);if(!r)return n;let{battery:t,charging:M}=r;return i`
      <span class="battery" slot="after-time">
        ${v(t.entity_id)==="binary_sensor"?n:i`<span
                >${Number(t.state).toFixed()}${k9(e)}%</span
              >`}
        <ha-battery-icon
          .hass=${e}
          .batteryStateObj=${t}
          .batteryChargingStateObj=${M}
        ></ha-battery-icon>
      </span>
    `}_moreInfo(C){this._loadEntry();let H=A9(C);return i`
      ${H?i`<state-card-content
              in-dialog
              .hass=${this.hass}
              .stateObj=${C}
            ></state-card-content>`:n}
      <more-info-content
        ?full-height=${!H}
        .hass=${this.hass}
        .stateObj=${C}
        .entry=${this._entry}
        .editMode=${!1}
      ></more-info-content>
    `}_loadEntry(){let C=this._config.entity;this._entryLoaded!==C&&(this._entryLoaded=C,this.hass.callWS({type:"config/entity_registry/get",entity_id:C}).then(H=>{this._entryLoaded===C&&(this._entry=H)},()=>{this._entryLoaded===C&&(this._entry=null)}))}_remoteEntities(C){let H=this.hass,e=C.entity_id;if(v(e)==="remote")return{remote:e,mediaPlayer:W4(H,e)};let r=this._config.remote;return{remote:M2(H,e,r==="none"?"auto":r),mediaPlayer:e}}_remoteControl(C,H){return i`<more-info-popup-remote-control
      .hass=${this.hass}
      .remote=${C}
      .mediaPlayer=${H}
      .haptics=${this._config.haptics!==!1}
      .audioEntity=${this._config.audio_entity}
      .seekColor=${this._config.seek_color??"theme"}
    ></more-info-popup-remote-control>`}_remote(C){let{remote:H,mediaPlayer:e}=this._remoteEntities(C);return!H||!this.hass.states[H]?i`<ha-alert alert-type="info">
        ${x(this.hass,"remote.not_found")}
      </ha-alert>`:this._remoteControl(H,e)}_mediaPlayer(C,H){let e=this.hass,r=M2(e,C.entity_id,this._config.remote);if(!r||!e.states[r])return H;let t=this._remoteView,M=o=>{o!==t&&(this._config.haptics!==!1&&b(window,"haptic","selection"),this._remoteView=o)};return i`
      <div class="remote-views" role="tablist">
        ${["now_playing","remote"].map(o=>i`
            <button
              role="tab"
              class=${w({selected:o===t})}
              aria-selected=${o===t}
              @click=${()=>M(o)}
            >
              <ha-svg-icon
                .path=${o==="remote"?t7:L7}
              ></ha-svg-icon>
              ${x(e,`remote.view.${o}`)}
            </button>
          `)}
      </div>
      ${t==="remote"?this._remoteControl(r,C.entity_id):H}
    `}_fanPowerButton(C){let H=()=>this.hass.callService("fan",C.state==="on"?"turn_off":"turn_on",{entity_id:C.entity_id});return i`
      <div class="buttons">
        <ha-outlined-icon-button
          .disabled=${C.state==="unavailable"}
          @click=${H}
        >
          <ha-svg-icon .path=${v1}></ha-svg-icon>
        </ha-outlined-icon-button>
      </div>
    `}_script(C){let H=this.hass,e=P2(C.entity_id),r=H.services?.script?.[e],t=r?.fields??{},M=Object.keys(t).length>0,o=C.attributes.current||0,A=C.attributes.mode,d=A==="queued",p=A==="parallel",u=d&&o>1,c=this._scriptData.data,h=Object.entries(t).every(([E,$1])=>!$1.required||c?.[E]!==void 0),N=!Object.values(t).some(E=>E.required)||h&&XC(C)||A==="restart",K=E=>{E.stopPropagation(),H.callService("script",e,this._scriptData.data)},z=E=>{E.stopPropagation(),H.callService("script","turn_off",{entity_id:C.entity_id})},L1=E=>{this._scriptData={...this._scriptData,...E.detail.value}};return i`
      <div class="script">
        ${r?.description?i`<ha-markdown
                breaks
                .content=${r.description}
              ></ha-markdown>`:n}
        <div class="queue ${u?"has-queue":""}">
          ${u?H.localize("ui.card.script.running_queued",{queued:o-1}):""}
        </div>
        ${M?i`
                <div class="fields">
                  <div class="title">
                    ${H.localize("ui.card.script.run_script")}
                  </div>
                  <ha-service-control
                    hide-picker
                    hide-description
                    .hass=${H}
                    .value=${this._scriptData}
                    .narrow=${window.matchMedia("(max-width: 870px)").matches}
                    @value-changed=${L1}
                  ></ha-service-control>
                </div>
              `:n}
        <ha-control-button-group>
          <ha-control-button
            class="cancel-button"
            .disabled=${!o}
            @click=${z}
          >
            <ha-svg-icon .path=${b1}></ha-svg-icon>
            ${(d||p)&&o>1?H.localize("ui.card.script.cancel_all"):H.localize("ui.card.script.cancel")}
          </ha-control-button>
          <ha-control-button
            class="run-button"
            .disabled=${C.state==="unavailable"||!N}
            @click=${K}
          >
            <ha-svg-icon .path=${u2}></ha-svg-icon>
            ${this._config.state_override||H.localize("ui.card.script.run")}
          </ha-control-button>
        </ha-control-button-group>
      </div>
    `}_press(C){let H=v(C.entity_id),e=r=>{r.stopPropagation(),this.hass.callService(H==="input_button"?H:"button","press",{entity_id:C.entity_id})};return i`
      <ha-control-button-group class="press">
        <ha-control-button
          .disabled=${C.state==="unavailable"}
          @click=${e}
        >
          <ha-svg-icon .path=${z0}></ha-svg-icon>
          ${this._config.state_override||this.hass.localize("ui.card.button.press")}
        </ha-control-button>
      </ha-control-button-group>
    `}_header(C){let H=this._config;if(!this._showState)return n;let e=H.state_override||JC(this.hass,C);return H.show_last_changed===!1?i`<p class="state">
        ${e??this.hass.formatEntityState(C)}
      </p>`:i`
      <ha-more-info-state-header
        .hass=${this.hass}
        .stateObj=${C}
        .stateOverride=${e}
        .changedOverride=${["script","automation"].includes(v(C.entity_id))?C.attributes.last_triggered||0:void 0}
      >
        ${this._battery(C)}
      </ha-more-info-state-header>
    `}render(){if(!this._config||!this.hass)return n;let C=this._stateObj,H=this._config.appearance??"plain";return C?i`
      <ha-card
        class=${H}
        .label=${G(C)}
        style=${B(v4(C,this._config.color,this._config.color_off))}
      >
        ${this._ready?i`
                ${this._header(C)}
                <div
                  class="controls ${this._controlName==="more_info"?"more-info":""}"
                >
                  ${this._control(C)}
                </div>
                ${this._afterControls(C)}
              `:n}
      </ha-card>
    `:i`<ha-card class=${H}>
        <ha-alert alert-type="warning">
          ${this.hass.localize("ui.panel.lovelace.warning.entity_not_found",{entity:this._config.entity})}
        </ha-alert>
      </ha-card>`}};_=I(s6),g3=new WeakMap,_3=new WeakMap,O3=new WeakMap,b3=new WeakMap,y3=new WeakMap,w3=new WeakMap,k3=new WeakMap,T3=new WeakMap,P3=new WeakMap,E3=new WeakMap,l(_,4,"hass",l6,Q,g3),l(_,4,"_config",p6,Q,_3),l(_,4,"_ready",d6,Q,O3),l(_,4,"_scriptData",A6,Q,b3),l(_,4,"_lightControl",n6,Q,y3),l(_,4,"_entry",a6,Q,w3),l(_,4,"_positionMode",i6,Q,k3),l(_,4,"_openState",o6,Q,T3),l(_,4,"_remoteView",M6,Q,P3),l(_,4,"_iconPaths",t6,Q,E3),F(_,Q),m(Q,"styles",[J2,O`
      :host {
        display: flex;
        flex-direction: column;
        min-height: var(--popup-min-height, auto);
      }
      ha-card {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      /* Spacing between the main control and the next block in more-info. */
      ha-card.plain {
        padding-bottom: var(--ha-space-4);
      }
      ha-card.card {
        padding: var(--ha-space-6) var(--ha-space-4);
      }
      /* more-info-control-style.ts */
      .controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
      }
      /* The native content lays itself out (more-info-content). */
      .controls.more-info {
        align-items: stretch;
        justify-content: flex-start;
      }
      more-info-content {
        position: relative;
        display: flex;
        flex-direction: column;
      }
      more-info-content[full-height] {
        flex: 1;
      }
      /* ha-more-info-info.ts */
      .controls.more-info > state-card-content {
        display: block;
        margin-bottom: var(--ha-space-4);
      }
      .controls > *:not(:last-child) {
        margin-bottom: var(--ha-space-6);
      }
      .controls:not(:last-child) {
        margin-bottom: var(--ha-space-6);
      }
      /* more-info-cover.ts / more-info-valve.ts */
      .main-control {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .main-control > * {
        margin: 0 var(--ha-space-2);
      }
      /* more-info-lock.ts */
      .open-button,
      ha-control-button-group.jammed ha-control-button {
        font-size: var(--ha-font-size-m);
        height: 60px;
        --control-button-border-radius: var(--ha-border-radius-3xl);
      }
      .open-button {
        width: 130px;
        --control-button-background-color: var(--state-color);
      }
      .open-button.confirm {
        --control-button-background-color: var(--warning-color);
      }
      .open-done {
        line-height: 60px;
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: var(--ha-space-2);
        font-weight: var(--ha-font-weight-medium);
        color: var(--success-color);
        margin: 0;
      }
      ha-control-button-group.jammed {
        --control-button-group-thickness: 60px;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
      }
      /* Jammed lock / triggered alarm (more-info-lock, -alarm_control_panel) */
      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .status {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .status.lock {
        justify-content: center;
        height: 45vh;
        max-height: 320px;
        min-height: 200px;
      }
      .status .icon {
        position: relative;
        --mdc-icon-size: 80px;
        animation: pulse 1s infinite;
        color: var(--state-color);
        border-radius: var(--ha-border-radius-circle);
        width: 144px;
        height: 144px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .status .icon::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: var(--ha-border-radius-circle);
        background-color: var(--state-color);
        transition: background-color 180ms ease-in-out;
        opacity: 0.2;
      }
      ha-control-button.disarm {
        height: 60px;
        min-width: 130px;
        max-width: 200px;
        margin: 0 auto;
        --control-button-border-radius: var(--ha-border-radius-3xl);
      }
      /* more-info-vacuum.ts / more-info-lawn_mower.ts */
      .battery {
        display: inline-flex;
        align-items: center;
        gap: var(--ha-space-1);
        font-size: var(--ha-font-size-m);
        color: var(--secondary-text-color);
        --mdc-icon-size: 18px;
      }
      .battery span {
        height: var(--mdc-icon-size);
        line-height: var(--mdc-icon-size);
      }
      ha-control-button-group.commands {
        --control-button-group-thickness: 48px;
        justify-content: center;
      }
      ha-control-button-group.commands ha-control-button {
        flex: 0 0 auto;
        width: var(--control-button-group-thickness);
        --control-button-border-radius: var(--ha-border-radius-lg);
      }
      .commands ha-control-button ha-svg-icon {
        z-index: auto;
        margin-right: 0;
      }
      .clean-areas-button {
        --mdc-icon-size: 20px;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        width: auto;
        max-width: 100%;
        height: 48px;
        padding: 6px 10px;
        border: none;
        border-radius: var(--ha-border-radius-lg);
        background: none;
        color: var(--primary-text-color);
        font-family: inherit;
        font-size: var(--ha-font-size-m);
        font-weight: var(--ha-font-weight-normal);
        line-height: 1.4;
        letter-spacing: 0.25px;
        text-align: left;
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        z-index: 0;
        transition: box-shadow 180ms ease-in-out;
      }
      .clean-areas-button::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--disabled-color);
        opacity: 0.2;
        transition:
          background-color 180ms ease-in-out,
          opacity 180ms ease-in-out;
      }
      .clean-areas-button:hover::before {
        background-color: var(--ha-color-on-neutral-quiet);
      }
      .clean-areas-button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--secondary-text-color);
      }
      .clean-areas-button[disabled] {
        cursor: not-allowed;
        color: var(--disabled-color);
      }
      .clean-areas-button .icon {
        display: flex;
        --mdc-icon-size: 20px;
      }
      .clean-areas-button .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }
      .clean-areas-button .content p {
        margin: 0;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .clean-areas-button .label {
        font-size: var(--ha-font-size-s);
        letter-spacing: 0.4px;
      }
      .clean-areas-button .value {
        font-size: var(--ha-font-size-m);
      }
      /* ha-more-info-state-header .state */
      /* more-info-control-style.ts .buttons (fan power button) */
      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--ha-space-3);
      }
      .buttons > * {
        margin: var(--ha-space-2);
      }
      /* more-info-light.ts */
      .wheel {
        width: 28px;
        height: 28px;
        flex: none;
        border-radius: var(--ha-border-radius-circle);
      }
      .wheel.color {
        background-image: url("/static/images/color_wheel.png");
        background-size: cover;
      }
      .wheel.color-temp {
        background: linear-gradient(
          0,
          rgb(166, 209, 255) 0%,
          white 50%,
          rgb(255, 160, 0) 100%
        );
      }
      *[disabled] .wheel {
        filter: grayscale(1) opacity(0.5);
      }
      /* The media player draws its own full-width layout. */
      more-info-media_player {
        align-self: stretch;
      }
      /* Now playing / Remote switch of a media player with a remote. */
      .controls > .remote-views {
        align-self: stretch;
        display: flex;
        gap: 2px;
        padding: 3px;
        margin-bottom: var(--ha-space-4);
        border-radius: var(--ha-border-radius-pill, 9999px);
        position: relative;
        isolation: isolate;
      }
      .remote-views::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;
        background: var(--disabled-color);
        opacity: 0.2;
      }
      .remote-views button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--ha-space-2);
        height: 36px;
        padding: 0 var(--ha-space-3);
        border: none;
        border-radius: inherit;
        background: none;
        color: var(--secondary-text-color);
        font: inherit;
        font-size: var(--ha-font-size-m, 14px);
        font-weight: var(--ha-font-weight-medium, 500);
        cursor: pointer;
        outline: none;
        --mdc-icon-size: 18px;
        transition:
          background-color 180ms ease-in-out,
          color 180ms ease-in-out;
      }
      .remote-views button.selected {
        background: var(
          --card-background-color,
          var(--ha-color-surface-default)
        );
        color: var(--primary-text-color);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      }
      .remote-views button:focus-visible {
        box-shadow: 0 0 0 2px var(--primary-color);
      }
      /* more-info-script.ts */
      .script {
        align-self: stretch;
        display: flex;
        flex-direction: column;
      }
      .script .queue {
        visibility: hidden;
        color: var(--secondary-text-color);
        text-align: center;
        margin-bottom: var(--ha-space-4);
        height: 21px;
      }
      .script .queue.has-queue {
        visibility: visible;
      }
      .script .fields {
        padding: var(--ha-space-4);
        border: 1px solid var(--divider-color);
        border-radius: var(--ha-border-radius-md);
        margin-bottom: var(--ha-space-4);
      }
      .script .fields .title {
        font-weight: var(--ha-font-weight-bold);
      }
      ha-control-button ha-svg-icon {
        z-index: -1;
        margin-right: var(--ha-space-1);
      }
      ha-control-button-group.press {
        align-self: stretch;
      }
      ha-service-control {
        --service-control-padding: 0;
        --service-control-items-border-top: none;
      }
      .script ha-markdown {
        text-align: center;
        padding: 0 var(--ha-space-4);
      }
      p.state {
        text-align: center;
        margin: 0 0 var(--ha-space-5);
        font-weight: var(--ha-font-weight-normal);
        font-size: 36px;
        line-height: var(--ha-line-height-condensed);
      }
    `]);customElements.get(i2)||customElements.define(i2,Q);var m6=L=>L.uix??L.card_mod,B3=async(L,V,C,H,e)=>{let r=customElements.get("uix-node");if(r?.applyToElement)try{await r.applyToElement(L,V,C,H,!1,e)}catch(t){console.warn("[more-info-popup-card] UIX styling failed",t)}};var c6="var(--ha-bottom-sheet-border-radius, var(--ha-dialog-border-radius, var(--ha-border-radius-2xl)))",CH=`
  wa-drawer::part(body) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: ${c6};
    border-bottom-right-radius: ${c6};
  }
  .handle-wrapper {
    display: none;
  }
`,v6=new WeakSet,u6=async L=>{if(v6.has(L))return!0;await L.updateComplete;let V=L.shadowRoot?.querySelector("wa-drawer");if(!V)return!1;V.placement="top";let C=new CSSStyleSheet;C.replaceSync(CH);let H=L.shadowRoot;return H.adoptedStyleSheets=[...H.adoptedStyleSheets,C],v6.add(L),!0},x6=L=>L.stopPropagation(),Z6=(L,V,C)=>{if(L.stopPropagation(),V.hasAttribute("prevent-scrim-close"))return;let H=L.touches[0].clientY,e=L.timeStamp,r=0,t=o=>{r=Math.min(0,o.touches[0].clientY-H),r<0&&o.preventDefault(),V.style.setProperty("--dialog-transform",`translateY(${r}px)`)},M=o=>{document.removeEventListener("touchmove",t),document.removeEventListener("touchend",M),document.removeEventListener("touchcancel",M);let A=V.shadowRoot?.querySelector("wa-drawer")?.shadowRoot?.querySelector('[part="body"]')?.offsetHeight??0,d=r/Math.max(1,o.timeStamp-e);if(r<0&&(d<-.5||-r>A*.25)){C(),setTimeout(()=>V.style.removeProperty("--dialog-transform"),300);return}V.style.setProperty("--dialog-transition","transform 300ms ease-out"),V.style.removeProperty("--dialog-transform"),setTimeout(()=>V.style.removeProperty("--dialog-transition"),300)};document.addEventListener("touchmove",t,{passive:!1}),document.addEventListener("touchend",M),document.addEventListener("touchcancel",M)};var HH=24,VH=4,h6=["pointerdown","keydown","wheel","touchstart"],LH=L=>{let V=document;V.startViewTransition&&!matchMedia("(prefers-reduced-motion: reduce)").matches?V.startViewTransition(L):L()},S6,f6,g6,_6,O6,b6,y6,w6,k6,T6,P6,E6,B6,f,R3,F3,$3,D3,N3,I3,z3,W3,U3,G3,Q3,K3,W=class extends(B6=P,E6=[g({attribute:!1})],P6=[g({type:Boolean,reflect:!0,attribute:"fixed-top"})],T6=[Z()],k6=[Z()],w6=[Z()],y6=[Z()],b6=[Z()],O6=[Z()],_6=[Z()],g6=[Z()],f6=[Z()],S6=[Z()],B6){constructor(){super(...arguments);s(this,R3,a(f,8,this)),a(f,11,this);s(this,F3,a(f,12,this,!0)),a(f,15,this);s(this,$3,a(f,16,this)),a(f,19,this);s(this,D3,a(f,20,this,!1)),a(f,23,this);s(this,N3,a(f,24,this,[])),a(f,27,this);s(this,I3,a(f,28,this,{})),a(f,31,this);s(this,z3,a(f,32,this,!1)),a(f,35,this);s(this,W3,a(f,36,this,!0)),a(f,39,this);s(this,U3,a(f,40,this,!1)),a(f,43,this);s(this,G3,a(f,44,this,!1)),a(f,47,this);s(this,Q3,a(f,48,this,!1)),a(f,51,this);m(this,"_zones");m(this,"_sections",new Map);m(this,"_keepAlive",new Map);m(this,"_childViews",new WeakMap);m(this,"_childHeaders",new WeakMap);m(this,"_autoCloseTimer");m(this,"_resizeObserver");m(this,"_fillCards",new Set);m(this,"_enableEscape",()=>{this._escapeEnabled=!0});m(this,"_disableEscape",()=>{this._escapeEnabled=!1});m(this,"_closeFromEvent",C=>{C.stopPropagation(),this.closeDialog()});m(this,"_goBackFromEvent",()=>this._goBack());m(this,"_observedContent");s(this,K3,a(f,52,this,!1)),a(f,55,this);m(this,"_topSheet");m(this,"_topSwipe",C=>{let H=this.renderRoot.querySelector("ha-bottom-sheet");H&&Z6(C,H,()=>this.closeDialog())});m(this,"_uixKey");m(this,"_uixSurface");m(this,"_goBack",()=>{let C=this._frame;if(C){if(C.children.length){this._replaceTop({...C,children:C.children.slice(0,-1)}),this._detailsYaml=!1;return}this._stack.length>1&&(this._detailsYaml=!1,this._stack=this._stack.slice(0,-1))}});m(this,"_enlarge",()=>{LH(()=>{this._fill=!this._fill})});m(this,"_breadcrumbClick",C=>{C.stopPropagation(),this._setView("related")});m(this,"_armAutoClose",()=>{this._clearAutoClose(!1);let C=this._config?.auto_close??0;if(!(C<=0)){for(let H of h6)this.addEventListener(H,this._armAutoClose,{passive:!0});this._autoCloseTimer=setTimeout(()=>this.closeDialog(),C*1e3)}});m(this,"_registerFillCard",C=>{C.stopPropagation(),this._fillCards.add(C.composedPath()[0]),this._updateFill()});m(this,"_updateScrollState",()=>{let C=this._observedContent;C&&(this._contentScrolled=C.scrollTop>HH,this._contentScrollable=C.scrollHeight-C.scrollTop-C.clientHeight>VH)})}get _config(){return this._params?.config}get _frame(){return this._stack[this._stack.length-1]}showDialog(C){let{config:H,view:e}=C;this._params=C,this._stack=[{entityId:H.entity,view:"root",children:[]}],e&&H.entity&&this._canShowView(e)&&(this._stack=[...this._stack,{entityId:H.entity,view:e,children:[]}]),this._fill=!1,this._detailsYaml=!1,this._escapeEnabled=!0,this._syncZones(H),this._open=!0,H.entity&&this._loadEntry(H.entity),k5({popupId:H.popup_id,close:()=>this.closeDialog()}),this._armAutoClose()}closeDialog(){return this._open=!1,!0}_dialogClosed(C){if(C.target!==C.currentTarget)return;let H=this._config;H&&!H.keep_alive&&(this._zones=void 0,this._sections=new Map),this._params=void 0,this._stack=[],this._entries={},this._fill=!1,this._detailsYaml=!1,this._contentScrolled=!1,this._contentScrollable=!1,this._clearAutoClose(),this._uixKey=void 0,this._uixSurface=void 0,window.removeEventListener("dialog-closed",this._enableEscape),window.removeEventListener("show-dialog",this._disableEscape),k5(void 0),b(this,"dialog-closed",{dialog:this.localName})}_dialogOpened(C){C.target===C.currentTarget&&(window.addEventListener("dialog-closed",this._enableEscape),window.addEventListener("show-dialog",this._disableEscape))}connectedCallback(){super.connectedCallback(),this.addEventListener("close-dialog",this._closeFromEvent),this.addEventListener("close-child-view",this._goBackFromEvent),this.addEventListener(C5,this._registerFillCard)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("close-dialog",this._closeFromEvent),this.removeEventListener("close-child-view",this._goBackFromEvent),this.removeEventListener(C5,this._registerFillCard),this._resizeObserver?.disconnect(),this._clearAutoClose()}willUpdate(C){C.has("hass")&&this._zones&&(this._zones.hass=this.hass)}updated(C){super.updated(C);let H=this.renderRoot.querySelector(".body.zones .zone-main")??this.renderRoot.querySelector(".content");H&&H!==this._observedContent&&(this._observedContent=H,this._resizeObserver??=new ResizeObserver(()=>{this._updateFill(),this._updateScrollState()}),this._resizeObserver.disconnect(),this._resizeObserver.observe(H),H.firstElementChild&&this._resizeObserver.observe(H.firstElementChild),this._updateFill(),this._updateScrollState()),this._applyUix(),this._prepareTopSheet()}async _prepareTopSheet(){if(this._config?.mode!=="top_sheet")return;let C=this.renderRoot.querySelector("ha-bottom-sheet");!C||C===this._topSheet||(this._topSheet=C,this._topSheetReady=!1,C.querySelectorAll(":scope > *").forEach(H=>{H.addEventListener("touchstart",x6)}),this._topSheetReady=await u6(C))}_applyUix(){let C=this._config,H=this.renderRoot.querySelector("ha-adaptive-dialog, ha-dialog, ha-bottom-sheet");if(!C||!H)return;let e=m6(C),r=`${H.localName}:${C.popup_id}:${JSON.stringify(e??null)}`;if(r===this._uixKey&&H===this._uixSurface)return;this._uixKey=r,this._uixSurface=H;let t={config:C,params:{popup_id:C.popup_id}};B3(H,"more-info",void 0,t,"type-more-info-popup"),B3(H,"more-info-popup",e,t,"type-more-info-popup")}_syncZones(C){let H=`${C.popup_id}:${C.entity??""}`,e=C.keep_alive?this._keepAlive.get(H):void 0;e||(e=new T1,C.keep_alive&&this._keepAlive.set(H,e)),this._zones=e,this._sections=e.update(C,this.hass)}async _loadEntry(C){if(C in this._entries)return;let H;try{H=await this.hass.callWS({type:"config/entity_registry/get",entity_id:C})}catch{H=null}this._entries={...this._entries,[C]:H}}_canShowView(C){return C2(C4[C])}_pushFrame(C){if(C.view!=="root"&&!this._canShowView(C.view)){b(this,"hass-more-info",{entityId:C.entityId??null,view:C.view});return}C.entityId&&this._loadEntry(C.entityId),this._detailsYaml=!1,this._stack=[...this._stack,C]}_setView(C){let H=this._frame;H&&this._pushFrame({entityId:H.entityId,view:C,children:[]})}_replaceTop(C){this._stack=[...this._stack.slice(0,-1),C]}_showChildView(C){C.stopPropagation();let H=this._frame;if(!H)return;let e=C.detail;e.viewImport?.(),e.viewHeaderImport?.(),this._replaceTop({...H,children:[...H.children,e]})}_handleMoreInfo(C){if(this._config?.nested_more_info==="dialog")return;C.stopPropagation();let{entityId:H}=C.detail;if(!H)return;let e=C.detail.view??C.detail.tab??"info",r=this._frame;if(r&&r.entityId===H&&r.view!=="root"){r.view!==e&&this._setView(e);return}this._pushFrame({entityId:H,view:e==="details"?e:"info",children:[]})}_entryUpdated(C){let H=C.detail;H?.entity_id&&(this._entries={...this._entries,[H.entity_id]:H})}_handleMenu(C){let e=this._frame?.entityId;if(!e)return;let r=C.detail?.item?.value;switch(r){case"info":case"related":case"details":case"add_to":this._setView(r);break;case"device":{let t=h5(this.hass,e);t&&y5(this,`/config/devices/device/${t}`);break}case"edit":{let t=this.hass.states[e],M=t&&q7(t,this._entries[e]?.unique_id);M&&y5(this,M);break}default:break}}_clearAutoClose(C=!0){if(clearTimeout(this._autoCloseTimer),this._autoCloseTimer=void 0,C)for(let H of h6)this.removeEventListener(H,this._armAutoClose)}_updateFill(){for(let t of this._fillCards)t.isConnected||this._fillCards.delete(t);let[C,...H]=this._fillCards;for(let t of H)t.popupFill=0;if(!C)return;if(this._config?.layout==="zones"){C.popupFill=0;return}C.popupFill=0;let e=this._observedContent,r=e?.firstElementChild;!e||!r||this._frame?.view!=="root"||(C.popupFill=Math.floor(e.clientHeight-r.offsetHeight))}render(){let C=this._config,H=this._frame;if(!C||!H||!this.hass)return n;let e=!C.dismissable||H.view==="settings"||!this._escapeEnabled,r=B(D7(C)),t=this._renderContent(H);if(C.mode==="bottom_sheet"||C.mode==="top_sheet"){let d=C.mode==="top_sheet";return b5(C.mode,i`
          <ha-bottom-sheet
            class=${w({top:d})}
            style=${r}
            .open=${this._open&&(!d||this._topSheetReady)}
            .preventScrimClose=${e}
            flexcontent
            @opened=${this._dialogOpened}
            @closed=${this._dialogClosed}
            @show-child-view=${this._showChildView}
          >
            <ha-dialog-header
              slot="header"
              @touchstart=${d?this._topSwipe:n}
            >
              ${this._renderNavigation(H,"navigationIcon")}
              ${this._renderTitle(C,H,"title")}
              ${this._renderActions(C,H,"actionItems")}
            </ha-dialog-header>
            ${t}
            ${d?i`<div
                    slot="footer"
                    class="top-sheet-handle"
                    aria-hidden="true"
                    @touchstart=${this._topSwipe}
                  ></div>`:n}
          </ha-bottom-sheet>
        `)}let M=C.mode==="dialog"?"ha-dialog":"ha-adaptive-dialog",o=this._fill?"full":x5(C),A=i`
      ${this._renderNavigation(H,"headerNavigationIcon")}
      ${this._renderTitle(C,H,"headerTitle")}
      ${this._renderActions(C,H,"headerActionItems")} ${t}
    `;return M==="ha-dialog"?i`
          <ha-dialog
            style=${r}
            .open=${this._open}
            .width=${o}
            .preventScrimClose=${e}
            flexcontent
            @opened=${this._dialogOpened}
            @closed=${this._dialogClosed}
            @show-child-view=${this._showChildView}
          >
            ${A}
          </ha-dialog>
        `:i`
          <ha-adaptive-dialog
            style=${r}
            .open=${this._open}
            .width=${o}
            .preventScrimClose=${e}
            flexcontent
            @opened=${this._dialogOpened}
            @closed=${this._dialogClosed}
            @show-child-view=${this._showChildView}
          >
            ${A}
          </ha-adaptive-dialog>
        `}_isDefaultView(C){return(C.view==="root"||C.view==="info")&&!C.children.length}_renderNavigation(C,H){return this._stack.length===1&&!C.children.length?i`
          <ha-icon-button
            slot=${H}
            .label=${this.hass.localize("ui.common.close")}
            .path=${l2}
            @click=${this.closeDialog}
          ></ha-icon-button>
        `:i`
          <ha-icon-button-prev
            slot=${H}
            .label=${this.hass.localize("ui.dialogs.more_info_control.back_to_info")}
            @click=${this._goBack}
          ></ha-icon-button-prev>
        `}_renderTitle(C,H,e){let r=N2(this.hass,C,H);return I2(this.hass,r,e,C.mode==="bottom_sheet"||C.mode==="top_sheet"?void 0:this._enlarge,this._breadcrumbClick)}_renderActions(C,H,e){let r=H.entityId,t=H.view==="root";if(!r)return n;if(!this._isDefaultView(H)){if(H.view==="details"&&!H.children.length)return i`
          <ha-icon-button
            slot=${e}
            .label=${this.hass.localize("ui.dialogs.more_info_control.toggle_yaml_mode")}
            .path=${s2}
            @click=${()=>{this._detailsYaml=!this._detailsYaml}}
          ></ha-icon-button>
        `;let h=H.children[H.children.length-1];if(h?.viewHeaderTag){let R=this._childElement(h,h.viewHeaderTag,"header");return R.slot=e,Object.assign(R,{hass:this.hass,params:h.viewParams}),R}return n}if(t&&!C.show_header_actions)return n;let M=this.hass,o=X1(M),A=G7(M,r,!t)?i`
          <ha-icon-button
            slot=${e}
            .label=${M.localize("ui.dialogs.more_info_control.history")}
            .path=${y0}
            @click=${()=>this._setView("history")}
          ></ha-icon-button>
        `:n;if(!o)return i`
        ${A}
        ${Z5(M)?i`
                <ha-icon-button
                  slot=${e}
                  .label=${M.localize("ui.dialogs.more_info_control.add_to.item")}
                  .path=${o5}
                  @click=${()=>this._setView("add_to")}
                ></ha-icon-button>
              `:n}
      `;let d=M.states[r],p=h5(M,r),u=Q7(M,p),c=v(r);return i`
      ${A}
      <ha-icon-button
        slot=${e}
        .label=${M.localize("ui.dialogs.more_info_control.settings")}
        .path=${m2}
        @click=${()=>this._setView("settings")}
      ></ha-icon-button>
      <ha-dropdown
        slot=${e}
        placement="bottom-end"
        @closed=${h=>h.stopPropagation()}
        @opened=${h=>h.stopPropagation()}
        @wa-select=${this._handleMenu}
      >
        <ha-icon-button
          slot="trigger"
          .label=${M.localize("ui.common.menu")}
          .path=${R0}
        ></ha-icon-button>
        ${t?i`
                <ha-dropdown-item value="info">
                  <ha-svg-icon
                    slot="icon"
                    .path=${y1}
                  ></ha-svg-icon>
                  ${x(M,"dialog.entity_controls")}
                </ha-dropdown-item>
                <wa-divider></wa-divider>
              `:n}
        ${Z5(M)?i`
                <ha-dropdown-item value="add_to">
                  <ha-svg-icon
                    slot="icon"
                    .path=${o5}
                  ></ha-svg-icon>
                  ${M.localize("ui.dialogs.more_info_control.add_to.item")}
                </ha-dropdown-item>
                <wa-divider></wa-divider>
              `:n}
        ${p?i`
                <ha-dropdown-item value="device">
                  <ha-svg-icon
                    slot="icon"
                    .path=${u==="service"?A7:B0}
                  ></ha-svg-icon>
                  ${M.localize("ui.dialogs.more_info_control.device_or_service_info",{type:M.localize(`ui.dialogs.more_info_control.device_type.${u}`)})}
                </ha-dropdown-item>
              `:n}
        ${K7(d)?i`
                <ha-dropdown-item value="edit">
                  <ha-svg-icon
                    slot="icon"
                    .path=${V7}
                  ></ha-svg-icon>
                  ${M.localize(`ui.dialogs.more_info_control.edit_domain.${c}`)||M.localize("ui.dialogs.more_info_control.edit")}
                </ha-dropdown-item>
              `:n}
        <ha-dropdown-item value="related">
          <ha-svg-icon slot="icon" .path=${Q0}></ha-svg-icon>
          ${M.localize("ui.dialogs.more_info_control.related")}
        </ha-dropdown-item>
        <ha-dropdown-item value="details">
          <ha-svg-icon slot="icon" .path=${W0}></ha-svg-icon>
          ${M.localize("ui.dialogs.more_info_control.details")}
        </ha-dropdown-item>
      </ha-dropdown>
    `}_childElement(C,H,e){let r=e==="view"?this._childViews:this._childHeaders,t=r.get(C);return t||(t=document.createElement(H),r.set(C,t)),t}_renderContent(C){let H=`${this._stack.length}:${C.entityId??""}:${C.view}`,e=C.view==="root"&&!C.children.length&&this._config?.layout==="zones";return i`
      <div
        class=${w({"content-wrapper":!0,"settings-view":C.view==="settings"})}
      >
        ${b5(H,i`
            <div
              class="content ha-scrollbar"
              tabindex="-1"
              @scroll=${this._updateScrollState}
              @hass-more-info=${this._handleMoreInfo}
              @entity-entry-updated=${this._entryUpdated}
            >
              ${this._renderFrame(C)}
            </div>
          `)}
        <div
          class=${w({"fade-top":!0,visible:this._contentScrolled&&!e})}
        ></div>
        <div
          class=${w({"fade-bottom":!0,visible:this._contentScrollable&&!e})}
        ></div>
      </div>
    `}_renderChild(C){let H=C.children[C.children.length-1];if(!H)return n;let e=this._childElement(H,H.viewTag,"view");return Object.assign(e,{hass:this.hass,entry:C.entityId?this._entries[C.entityId]:void 0,params:H.viewParams}),i`<div class="child-view">${e}</div>`}_renderFrame(C){let H=this.hass,e=C.entityId,r=e?this._entries[e]:void 0;if(C.view==="root")return i`
        ${R2(this._config,this._sections,{hidden:C.children.length>0,onScroll:this._updateScrollState,fadeTop:this._contentScrolled,fadeBottom:this._contentScrollable})}
        ${this._renderChild(C)}
      `;if(!e)return n;if(C.view==="settings")return i`
        <div ?hidden=${C.children.length>0}>
          <ha-more-info-settings
            .hass=${H}
            .entityId=${e}
            .entry=${r}
          ></ha-more-info-settings>
        </div>
        ${this._renderChild(C)}
      `;if(C.children.length)return this._renderChild(C);switch(C.view){case"info":return i`
          <ha-more-info-info
            .hass=${H}
            .entityId=${e}
            .entry=${r}
            .editMode=${!1}
          ></ha-more-info-info>
        `;case"history":return i`
          <ha-more-info-history-and-logbook
            .hass=${H}
            .entityId=${e}
          ></ha-more-info-history-and-logbook>
        `;case"related":return i`
          <ha-more-info-related
            .hass=${H}
            .entry=${r}
            .params=${{entityId:e}}
          ></ha-more-info-related>
        `;case"add_to":return i`
          <ha-more-info-add-to
            .entityId=${e}
            @add-to-action-selected=${this._goBack}
          ></ha-more-info-add-to>
        `;case"details":return i`
          <ha-more-info-details
            .hass=${H}
            .entry=${r}
            .params=${{entityId:e}}
            .yamlMode=${this._detailsYaml}
          ></ha-more-info-details>
        `;default:return n}}};f=I(B6),R3=new WeakMap,F3=new WeakMap,$3=new WeakMap,D3=new WeakMap,N3=new WeakMap,I3=new WeakMap,z3=new WeakMap,W3=new WeakMap,U3=new WeakMap,G3=new WeakMap,Q3=new WeakMap,K3=new WeakMap,l(f,4,"hass",E6,W,R3),l(f,4,"fixedTop",P6,W,F3),l(f,4,"_params",T6,W,$3),l(f,4,"_open",k6,W,D3),l(f,4,"_stack",w6,W,N3),l(f,4,"_entries",y6,W,I3),l(f,4,"_fill",b6,W,z3),l(f,4,"_escapeEnabled",O6,W,W3),l(f,4,"_detailsYaml",_6,W,U3),l(f,4,"_contentScrolled",g6,W,G3),l(f,4,"_contentScrollable",f6,W,Q3),l(f,4,"_topSheetReady",S6,W,K3),F(f,W),m(W,"styles",[n4,A4,d4,p4,$2,D2,F2,O`
      [hidden] {
        display: none !important;
      }
      /* vertical_align: the body fills the free space of a taller popup. */
      .content:has(> .body:is(.align-center, .align-bottom):not([hidden])) {
        display: flex;
        flex-direction: column;
      }
      .body.align-center,
      .body.align-bottom {
        flex: 1 0 auto;
      }
      .body.align-center {
        justify-content: center;
      }
      .body.align-bottom {
        justify-content: flex-end;
      }
      /* layout: zones. The main zone takes the free height; the header and
         footer stay pinned while it scrolls between them. */
      .content:has(> .body.zones:not([hidden])) {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .body.zones {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      /* top-sheet.ts: the safe area moves to the top edge. */
      ha-bottom-sheet.top {
        --ha-bottom-sheet-padding: var(--safe-area-inset-top)
          var(--safe-area-inset-right) 0 var(--safe-area-inset-left);
        --ha-bottom-sheet-content-padding: 0;
      }
      /* The drag handle of ha-bottom-sheet, at the bottom edge. */
      .top-sheet-handle {
        display: flex;
        justify-content: center;
        padding: var(--ha-space-2) 0 var(--ha-space-3);
        cursor: grab;
        touch-action: none;
      }
      .top-sheet-handle::after {
        content: "";
        width: 40px;
        height: 4px;
        border-radius: var(--ha-border-radius-md);
        background: var(--ha-bottom-sheet-handle-color, var(--divider-color));
      }
    `]);customElements.get(i1)||customElements.define(i1,W);var R6=L=>{if(!(!L||L.length<2))try{return decodeURIComponent(L.slice(1))}catch{return}},eH=L=>`${L.pathname}${L.search}`,a2=L=>{L.history.replaceState(L.history.state,"",eH(L.location))},F6=(L,V=500)=>new Promise(C=>{let H=!1,e=()=>{H||(H=!0,L.removeEventListener("popstate",r),clearTimeout(t),L.location.hash&&a2(L),C())},r=()=>e(),t=setTimeout(e,V);L.addEventListener("popstate",r),L.history.back()});var $6="this",rH=new Set(["entity","entity_id"]),tH=new Set(["entities","entity_id"]),MH=100,oH=10,D6=new Map,iH=L=>{let V=D6.get(L);if(!V){let C=L.split("").map(H=>H==="*"?".*":H==="?"?".":H.replace(/[.+^${}()|[\]\\]/g,"\\$&")).join("");V=new RegExp(`^${C}$`),D6.set(L,V)}return V},Y3=(L,V,C)=>{if(!L.replace_more_info)return-1;if(L.entity===V)return MH;let H=L.match;if(!H)return-1;if(H.entities?.includes(V))return oH;let e=[H.integration===void 0||C?.entities?.[V]?.platform===H.integration,H.domain===void 0||V.split(".")[0]===H.domain,H.entity_glob===void 0||iH(H.entity_glob).test(V)],r=[H.integration,H.domain,H.entity_glob].filter(t=>t!==void 0).length;return r&&e.every(Boolean)?r:-1},H5=(L,V)=>Object.keys(V.states).filter(C=>Y3(L,C,V)>0),q3=(L,V,C)=>L===$6&&rH.has(V)?C:Array.isArray(L)?L.map(H=>H===$6&&tH.has(V)?C:q3(H,"",C)):L&&typeof L=="object"?Object.fromEntries(Object.entries(L).map(([H,e])=>[H,q3(e,H,C)])):L,N6=(L,V)=>V?q3(L,"",V):L,n2=(L,V)=>{let C=V??L.entity,H=e=>e?.cards?{...e,cards:N6(e.cards,C)}:e;return{...L,entity:C,cards:N6(L.cards,C),header:H(L.header),footer:H(L.footer)}},I6=L=>{if(!L||typeof L!="object")return;let V=Object.entries(L).filter(([,C])=>C!=null&&C!==""&&!(Array.isArray(C)&&!C.length));return V.length?Object.fromEntries(V):void 0};var z6=Symbol.for("more-info-popup-card.registry"),j3=class{constructor(V=window){this._win=V}_win;_hosts=new Set;_installed=!1;_consuming=!1;_checkScheduled=!1;register(V){this._install(),this._hosts.add(V),this._scheduleLocationCheck()}unregister(V){this._hosts.delete(V)}get(V){if(!V)return;let C;for(let H of this._hosts)H.isConnected&&H.popupConfig?.popup_id===V&&(C=H);return C}findByEntity(V){let C,H=0;for(let e of this._hosts){let r=e.popupConfig;if(!e.isConnected||!r)continue;let t=Y3(r,V,e.hass??this._hass());t>0&&t>=H&&(C=e,H=t)}return C}_hass(){return this._win.document?.querySelector("home-assistant")?.hass}open(V,C){let H=this.get(V);return H?.openPopup(C),!!H}close(V){let C=w5();C&&(!V||C.popupId===V)&&C.close()}toggle(V,C){w5()?.popupId===V?this.close(V):this.open(V,{entity:C})}_install(){this._installed||(this._installed=!0,this._win.addEventListener("location-changed",this._onLocationChanged),this._win.addEventListener("popstate",this._onPopState),this._win.addEventListener("ll-custom",this._onCustomAction),this._win.addEventListener("hass-more-info",this._onMoreInfo,{capture:!0}))}_scheduleLocationCheck(){this._checkScheduled||(this._checkScheduled=!0,queueMicrotask(()=>{this._checkScheduled=!1;let V=this._hostForHash();V&&!this._consuming&&(a2(this._win),V.openPopup())}))}_hostForHash(){return this.get(R6(this._win.location.hash))}_onLocationChanged=V=>{if(this._consuming)return;let C=this._hostForHash();if(!C)return;let e=!!!V.detail?.replace&&this._win.history.state?.from===this._win.location.pathname;this._consuming=!0,(e?F6(this._win):Promise.resolve(a2(this._win))).then(()=>{this._consuming=!1,C.openPopup()})};_onPopState=()=>{if(this._consuming)return;let V=this._hostForHash();V&&(a2(this._win),V.openPopup())};_onCustomAction=V=>{let H=V.detail?.more_info_popup;H&&(typeof H=="string"?this.open(H):H.open?this.open(H.open,{entity:H.entity}):H.toggle?this.toggle(H.toggle,H.entity):H.close!==void 0&&this.close(H.close||void 0))};_onMoreInfo=V=>{let C=V.detail;if(!C?.entityId)return;let H=this.findByEntity(C.entityId);if(!H||V.composedPath().some(t=>t.localName===i1))return;V.stopImmediatePropagation();let r=C.view??C.tab;H.openPopup({view:r&&r!=="info"?r:void 0,entity:C.entityId})}},X3=()=>{let L=window;return L[z6]??=new j3(window),L[z6]};var c1=(L,V,C)=>C.map(H=>({value:H,label:x(L,`editor.${V}.${H}`)})),W6=L=>L.sort((V,C)=>V.label.localeCompare(C.label)),aH=L=>W6([...new Set(Object.values(L.entities??{}).map(V=>V.platform).filter(V=>!!V))].map(V=>({value:V,label:L.localize(`component.${V}.title`)||V}))),nH=L=>W6([...new Set(Object.keys(L.states).map(V=>V.split(".")[0]))].map(V=>({value:V,label:L.localize(`component.${V}.title`)||V}))),AH=L=>({name:"match",type:"expandable",expanded:!0,iconPath:I0,title:x(L,"editor.match"),schema:[{name:"",type:"grid",schema:[{name:"integration",selector:{select:{mode:"dropdown",custom_value:!0,options:aH(L)}}},{name:"domain",selector:{select:{mode:"dropdown",custom_value:!0,options:nH(L)}}}]},{name:"entity_glob",selector:{text:{}}},{name:"entities",selector:{entity:{multiple:!0}}}]}),U6=(L,V)=>[{name:"general",type:"expandable",flatten:!0,expanded:!0,iconPath:v2,title:x(L,"editor.section.general"),schema:[{name:"popup_id",required:!0,selector:{text:{prefix:"#"}}},{name:"entity",selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}]}]},{name:"appearance",type:"expandable",flatten:!0,iconPath:C7,title:x(L,"editor.section.appearance"),schema:[{name:"mode",selector:{select:{mode:"dropdown",options:c1(L,"mode",["auto","dialog","bottom_sheet","top_sheet"])}}},{name:"breadcrumb",selector:{select:{mode:"dropdown",custom_value:!0,options:c1(L,"breadcrumb",["auto","none"])}}},{name:"",type:"grid",schema:[{name:"width",selector:{select:{mode:"dropdown",options:c1(L,"width",["small","medium","large","full","custom"])}}},...V.width==="custom"?[{name:"custom_width",selector:{text:{}}}]:[]]},{name:"",type:"grid",schema:[{name:"height",selector:{select:{mode:"dropdown",options:c1(L,"height",["native","auto","custom"])}}}]},...V.height==="custom"?[{name:"",type:"grid",schema:[{name:"min_height",selector:{text:{}}},{name:"max_height",selector:{text:{}}}]}]:[],{name:"column_span",selector:{number:{min:1,max:4,step:1,mode:"slider",slider_ticks:!0}}},{name:"layout",selector:{select:{mode:"list",options:c1(L,"layout",["single","zones"])}}},...V.layout==="zones"?[]:[G6(L)],{name:"card_borders",selector:{boolean:{}}},...V.entity||V.match?[{name:"show_header_actions",selector:{boolean:{}}}]:[]]},...V.layout==="zones"?[dH(L)]:[],{name:"behavior",type:"expandable",flatten:!0,iconPath:m2,title:x(L,"editor.section.behavior"),schema:[{name:"replace_more_info",selector:{boolean:{}}},...V.replace_more_info?[AH(L)]:[],{name:"nested_more_info",selector:{select:{mode:"list",options:c1(L,"nested_more_info",["inline","dialog"])}}},{name:"dismissable",selector:{boolean:{}}},{name:"auto_close",selector:{number:{min:0,max:3600,step:5,mode:"box",unit_of_measurement:"s"}}},{name:"keep_alive",selector:{boolean:{}}}]}],G6=(L,V=!1)=>({name:"",type:"grid",schema:[{name:"vertical_align",selector:{select:{mode:"dropdown",options:c1(L,"vertical_align",["top","center","bottom"])}}},{name:"horizontal_align",selector:{select:{mode:"dropdown",options:c1(L,"horizontal_align",["left","center","right"])}}},...V?[{name:"min_height",selector:{text:{}}}]:[]]}),dH=L=>{let V=C=>({name:C==="main"?"main_zone":C,type:"expandable",flatten:C==="main",title:`${x(L,`editor.zone.${C}`)} \xB7 ${x(L,`editor.zone.${C}_hint`)}`,schema:[G6(L,C!=="main")]});return{name:"zones",type:"expandable",flatten:!0,expanded:!0,iconPath:d7,title:x(L,"editor.section.zones"),schema:[V("header"),V("main"),V("footer")]}},pH={entity:"editor.entity_helper",breadcrumb:"editor.breadcrumb_helper",custom_width:"editor.length_helper",min_height:"editor.length_helper",max_height:"editor.length_helper",column_span:"editor.column_span_helper",layout:"editor.layout_helper",horizontal_align:"editor.horizontal_align_helper",replace_more_info:"editor.replace_more_info_helper",entity_glob:"editor.entity_glob_helper",entities:"editor.match_entities_helper"},lH={popup_id:"editor.popup_id",entity:"editor.entity",name:"editor.name",icon:"editor.icon",breadcrumb:"editor.breadcrumb",mode:"editor.mode",width:"editor.width",custom_width:"editor.custom_width",height:"editor.height",min_height:"editor.min_height",max_height:"editor.max_height",column_span:"editor.column_span",layout:"editor.layout",vertical_align:"editor.vertical_align",horizontal_align:"editor.horizontal_align",card_borders:"editor.card_borders",show_header_actions:"editor.show_header_actions",replace_more_info:"editor.replace_more_info",integration:"editor.match_integration",domain:"editor.match_domain",entity_glob:"editor.entity_glob",entities:"editor.match_entities",nested_more_info:"editor.nested_more_info",dismissable:"editor.dismissable",auto_close:"editor.auto_close",keep_alive:"editor.keep_alive"},Q6=L=>V=>{if(V.title)return V.title;let C=lH[V.name];return C?x(L,C):V.name},K6=(L,V)=>C=>{if(C.name==="popup_id")return x(L,"editor.popup_id_helper",{id:V.popup_id||"\u2026"});let H=pH[C.name];return H?x(L,H):void 0};var q6=L=>{let V={views:[{type:"sections",sections:L.sections}]};return{config:V,rawConfig:V,editMode:!0,urlPath:null,mode:"storage",locale:L.locale,enableFullEditMode:()=>{},setEditMode:()=>{},saveConfig:async C=>{let H=C.views?.[0]?.sections??[];L.onSave(L.sections.map((e,r)=>structuredClone(H[r]?.cards??[])))},deleteConfig:async()=>{},showToast:C=>L.onToast(C)}},Y6=L=>{if(!Array.isArray(L)||L.length<3)return;let[,V,C]=L.slice(-3);return typeof V=="number"&&typeof C=="number"?{section:V,card:C}:void 0};var sH=30,M0={vertical_align:"top",horizontal_align:"left"},mH=L=>{if(!L)return;let V={...L};for(let[C,H]of Object.entries(V))(H===""||H===void 0||H===M0[C]||Array.isArray(H)&&!H.length)&&delete V[C];return Object.keys(V).length?V:void 0},cH=L=>L.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9_-]/g,"_").replace(/^[_-]+/,""),X6,J6,C8,H8,V8,L8,e8,r8,t8,T,J3,C0,H0,V0,L0,e0,r0,t0,X=class extends(t8=P,r8=[g({attribute:!1})],e8=[g({attribute:!1})],L8=[Z()],V8=[Z()],H8=[Z()],C8=[Z()],J6=[Z()],X6=[Z()],t8){constructor(){super(...arguments);s(this,J3,a(T,8,this)),a(T,11,this);s(this,C0,a(T,12,this)),a(T,15,this);s(this,H0,a(T,16,this)),a(T,19,this);s(this,V0,a(T,20,this)),a(T,23,this);s(this,L0,a(T,24,this,!1)),a(T,27,this);s(this,e0,a(T,28,this,!0)),a(T,31,this);s(this,r0,a(T,32,this,!0)),a(T,35,this);m(this,"_sections",new Map);m(this,"_sectionsKey");m(this,"_undo",[]);s(this,t0,a(T,36,this)),a(T,39,this);m(this,"_noticeTimer");m(this,"_titlesRequested",!1);m(this,"_undoLast",()=>{let C=this._undo[this._undo.length-1];this._notice=void 0,C&&(this._undo=this._undo.slice(0,-1),this._setCards(C,!1))});m(this,"_toast",C=>{clearTimeout(this._noticeTimer),this._notice={message:C.message,undo:!!C.action&&this._undo.length>0},this._noticeTimer=setTimeout(()=>{this._notice=void 0},C.duration&&C.duration>0?C.duration:6e3)});m(this,"_interceptEdit",{capture:!0,handleEvent:C=>{let H=Y6(C.detail?.path),e=H&&this._zoneAt(H.section);!H||!e||(C.stopPropagation(),C.type==="ll-duplicate-card"?this._duplicate(e,H.card):this._openEditor(e,H.card))}});m(this,"_interceptCreate",{capture:!0,handleEvent:C=>{C.stopPropagation();let H=C.currentTarget.dataset.zone;this._sub={kind:"add",zone:H??"main"}}});m(this,"_back",()=>{this._returnToCards()})}setConfig(C){j1(C),this._config=structuredClone(C)}connectedCallback(){super.connectedCallback(),V4().then(()=>{this._ready=!0})}willUpdate(C){this.hass&&!this._titlesRequested&&(this._titlesRequested=!0,this.hass.loadBackendTranslation?.("title")),(C.has("_config")||C.has("hass"))&&this._config&&this.hass&&this._syncSections()}get _zones(){return this._config?V2(this._config):[]}_cards(C){return this._config?o4(this._config,C):[]}_zoneSectionConfig(C){return _5(this._config??{},this._cards(C))}_emit(C){this._config=C,b(this,"config-changed",{config:C})}_snapshot(){return Object.fromEntries(this._zones.map(C=>[C.id,structuredClone(C.cards)]))}_setCards(C,H=!0){if(!this._config)return;let e=this._config;for(let[r,t]of Object.entries(C))e=i4(e,r,t);JSON.stringify(e)!==JSON.stringify(this._config)&&(H&&(this._undo=[...this._undo,this._snapshot()].slice(-sH)),this._emit(e))}_syncSections(){let C=this._zones,H=C.map(t=>this._zoneSectionConfig(t.id));for(let t of C){this._sections.has(t.id)||this._sections.set(t.id,document.createElement("hui-section"));let M=this._sections.get(t.id);M.hass=this.hass,B2(M,t.horizontal_align)}let e=JSON.stringify(H);if(e===this._sectionsKey)return;this._sectionsKey=e;let r=q6({sections:H,locale:this.hass.locale,onSave:t=>this._setCards(Object.fromEntries(C.map((M,o)=>[M.id,t[o]??[]]))),onToast:this._toast});C.forEach((t,M)=>{let o=this._sections.get(t.id);o.viewIndex=0,o.index=M,o.preview=!0,o.lovelace=r,o.config=H[M]})}_zoneAt(C){return this._zones[C]?.id}_copyNative(C,H){let e=this._sections.get(C),r=e?.firstElementChild??e;r&&b(r,"ll-copy-card",{path:[0,e.index??0,H]})}_openEditor(C,H){this._guiMode=!0,this._guiModeAvailable=!0,this._sub={kind:"edit",zone:C,index:H}}_returnToCards(){this._sub=void 0,this.updateComplete.then(()=>this.renderRoot.querySelector(".cards-header")?.scrollIntoView({block:"start"}))}_duplicate(C,H){let e=[...this._cards(C)];e.splice(H+1,0,structuredClone(e[H])),this._setCards({[C]:e}),this._openEditor(C,H+1)}_delete(C,H){let e=[...this._cards(C)];e.splice(H,1),this._setCards({[C]:e}),this._returnToCards(),this._toast({message:x(this.hass,"editor.card_deleted"),action:{text:x(this.hass,"editor.undo"),action:this._undoLast}})}_cut(C,H){this._copyNative(C,H);let e=[...this._cards(C)];e.splice(H,1),this._setCards({[C]:e}),this._returnToCards()}_cardPicked(C){C.stopPropagation();let H=C.detail.config;if(!H?.type||this._sub?.kind!=="add")return;let e=this._sub.zone,r=[...this._cards(e),H];this._setCards({[e]:r}),this._openEditor(e,r.length-1)}_cardChanged(C){if(C.stopPropagation(),this._sub?.kind!=="edit")return;let{zone:H,index:e}=this._sub,r=[...this._cards(H)];r[e]=C.detail.config,this._guiModeAvailable=C.detail.guiModeAvailable??!0,this._setCards({[H]:r})}_guiModeChanged(C){C.stopPropagation(),this._guiMode=C.detail.guiMode,this._guiModeAvailable=C.detail.guiModeAvailable}_toggleMode(){this.renderRoot.querySelector("hui-card-element-editor")?.toggleMode()}_valueChanged(C){if(C.stopPropagation(),!this._config)return;let H={...C.detail.value};typeof H.popup_id=="string"&&(H.popup_id=cH(H.popup_id));let e={...this._config,...H};for(let[t,M]of Object.entries(a1))e[t]===M&&delete e[t];for(let t of Object.keys(e))(e[t]===""||e[t]===void 0)&&delete e[t];e.width!=="custom"&&delete e.custom_width,e.height!=="custom"&&(delete e.min_height,delete e.max_height);let r=I6(e.match);r?e.match=r:delete e.match,e.replace_more_info||delete e.match,!e.entity&&!e.match&&delete e.show_header_actions;for(let t of["header","footer"]){let M=mH(e[t]);M?e[t]=M:delete e[t]}this._emit(e)}_testPopup(){if(!this._config)return;let C;try{C=T2(j1(this._config))}catch{return}C=n2(C,C.entity??H5(C,this.hass)[0]),b(this,"show-dialog",{dialogTag:i1,dialogImport:()=>Promise.resolve(),dialogParams:{config:C},addHistory:!0})}render(){return!this.hass||!this._config?n:this._ready?this._sub?.kind==="add"?this._renderAdd():this._sub?.kind==="edit"&&this._cards(this._sub.zone)[this._sub.index]?this._renderEdit(this._sub.zone,this._sub.index):this._renderMain():i`<ha-spinner size="small"></ha-spinner>`}_renderMain(){let C=this.hass,H=this._config,e={...a1,...H,header:{...M0,...H.header},footer:{...M0,...H.footer}};return i`
      <ha-form
        .hass=${C}
        .data=${e}
        .schema=${U6(C,e)}
        .computeLabel=${Q6(C)}
        .computeHelper=${K6(C,H)}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="cards-header">
        <h3>${x(C,"editor.tab.cards")}</h3>
        <ha-button appearance="plain" size="small" @click=${this._testPopup}>
          ${x(C,"editor.test_popup")}
        </ha-button>
      </div>
      ${this._notice?i`
              <ha-alert alert-type="info" class="notice">
                ${this._notice.message}
                ${this._notice.undo?i`<ha-button
                        slot="action"
                        appearance="plain"
                        size="small"
                        @click=${this._undoLast}
                      >
                        ${x(C,"editor.undo")}
                      </ha-button>`:n}
              </ha-alert>
            `:n}
      ${H.layout==="zones"?i`<div class="zones">
              ${this._zones.map(r=>this._renderZone(r))}
            </div>`:i`
              ${this._cards("main").length?n:i`<p class="empty">${x(C,"editor.empty")}</p>`}
              ${this._renderGrid("main")}
            `}
    `}_renderGrid(C){let H=this._config;return i`
      <div
        class=${w({grid:!0,borderless:H.card_borders===!1})}
        data-zone=${C}
        style=${B({"--column-span":String(H.column_span??1)})}
        @ll-edit-card=${this._interceptEdit}
        @ll-duplicate-card=${this._interceptEdit}
        @ll-create-card=${this._interceptCreate}
      >
        ${this._sections.get(C)}
      </div>
    `}_renderZone(C){let H=this.hass;return i`
      <section class="zone zone-${C.id}">
        <div class="zone-label">
          <span class="zone-title">
            ${x(H,`editor.zone.${C.id}`)}
          </span>
          <span class="zone-hint">
            ${x(H,`editor.zone.${C.id}_hint`)}
          </span>
        </div>
        ${this._renderGrid(C.id)}
      </section>
    `}_renderSubHeader(C,H=n){return i`
      <div class="sub-header">
        <ha-icon-button-prev
          .label=${x(this.hass,"editor.back")}
          @click=${this._back}
        ></ha-icon-button-prev>
        <span class="sub-title">${C}</span>
        <div class="sub-actions">${H}</div>
      </div>
    `}_renderAdd(){return i`
      ${this._renderSubHeader(x(this.hass,"editor.add_card"))}
      <hui-card-picker
        .hass=${this.hass}
        .lovelace=${this.lovelace??{views:[]}}
        @config-changed=${this._cardPicked}
      ></hui-card-picker>
    `}_renderEdit(C,H){let e=this.hass,r=this._cards(C)[H],t=o=>e.localize(`ui.panel.lovelace.editor.edit_card.${o}`),M=i`
      <ha-icon-button
        .label=${t(this._guiMode?"show_code_editor":"show_visual_editor")}
        .path=${this._guiMode?s2:K0}
        .disabled=${!this._guiModeAvailable}
        @click=${this._toggleMode}
      ></ha-icon-button>
      <ha-icon-button
        .label=${t("duplicate")}
        .path=${P0}
        @click=${()=>this._duplicate(C,H)}
      ></ha-icon-button>
      <ha-icon-button
        .label=${t("copy")}
        .path=${k0}
        @click=${()=>this._copyNative(C,H)}
      ></ha-icon-button>
      <ha-icon-button
        .label=${t("cut")}
        .path=${T0}
        @click=${()=>this._cut(C,H)}
      ></ha-icon-button>
      <ha-icon-button
        .label=${t("delete")}
        .path=${c2}
        @click=${()=>this._delete(C,H)}
      ></ha-icon-button>
    `;return i`
      ${this._renderSubHeader(x(e,"editor.edit_card"),M)}
      <hui-card-element-editor
        .hass=${e}
        .lovelace=${this.lovelace}
        .value=${r}
        .sectionConfig=${this._zoneSectionConfig(C)}
        show-visibility-tab
        @config-changed=${this._cardChanged}
        @GUImode-changed=${this._guiModeChanged}
      ></hui-card-element-editor>
    `}};T=I(t8),J3=new WeakMap,C0=new WeakMap,H0=new WeakMap,V0=new WeakMap,L0=new WeakMap,e0=new WeakMap,r0=new WeakMap,t0=new WeakMap,l(T,4,"hass",r8,X,J3),l(T,4,"lovelace",e8,X,C0),l(T,4,"_config",L8,X,H0),l(T,4,"_sub",V8,X,V0),l(T,4,"_ready",H8,X,L0),l(T,4,"_guiMode",C8,X,e0),l(T,4,"_guiModeAvailable",J6,X,r0),l(T,4,"_notice",X6,X,t0),F(T,X),m(X,"styles",O`
    :host {
      display: block;
    }
    .cards-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: var(--ha-space-6) 0 var(--ha-space-2);
    }
    .cards-header h3 {
      margin: 0;
      font-size: var(--ha-font-size-l);
      font-weight: var(--ha-font-weight-medium);
    }
    .notice {
      display: block;
      margin-bottom: var(--ha-space-2);
    }
    .empty {
      color: var(--secondary-text-color);
      margin: 0 0 var(--ha-space-2);
    }
    .grid {
      display: block;
      padding: var(--ha-space-2) 0;
    }
    /* card_borders: false, as in the popup */
    .grid.borderless {
      --ha-card-border-width: 0;
      --ha-card-box-shadow: none;
    }
    /* layout: zones, drawn as the popup frame */
    .zones {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg);
      overflow: hidden;
    }
    .zone {
      padding: var(--ha-space-2) var(--ha-space-3) 0;
    }
    .zone + .zone {
      border-top: 1px dashed var(--divider-color);
    }
    .zone-main {
      background: var(--secondary-background-color);
      padding-bottom: var(--ha-space-4);
    }
    .zone-label {
      display: flex;
      align-items: baseline;
      gap: var(--ha-space-2);
      margin-bottom: var(--ha-space-2);
    }
    .zone-title {
      font-weight: var(--ha-font-weight-medium);
    }
    .zone-hint {
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-s);
    }
    .sub-header {
      display: flex;
      align-items: center;
      gap: var(--ha-space-1);
      margin: 0 0 var(--ha-space-4);
      border-bottom: 1px solid var(--divider-color);
      padding-bottom: var(--ha-space-2);
    }
    .sub-title {
      flex: 1;
      font-size: var(--ha-font-size-l);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sub-actions {
      display: flex;
    }
  `);customElements.get(Y1)||customElements.define(Y1,X);var o0="more-info-popup-visibility-probe",i0=class extends HTMLElement{setConfig(){}getCardSize(){return 0}};customElements.get(o0)||customElements.define(o0,i0);var vH=8e3,V5=class{constructor(V,C,H){this._onChange=H;this._create(V,C)}_onChange;_card;_visible=!0;_hass;_stopped=!1;get visible(){return this._visible}set hass(V){this._hass=V,this._card&&V&&(this._card.hass=V)}stop(){this._stopped=!0,this._card?.remove(),this._card=void 0}async _create(V,C){try{let H=await window.loadCardHelpers?.();if(!H?.createCardElement||this._stopped)return;let e=H.createCardElement({type:"conditional",conditions:V,card:{type:`custom:${o0}`}});if(!await Promise.race([customElements.whenDefined(e.localName).then(()=>!0),new Promise(t=>setTimeout(()=>t(!1),vH))])||this._stopped||e.localName!=="hui-conditional-card")return;e.addEventListener("card-visibility-changed",t=>{t.stopPropagation(),this._update()}),this._card=e,this._hass&&(e.hass=this._hass),C.appendChild(e),await e.updateComplete,this._update()}catch(H){console.warn("[more-info-popup-card] Visibility not available",H)}}_update(){let V=!this._card?.hidden;V!==this._visible&&(this._visible=V,this._onChange(V))}};var A2="more-info-controls-card",M8,o8,i8,a8,n8,A8,d8,D,a0,n0,A0,d0,p0,l0,V1=class extends(d8=P,A8=[g({attribute:!1})],n8=[Z()],a8=[Z()],i8=[g({attribute:!1})],o8=[Z()],M8=[Z()],d8){constructor(){super(...arguments);s(this,a0,a(D,8,this)),a(D,11,this);s(this,n0,a(D,12,this)),a(D,15,this);s(this,A0,a(D,16,this,!1)),a(D,19,this);s(this,d0,a(D,20,this,!1)),a(D,23,this);s(this,p0,a(D,24,this,new Set)),a(D,27,this);m(this,"_watchers",new Map);m(this,"_probes");s(this,l0,a(D,28,this,{})),a(D,31,this);m(this,"_timers",{})}static getConfigElement(){return document.createElement(X2)}static getStubConfig(C,H){let e=H.find(o=>o.startsWith("light.")&&C.states[o]?.attributes.effect_list),r=H.find(o=>F1.includes(v(o))),t=H.find(o=>o.startsWith("switch.")),M=[];return e&&M.push({entity:e,attribute:"effect"}),r&&M.push({entity:r}),t&&M.push({entity:t}),!M.length&&H[0]&&M.push({entity:H[0]}),{type:`custom:${A2}`,controls:M}}setConfig(C){if(!Array.isArray(C?.controls))throw new Error('"controls" must be a list');C.controls.forEach((H,e)=>{if(!H||typeof H!="object")throw new Error(`Control ${e+1} is invalid`);let r=n1(H);if(r!=="action"&&r!=="button"&&!H.entity)throw new Error(`Control ${e+1} needs an "entity"`);if(H.attribute&&H.attribute!=="state"&&!o2[H.attribute]&&!H.options)throw new Error(`Control ${e+1}: unknown attribute "${H.attribute}"; add "options" and "perform_action"`)}),this._config=C,this._syncWatchers()}_syncWatchers(){let C=new Map;this._config?.controls.forEach((H,e)=>{Array.isArray(H.visibility)&&H.visibility.length&&C.set(e,H.visibility)});for(let[H,{key:e,watcher:r}]of this._watchers){let t=C.get(H);(!t||JSON.stringify(t)!==e)&&(r.stop(),this._watchers.delete(H))}this._probes||(this._probes=document.createElement("div"),this._probes.hidden=!0);for(let[H,e]of C){if(this._watchers.has(H))continue;let r=new V5(e,this._probes,()=>this._updateHidden());r.hass=this.hass,this._watchers.set(H,{key:JSON.stringify(e),watcher:r})}this._updateHidden()}_updateHidden(){let C=new Set;for(let[e,{watcher:r}]of this._watchers)r.visible||C.add(e);C.size===this._hiddenItems.size&&[...C].every(e=>this._hiddenItems.has(e))||(this._hiddenItems=C)}willUpdate(C){if(C.has("hass"))for(let{watcher:H}of this._watchers.values())H.hass=this.hass}firstUpdated(){this._probes&&this.renderRoot.appendChild(this._probes)}connectedCallback(){super.connectedCallback(),P1("light",["ha-more-info-control-select-container","ha-control-select-menu"]).then(()=>{this._ready=!0})}disconnectedCallback(){super.disconnectedCallback(),Object.values(this._timers).forEach(clearTimeout),this._timers={}}getCardSize(){return 1}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}_stateObj(C){return C.entity?this.hass?.states[C.entity]:void 0}_selectSpec(C,H){if(C.attribute)return C.attribute==="state"?E9:o2[C.attribute]??{options:()=>[],value:e=>e.attributes[C.attribute]==null?void 0:String(e.attributes[C.attribute]),service:()=>["",""],data:e=>({[C.data_key??C.attribute]:e}),icon:Y2.icon};if(F1.includes(v(H.entity_id)))return Y2;if(C.options&&C.perform_action)return{options:()=>[],value:()=>{},service:()=>["",""],data:e=>({[C.data_key??"value"]:e}),icon:Y2.icon,attributeIcons:!1}}_call(C,H,e,r){let[t,M]=C.perform_action?s3(C.perform_action):H;if(!t||!M)return;let o={...C.entity?{entity_id:C.entity}:{},...C.perform_action&&C.data_key?{[C.data_key]:r}:e,...C.data};this.hass.callService(t,M,o)}_label(C,H){return C.name?C.name:H?C.attribute&&C.attribute!=="state"?this.hass.formatEntityAttributeName(H,C.attribute):G(H):""}_icon(C,H,e,r,t=!0){let M=B({color:C.color&&t?L2(C.color):void 0});return C.icon?i`<ha-icon
        slot=${r??n}
        style=${M}
        .icon=${C.icon}
      ></ha-icon>`:e?i`<ha-svg-icon
        slot=${r??n}
        style=${M}
        .path=${e}
      ></ha-svg-icon>`:i`<ha-state-icon
      slot=${r??n}
      style=${M}
      .hass=${this.hass}
      .stateObj=${H}
    ></ha-state-icon>`}_renderSelect(C,H){let e=this.hass,r=this._selectSpec(C,H);if(!r)return n;let t=N9(C.options),M=t?t.map(c=>c.value):r.options(H),o=C.attribute&&C.attribute!=="state"?C.attribute:void 0,A=c=>{let h=t?.find(R=>R.value===c);return h?.name?h.name:r.formatAsState||!o?e.formatEntityState(H,c):e.formatEntityAttributeValue(H,o,c==="true"?!0:c==="false"?!1:c)},d=M.map(c=>{let h=t?.find(N=>N.value===c)?.icon,R=h?void 0:r.optionIcons?.[c];return{value:c,label:A(c),...h?{icon:h}:{},...R?{iconPath:R}:{}}}),p=c=>o&&!r.formatAsState?i`<ha-attribute-icon
            slot="icon"
            .hass=${e}
            .stateObj=${H}
            .attribute=${o}
            .attributeValue=${c}
          ></ha-attribute-icon>`:i`<ha-state-icon
            slot="icon"
            .hass=${e}
            .stateObj=${H}
            .stateValue=${c}
          ></ha-state-icon>`,u=!o&&F1.includes(v(H.entity_id));return i`
      <ha-control-select-menu
        .label=${this._label(C,H)}
        .value=${r.value(H)}
        .options=${d}
        .renderIcon=${C.icon||r.attributeIcons===!1?void 0:p}
        .disabled=${H.state==="unavailable"}
        @wa-select=${c=>{let h=c.detail?.item?.value;h===void 0||h===r.value(H)||this._call(C,r.service(H),r.data(h),h)}}
      >
        ${this._icon(C,u?H:void 0,u?void 0:r.icon,"icon")}
      </ha-control-select-menu>
    `}_renderToggle(C,H){let e=v(H.entity_id),r=!$9.includes(H.state),t=H.state==="unavailable",M=()=>{C.perform_action?this._call(C,["",""],{},void 0):e==="lock"?this.hass.callService("lock",r?"lock":"unlock",{entity_id:H.entity_id}):e==="cover"||e==="valve"?this.hass.callService(e,"toggle",{entity_id:H.entity_id}):this.hass.callService("homeassistant","toggle",{entity_id:H.entity_id})};return i`
      <button
        class=${w({chip:!0,toggle:!0,active:r})}
        role="switch"
        aria-checked=${String(r)}
        ?disabled=${t}
        @click=${M}
      >
        <div class="icon">
          ${this._icon(C,H,void 0,void 0,r)}
        </div>
        <div class="content">
          <p class="label">${this._label(C,H)}</p>
          <p class="value">${this.hass.formatEntityState(H)}</p>
        </div>
      </button>
    `}_renderNumber(C,H,e){let r=this.hass,t=H.attributes,M=C.min??Number(t.min??0),o=C.max??Number(t.max??100),A=C.step??Number(t.step??1),d=this._pending[e]??Number(C.attribute?t[C.attribute]:H.state),p=Number.isFinite(d),u=H.state==="unavailable"||!p,c=(String(A).split(".")[1]??"").length,h=p&&(this._pending[e]!==void 0||C.attribute)?`${d.toFixed(c)}${t.unit_of_measurement?` ${t.unit_of_measurement}`:""}`:r.formatEntityState(H),R=N=>{let K=Math.min(o,Math.max(M,Number((d+N*A).toFixed(c))));K!==d&&(this._pending={...this._pending,[e]:K},clearTimeout(this._timers[e]),this._timers[e]=setTimeout(()=>{let z=v(H.entity_id);this._call(C,[z,"set_value"],{value:K},K);let L1={...this._pending};delete L1[e],this._pending=L1},D9))};return i`
      <div
        class="chip number"
        ?disabled=${u}
        role="group"
        aria-label=${this._label(C,H)}
      >
        <ha-icon-button
          .label=${r.localize("ui.card.counter.actions.decrement")||"\u2212"}
          .path=${X0}
          .disabled=${u||d<=M}
          @click=${()=>R(-1)}
        ></ha-icon-button>
        <div class="content center">
          <p class="label">${this._label(C,H)}</p>
          <p class="value">${h}</p>
        </div>
        <ha-icon-button
          .label=${r.localize("ui.card.counter.actions.increment")||"+"}
          .path=${r7}
          .disabled=${u||d>=o}
          @click=${()=>R(1)}
        ></ha-icon-button>
      </div>
    `}_runAction(C,H){if(H.action!=="none"){if(H.action==="more-info"){let e=H.entity??C.entity;e&&b(this,"hass-more-info",{entityId:e});return}b(this,"hass-action",{config:{entity:C.entity,tap_action:H},action:"tap"})}}_renderButton(C,H){let e=C.entity?v(C.entity):"",r=()=>{if(C.tap_action){this._runAction(C,C.tap_action);return}let t=C.perform_action??F9[e]??(C.entity?"homeassistant.toggle":void 0);if(!t)return;let[M,o]=s3(t);this.hass.callService(M,o,{...C.entity?{entity_id:C.entity}:{},...C.data})};return i`
      <ha-control-button
        .label=${this._label(C,H)}
        .disabled=${H?.state==="unavailable"}
        @click=${r}
      >
        ${this._icon(C,H,void 0)}
      </ha-control-button>
    `}_renderAction(C,H){let e=C.tap_action??{action:H?"more-info":"none"},r=C.show_arrow??j2(C,!!H),t=C.value??(H?this.hass.formatEntityState(H):"");return i`
      <button class="chip action" @click=${()=>this._runAction(C,e)}>
        <div class="icon">${this._icon(C,H,void 0)}</div>
        <div class="content">
          <p class="label">${this._label(C,H)}</p>
          ${t?i`<p class="value">${t}</p>`:n}
        </div>
        ${r?i`<div class="icon">
                <ha-svg-icon .path=${w0}></ha-svg-icon>
              </div>`:n}
      </button>
    `}_renderItem(C,H){let e=this._stateObj(C),r=n1(C);if(r==="action")return this._renderAction(C,e);if(r==="button")return this._renderButton(C,e);if(!e)return i`<div class="chip" disabled>
        <div class="content">
          <p class="label">${C.name??C.entity}</p>
          <p class="value">
            ${this.hass.localize("state.default.unavailable")}
          </p>
        </div>
      </div>`;switch(r){case"select":return this._renderSelect(C,e);case"toggle":return this._renderToggle(C,e);case"number":return this._renderNumber(C,e,H);default:return n}}_renderWrapped(C){let H=C.length;return i`
      <div class="wrap-controls">
        <div
          class=${w({"wrap-scroll":!0,[`items-${H}`]:!0,multiline:H>=4})}
        >
          ${C}
        </div>
      </div>
    `}render(){if(!this._config||!this.hass)return n;let C=this._config.appearance??"plain",H=this._config.controls.map((t,M)=>({item:t,index:M})).filter(({index:t})=>this.preview||!this._hiddenItems.has(t)),e=H.filter(({item:t})=>n1(t)==="button"),r=H.filter(({item:t})=>n1(t)!=="button");return i`
      <ha-card class=${C}>
        ${this._ready?H.length?i`
                  ${e.length?i`<div class="buttons">
                          <ha-control-button-group>
                            ${e.map(({item:t,index:M})=>this._renderItem(t,M))}
                          </ha-control-button-group>
                        </div>`:n}
                  ${r.length?this._config.wrap?this._renderWrapped(r.map(({item:t,index:M})=>this._renderItem(t,M))):i`<ha-more-info-control-select-container>
                            ${r.map(({item:t,index:M})=>this._renderItem(t,M))}
                          </ha-more-info-control-select-container>`:n}
                `:i`<p class="empty">
                  ${x(this.hass,"controls.empty")}
                </p>`:n}
      </ha-card>
    `}};D=I(d8),a0=new WeakMap,n0=new WeakMap,A0=new WeakMap,d0=new WeakMap,p0=new WeakMap,l0=new WeakMap,l(D,4,"hass",A8,V1,a0),l(D,4,"_config",n8,V1,n0),l(D,4,"_ready",a8,V1,A0),l(D,4,"preview",i8,V1,d0),l(D,4,"_hiddenItems",o8,V1,p0),l(D,4,"_pending",M8,V1,l0),F(D,V1),m(V1,"styles",[J2,r6,O`
      ha-card.card {
        padding: var(--ha-space-4);
      }
      .chip.toggle.active .icon {
        color: var(--state-active-color, var(--primary-color));
      }
      .chip.number {
        gap: 0;
        padding: 0 2px;
        cursor: default;
      }
      .chip.number ha-icon-button {
        --ha-icon-button-size: 40px;
        --mdc-icon-size: 20px;
        flex: none;
      }
      .chip .content.center {
        align-items: center;
        text-align: center;
      }
      .chip.number[disabled] {
        color: var(--disabled-color);
      }
      /* ha-more-info-control-select-container, large-screen rules */
      .wrap-controls {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .wrap-scroll {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--ha-space-3);
        width: 100%;
        max-width: 450px;
        margin: auto;
      }
      .wrap-scroll > * {
        min-width: 120px;
        max-width: 160px;
        flex: none;
      }
      .wrap-scroll.items-4 {
        max-width: 300px;
      }
      .wrap-scroll.items-3 > * {
        max-width: 140px;
      }
      .wrap-scroll.multiline > * {
        width: 140px;
      }
      /* more-info-vacuum.ts command buttons */
      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--ha-space-3);
      }
      .buttons:not(:last-child) {
        margin-bottom: var(--ha-space-6);
      }
      ha-control-button-group {
        --control-button-group-thickness: 48px;
        justify-content: center;
      }
      ha-control-button-group ha-control-button {
        flex: 0 0 auto;
        width: var(--control-button-group-thickness);
        --control-button-border-radius: var(--ha-border-radius-lg);
      }
      .empty {
        margin: 0;
        text-align: center;
        color: var(--secondary-text-color);
      }
    `]);customElements.get(A2)||customElements.define(A2,V1);var p8,l8,s8,m8,c8,J,s0,m0,c0,v0,d1=class extends(c8=P,m8=[g({attribute:!1})],s8=[g({attribute:!1})],l8=[Z()],p8=[Z()],c8){constructor(){super(...arguments);s(this,s0,a(J,8,this)),a(J,11,this);s(this,m0,a(J,12,this)),a(J,15,this);s(this,c0,a(J,16,this)),a(J,19,this);s(this,v0,a(J,20,this,"hidden")),a(J,23,this);m(this,"connectedWhileHidden",!0);m(this,"_preview",!1);m(this,"_previewZones")}static async getConfigElement(){return document.createElement(Y1)}static getStubConfig(C,H){let e=H.find(o=>o.startsWith("light."))??H[0],r=e?C.states[e]:void 0,t=r?$7(G(r)):"",M=Math.random().toString(36).slice(2,6);return{type:`custom:${v5}`,popup_id:t?`${t}_${M}`:`popup_${M}`,cards:[]}}get preview(){return this._preview}set preview(C){this._preview=!!C,this._syncSurface()}get popupConfig(){return this._config}setConfig(C){this._config=T2(j1(C)),this._syncSurface()}getCardSize(){return this._surface==="hidden"?0:this._surface==="preview"?6:1}getGridOptions(){return this._computeSurface()==="preview"?{columns:"full",rows:"auto"}:{columns:6,rows:1,min_columns:3,max_rows:1}}openPopup(C){if(!this._config)return;let H=n2(this._config,C?.entity);H4().then(e=>{if(e.includes("ha-adaptive-dialog")||e.includes("hui-section")){b(this,"hass-notification",{message:x(this.hass,"card.missing_elements")});return}b(this,"show-dialog",{dialogTag:i1,dialogImport:()=>Promise.resolve(),dialogParams:{config:H,view:C?.view},addHistory:!0})})}connectedCallback(){super.connectedCallback(),X3().register(this),this._syncSurface()}disconnectedCallback(){super.disconnectedCallback(),X3().unregister(this)}_computeSurface(){return this._preview?this.closest("hui-card-edit-mode, hui-card-options")?"placeholder":"preview":"hidden"}_syncSurface(){let C=this._computeSurface();C!==this._surface&&(this._surface=C);let H=C==="hidden";this.hasAttribute("hidden")!==H&&(this.toggleAttribute("hidden",H),this.isConnected&&b(this,"card-visibility-changed",{value:!H}))}willUpdate(C){C.has("hass")&&this._previewZones&&(this._previewZones.hass=this.hass)}render(){return!this._config||!this.hass||this._surface==="hidden"?n:L4(this.hass.config.version)?this._surface==="placeholder"?this._renderPlaceholder(this._config):this._renderPreview(this._config):i`<ha-alert alert-type="warning">
        ${x(this.hass,"card.unsupported_version",{version:J1.join(".")})}
      </ha-alert>`}_renderPlaceholder(C){let H=this.hass,e=C.entity?H.states[C.entity]:void 0,r=C.name??(e?G(e):C.popup_id),t=a4(C).length,M=t===1?x(H,"card.cards_count_one"):x(H,"card.cards_count",{count:t});return i`
      <ha-card class="placeholder">
        <ha-tile-container>
          <ha-tile-icon
            slot="icon"
            .icon=${C.icon}
            .iconPath=${C.icon?void 0:v2}
          >
            ${C.icon||!e?n:i`<ha-state-icon
                    slot="icon"
                    .stateObj=${e}
                    .hass=${H}
                  ></ha-state-icon>`}
          </ha-tile-icon>
          <ha-tile-info slot="info">
            <span slot="primary">${r}</span>
            <span
              slot="secondary"
              class="secondary"
              title=${x(H,"card.hidden_hint",{id:C.popup_id})}
            >
              <ha-svg-icon .path=${$0}></ha-svg-icon>
              #${C.popup_id} · ${M}
            </span>
          </ha-tile-info>
        </ha-tile-container>
      </ha-card>
    `}_renderPreview(C){let H=this.hass,e=n2(C,C.entity??H5(C,H)[0]);this._previewZones??=new T1;let r=this._previewZones.update(e,H),t=N2(H,e,{entityId:e.entity,view:"root",children:[]});return i`
      <div class="surface" inert>
        <ha-dialog-header>
          <ha-icon-button
            slot="navigationIcon"
            .label=${H.localize("ui.common.close")}
            .path=${l2}
          ></ha-icon-button>
          ${I2(H,t,"title")}
        </ha-dialog-header>
        ${R2(e,r)}
      </div>
    `}};J=I(c8),s0=new WeakMap,m0=new WeakMap,c0=new WeakMap,v0=new WeakMap,l(J,4,"hass",m8,d1,s0),l(J,4,"layout",s8,d1,m0),l(J,4,"_config",l8,d1,c0),l(J,4,"_surface",p8,d1,v0),F(J,d1),m(d1,"styles",[$2,D2,F2,O`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      ha-card.placeholder {
        height: 100%;
        border-style: dashed;
        --tile-color: var(--primary-color);
        position: relative;
      }
      ha-tile-icon {
        --tile-icon-color: var(--tile-color);
      }
      .secondary {
        display: inline-flex;
        align-items: center;
        gap: var(--ha-space-1);
      }
      .secondary ha-svg-icon {
        --mdc-icon-size: 14px;
        flex: none;
      }
      .surface {
        display: flex;
        flex-direction: column;
        background: var(
          --ha-dialog-surface-background,
          var(--card-background-color, var(--ha-color-surface-default))
        );
        border-radius: var(
          --ha-dialog-border-radius,
          var(--ha-border-radius-3xl)
        );
        box-shadow: var(--dialog-box-shadow, var(--wa-shadow-l));
        overflow: hidden;
      }
    `]);customElements.get(u5)||(customElements.define(u5,d1),window.customCards=window.customCards??[],window.customCards.push({type:v5,name:x(void 0,"card.name"),description:x(void 0,"card.description"),preview:!1,documentationURL:"https://github.com/cheerpipe/more-info-popup-card"}),window.customCards.push({type:i2,name:x(void 0,"state_card.name"),description:x(void 0,"state_card.description"),preview:!0,documentationURL:"https://github.com/cheerpipe/more-info-popup-card"},{type:A2,name:x(void 0,"controls_card.name"),description:x(void 0,"controls_card.description"),preview:!0,documentationURL:"https://github.com/cheerpipe/more-info-popup-card"}),console.info("%c MORE-INFO-POPUP-CARD %c 0.16.1 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;"));export{d1 as MoreInfoPopupCard};
//# sourceMappingURL=more-info-popup-card.js.map
