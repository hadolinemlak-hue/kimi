# 🏢 Emlak CRM - Portföy Yönetim Sistemi

Modern ve kullanıcı dostu bir emlak CRM uygulaması. Portföy, müşteri yönetimi ve akıllı eşleştirme özellikleri ile emlak işlemlerinizi kolaylaştırır.

## ✨ Özellikler

### 🏠 Portföy Yönetimi
- **Tam CRUD İşlemleri**: İlan ekleme, düzenleme, silme ve listeleme
- **Detaylı İlan Bilgileri**:
  - İlan numarası (otomatik)
  - Başlık, tür (Daire, Villa, Arsa, Dükkan, Ofis)
  - Durum (Satılık/Kiralık)
  - Fiyat, metrekare, oda sayısı
  - Konum (İl, İlçe, Mahalle)
  - Kat, bina yaşı, ısıtma sistemi
  - Açıklama ve durum etiketi (Aktif, Satıldı, Kiralandı)
- **Gelişmiş Filtreleme**: Arama, tür, durum ve etiket filtreleri
- **İstatistikler**: Toplam, aktif ve satılan/kiralanan ilan sayıları

### 👥 Müşteri Yönetimi
- **Müşteri CRUD**: Ekleme, düzenleme, silme ve listeleme
- **Detaylı Müşteri Bilgileri**:
  - Müşteri numarası (otomatik)
  - Ad soyad, telefon, e-posta
  - Arama türü (Alıcı/Kiracı)
  - İlgilenilen emlak türü
  - **Bütçe Aralığı**: Min ve Max bütçe (TL)
  - Tercih edilen konum
  - Minimum metrekare, oda tercihi
  - Notlar ve durum (Aktif, Pasif, Tamamlandı)
- **Filtreleme**: Arama, tür ve durum filtreleri
- **İstatistikler**: Toplam, aktif müşteri ve alıcı sayıları

### 🔗 Akıllı Eşleştirme Sistemi
- **Otomatik Eşleştirme**: Müşteri ve portföy verilerine göre otomatik eşleşme
- **Akıllı Skorlama Sistemi** (0-100):
  - ✅ **Bütçe Kontrolü** (40 puan): Portföy fiyatı müşterinin min-max bütçe aralığında olmalı
  - ✅ **Tür Uyumu** (20 puan): Emlak türü uyumlu olmalı
  - ✅ **Durum Uyumu** (20 puan): Satılık/Kiralık ile Alıcı/Kiracı eşleşmesi
  - ✅ **Konum Uyumu** (10 puan): İl ve ilçe uyumu
  - ✅ **Metrekare Uyumu** (5 puan): Minimum metrekare karşılanıyor mu
  - ✅ **Oda Uyumu** (5 puan): Oda sayısı tercihi uyumlu mu
- **Görsel Skor Gösterimi**: Renk kodlu skor barı (yeşil >80, sarı >50, kırmızı <50)
- **Eşleşme Onaylama**: Manuel eşleşme onaylama özelliği
- **Detayllı Görünüm**: Müşteri ve portföy bilgileri yan yana gösterim
- **İstatistikler**: Toplam eşleşme, yüksek skor ve onaylanmış eşleşme sayıları

### 💾 Yedekleme Sistemi
- **Veri Yedekleme**: Tüm verileri JSON dosyası olarak indirme
- **Geri Yükleme**: JSON dosyasından veri yükleme
- **Dosya Formatı**: `emlak_crm_yedek_TARIH.json`
- **Veri İstatistikleri**: Portföy, müşteri ve eşleşme sayıları
- **Son Yedekleme Tarihi**: Yedekleme geçmişi takibi

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Primary**: #FF7A00 (Turuncu)
- **Primary Light**: #FF9A3C
- **Primary Dark**: #E66A00
- **Dark Background**: #1A1A2E
- **Sidebar**: #1E1E2E
- **Card**: #2A2A3E
- **Success**: #10B981 (Yeşil)
- **Warning**: #F59E0B (Sarı)
- **Danger**: #EF4444 (Kırmızı)

### UI/UX Özellikleri
- ✅ **Sol Sabit Menü**: Tüm sayfalara hızlı erişim
- ✅ **Üst Sabit Header**: Sayfa başlıkları ve aksiyonlar
- ✅ **Modern Card Tasarımı**: Gölgeli ve rounded köşeler
- ✅ **Responsive Tasarım**: Mobil uyumlu
- ✅ **Modal Sistemleri**: Ekleme ve düzenleme için
- ✅ **Toast Bildirimleri**: Başarı, hata ve uyarı mesajları
- ✅ **Hover Efektleri**: İnteraktif kullanıcı deneyimi
- ✅ **İkonlar**: Font Awesome 6.4.0

## 🚀 Kullanım

