import QRCode from 'qrcode';

function crc16(data: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function tlv(id: string, value: string): string {
  const length = value.length.toString().padStart(2, '0');
  return `${id}${length}${value}`;
}

export function generatePromptPayPayload(
  phoneOrId: string,
  amount: number
): string {
  const cleaned = phoneOrId.replace(/\D/g, '');

  let accountId: string;
  let accountType: string;

  if (cleaned.length === 10) {
    accountId = '0066' + cleaned.substring(1);
    accountType = '01';
  } else if (cleaned.length === 13) {
    accountId = cleaned;
    accountType = '02';
  } else {
    accountId = cleaned;
    accountType = '03';
  }

  const merchantAccount = tlv('00', 'A000000677010111') +
    tlv(accountType, accountId);

  let payload = '';
  payload += tlv('00', '01');
  payload += tlv('01', '11');
  payload += tlv('29', merchantAccount);
  payload += tlv('53', '764');

  if (amount > 0) {
    payload += tlv('54', amount.toFixed(2));
  }

  payload += tlv('58', 'TH');
  payload += tlv('62', tlv('05', 'VillaOS'));

  payload += '6304';
  const checksum = crc16(payload);
  payload = payload.slice(0, -4) + '63' + '04' + checksum;

  return payload;
}

export async function generatePromptPayQR(
  phoneOrId: string,
  amountTHB: number
): Promise<string> {
  const payload = generatePromptPayPayload(phoneOrId, amountTHB);

  const qrDataUrl = await QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 300,
    color: {
      dark: '#064e3b',
      light: '#ffffff',
    },
  });

  return qrDataUrl;
}
