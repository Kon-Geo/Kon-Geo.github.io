locations = [
    [1920, 1370, "Ναός Εισοδίων της Θεοτόκου - Παναγία Καπνικαρέα", "Πλ. Καπνικαρέας", "https://goo.gl/maps/cEJvUovWwXQWCjAA9", 0],
    [1910, 1195, "Ναός Παναγίας Παντανάσσης", "Πλ. Μοναστηρακίου", "https://goo.gl/maps/17dXuUXbqiJNNbR19", 0],
    [2035, 1450, "Άγιος Ελευθέριος - μικρή Μητρόπολη", "Πλ. Μητροπόλεως 8", "https://goo.gl/maps/Rk7c1Xb51kBr1ECYA", 0],
    [2240, 1335, "Άγιοι Ανάργυροι Κολοκύνθη", "Ερεχθέως 18", "https://goo.gl/maps/uc6ESk8tHoiCdKWV8", 0],
    [1795, 1575, "Ιερός Ναός Αγίου Γεωργίου Καρύτση", "Πλ. Καρύτση", "https://goo.gl/maps/zCKaCiY7MNFmoKkL8", 0],
    [1680, 1500, "Άγιοι Θεόδωροι Κλαυθμώνος", "Πλ. Αγίων Θεοδώρων", "https://goo.gl/maps/vkabKaXnHFTYEfhS7", 0],
    [1700, 1060, "Άγιοι Ανάργυροι Ψυρρή", "Αγ. Αναργύρων", "https://goo.gl/maps/KFM6Q1gw44YqV8gw8", 0],
    [0, 0, "", "", "", 0],
    [2270, 1620, "Ναός Μεταμορφώσεως του Σωτήρος - Σωτείρα Κοττάκη", "Κυδαθηναίων 10", "https://goo.gl/maps/ErLBVQZmF9iq2gKM7", 0],
    [2220, 1755, "Ναός Αγίας Τριάδα Σωτείρα Λυκοδήμου", "Φιλελλήνων", "https://goo.gl/maps/1xFfzXAJUMyaLet19", 0],
    [2415, 1525, "Αγία Αικατερίνη", "Χαιρεφώντος 10", "https://goo.gl/maps/sDoPhXzVaY1xBaJQ7", 0],
    [2295, 1390, "Άγιος Νικόλαος Ραγκαβά", "Πρυτανείου 1", "https://goo.gl/maps/yAeovYnHzzQXD9xA8", 0],
    [2500, 755, "Άγιος Δημήτριος Λουμπαρδιάρης", "Λόφος Φιλοπάππου", "https://goo.gl/maps/VhaQNveSohEQy57H8", 0],
    [2120, 1042, "Άγιοι Απόστολοι Σολάκη", "Πολυγνώτου", "https://goo.gl/maps/ZuHGpZHo27tdNKMc6", 0],
]

template = """
    {{
        "id":{id},
        "name":"{name}",
        "description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
        "location":"{location}",
        "link":"{link}",
        "images":{images},
        "coords":[{lat},{lng}]
    }},"""
string = ""

for loc in locations:
    string += template.format(id=locations.index(loc), name=loc[2], location=loc[3], link=loc[4], images=loc[5], lat=loc[0], lng=loc[1])

open("website/static/istoria/items.json", "w").write("[" + string + "]")