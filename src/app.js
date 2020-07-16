class JadwalKuliah {
    static daftarHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

    static stringJadwal(jadwal) {
        return `${jadwal.hari}, ${jadwal.jamMulai} - ${jadwal.jamBerakhir}`;
    }

    static stringWaktuKeTotalMenit(stringWaktu) {
        const jam = Number.parseInt(stringWaktu.substring(0, stringWaktu.indexOf('.')));
        const menit = Number.parseInt(stringWaktu.substring(stringWaktu.indexOf('.') + 1));
        return jam * 60 + menit;
    }

    static totalMenitKeStringWaktu(totalMenit) {
        const jam = Number.parseInt(totalMenit / 60).toString().padStart(2, '0');
        const menit = (totalMenit % 60).toString().padStart(2, '0');
        return `${jam}.${menit}`;
    }

    static cekJadwalBertabrakan(jadwal1, jadwal2) {
        if (jadwal1.hari !== jadwal2.hari) return false;

        const jamMulaiJadwal1 = JadwalKuliah.stringWaktuKeTotalMenit(jadwal1.jamMulai);
        const jamBerakhirJadwal1 = JadwalKuliah.stringWaktuKeTotalMenit(jadwal1.jamBerakhir);
        const jamMulaiJadwal2 = JadwalKuliah.stringWaktuKeTotalMenit(jadwal2.jamMulai);
        const jamBerakhirJadwal2 = JadwalKuliah.stringWaktuKeTotalMenit(jadwal2.jamBerakhir);

        if (jamBerakhirJadwal2 > jamMulaiJadwal1 && jamBerakhirJadwal2 <= jamBerakhirJadwal1)
            return true;
        if (jamMulaiJadwal2 >= jamMulaiJadwal1 && jamBerakhirJadwal2 < jamBerakhirJadwal1)
            return true;
        return false;
    }

    static pesanJadwalBertabrakan(mataKuliah, kodeKelas, indexJadwal) {
        const kelas = mataKuliah.kelas.find((kelas) =>
            kelas.kode === kodeKelas
        );
        let pesan = 'Bertabrakan dengan ';
        pesan += `<b>${mataKuliah.nama} (Kelas ${kodeKelas})</b> `;
        pesan += 'pada ';
        pesan += `<b>${JadwalKuliah.stringJadwal(kelas.jadwal[indexJadwal])}</b>`;
        return pesan;
    }

    constructor(tabelMataKuliah, tabelJadwal, daftarMataKuliah) {
        this.jumlahKelasTerpilih = 0;

        this.tabelMataKuliah = tabelMataKuliah;
        this.tabelJadwal = tabelJadwal;
        this.daftarMataKuliah = daftarMataKuliah;

        this.batasAwalWaktu = JadwalKuliah.stringWaktuKeTotalMenit(
            daftarMataKuliah[0].kelas[0].jadwal[0].jamMulai
        );
        this.batasAkhirWaktu = JadwalKuliah.stringWaktuKeTotalMenit(
            daftarMataKuliah[0].kelas[0].jadwal[0].jamBerakhir
        );

        daftarMataKuliah.forEach((mataKuliah) => {
            mataKuliah.kelas.forEach((kelas) => {
                kelas.jadwal.forEach((jadwal) => {
                    let totalMenitJamMulai = JadwalKuliah.stringWaktuKeTotalMenit(
                        jadwal.jamMulai
                    );
                    if (totalMenitJamMulai < this.batasAwalWaktu) {
                        this.batasAwalWaktu = totalMenitJamMulai;
                    }

                    let totalMenitJamBerakhir = JadwalKuliah.stringWaktuKeTotalMenit(
                        jadwal.jamBerakhir
                    );
                    if (totalMenitJamBerakhir > this.batasAkhirWaktu) {
                        this.batasAkhirWaktu = totalMenitJamBerakhir;
                    }
                });
            });
        });

        this.batasAwalWaktu = Number.parseInt(this.batasAwalWaktu / 60);
        if (this.batasAkhirWaktu % 60 === 0) {
            this.batasAkhirWaktu = (this.batasAkhirWaktu / 60) - 1;
        } else {
            this.batasAkhirWaktu = Number.parseInt(this.batasAkhirWaktu / 60);
        }

        this.tabelMataKuliah.createTHead();
        this.tabelMataKuliah.tHead.insertRow();
        ['Kode', 'Nama', 'Kelas'].forEach((header) => {
            this.tabelMataKuliah.tHead.rows[0].appendChild(document.createElement('th'))
                .textContent = header;
        });

        this.tabelMataKuliah.createTBody();
        this.daftarMataKuliah.forEach((mataKuliah) => {
            const baris = this.tabelMataKuliah.tBodies[0].insertRow();
            baris.insertCell().textContent = mataKuliah.kode;
            baris.insertCell().textContent = mataKuliah.nama;
            const divContainerKelas = baris.insertCell().appendChild(
                document.createElement('div')
            );
            divContainerKelas.classList.add('container-kelas');
            divContainerKelas.setAttribute('data-mata-kuliah', mataKuliah.kode);
            mataKuliah.kelas.forEach((kelas) => {
                const divKelas = divContainerKelas.appendChild(document.createElement('div'));
                divKelas.classList.add('kelas');
                divKelas.addEventListener('click', () => {
                    this.clickKelas(mataKuliah.kode, kelas.kode);
                });
                divKelas.appendChild(document.createElement('p')).textContent = kelas.kode;
                divKelas.setAttribute('data-kelas', kelas.kode);
                kelas.jadwal.forEach((jadwal) => {
                    divKelas.appendChild(document.createElement('p')).textContent =
                        JadwalKuliah.stringJadwal(jadwal);
                });
            });
        });

        this.tabelJadwal.createTHead();
        this.tabelJadwal.tHead.insertRow().appendChild(document.createElement('th')).colSpan =
            JadwalKuliah.daftarHari.length + 1;
        this.tabelJadwal.tHead.insertRow().appendChild(document.createElement('th')).textContent =
            'Waktu';
        JadwalKuliah.daftarHari.forEach((hari) => {
            this.tabelJadwal.tHead.rows[1].appendChild(document.createElement('th')).textContent =
                hari;
        });

        this.tabelJadwal.createTBody();
        for (let i = this.batasAwalWaktu; i <= this.batasAkhirWaktu; i++) {
            const baris = this.tabelJadwal.tBodies[0].insertRow();
            for (let i = 0; i <= JadwalKuliah.daftarHari.length; i++) {
                baris.insertCell();
            }
            baris.firstChild.textContent = JadwalKuliah.totalMenitKeStringWaktu(i * 60);
        }
    }

    dapatkanDivKelas(kodeMataKuliah, kodeKelas) {
        return this.tabelMataKuliah.querySelector(
            `.container-kelas[data-mata-kuliah='${kodeMataKuliah}'] > .kelas[data-kelas='${kodeKelas}']`
        );
    }

    clickKelas(kodeMataKuliah, kodeKelas) {
        const divKelas = this.dapatkanDivKelas(kodeMataKuliah, kodeKelas);
        if (divKelas.getAttribute('data-bertabrakan-mata-kuliah')) return;
        const kodeKelasTerpilihSebelumnya = divKelas.parentElement.getAttribute(
            'data-kelas-dipilih'
        );
        if (kodeKelasTerpilihSebelumnya === kodeKelas) {
            this.batalPilihKelas(kodeMataKuliah, kodeKelas);
        } else {
            if (kodeKelasTerpilihSebelumnya) {
                this.batalPilihKelas(kodeMataKuliah, kodeKelasTerpilihSebelumnya);
            }
            this.pilihKelas(kodeMataKuliah, kodeKelas);
        }

        this.tabelJadwal.tHead.rows[0].firstChild.textContent =
            `${this.jumlahKelasTerpilih}/${this.daftarMataKuliah.length} mata kuliah terpilih`;
    }

    pilihKelas(kodeMataKuliah, kodeKelas) {
        this.jumlahKelasTerpilih++;

        const divKelas = this.dapatkanDivKelas(kodeMataKuliah, kodeKelas);
        divKelas.classList.add('kelas--terpilih');
        divKelas.parentElement.parentElement.parentElement.setAttribute(
            'data-mata-kuliah-terpilih', true
        );
        divKelas.parentElement.setAttribute('data-kelas-dipilih', kodeKelas);

        const mataKuliahDipilih = this.daftarMataKuliah.find((mataKuliah) =>
            mataKuliah.kode === kodeMataKuliah
        );

        const kelasDipilih = mataKuliahDipilih.kelas.find((kelas) =>
            kelas.kode === kodeKelas
        );

        this.daftarMataKuliah.forEach((mataKuliah) => {
            if (mataKuliah.kode !== kodeMataKuliah) {
                mataKuliah.kelas.forEach((kelas) => {
                    for (let i = 0; i < kelas.jadwal.length; i++) {
                        for (let j = 0; j < kelasDipilih.jadwal.length; j++) {
                            if (JadwalKuliah.cekJadwalBertabrakan(
                                kelas.jadwal[i],
                                kelasDipilih.jadwal[j]
                            )) {
                                const divKelas = this.dapatkanDivKelas(
                                    mataKuliah.kode, kelas.kode
                                );
                                divKelas.setAttribute(
                                    'data-bertabrakan-mata-kuliah',
                                    kodeMataKuliah
                                );
                                divKelas.setAttribute('data-bertabrakan-kelas', kodeKelas);
                                const elementPesan = divKelas.appendChild(
                                    document.createElement('p')
                                );
                                elementPesan.classList.add('kelas__pesan-bertabrakan');
                                elementPesan.innerHTML = JadwalKuliah.pesanJadwalBertabrakan(
                                    mataKuliahDipilih, kodeKelas, j
                                );
                                elementPesan.style.marginLeft = 'calc(-1px - 8px)';
                                elementPesan.style.marginTop =
                                    `calc(-1px + 8px - ${divKelas.clientHeight}px)`;
                                break;
                            }
                        }
                    }
                });
            }
        });

        kelasDipilih.jadwal.forEach((jadwal) => {
            const menitJamMulai = JadwalKuliah.stringWaktuKeTotalMenit(jadwal.jamMulai);
            const menitJamBerakhir = JadwalKuliah.stringWaktuKeTotalMenit(jadwal.jamBerakhir);
            const perbedaanWaktu = menitJamBerakhir - menitJamMulai;

            const divJadwal = this.tabelJadwal.tBodies[0].querySelector(
                `tr:nth-child(${Number.parseInt(menitJamMulai / 60) - this.batasAwalWaktu + 1})>td:nth-child(${JadwalKuliah.daftarHari.indexOf(jadwal.hari) + 2})`
            ).appendChild(document.createElement('div'));
            divJadwal.classList.add('jadwal');
            divJadwal.style.height =
                `calc(${Number.parseInt(perbedaanWaktu / 60) * 4}rem + ${(perbedaanWaktu % 60) / 60 * 4}rem - 1px)`;
            divJadwal.style.marginTop =
                `calc(-2rem + ${(menitJamMulai % 60) / 60 * 4}rem + 1px)`;
            divJadwal.setAttribute('data-mata-kuliah', kodeMataKuliah);
            divJadwal.setAttribute('data-kelas', kodeKelas);

            const divInformasiJadwal = divJadwal.appendChild(document.createElement('div'));
            divInformasiJadwal.classList.add('detail-jadwal');
            divInformasiJadwal.appendChild(document.createElement('p')).textContent =
                `${mataKuliahDipilih.nama} (Kelas ${kodeKelas})`;
            divInformasiJadwal.appendChild(document.createElement('p')).textContent =
                `${jadwal.jamMulai} - ${jadwal.jamBerakhir}`;
        });
    }

    batalPilihKelas(kodeMataKuliah, kodeKelas) {
        this.jumlahKelasTerpilih--;

        const divKelas = this.dapatkanDivKelas(kodeMataKuliah, kodeKelas);
        divKelas.classList.remove('kelas--terpilih');
        divKelas.parentElement.parentElement.parentElement.setAttribute(
            'data-mata-kuliah-terpilih', false
        );
        divKelas.parentElement.removeAttribute('data-kelas-dipilih');

        this.tabelMataKuliah
            .querySelectorAll(
                `.kelas[data-bertabrakan-mata-kuliah='${kodeMataKuliah}'][data-bertabrakan-kelas='${kodeKelas}']`
            )
            .forEach((el) => {
                el.querySelector('.kelas__pesan-bertabrakan').remove();
                el.removeAttribute('data-bertabrakan-mata-kuliah');
                el.removeAttribute('data-bertabrakan-kelas');
            });

        this.tabelJadwal
            .querySelectorAll(
                `.jadwal[data-mata-kuliah='${kodeMataKuliah}'][data-kelas='${kodeKelas}']`
            )
            .forEach((el) => {
                el.remove();
            });
    }
}
