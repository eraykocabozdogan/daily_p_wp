Plan Wallpaper PWA

Hazır:
- Google giriş arayüzü
- Misafir kullanım
- Supabase user_app_state senkronu
- RLS ile kullanıcı bazlı veri ayrımı
- PWA manifest + service worker
- Offline uygulama kabuğu
- Supabase JS 2.111.0 sürümüne sabitlenmiş CDN kullanımı

Google girişinin çalışması için:
1. Uygulamayı HTTPS bir adrese deploy et.
2. Supabase > Authentication > Providers > Google bölümünde Google provider'ı etkinleştir.
3. Google Cloud'da OAuth Web Client oluştur.
4. Google Authorized redirect URI:
   https://pbqwhxtmkmxzarvnsesu.supabase.co/auth/v1/callback
5. Supabase Auth URL Configuration'da deploy edilen uygulama URL'sini Site URL / Redirect URLs listesine ekle.

Davranış:
- Misafir verisi yalnız cihazda tutulur.
- İlk Google girişinde hesapta bulut verisi yoksa mevcut cihazdaki plan hesaba taşınır.
- Hesapta veri varsa bulut sürümü yüklenir.
