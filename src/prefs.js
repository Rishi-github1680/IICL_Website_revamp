// The visitor-facing "show 3D models" switch was removed, so the scenes always run.
//
// The plumbing is kept — every layout still asks `show3D` before creating a scene —
// so the control can be brought back by restoring Toggle3D.svelte and having these
// read localStorage again. Deliberately NOT reading storage now: anyone who set it
// to 'off' while the switch existed would otherwise be stuck with no way back.
import { readable } from 'svelte/store';

export const get3D = () => true;
export const show3D = readable(true);