### Başlangıç
1. `index.html` dosyasını tarayıcınızda açın
2. Sol menüden istediğiniz sayfaya gidin
3. Verileri eklemeye başlayın

### Portföy Ekleme
1. "Portföy" sayfasına gidin
2. "Yeni İlan Ekle" butonuna tıklayın
3. Form alanlarını doldurun
4. "Kaydet" butonuna tıklayın

### Müşteri Ekleme
1. "Müşteriler" sayfasına gidin
2. "Yeni Müşteri Ekle" butonuna tıklayın
3. Form alanlarını doldurun
4. **Önemli**: Min Bütçe ve Max Bütçe alanlarını doldurun
5. "Kaydet" butonuna tıklayın

### Eşleştirme Görüntüleme
1. "Eşleştirme" sayfasına gidin
2. Otomatik hesaplanan eşleşmeleri görün
3. Uyum skorlarını inceleyin
4. Uygun eşleşmeleri "Onayla" butonuna tıklayarak onaylayın

### Yedekleme
**Yedek İndirme:**
1. "Yedekle / Geri Yükle" sayfasına gidin
2. "Yedeği İndir (JSON)" butonuna tıklayın
3. JSON dosyası bilgisayarınıza indirilecek

**Yedek Yükleme:**
1. "Yedekle / Geri Yükle" sayfasına gidin
2. "Yedek Yükle" butonuna tıklayın
3. JSON dosyasını seçin
4. Onay verdikten sonra veriler yüklenecek

## 💡 İpuçları

### Eşleştirme Sistemi
- **Bütçe Aralığı**: Müşterinin bütçe aralığı doğru girilmelidir. Portföy fiyatı bu aralıkta ise eşleşme olur.
- **Skor Yorumlama**:
  - 🟢 **>80 puan**: Çok uyumlu (öncelikli takip)
  - 🟡 **50-80 puan**: Orta uyumlu (potansiyel)
  - 🔴 **<50 puan**: Düşük uyumlu (ek kontrol gerekli)

### Veri Yönetimi
- Düzenli yedek alın (özellikle önemli değişikliklerden önce)
- Müşteri ve portföy durumlarını güncel tutun
- Satılan/kiralanan ilanların etiketini değiştirin

### Filtreleme
- Birden fazla filtreyi kombine ederek spesifik aramalar yapın
- Arama kutusuna il, ilçe veya başlık girebilirsiniz

## 📊 Teknik Bilgiler

### Teknolojiler
- **HTML5**: Semantic yapı
- **CSS3**: Modern tasarım, gradients, animations
- **Vanilla JavaScript**: Tüm işlevsellik
- **LocalStorage**: Veri kalıcılığı
- **Font Awesome 6.4.0**: İkonlar

### Veri Yapısı

**Portföy:**
```javascript
{
  id: string,
  number: string,
  title: string,
  type: string,
  status: string,
  price: number,
  area: number,
  rooms: string,
  city: string,
  district: string,
  neighborhood: string,
  floor: string,
  buildingAge: number,
  heating: string,
  description: string,
  label: string,
  createdAt: string
}
```

**Müşteri:**
```javascript
{
  id: string,
  number: string,
  name: string,
  phone: string,
  email: string,
  searchType: string,
  propertyType: string,
  minBudget: number,
  maxBudget: number,
  city: string,
  district: string,
  minArea: number,
  roomPreference: string,
  status: string,
  notes: string,
  createdAt: string
}
```

**Eşleşme:**
```javascript
{
  customerId: string,
  propertyId: string,
  confirmedAt: string
}
```

### Tarayıcı Desteği
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📱 Responsive Tasarım
- **Desktop**: Tam özellikli görünüm
- **Tablet**: Optimize edilmiş card düzeni
- **Mobile**: Hamburger menü ile erişim

## 🔐 Veri Güvenliği
- Tüm veriler tarayıcınızın localStorage'ında saklanır
- Veriler sadece sizin tarayıcınızda bulunur
- Düzenli yedek alınması önerilir

## 🎯 Gelecek Özellikler (Planlanan)
- [ ] Excel/CSV export desteği
- [ ] Görsel yükleme (portföy için)
- [ ] Randevu takip sistemi
- [ ] Gelişmiş raporlama
- [ ] E-posta entegrasyonu
- [ ] SMS bildirimleri
- [ ] Çoklu dil desteği

## 📝 Notlar
- Veriler tarayıcıda saklanır, tarayıcı verileri temizlenirse kaybolur
- Düzenli yedek almayı unutmayın
- Önemli: Min ve Max bütçe doğru girilmelidir

## 📄 Lisans
Bu proje açık kaynak kodludur ve serbestçe kullanılabilir.

---

**Geliştirici**: Emlak CRM Ekibi  
**Versiyon**: 1.0.0  
**Son Güncelleme**: 2024
