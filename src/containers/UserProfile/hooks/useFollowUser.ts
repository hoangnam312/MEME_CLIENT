import { useEffect } from 'react';
import { useBoundStore } from 'src/store/store';
import { getFollowStatus } from 'src/service/follow';

/**
 * Pre-seeds the follow relationship in the global store so that MUserCard's
 * useUserCard hook shows the correct follow state once the profile renders.
 *
 * The store key must match what useUserCard uses: user.username.
 */
const useFollowUser = (
	userId: string,
	username: string,
	enabled: boolean
): void => {
	const setFollowRelationship = useBoundStore(
		(state) => state.follow.setFollowRelationship
	);

	useEffect(() => {
		if (!enabled || !userId || !username) return;
		getFollowStatus(userId)
			.then((res) => {
				setFollowRelationship(username, {
					isFollowing: res.data.isFollowing,
					isFollowedBy: false,
					followedAt: res.data.followedAt,
				});
			})
			.catch(() => {
				// silently ignore — e.g. unauthenticated users get 401
			});
	}, [userId, username, enabled]);
};

export default useFollowUser;
