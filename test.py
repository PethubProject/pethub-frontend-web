a = [[3,"N"],[13,"Y"],[23,"Y"],[33,"Y"]]
b = 14




if b<=a[0][0] and a[0][1]=="Y":
    print(b,"낮음")
if ((b>a[0][0] and a[0][1]=="Y" )or a[0][1]=="N") and (b<a[1][0] and a[1][1]=="Y"):
    print(b,"보통")
if ((b>a[1][0] and a[1][1]=="Y" )or a[1][1]=="N") and (b<a[2][0] and a[2][1]=="Y"):
    print(b,"높음")
if ((b>a[2][0] and a[2][1]=="Y" )or a[2][1]=="N") and (b<a[3][0] and a[3][1]=="Y"):
    print(b,"매우높음")
