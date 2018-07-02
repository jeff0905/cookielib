/**
 * 用户访问之后, 设置cookie, 后续所有的请求带上该cookie。 N个用户的cookie值 是不一样的，附带可以区别出是否是同一台设备
 * 首次访问, 首日, 已经访问过,
 * 
 */

import { get, set } from 'js-cookie';

const key = 'wld_cookie_device_id';
const domain = '.wolaidai.com';
const path = '/';

const cid = get(key);

const current_domain = window.location.host.match(/\w*\.com/g);
console.log(current_domain);
/**
 * 每个机器给予唯一的值,
 * 规则:
 *   [time]_[random]_[ua]_[width*height]_[domain]_[]
 */
export function uuid() {
    const uuid_time = function() {
        const d = 1 * new Date();
        let i = 0;
        while (d === 1 * new Date()) {
            i++;
        }
        return d.toString(16) + i.toString(16);
    }

    const uuid_random = function() {
        return Math.random().toString(16).replace('.', '');
    }

    return uuid_time() + uuid_random();
}

console.log('是否是新的', cid);

if (!cid) {
  const uuids = uuid();
  console.log('设置cookie', key, uuids);
  set(key, uuids, { domain });
}

