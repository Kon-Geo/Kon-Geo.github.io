from fractions import Fraction

superscripts = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]

def superscript(number):
    s = ""
    for d in map(int, str(number)):
        s += superscripts[d]
    return s

def poly(l):
    s = ""
    for i, v in enumerate(l):
        if v == 0:
            continue
        if i != 0:
            if v > 0:
                s += " + "
            elif v < 0:
                s += " - "
            v = abs(v)
        if v != 1 or i == len(l) - 1:
            s += f"{v}"
        if i != len(l) - 1:
            s += "x"
            if i != len(l) - 2:
                s += superscript(len(l) - i - 1)
    return s

def divide(o1, o2):
    n1 = len(o1)
    n2 = len(o2)
    o1 = list(o1)
    o2 = list(o2)
    for i, x2 in enumerate(o2[1:]):
        o2[i + 1] = Fraction(-x2, o2[0])
    for i in range(n1 - n2 + 1):
        x1 = o1[i]
        for j, x2 in enumerate(o2[1:]):
            o1[i + j + 1] += x1 * x2
    for i, x1 in enumerate(o1):
        o1[i] = Fraction(x1, o2[0])
    return o1[:-n2+1], o1[-n2+1:]

n1 = int(input("Dividend polynomial degree: "))
n2 = int(input("Divisor polynomial degree: "))
dividend = []
divisor = []
for i in range(n1 + 1):
    dividend.append(int(input(f"ax^{n1 - i} : ")))
for i in range(n2 + 1):
    divisor.append(int(input(f"bx^{n2 - i} : ")))

# dividend = [1, -6, 14, -16, 9, -3]
# divisor = [1, -3, 2, -1]

quotient, remainder = divide(dividend, divisor)
print(f"{poly(dividend)} = \n({poly(divisor)})({poly(quotient)}) + {poly(remainder) or 0}")
