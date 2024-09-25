# Next Clerk

- [Next Clerk](#next-clerk)
  - [`useUser()` =\> `isSignedIn` , `isLoaded` , `user`](#useuser--issignedin--isloaded--user)
    - [`user` : (link)](#user--link)
      - [`update(params: UpdateUserParams)` =\> `user`](#updateparams-updateuserparams--user)
      - [`delete()` =\> `void`](#delete--void)
      - [`setProfileImage()` =\> `ImageResource`](#setprofileimage--imageresource)
      - [`getSessions()` =\> `SessionWithActivities[]`](#getsessions--sessionwithactivities)
    - [`updatePassword(params: UpdatePasswordParams)` =\> `user`](#updatepasswordparams-updatepasswordparams--user)
  - [`useClerk` =\> `clerk`](#useclerk--clerk)
    - [`clerk` : (link)](#clerk--link)
  - [`useAuth()` =\> `isLoaded` , `userId` , `sessionId`, `orgId`, `orgRole`, `orgSlug`, `signOut()`, `getToken()`, `has()`](#useauth--isloaded--userid--sessionid-orgid-orgrole-orgslug-signout-gettoken-has)
  - [`useSignIn()` =\> `isLoaded` , `setActive()` ,`signIn`](#usesignin--isloaded--setactive-signin)
  - [`useSingUp()` =\> `isLoaded` , `setActive()` ,`signUp`](#usesingup--isloaded--setactive-signup)
  - [`useSession()` =\> `isLoaded`, `isSignedIn`, `session`](#usesession--isloaded-issignedin-session)
  - [`useSessionList()` =\> `isLoaded`, `sessions`](#usesessionlist--isloaded-sessions)
  - [`useOrganization()`](#useorganization)
  - [`useOrganizationList()`](#useorganizationlist)
  - [`auth()` =\> `Auth` \& `protect()`, `redirectToSignIn()`](#auth--auth--protect-redirecttosignin)
    - [`protect()`](#protect)
    - [`unauthenticatedUrl()`](#unauthenticatedurl)
    - [Use `auth()` to retrieve userId `const { userId } = auth();`](#use-auth-to-retrieve-userid-const--userid---auth)
    - [Use `auth()` for data fetching](#use-auth-for-data-fetching)
    - [Use `auth()` to check if a user is authenticated](#use-auth-to-check-if-a-user-is-authenticated)
    - [Use `auth()` to check if a user is authorized](#use-auth-to-check-if-a-user-is-authorized)
    - [Use `auth()` to check your current user's role](#use-auth-to-check-your-current-users-role)
  - [`currentUser()` =\> `User`](#currentuser--user)

## `useUser()` => `isSignedIn` , `isLoaded` , `user`

The `useUser()` hook is a convenient way to access the current `User` data where you need it.

```tsx
import { useUser } from "@clerk/clerk-react";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <div>Hello {user.fullName}!</div>;
  }

  return <div>Not signed in</div>;
}
```

### `user` : [(link)](https://clerk.com/docs/references/javascript/user/user)

#### `update(params: UpdateUserParams)` => `user`

#### `delete()` => `void`

#### `setProfileImage()` => `ImageResource`

#### `getSessions()` => `SessionWithActivities[]`

### `updatePassword(params: UpdatePasswordParams)` => `user`

## `useClerk` => `clerk`

### `clerk` : [(link)](https://clerk.com/docs/references/javascript/clerk/clerk)

## `useAuth()` => `isLoaded` , `userId` , `sessionId`, `orgId`, `orgRole`, `orgSlug`, `signOut()`, `getToken()`, `has()`

The `useAuth()` hook is a convenient way to access the current auth state. This hook provides the minimal information needed for data-loading and helper methods to manage the current active session.

```tsx
import { useAuth } from "@clerk/clerk-react";

export default function ExternalDataPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    // Handle loading state however you like
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    // Handle signed out state however you like
    return <div>Sign in to view this page</div>;
  }

  const fetchDataFromExternalResource = async () => {
    const token = await getToken();
    // Add logic to fetch your data
    return data;
  };

  return <div>...</div>;
}
```

## `useSignIn()` => `isLoaded` , `setActive()` ,`signIn`

The `useSignIn()` hook provides access to the `SignIn` object, which allows you to check the current state of a sign-in. This is also useful for creating a custom sign-in flow.

## `useSingUp()` => `isLoaded` , `setActive()` ,`signUp`

The `useSignUp()` hook gives you access to the `SignUp` object, which allows you to check the current state of a sign-up. This is also useful for creating a custom sign-up flow.

## `useSession()` => `isLoaded`, `isSignedIn`, `session`

The `useSession()` hook provides access to the current user's `Session` object, as well as helpers for setting the active session.

## `useSessionList()` => `isLoaded`, `sessions`

The `useSessionList()` hook returns an array of `Session` objects that have been registered on the client device.

## `useOrganization()`

The `useOrganization()` hook is used to retrieve attributes of the currently active organization.

## `useOrganizationList()`

The `useOrganizationList()` hook allows you to retrieve the memberships, invitations, or suggestions for an active user. This hook also gives you the ability to create an organization and set the active organization.

## `auth()` => `Auth` & `protect()`, `redirectToSignIn()`

The `auth()` helper returns the `Auth` object of the currently active user. This is the same `Auth` object that is returned by the `getAuth()` hook.

However, it can be used in **Server Components**, **Route Handlers**, and **Server Actions**.

The `auth()` helper does require `Middleware`.

### `protect()`

You can use the protect() helper in two ways:

- to check if a user is authenticated (signed in)
- to check if a user is authorized

parameters:

- `role`
- `permissions`
- `has`
- `unauthorizedUrl`
- `unauthenticatedUrl`

### `unauthenticatedUrl()`

`redirectToSignIn()` is a method that redirects the user to the sign-in page. It accepts the following parameters:

- `returnBackUrl` The URL to redirect the user back to after they sign in.

### Use `auth()` to retrieve userId `const { userId } = auth();`

### Use `auth()` for data fetching

### Use `auth()` to check if a user is authenticated

### Use `auth()` to check if a user is authorized

### Use `auth()` to check your current user's role

## `currentUser()` => `User`

The `currentUser` helper returns the `Backend API User` object of the currently active user.

it can be used in **Server Components**, **Route Handlers**, and **Server Actions**.
