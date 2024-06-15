from porygon import decode, encode

aval = [
	( 12001 , 1.22 , 1.45 , 5.666676 , 6.822221 , 92.1112221 ),
	( 12006 , 1.9922 , 1.45 , 5.666676 , 6.888881 , 92.1112221 ),
	( 12012 , 1.9322 , 1.45 , 5.666676 , 6.888881 , 92.2000221 ),
]

print (aval)
xx = encode (6,aval)
print (xx)
yy = decode (6, xx)
print (yy)
